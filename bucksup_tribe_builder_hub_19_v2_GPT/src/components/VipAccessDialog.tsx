
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from 'lucide-react';

interface VipAccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (redirectUrl: string) => void;
  redirectUrl: string;
}

const VipAccessDialog = ({ open, onOpenChange, onSuccess, redirectUrl }: VipAccessDialogProps) => {
  const [showDemoForm, setShowDemoForm] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [demoFormData, setDemoFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const { toast } = useToast();

  const handlePasswordSubmit = () => {
    setPassword('');
    toast({
      title: 'Private access unavailable',
      description: 'This feature requires secure server authorization. You can submit a demo request below.',
      variant: 'destructive',
    });
  };

  const handleDemoSubmit = () => {
    // Simple validation
    if (!demoFormData.name || !demoFormData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name and email address.",
        variant: "destructive",
      });
      return;
    }

    // Simulate form submission
    console.log('Demo request submitted:', demoFormData);
    
    toast({
      title: "Demo Request Submitted",
      description: "Thank you for your interest! We'll contact you soon.",
    });

    // Reset form and close dialog
    setDemoFormData({ name: '', email: '', company: '', message: '' });
    setShowDemoForm(false);
    onOpenChange(false);
  };

  const handleClose = () => {
    setPassword('');
    setShowPassword(false);
    setShowDemoForm(false);
    setDemoFormData({ name: '', email: '', company: '', message: '' });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md bg-orange-200">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            VIP Feature Access
          </DialogTitle>
        </DialogHeader>
        
        {!showDemoForm ? (
          <div className="py-4 space-y-6">
            <p className="text-center text-gray-600">
              Private access is unavailable in this public V2 copy. You can submit a demo request.
            </p>
            
            {/* Password Section */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handlePasswordSubmit()}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <Button 
                onClick={handlePasswordSubmit}
                className="w-full gradient-prosperity"
              >
                Access with Password
              </Button>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-orange-200 px-2 text-gray-500">OR</span>
              </div>
            </div>

            {/* Demo Request Button */}
            <Button 
              onClick={() => setShowDemoForm(true)}
              variant="outline"
              className="w-full"
            >
              Submit Demo Request
            </Button>

            {/* BwFarms Card */}
            <div className="mt-6 p-4 border rounded-lg bg-white/50">
              <h3 className="text-lg font-semibold text-center mb-2">BwFarms</h3>
              <p className="text-sm text-gray-600 text-center">
                Premium farm-to-table solutions and agricultural services
              </p>
            </div>
          </div>
        ) : (
          <div className="py-4 space-y-4">
            <p className="text-center text-gray-600 mb-4">
              Please fill out the form below to request a demo
            </p>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="demo-name">Name *</Label>
                <Input
                  id="demo-name"
                  placeholder="Your full name"
                  value={demoFormData.name}
                  onChange={(e) => setDemoFormData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="demo-email">Email *</Label>
                <Input
                  id="demo-email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={demoFormData.email}
                  onChange={(e) => setDemoFormData(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="demo-company">Company</Label>
                <Input
                  id="demo-company"
                  placeholder="Your company name"
                  value={demoFormData.company}
                  onChange={(e) => setDemoFormData(prev => ({ ...prev, company: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="demo-message">Message</Label>
                <Textarea
                  id="demo-message"
                  placeholder="Tell us about your interest in our VIP features..."
                  value={demoFormData.message}
                  onChange={(e) => setDemoFormData(prev => ({ ...prev, message: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="flex gap-2 pt-2">
                <Button 
                  onClick={() => setShowDemoForm(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Back
                </Button>
                <Button 
                  onClick={handleDemoSubmit}
                  className="flex-1 gradient-prosperity"
                >
                  Submit Request
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default VipAccessDialog;

