import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useOnboarding } from '@/contexts/OnboardingContext';
import phoneIcon from "@/assets/phoneicon.jpg";

export default function VipInvite() {
  const location = useLocation();
  const navigate = useNavigate();
  const { referrer } = location.state || {};
  const { updateData } = useOnboarding();
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Save data to onboarding context
    updateData({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      referrerId: referrer?.id,
      referrerData: referrer
    });

    toast.success('Information saved! Continue with your journey.');
    // Navigate to onboarding sequence
    navigate('/start/page1-intro');
    setLoading(false);
  };

  if (!referrer) {
    navigate('/vip/maint');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <img src={phoneIcon} alt="BucksUp Phone Icon" className="w-20 h-20 mx-auto" />
          
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Welcome to the Revolutionary{' '}
            <span className="block sm:inline">Financial Power of</span>{' '}
            <span className="text-prosperity-600 block mt-2">BucksUp</span>
          </h1>
          
          <p className="text-lg text-muted-foreground">
            You've been personally invited by{' '}
            <span className="font-semibold text-foreground">
              {referrer.first_name} {referrer.last_name}
            </span>
            {' '}to join their exclusive BucksUp tribe
          </p>
        </div>

        {/* Video Section */}
        <div className="bg-card rounded-lg p-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Watch This Exclusive Introduction</h3>
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Video Player Placeholder</p>
          </div>
        </div>

        {/* Information Collection Form */}
        <div className="bg-card rounded-lg p-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Let's Get Started</h3>
          <form onSubmit={handleContinue} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                required
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Saving...' : 'Continue Your Journey'}
            </Button>
          </form>
        </div>

        <div className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <button 
            onClick={() => navigate('/auth')}
            className="text-primary hover:underline"
          >
            Sign in here
          </button>
        </div>
      </div>
    </div>
  );
}
