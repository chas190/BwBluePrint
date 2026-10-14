import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export default function VipIndex() {
  const { parameter } = useParams<{ parameter: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [displayText, setDisplayText] = useState<string>('');

  useEffect(() => {
    const handleVipLookup = async () => {
      // Check for hidden post data from tribe-welcome redirects
      if (location.state?.displayText) {
        setDisplayText(location.state.displayText);
        setLoading(false);
        return;
      }

      if (!parameter) {
        navigate('/vip/maint');
        return;
      }

      // Check if it's a static page first (you can add more static routes here)
      const staticPages = ['about', 'help', 'contact'];
      if (staticPages.includes(parameter.toLowerCase())) {
        // Route to static page (implement if needed)
        navigate('/');
        return;
      }

      // Determine if parameter is phone (numeric) or email (contains @)
      const isEmail = parameter.includes('@');
      const isPhone = /^\d+$/.test(parameter);

      if (!isEmail && !isPhone) {
        navigate('/vip/maint');
        return;
      }

      try {
        let query = supabase
          .from('profiles')
          .select('id, first_name, last_name, email, phone_number');

        if (isEmail) {
          query = query.eq('email', parameter);
        } else if (isPhone) {
          query = query.eq('phone_number', parameter);
        }

        const { data: profiles, error } = await query;

        if (error) {
          console.error('Error looking up user:', error);
          toast.error('Error looking up referral');
          navigate('/vip/maint');
          return;
        }

        if (profiles && profiles.length > 0) {
          // User found - go to invite page with user data
          navigate('/vip/invite', { 
            state: { 
              referrer: profiles[0],
              lookupParameter: parameter 
            } 
          });
        } else {
          // User not found - go to maintenance page
          navigate('/vip/maint', { 
            state: { 
              lookupParameter: parameter 
            } 
          });
        }
      } catch (error) {
        console.error('Unexpected error:', error);
        navigate('/vip/maint');
      } finally {
        setLoading(false);
      }
    };

    handleVipLookup();
  }, [parameter, navigate, location.state]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-lg font-medium">Looking up your referral...</p>
        </div>
      </div>
    );
  }

  // Display page with pasted text if redirected from tribe-welcome
  if (displayText) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Team Lookup Results
            </h1>
            
            <p className="text-lg text-muted-foreground">
              Search parameter processed:
            </p>
            
            <div className="bg-card rounded-lg p-6 shadow-lg border-2 border-muted">
              <p className="text-2xl font-mono text-primary font-bold">
                {displayText}
              </p>
            </div>
            
            <p className="text-md text-foreground">
              We're working on connecting you with the right team. 
              In the meantime, you can explore BucksUp!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/vip/maint')}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
            >
              Try Different Lookup
            </button>
            <button 
              onClick={() => navigate('/start')}
              className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90"
            >
              Explore BucksUp
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
