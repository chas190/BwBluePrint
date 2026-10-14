import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { QrCode, Copy, Share, Users, Link as LinkIcon, Phone, Sparkles } from 'lucide-react';
import Navigation from '@/components/Navigation';
import QRCodeGenerator from '@/components/QRCodeGenerator';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
const JoinMyTribe = () => {
  const {
    profile
  } = useAuth();
  const [uniqueLink, setUniqueLink] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [showDemoDialog, setShowDemoDialog] = useState(false);
  const [showPhoneDialog, setShowPhoneDialog] = useState(false);
  const [showCelebrationDialog, setShowCelebrationDialog] = useState(false);
  const [showCustomLinkDialog, setShowCustomLinkDialog] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const {
    toast
  } = useToast();
  useEffect(() => {
    // Generate unique link based on user authentication status
    const baseUrl = window.location.origin + import.meta.env.BASE_URL.replace(/\/$/, "");
    if (profile?.id) {
      // Signed-in user: create referral link with profile data
      const params = new URLSearchParams({
        refid: profile.id,
        firstName: profile.first_name || '',
        lastName: profile.last_name || '',
        phone: profile.phone_number || ''
      });
      const generatedLink = `${baseUrl}/ref-join?${params.toString()}`;
      setUniqueLink(generatedLink);
    } else {
      // Demo user: use static demo link
      const generatedLink = `${baseUrl}/ref-join?ref=USER123`;
      setUniqueLink(generatedLink);
    }
  }, [profile]);
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(uniqueLink);
      toast({
        title: "Link Copied!",
        description: "Your unique referral link has been copied to clipboard."
      });
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Please copy the link manually.",
        variant: "destructive"
      });
    }
  };
  const handleShare = async () => {
    const shareText = profile?.id ? `${customMessage || `Join me on Bucksup and start building wealth together! ${profile.first_name} ${profile.last_name}`}` : `${customMessage || 'Join me on Bucksup and start building wealth together!'} Use my code: USER123`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join My Tribe on Bucksup',
          text: shareText,
          url: uniqueLink
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      handleCopyLink();
    }
  };
  const createCustomLink = () => {
    setShowCustomLinkDialog(true);
  };
  const handleCustomLinkDialogClose = () => {
    setShowCustomLinkDialog(false);
    const message = encodeURIComponent(customMessage);
    if (customMessage.trim()) {
      const customUrl = `${uniqueLink}&msg=${message}`;
      setUniqueLink(customUrl);
      toast({
        title: "Custom Link Created!",
        description: "Your personalized invitation link is ready to share."
      });
    }
  };
  const handleViewMyTribe = () => {
    setShowDemoDialog(true);
  };
  const handleQRCodeClick = () => {
    window.open(uniqueLink, '_blank');
  };
  const handleShareQRCode = () => {
    setShowPhoneDialog(true);
    setPhoneNumber('');
    setPhoneError('');
  };
  const validatePhoneNumber = (phone: string) => {
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, '');

    // Check if it's a valid US phone number (10 digits)
    if (cleaned.length === 10) {
      return true;
    }
    // Check if it's a valid international number (11+ digits)
    if (cleaned.length >= 11) {
      return true;
    }
    return false;
  };
  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length <= 3) {
      return cleaned;
    } else if (cleaned.length <= 6) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    } else if (cleaned.length <= 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return `+${cleaned.slice(0, 1)} (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 11)}`;
  };
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formatted = formatPhoneNumber(value);
    setPhoneNumber(formatted);
    if (phoneError) {
      setPhoneError('');
    }
  };
  const handleSendText = () => {
    const cleanedPhone = phoneNumber.replace(/\D/g, '');
    if (!validatePhoneNumber(phoneNumber)) {
      setPhoneError('Please enter a valid phone number');
      return;
    }

    // Close phone dialog and show celebration
    setShowPhoneDialog(false);
    setShowCelebrationDialog(true);
  };
  const handleCelebrationContinue = () => {
    setShowCelebrationDialog(false);
  };
  const getReferralLinkTitle = () => {
    if (profile?.id) {
      return `VIP Referral Link For: ${profile.first_name || ''} ${profile.last_name || ''}`.trim();
    }
    return 'Your Referral Link';
  };
  return <div className="min-h-screen bg-white">
      <Navigation />
      
      <main className="pt-20 md:pt-24 pb-8">
        <div className="container mx-auto px-4 md:px-6 space-y-8">
          
          {/* Header */}
          <div className="text-center py-6">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
              <span className="bg-gradient-to-r from-purple-700 via-green-700 to-orange-600 bg-clip-text text-transparent">
                Grow Your Tribe
              </span>
            </h1>
            <p className="text-lg mb-6 max-w-2xl mx-auto text-gray-700">
              <span className="bg-gradient-to-r from-purple-800 to-purple-600 bg-clip-text text-transparent font-semibold">
                Share your unique link or QR code to invite new members to join your wealth-building community.
              </span>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* QR Code Section */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="w-6 h-6 text-purple-600" />
                  Your QR Code
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="bg-white p-6 rounded-lg border-2 border-gray-100 inline-block cursor-pointer hover:border-purple-300 transition-colors" onClick={handleQRCodeClick}>
                  <QRCodeGenerator value={uniqueLink} size={200} />
                </div>
                <p className="text-sm text-muted-foreground">
                  New members can scan this code to instantly join your tribe
                </p>
                <div className="flex gap-2 justify-center">
                  <Button onClick={handleShareQRCode} className="gradient-tribe">
                    <Phone className="w-4 h-4 mr-2" />
                    Share QR Code
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Link Sharing Section */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900 font-bold">
                  <LinkIcon className="w-6 h-6 text-green-600" />
                  {getReferralLinkTitle()}
                  {!profile?.id && <span className="text-red-500 text-sm font-normal ml-2">
                      Demo Only - No User Signed In
                    </span>}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="referral-link">Unique Link</Label>
                  <div className="flex gap-2 mt-1">
                    <Input id="referral-link" value={uniqueLink} readOnly className="text-sm" />
                    <Button onClick={handleCopyLink} variant="outline" size="sm">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="custom-message">Custom Message (Optional)</Label>
                  <Input id="custom-message" value={customMessage} onChange={e => setCustomMessage(e.target.value)} placeholder="Add a personal message to your invitation..." className="mt-1" />
                </div>

                <div className="flex gap-2">
                  <Button onClick={createCustomLink} variant="outline" className="flex-1">Create Custom Message</Button>
                  <Button onClick={handleShare} className="gradient-prosperity flex-1">
                    <Share className="w-4 h-4 mr-2" />
                    Share Link
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="text-center border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full gradient-tribe mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-tribe-600">47</div>
                <p className="text-sm text-muted-foreground">Current Tribe Size</p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full gradient-prosperity mx-auto mb-4 flex items-center justify-center">
                  <QrCode className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-prosperity-600">23</div>
                <p className="text-sm text-muted-foreground">QR Code Scans</p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full gradient-wealth mx-auto mb-4 flex items-center justify-center">
                  <LinkIcon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-wealth-600">156</div>
                <p className="text-sm text-muted-foreground">Link Clicks</p>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <Card className="gradient-main text-white border-0">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Expand Your Tribe?
              </h2>
              <p className="text-lg mb-6 opacity-90">
                Share your code and start building a community that saves money together.
              </p>
              <Button variant="secondary" size="lg" className="bg-white text-purple-700 hover:bg-gray-100" onClick={handleViewMyTribe}>
                View My Tribe
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Custom Link Dialog */}
      <Dialog open={showCustomLinkDialog} onOpenChange={setShowCustomLinkDialog}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Sparkles className="w-6 h-6 text-yellow-500" />
              You're About to See Something Amazing!
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="space-y-6 py-4">
              <div className="text-center space-y-4">
                <div className="text-lg text-gray-700 leading-relaxed">
                  <p className="mb-3">
                    🎉 <strong>WOW!</strong> When you see how the BucksUp app can change lives, you'll want to change someone's life too, so share it with someone special!
                  </p>
                  <p className="mb-3">
                    I'm absolutely <span className="text-purple-600 font-semibold">EXCITED</span> about how much this is going to help you and I create money and REAL GENERATIONAL WEALTH for a better life! 
                  </p>
                  <p className="mb-4">
                    It's a game-changer for building wealth,  I highly recommend you check it out. 
                    Together, we'll achieve financial freedom! 💰✨
                  </p>
                </div>
                
                {/* QR Code */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">Your VIP QR Code</h3>
                  <div className="bg-white p-4 rounded-lg border-2 border-purple-200 inline-block">
                    <QRCodeGenerator value={uniqueLink} size={150} />
                  </div>
                </div>
                
                {/* VIP Link */}
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">Your VIP Referral Link</h3>
                  <div className="flex gap-2">
                    <Input value={uniqueLink} readOnly className="text-sm bg-white" />
                    <Button onClick={handleCopyLink} variant="outline" size="sm">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button onClick={handleCustomLinkDialogClose} className="flex-1 gradient-tribe" size="lg">
                  Let's Do This! 🚀
                </Button>
                <Button onClick={() => setShowCustomLinkDialog(false)} variant="outline" size="lg">
                  Maybe Later
                </Button>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Demo Feature Dialog */}
      <Dialog open={showDemoDialog} onOpenChange={setShowDemoDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Feature Not Available</DialogTitle>
          </DialogHeader>
          <p className="py-4">This feature is not available in the demo.</p>
        </DialogContent>
      </Dialog>

      {/* Phone Number Dialog */}
      <Dialog open={showPhoneDialog} onOpenChange={setShowPhoneDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Send QR Code via Text</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="phone">Enter your friend's phone number</Label>
              <Input id="phone" value={phoneNumber} onChange={handlePhoneChange} placeholder="(555) 123-4567" className={`mt-1 ${phoneError ? 'border-red-500' : ''}`} />
              {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
            </div>
            <Button onClick={handleSendText} className="w-full gradient-tribe" disabled={!phoneNumber.trim()}>
              Send Text
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Celebration Dialog */}
      <Dialog open={showCelebrationDialog} onOpenChange={setShowCelebrationDialog}>
        <DialogContent className="sm:max-w-md text-center">
          <div className="py-6 space-y-4">
            {/* Confetti Effect */}
            <div className="text-6xl animate-bounce">🎉</div>
            <div className="text-4xl">🎊 ✨ 🎉</div>
            
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-gray-900">
                Congratulations on Growing Your Tribe!
              </h2>
              <p className="text-lg text-gray-600">
                and revenue potential, inviting a new member. You are on your way to your next goal.
              </p>
            </div>
            
            <div className="pt-4 space-y-2">
              <Button onClick={handleCelebrationContinue} className="w-full gradient-tribe" size="lg">
                Continue
              </Button>
              <p className="text-xs text-gray-500">
                This was just a demonstration for the demo and no SMS was sent
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>;
};
export default JoinMyTribe;
