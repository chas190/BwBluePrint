
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, useUser } from "@clerk/clerk-react";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Crown, ArrowLeft, CheckCircle, User, HelpCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Auth = () => {
  const [membershipType, setMembershipType] = useState('founder');
  const [showHelpDialog, setShowHelpDialog] = useState(false);
  const [showVideoDialog, setShowVideoDialog] = useState(false);
  const { user, isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();

  console.log('Auth page - isLoaded:', isLoaded, 'isSignedIn:', isSignedIn, 'user:', user?.id);

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      console.log('Auth page - User is signed in, redirecting to /main');
      navigate('/main');
    }
  }, [isLoaded, isSignedIn, user, navigate]);

  // Store membership type selection in localStorage when it changes
  useEffect(() => {
    localStorage.setItem('selectedMembershipType', membershipType);
  }, [membershipType]);

  const handleSignUp = () => {
    console.log('Sign up clicked with membership type:', membershipType);
    localStorage.setItem('selectedMembershipType', membershipType);
  };

  // Don't render anything while loading or if already signed in (to prevent flash)
  if (!isLoaded || (isLoaded && isSignedIn)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-green-50 to-orange-50">
      <div className="container mx-auto px-4 md:px-6 py-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
            Join Bucksup
          </h1>
          <p className="text-lg text-muted-foreground">
            Start building your wealth with our community
          </p>
        </div>

        <SignedOut>
          <div className="max-w-2xl mx-auto">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-center text-2xl">Get Started</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Membership Options */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Choose Your Membership</h3>
                    <Dialog open={showHelpDialog} onOpenChange={setShowHelpDialog}>
                      <DialogTrigger asChild>
                        <Button className="text-sm bg-indigo-200 text-indigo-800 hover:bg-indigo-300 border-indigo-300" size="sm">
                          <HelpCircle className="w-4 h-4 mr-1" />
                          Not Sure, Click Here
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Need Help Choosing?</DialogTitle>
                          <DialogDescription className="text-center py-4">
                            Just Choose Tribe Founder! You can change it or watch this video - you'll be glad you did.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex justify-center mb-4">
                          <Button className="w-full bg-slate-700 text-white hover:bg-slate-600 transition-colors duration-200" onClick={() => {
                            setShowHelpDialog(false);
                            setShowVideoDialog(true);
                          }}>
                            Watch Video
                          </Button>
                        </div>
                        <DialogFooter className="flex gap-2">
                          <Button variant="outline" onClick={() => setShowHelpDialog(false)}>
                            Close
                          </Button>
                          <Button onClick={() => {
                            setMembershipType('founder');
                            setShowHelpDialog(false);
                          }} className="gradient-main">
                            Continue
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <Card className={`relative cursor-pointer transition-all duration-200 border-2 ${membershipType === 'member' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-gray-300'}`} onClick={() => setMembershipType('member')}>
                      {membershipType === 'member' && (
                        <div className="absolute -top-2 -right-2 z-10">
                          <CheckCircle className="w-6 h-6 text-green-600 bg-white rounded-full" />
                        </div>
                      )}
                      <CardContent className="p-6 text-center">
                        <User className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                        <h3 className="font-semibold mb-2">Tribe Member</h3>
                        <p className="text-sm text-muted-foreground">Start saving money and earning rewards</p>
                      </CardContent>
                    </Card>
                    
                    <Card className={`relative cursor-pointer transition-all duration-200 border-2 ${membershipType === 'founder' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'}`} onClick={() => setMembershipType('founder')}>
                      {membershipType === 'founder' && (
                        <div className="absolute -top-2 -right-2 z-10">
                          <CheckCircle className="w-6 h-6 text-green-600 bg-white rounded-full" />
                        </div>
                      )}
                      <CardContent className="p-6 text-center">
                        <Crown className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                        <h3 className="font-semibold mb-2">Master Chief</h3>
                        <p className="text-sm text-muted-foreground">Build a tribe and build cashflow together</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Auth Buttons */}
                <div className="space-y-4">
                  <SignUpButton 
                    mode="modal"
                    fallbackRedirectUrl={`${import.meta.env.BASE_URL}main`}
                    unsafeMetadata={{ membershipType }}
                  >
                    <Button className="w-full gradient-main text-white text-lg py-6" onClick={handleSignUp}>
                      <Users className="w-5 h-5 mr-2" />
                      Sign Up and Build Wealth
                    </Button>
                  </SignUpButton>
                  
                  <div className="text-center text-sm text-muted-foreground">
                    Already have an account?
                  </div>
                  
                  <SignInButton 
                    mode="modal"
                    fallbackRedirectUrl={`${import.meta.env.BASE_URL}main`}
                  >
                    <Button variant="outline" className="w-full border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white">
                      Sign In
                    </Button>
                  </SignInButton>
                </div>
              </CardContent>
            </Card>
          </div>
        </SignedOut>

        <SignedIn>
          <div className="max-w-md mx-auto text-center">
            <Card>
              <CardContent className="p-8">
                <div className="mb-6">
                  <UserButton appearance={{
                    elements: {
                      avatarBox: "w-16 h-16 mx-auto"
                    }
                  }} />
                </div>
                
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Welcome to BucksUp!</h2>
                  <p className="text-muted-foreground">
                    You're successfully signed in. Ready to start building wealth?
                  </p>
                  <Link to="/main">
                    <Button className="gradient-main">
                      Go to Dashboard
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </SignedIn>

        {/* Video Dialog */}
        <Dialog open={showVideoDialog} onOpenChange={setShowVideoDialog}>
          <DialogContent className="sm:max-w-4xl">
            <DialogHeader>
              <DialogTitle>Watch Video</DialogTitle>
            </DialogHeader>
            <div className="aspect-video w-full">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/tgABNn8-otI" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen 
                className="rounded-lg"
              />
            </div>
            <DialogFooter>
              <Button onClick={() => setShowVideoDialog(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Auth;

