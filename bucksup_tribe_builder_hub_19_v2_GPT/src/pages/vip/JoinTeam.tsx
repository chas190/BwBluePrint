import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function JoinTeam() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const teamName = location.state?.teamName || 'Unknown Team';
  const [formData, setFormData] = useState({
    phone: '',
    zipcode: '',
    name: '',
    email: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleComplete = () => {
    // Navigate to Clerk signup with pre-filled data
    const params = new URLSearchParams({
      email: formData.email,
      firstName: formData.name.split(' ')[0] || '',
      lastName: formData.name.split(' ').slice(1).join(' ') || '',
      phone: formData.phone,
      zipcode: formData.zipcode
    });
    
    // For now, navigate to auth page - in a real implementation you'd integrate with Clerk
    navigate(`/auth?${params.toString()}`);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate(-1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center space-y-6">
            <h4 className="text-2xl md:text-3xl font-bold text-white">
              Thank you for your interest in becoming a VIP member of team {teamName}
            </h4>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h4 className="text-2xl md:text-3xl font-bold text-white mb-4">
                VIP Benefits & Regional Access
              </h4>
              <p className="text-white/90 mb-6">
                As part of the team's VIP members group, you will get regional VIP benefits and deals that will change your life for the better. To provide these benefits we need your phone and zipcode.
              </p>
            </div>
            <div className="space-y-4 max-w-md mx-auto">
              <div>
                <Label htmlFor="phone" className="text-white">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="bg-white/10 border-white/30 text-white placeholder:text-white/60"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <Label htmlFor="zipcode" className="text-white">Zipcode</Label>
                <Input
                  id="zipcode"
                  type="text"
                  value={formData.zipcode}
                  onChange={(e) => handleInputChange('zipcode', e.target.value)}
                  className="bg-white/10 border-white/30 text-white placeholder:text-white/60"
                  placeholder="Enter your zipcode"
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h4 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Personal Information
              </h4>
              <p className="text-white/90 mb-6">
                Please provide your name and the email you would like cash savings and discount options sent to.
              </p>
            </div>
            <div className="space-y-4 max-w-md mx-auto">
              <div>
                <Label htmlFor="name" className="text-white">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="bg-white/10 border-white/30 text-white placeholder:text-white/60"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-white">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="bg-white/10 border-white/30 text-white placeholder:text-white/60"
                  placeholder="Enter your email address"
                />
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h4 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Review & Complete
              </h4>
              <p className="text-white/90 mb-6">
                Please review your information and complete your VIP membership signup.
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-6 space-y-3 max-w-md mx-auto">
              <div className="flex justify-between text-white">
                <span>Name:</span>
                <span>{formData.name}</span>
              </div>
              <div className="flex justify-between text-white">
                <span>Email:</span>
                <span>{formData.email}</span>
              </div>
              <div className="flex justify-between text-white">
                <span>Phone:</span>
                <span>{formData.phone}</span>
              </div>
              <div className="flex justify-between text-white">
                <span>Zipcode:</span>
                <span>{formData.zipcode}</span>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-indigo-600 to-indigo-500 bg-[length:400%_400%] animate-gradient-x">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4">
              Join Team Application
            </h1>
            <p className="text-lg md:text-xl text-white/90">
              Step {currentStep} of 4
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              />
            </div>
          </div>

          {/* Content Card */}
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardContent className="p-8">
              {renderStep()}
              
              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <Button
                  onClick={handleBack}
                  variant="outline"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                >
                  Back
                </Button>
                
                 {currentStep < 4 ? (
                  <Button
                    onClick={handleNext}
                    className="gradient-prosperity text-white"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    onClick={handleComplete}
                    className="gradient-prosperity text-white"
                  >
                    Complete Signup
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
