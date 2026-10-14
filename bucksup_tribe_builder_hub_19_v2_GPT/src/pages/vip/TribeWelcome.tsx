import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AmazonSuccessPopup from '@/components/AmazonSuccessPopup';

interface Team {
  id: string;
  team_name: string;
  team_id: string;
}

export default function TribeWelcome() {
  const { parameter } = useParams<{ parameter: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [team, setTeam] = useState<Team | null>(null);
  const [processedPhone, setProcessedPhone] = useState<string>('');
  const [showAmazonDialog, setShowAmazonDialog] = useState(false);
  const [showAmazonSuccessPopup, setShowAmazonSuccessPopup] = useState(false);
  const [showVideoPopup, setShowVideoPopup] = useState(false);
  const [showAboutMe, setShowAboutMe] = useState(false);

  // Phone number processing function
  const processPhoneNumber = (input: string): string => {
    // Strip all non-numeric characters
    let numericOnly = input.replace(/\D/g, '');
    
    // Remove leading zeros and ones until we get to first number > 1
    while (numericOnly.length > 0 && (numericOnly[0] === '0' || numericOnly[0] === '1')) {
      numericOnly = numericOnly.substring(1);
    }
    
    return numericOnly;
  };

  // Team name formatting function
  const formatTeamName = (teamName: string): string => {
    const lowerName = teamName.toLowerCase();
    if (lowerName.includes('tribe') || lowerName.includes('team')) {
      return teamName;
    }
    return `${teamName} Team`;
  };

  // Amazon button handlers
  const handleAmazonClick = () => {
    setShowAmazonDialog(true);
  };

  const handleAmazonRedirect = () => {
    setShowAmazonDialog(false);
    setShowAmazonSuccessPopup(true);
  };

  useEffect(() => {
    const handleTribeLookup = async () => {
      let phoneToProcess = parameter || '';
      
      // Check for phone number in cookies
      if (!phoneToProcess) {
        const cookies = document.cookie.split(';');
        const phoneCookie = cookies.find(cookie => cookie.trim().startsWith('phone='));
        if (phoneCookie) {
          phoneToProcess = phoneCookie.split('=')[1];
        }
      }

      // Check for phone number in location state (hidden post)
      if (!phoneToProcess && location.state?.phone) {
        phoneToProcess = location.state.phone;
      }

      if (!phoneToProcess) {
        navigate('/vip/maint');
        return;
      }

      const processed = processPhoneNumber(phoneToProcess);
      setProcessedPhone(processed);

      // Handle different length scenarios
      if (processed.length < 10) {
        // Redirect to vip/index with srt_ prefix
        navigate('/vip/index', { 
          state: { 
            hiddenPost: `srt_${processed}`,
            displayText: `srt_${processed}`
          } 
        });
        return;
      }

      let lookupNumber = processed;
      if (processed.length > 10) {
        // Truncate to first 10 digits
        lookupNumber = processed.substring(0, 10);
      }

      try {
        // Look up team in teams table using team_phone
        const { data: teams, error } = await supabase
          .from('teams')
          .select('id, team_name, team_id, team_phone')
          .eq('team_phone', lookupNumber);

        if (error) {
          console.error('Error looking up team:', error);
          toast.error('Error looking up team');
          navigate('/vip/index', { 
            state: { 
              hiddenPost: `xyz_${lookupNumber}`,
              displayText: `xyz_${lookupNumber}`
            } 
          });
          return;
        }

        if (teams && teams.length > 0) {
          // Team found
          setTeam(teams[0]);
        } else {
          // No team found - redirect to vip/index with xyz_ prefix
          navigate('/vip/index', { 
            state: { 
              hiddenPost: `xyz_${lookupNumber}`,
              displayText: `xyz_${lookupNumber}`
            } 
          });
          return;
        }
      } catch (error) {
        console.error('Unexpected error:', error);
        navigate('/vip/index', { 
          state: { 
            hiddenPost: `xyz_${lookupNumber}`,
            displayText: `xyz_${lookupNumber}`
          } 
        });
      } finally {
        setLoading(false);
      }
    };

    handleTribeLookup();
  }, [parameter, navigate, location.state]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-lg font-medium">Looking up your team...</p>
        </div>
      </div>
    );
  }

  if (!team) {
    return null; // This shouldn't happen as we redirect on no team
  }

  return (
    <div className="min-h-screen">
      {/* First Section */}
      <section className="w-full py-8 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-3">
            Welcome to the BucksUp Revolution!
          </h1>
        </div>
      </section>

      {/* Second Section - Blue Indigo Gradient */}
      <section className="w-full py-10 bg-gradient-to-br from-indigo-500 via-indigo-600 to-indigo-500 bg-[length:400%_400%] animate-gradient-x">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg md:text-xl text-white/90 mb-4 max-w-2xl mx-auto">
            Your Best-Life, Fast-Path journey is underway.
          </p>
          
          {/* Team Welcome Content */}
          <div className="w-full text-center mb-6">
            <h3 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 mx-0 px-0">
              {formatTeamName(team.team_name)}
            </h3>
            <h4 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              Welcomes you &
            </h4>
          </div>
          
          {/* Welcome Card with Left and Right sections */}
          <div className="max-w-4xl mx-auto mt-6 mb-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-0 flex flex-col md:flex-row">
                {/* Left Card - 75% */}
                <div className="flex-1 p-6 md:p-8 md:pr-4">
                  <div className="text-white space-y-4">
                    <p className="text-lg font-semibold">Teri Reynolds Recommends to </p>
                    <h3 className="text-xl md:text-2xl font-bold">Transform Your Life Today</h3>
                    <p className="text-white/90 leading-relaxed">
                      This revolutionary app is designed to change your financial future forever. Join thousands who have discovered the secret to building wealth while living their dream life. Our proven system helps you earn more, save smarter, and create lasting prosperity.
                    </p>
                    <p className="text-white/80">
                      Your journey to financial freedom starts here. Together, we'll unlock opportunities you never thought possible.
                    </p>
                  </div>
                </div>
                
                {/* Right Card - 25% */}
                <div className="w-full md:w-1/4 p-6 md:p-8 md:pl-4 border-t md:border-t-0 md:border-l border-white/20">
                  <div className="text-center text-white space-y-4">
                    {/* Name */}
                    <p className="text-sm text-white font-medium hidden">Teri Reynolds</p>
                    <h5 className="text-lg font-semibold -mt-2">I'm Excited!</h5>
                    
                    {/* Click to Hear Me Badge */}
                    <Button 
                      onClick={() => setShowVideoPopup(true)}
                      variant="outline"
                      size="sm"
                      className="bg-white/20 border-white/40 text-white hover:bg-white/30 text-xs px-3 py-2"
                    >
                      Click to Hear Why
                    </Button>
                    
                    {/* Leader Photo */}
                    <div className="w-36 h-44 mx-auto rounded-lg overflow-hidden relative">
                      <img 
                        src="https://cdn.pixabay.com/photo/2023/03/13/11/19/young-7849619_1280.jpg"
                        alt="Team leader"
                        className="w-full h-full object-cover object-center"
                      />
                      
                      {/* About Me Badge - positioned at bottom right */}
                      <button
                        onClick={() => setShowAboutMe(true)}
                        className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-2 py-1 rounded-md hover:bg-black/80 transition-colors"
                      >
                        about me
                      </button>
                    </div>
                    
                    <p className="text-sm text-white/80">
                      Hear from our team leader about this amazing opportunity
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Your team is ready to help you succeed. <br className="md:hidden" />Together we'll build something amazing.
          </p>
          
          <div className="flex justify-center mt-6">
            <Button 
              onClick={() => navigate('/vip/join-team', { state: { teamName: team.team_name } })}
              className="gradient-prosperity h-16 md:h-20 text-white px-8 md:px-12 py-2 text-lg md:text-xl font-semibold min-w-[200px]"
            >
              Join Team
            </Button>
          </div>
        </div>
      </section>

      {/* Third Section - Team Quick Picks */}
      <section className="w-full py-8 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
            {/* Left Card - Team Quick Picks */}
            <Card className="flex-1 bg-gradient-to-br from-blue-300 to-sky-300 border-0 shadow-2xl">
              <CardContent className="p-4">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 text-left">
                  Team Quick Picks
                </h3>
                
                {/* Amazon Button */}
                <div className="flex justify-center">
                  <Button 
                    onClick={handleAmazonClick}
                    className="bg-gradient-to-br from-blue-400 via-blue-600 to-blue-500 h-16 md:h-20 flex flex-col items-center justify-center text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold min-w-[180px] md:min-w-[200px]"
                  >
                    <div className="font-semibold text-lg md:text-xl">Amazon</div>
                    <div className="text-xs md:text-sm opacity-90">Shop & Save</div>
                  </Button>
                </div>
                
                <p className="text-center text-white/90 mt-3 text-base md:text-lg">
                  Start earning rewards on your everyday purchases
                </p>
              </CardContent>
            </Card>

            {/* Right Card - Personal Photo */}
            <div className="lg:w-80">
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-2xl rounded-2xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-[3/4] bg-gradient-to-br from-indigo-400 to-purple-500 flex flex-col items-center justify-center p-4">
                    <img 
                      src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=600&fit=crop&crop=face"
                      alt="Business professional"
                      className="w-full h-[60%] object-cover object-center rounded-lg mb-4"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Amazon Dialog */}
      <Dialog open={showAmazonDialog} onOpenChange={setShowAmazonDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">Amazon Shopping</DialogTitle>
            <p className="text-center text-muted-foreground">
              Access Amazon through our affiliate link to support BucksUp
            </p>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-center">
              Shop on Amazon and support BucksUp through our affiliate partnership!
            </p>
            <Button 
              onClick={handleAmazonRedirect} 
              className="gradient-prosperity text-white px-8 py-3 text-lg font-semibold w-full"
            >
              Shop on Amazon
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Amazon Success Popup */}
      <AmazonSuccessPopup 
        open={showAmazonSuccessPopup} 
        onOpenChange={setShowAmazonSuccessPopup} 
      />

      {/* About Me Dialog */}
      <Dialog open={showAboutMe} onOpenChange={setShowAboutMe}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">About Me</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="text-center space-y-4">
              {/* Leader Photo */}
              <div className="w-36 h-44 mx-auto rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=600&fit=crop&crop=face"
                  alt="Team leader"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              
              <div className="text-center">
                <p className="text-lg font-semibold">Team Leader</p>
                <p className="text-sm text-muted-foreground">Your Success Partner</p>
              </div>
            </div>
            
            <div className="flex justify-center pt-4">
              <Button 
                onClick={() => setShowAboutMe(false)}
                variant="outline"
                className="px-8 py-3 text-lg font-semibold"
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Video Popup Dialog */}
      <Dialog open={showVideoPopup} onOpenChange={setShowVideoPopup}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              Message from Our Team Leader
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* Video placeholder */}
            <div className="aspect-video bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <div className="text-white text-center">
                <div className="text-6xl mb-4">▶️</div>
                <p className="text-xl font-semibold">Welcome to the Team!</p>
                <p className="text-sm opacity-90">This is your opportunity to change everything</p>
              </div>
            </div>
            
            <div className="flex justify-center space-x-4 pt-4">
              <Button 
                onClick={() => {
                  setShowVideoPopup(false);
                  navigate('/vip/join-team', { state: { teamName: team.team_name } });
                }}
                className="gradient-prosperity text-white px-8 py-3 text-lg font-semibold"
              >
                Join Now
              </Button>
              <Button 
                onClick={() => setShowVideoPopup(false)}
                variant="outline"
                className="px-8 py-3 text-lg font-semibold"
              >
                Return
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
