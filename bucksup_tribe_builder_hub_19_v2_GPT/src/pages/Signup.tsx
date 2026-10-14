
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Users, Crown, User, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@clerk/clerk-react';
import { supabase } from '@/integrations/supabase/client';
import { useOnboarding } from '@/contexts/OnboardingContext';

const Signup = () => {
  const { user } = useUser();
  const { data: onboardingData, clearData } = useOnboarding();
  const [referralCode, setReferralCode] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [membershipType, setMembershipType] = useState('');
  const [hasReferralFromUrl, setHasReferralFromUrl] = useState(false);
  const [referrerInfo, setReferrerInfo] = useState({
    firstName: '',
    lastName: '',
    phone: ''
  });
  const [formData, setFormData] = useState({
    firstName: onboardingData.firstName || '',
    lastName: onboardingData.lastName || '',
    email: onboardingData.email || '',
    phone: onboardingData.phone || '',
    city: '',
    state: '',
    goals: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    // Use onboarding data first, then URL params as fallback
    if (onboardingData.referrerId) {
      setReferralCode(onboardingData.referrerId);
      setHasReferralFromUrl(true);
      
      if (onboardingData.referrerData) {
        setReferrerInfo({
          firstName: onboardingData.referrerData.first_name || '',
          lastName: onboardingData.referrerData.last_name || '',
          phone: ''
        });
      }
    } else {
      // Fallback to URL params if no onboarding data
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
    }
  }, [onboardingData]);

  // Update user profile in Supabase when they complete Clerk signup
  useEffect(() => {
    const updateSupabaseProfile = async () => {
      if (user && referralCode) {
        try {
          // Store the membership type in localStorage for the AuthContext to pick up
          localStorage.setItem('selectedMembershipType', membershipType || 'member');
          
          // Create or update profile with referral information
          const profileData = {
            id: user.id,
            first_name: user.firstName || formData.firstName,
            last_name: user.lastName || formData.lastName,
            email: user.primaryEmailAddress?.emailAddress || formData.email,
            username: user.username || user.firstName || 'user',
            phone_number: user.primaryPhoneNumber?.phoneNumber || formData.phone,
            avatar_url: user.imageUrl || null,
            bio: formData.goals || null,
            location: formData.city && formData.state ? `${formData.city}, ${formData.state}` : null,
            phone_verified: user.primaryPhoneNumber?.verification?.status === 'verified' || false,
            two_factor_enabled: user.twoFactorEnabled || false,
            last_sign_in: new Date().toISOString(),
            membership_type: membershipType as 'member' | 'founder' || 'member',
            parent_profile_id: referralCode, // Set the referrer as the parent
          };

          const { error } = await supabase
            .from('profiles')
            .upsert(profileData);

          if (error) {
            console.error('Error updating Supabase profile:', error);
          } else {
            console.log('Successfully linked user to referrer:', referralCode);
          }
        } catch (error) {
          console.error('Error in profile update:', error);
        }
      }
    };

    updateSupabaseProfile();
  }, [user, referralCode, membershipType, formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if membership type is selected
    if (!membershipType) {
      toast({
        title: "Membership Required",
        description: "Please select a membership type to continue.",
        variant: "destructive"
      });
      return;
    }
    
    // Here you would typically send data to your backend
    console.log('Signup data:', {
      ...formData,
      membershipType,
      referralCode,
      referrerInfo
    });

    toast({
      title: "Welcome to Bucksup!",
      description: `You've successfully joined as a ${membershipType === 'founder' ? 'Team Founder' : 'Team Member'}. Start building your wealth today!`,
    });

    // Clear onboarding data after successful signup
    clearData();
  };

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
            <p className="text-lg text-gray-700 mb-4">
              You've been invited by: <span className="font-semibold text-purple-600">{getReferrerDisplayName()}</span>
              {referrerInfo.phone && (
                <span className="block text-sm text-gray-600">Contact: {referrerInfo.phone}</span>
              )}
            </p>
          )}
          {customMessage && (
            <Card className="max-w-md mx-auto mb-6 border-purple-200 bg-white">
              <CardContent className="pt-4">
                <p className="text-sm italic text-gray-600">"{customMessage}"</p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-center text-gray-900">Start Your Wealth Journey</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Membership Type Selection */}
                <div>
                  <Label className="text-base font-semibold mb-4 block text-gray-900">Choose Your Membership *</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card 
                      className={`relative cursor-pointer transition-all duration-200 border-2 bg-white ${
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
                        <span className="font-semibold mb-1 text-gray-900">Team Member</span>
                        <span className="text-sm text-gray-600 text-center">Free membership - Start saving money and earning rewards</span>
                      </CardContent>
                    </Card>

                    <Card 
                      className={`relative cursor-pointer transition-all duration-200 border-2 bg-white ${
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
                        <span className="font-semibold mb-1 text-gray-900">Team Founder</span>
                        <span className="text-sm text-gray-600 text-center">Build your own team and earn commissions</span>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-gray-900">First Name *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="mt-1 bg-white text-gray-900"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-gray-900">Last Name *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="mt-1 bg-white text-gray-900"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-gray-900">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="mt-1 bg-white text-gray-900"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-gray-900">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="mt-1 bg-white text-gray-900"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city" className="text-gray-900">City *</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="mt-1 bg-white text-gray-900"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state" className="text-gray-900">State *</Label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="mt-1 bg-white text-gray-900"
                    />
                  </div>
                </div>

                {/* Goals field */}
                <div>
                  <Label htmlFor="goals" className="text-gray-900">Your Wealth Goals (Optional)</Label>
                  <Textarea
                    id="goals"
                    name="goals"
                    value={formData.goals}
                    onChange={handleInputChange}
                    placeholder="Tell us about your financial goals and how you'd like to build wealth..."
                    className="mt-1 bg-white text-gray-900"
                  />
                </div>

                {/* Only show referral code field if not provided via URL */}
                {!hasReferralFromUrl && (
                  <div>
                    <Label htmlFor="referralCode" className="text-gray-900">Referral Code (Optional)</Label>
                    <Input
                      id="referralCode"
                      value={referralCode}
                      onChange={(e) => setReferralCode(e.target.value)}
                      placeholder="Enter referral code if you have one"
                      className="mt-1 bg-white text-gray-900"
                    />
                  </div>
                )}

                <Button type="submit" className="w-full bg-indigo-600 text-white hover:bg-indigo-700 text-lg py-6 transition-colors">
                  <Users className="w-5 h-5 mr-2" />
                  Join Bucksup & Build Wealth
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Signup;

