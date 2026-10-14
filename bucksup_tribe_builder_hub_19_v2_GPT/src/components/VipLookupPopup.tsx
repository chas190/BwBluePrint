import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useUser } from '@clerk/clerk-react';

interface VipLookupPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VipLookupPopup({ isOpen, onClose }: VipLookupPopupProps) {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    email: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email && !formData.phone) {
      toast.error('Please enter either email or phone number');
      return;
    }

    setLoading(true);

    try {
      // Try lookup with provided email or phone
      let query = supabase.from('profiles').select('id, first_name, last_name, email, phone_number');
      
      if (formData.email && formData.email.toLowerCase() !== 'na') {
        query = query.eq('email', formData.email);
      } else if (formData.phone && formData.phone.toLowerCase() !== 'na') {
        query = query.eq('phone_number', formData.phone);
      }

      const { data: profiles, error } = await query;

      if (error) {
        console.error('Error looking up user:', error);
        toast.error('Error during lookup');
        return;
      }

      if (profiles && profiles.length > 0) {
        toast.success(`Found referring partner: ${profiles[0].first_name} ${profiles[0].last_name}`);
        onClose();
        return;
      }

      // No profile found - store in lookupfail table
      const { error: insertError } = await supabase
        .from('lookupfail')
        .insert({
          user_id: user?.id,
          email: formData.email.toLowerCase() !== 'na' ? formData.email : null,
          phone_number: formData.phone.toLowerCase() !== 'na' ? formData.phone : null,
          message: 'Popup lookup - no profile found'
        });

      if (insertError) {
        console.error('Error storing lookup failure:', insertError);
      }

      toast.info('No referring partner found. An email or text will be sent to help locate your BucksUp referring member.');
      onClose();

    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Find Your Referring Partner</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleLookup} className="space-y-4">
          <div>
            <Label htmlFor="email">Email (if not sure enter "na")</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="Enter email or 'na'"
            />
          </div>
          
          <div>
            <Label htmlFor="phone">Phone Number (if not sure enter "na")</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="Enter phone or 'na'"
            />
          </div>
          
          <div className="flex gap-2">
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading ? 'Looking up...' : 'Find Partner'}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
