
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Users, Crown, User, CheckCircle } from 'lucide-react';
import { SignUp } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const RefJoin = () => {
  const navigate = useNavigate();
  const [referralCode, setReferralCode] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [membershipType, setMembershipType] = useState('member');
  const [hasReferralFromUrl, setHasReferralFromUrl] = useState(false);
  const [referrerInfo, setReferrerInfo] = useState({
    firstName: '',
    lastName: '',
    phone: ''
  });

  useEffect(() => {
    // Extract referral code and message from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const refid = urlParams.get('refid');
    const ref = urlParams.get('ref');
    const msg = urlParams.get('msg');
    const firstName = urlParams.get('firstName');
    const lastName = urlParams.get('lastName');
    const phone = urlParams.get('phone');
    
    if (refid) {
      setReferralCode(refid);
      setHasReferralFromUrl(true);
      
      // Set referrer info from URL params
      setReferrerInfo({
        firstName: firstName || '',
        lastName: lastName || '',
        phone: phone || ''
      });
    } else if (ref) {
      setReferralCode(ref);
      setHasReferralFromUrl(true);
    }
    
    if (msg) setCustomMessage(decodeURIComponent(msg));
  }, []);

  const getReferrerDisplayName = () => {
    if (referrerInfo.firstName && referrerInfo.lastName) {
      return `${referrerInfo.firstName} ${referrerInfo.lastName}`;
    }
    return referralCode;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-green-50 to-orange-50 py-8">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
            Join Bucksup
          </h1>
          {referralCode && (
            <p className="text-lg text-muted-foreground mb-4">
              You've been invited by: <span className="font-semibold text-purple-600">{getReferrerDisplayName()}</span>
              {referrerInfo.phone && (
                <span className="block text-sm text-gray-600">Contact: {referrerInfo.phone}</span>
              )}
            </p>
          )}
          {customMessage && (
            <Card className="max-w-md mx-auto mb-6 border-purple-200">
              <CardContent className="pt-4">
                <p className="text-sm italic text-muted-foreground">"{customMessage}"</p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Membership Selection */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-center">Choose Your Membership</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <Card 
                      className={`relative cursor-pointer transition-all duration-200 border-2 ${
                        membershipType === 'member' 
                          ? 'border-purple-500 bg-purple-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setMembershipType('member')}
                    >
                      {membershipType === 'member' && (
                        <div className="absolute -top-2 -right-2 z-10">
                          <CheckCircle className="w-6 h-6 text-green-600 bg-white rounded-full" />
                        </div>
                      )}
                      <CardContent className="flex flex-col items-center justify-center p-6">
                        <User className="w-8 h-8 text-purple-600 mb-2" />
                        <span className="font-semibold mb-1">Team Member</span>
                        <span className="text-sm text-muted-foreground text-center">Free membership - Start saving money and earning rewards</span>
                      </CardContent>
                    </Card>

                    <Card 
                      className={`relative cursor-pointer transition-all duration-200 border-2 ${
                        membershipType === 'founder' 
                          ? 'border-orange-500 bg-orange-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setMembershipType('founder')}
                    >
                      {membershipType === 'founder' && (
                        <div className="absolute -top-2 -right-2 z-10">
                          <CheckCircle className="w-6 h-6 text-green-600 bg-white rounded-full" />
                        </div>
                      )}
                      <CardContent className="flex flex-col items-center justify-center p-6">
                        <Crown className="w-8 h-8 text-orange-600 mb-2" />
                        <span className="font-semibold mb-1">Team Founder</span>
                        <span className="text-sm text-muted-foreground text-center">Build your own team and earn commissions</span>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Clerk SignUp Component */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-center">Create Your Account</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center">
                  <SignUp
                    appearance={{
                      elements: {
                        rootBox: "w-full",
                        card: "shadow-none border-0 bg-transparent",
                        headerTitle: "hidden",
                        headerSubtitle: "hidden",
                        socialButtonsBlockButton: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50",
                        formButtonPrimary: "bg-purple-600 hover:bg-purple-700 text-white",
                        footerActionLink: "text-purple-600 hover:text-purple-700",
                        identityPreviewText: "text-gray-600",
                        formFieldInput: "border border-gray-300 rounded-md px-3 py-2 focus:border-purple-500 focus:ring-purple-500",
                        formFieldLabel: "text-gray-700 font-medium",
                      }
                    }}
                    redirectUrl={window.location.origin + import.meta.env.BASE_URL}
                    fallbackRedirectUrl={window.location.origin + import.meta.env.BASE_URL}
                    signInUrl={`${import.meta.env.BASE_URL}auth`}
                    unsafeMetadata={{
                      membershipType,
                      referralCode: referralCode || '',
                      referrerFirstName: referrerInfo.firstName,
                      referrerLastName: referrerInfo.lastName,
                      referrerPhone: referrerInfo.phone,
                      customMessage: customMessage || ''
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Info Section */}
          <Card className="gradient-main text-white border-0 mt-8">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Build Wealth Together?
              </h2>
              <p className="text-lg mb-6 opacity-90">
                Join thousands of members who are already saving money and earning rewards through group buying power.
              </p>
              <div className="flex justify-center">
                <Users className="w-8 h-8 mr-2" />
                <span className="text-lg font-semibold">Start Your Journey Today</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RefJoin;

