import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@clerk/clerk-react';
import VipLookupPopup from '@/components/VipLookupPopup';
import phoneIcon from "@/assets/phoneicon.jpg";

export default function VipMaint() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();
  const { lookupParameter } = location.state || {};
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [showLookupPopup, setShowLookupPopup] = useState(false);

  const performLookup = async (email?: string, phone?: string, firstName?: string, lastName?: string) => {
    try {
      // Try email lookup first if available and not "na"
      if (email && email.toLowerCase() !== 'na') {
        const { data } = await supabase
          .from('profiles')
          .select('id, first_name, last_name, email, phone_number')
          .eq('email', email);
        if (data && data.length > 0) return data[0];
      }

      // Try phone lookup if available and not "na"
      if (phone && phone.toLowerCase() !== 'na') {
        const { data } = await supabase
          .from('profiles')
          .select('id, first_name, last_name, email, phone_number')
          .eq('phone_number', phone);
        if (data && data.length > 0) return data[0];
      }

      // Try name lookup if available and not "na"
      if ((firstName && firstName.toLowerCase() !== 'na') || (lastName && lastName.toLowerCase() !== 'na')) {
        let query = supabase.from('profiles').select('id, first_name, last_name, email, phone_number');
        
        if (firstName && firstName.toLowerCase() !== 'na') {
          query = query.ilike('first_name', `%${firstName}%`);
        }
        if (lastName && lastName.toLowerCase() !== 'na') {
          query = query.ilike('last_name', `%${lastName}%`);
        }
        
        const { data } = await query;
        if (data && data.length > 0) return data[0];
      }

      return null;
    } catch (error) {
      console.error('Lookup error:', error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Check if user is already signed up
      if (user) {
        setShowLookupPopup(true);
        setLoading(false);
        return;
      }

      // Perform enhanced lookup with fallback strategy
      const foundProfile = await performLookup(
        formData.email,
        formData.phone,
        formData.firstName,
        formData.lastName
      );

      if (foundProfile) {
        // Found a profile - redirect to invite page
        navigate('/vip/invite', { 
          state: { 
            referrer: foundProfile,
            lookupParameter: lookupParameter 
          } 
        });
        return;
      }

      // No profile found - store in lookupfail table
      const lookupData = {
        user_id: user?.id || null,
        original_lookup_parameter: lookupParameter,
        first_name: formData.firstName.toLowerCase() !== 'na' ? formData.firstName : null,
        last_name: formData.lastName.toLowerCase() !== 'na' ? formData.lastName : null,
        email: formData.email.toLowerCase() !== 'na' ? formData.email : null,
        phone_number: formData.phone.toLowerCase() !== 'na' ? formData.phone : null,
        message: formData.message
      };

      const { error: insertError } = await supabase
        .from('lookupfail')
        .insert(lookupData);

      if (insertError) {
        console.error('Error storing lookup failure:', insertError);
      }

      toast.success('Thank you! An email or text will be sent to help locate your BucksUp referring member.');
      
      // Navigate to onboarding sequence
      setTimeout(() => {
        navigate('/start/page1-intro');
      }, 2000);
      
    } catch (error) {
      console.error('Submit error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <img src={phoneIcon} alt="BucksUp Phone Icon" className="w-20 h-20 mx-auto" />
          
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Member Not Found
          </h1>
          
          <p className="text-lg text-muted-foreground">
            We couldn't find a BucksUp member with that information, but don't worry!
          </p>
          
          <p className="text-md text-foreground">
            If you know the first or last name of your referring partner, 
            enter it below and we'll help track them down to get you properly set up.
          </p>
        </div>

        {/* Video Section */}
        <div className="bg-card rounded-lg p-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Learn About BucksUp</h3>
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Introductory Video Placeholder</p>
          </div>
        </div>

        {/* Lead Capture Form */}
        <div className="bg-card rounded-lg p-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Help Us Connect You</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">Your First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Your Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="email">Your Email (if not sure enter "na")</Label>
              <Input
                id="email"
                type="text"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Enter email or 'na'"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Your Phone Number (if not sure enter "na")</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="Enter phone or 'na'"
              />
            </div>
            
            <div>
              <Label htmlFor="message">Referring Partner Info (First/Last name, how you know them, etc.)</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Tell us about your referring partner so we can help connect you..."
                rows={3}
                required
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Submitting...' : 'Get Me Connected'}
            </Button>
          </form>
        </div>

        <div className="text-sm text-muted-foreground">
          Want to explore BucksUp on your own?{' '}
          <button 
            onClick={() => navigate('/start')}
            className="text-primary hover:underline"
          >
            Start here
          </button>
        </div>
      </div>
      
      <VipLookupPopup 
        isOpen={showLookupPopup} 
        onClose={() => setShowLookupPopup(false)} 
      />
    </div>
  );
}
