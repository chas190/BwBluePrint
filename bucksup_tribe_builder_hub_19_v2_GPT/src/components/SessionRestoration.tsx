import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { useAuth } from '@/contexts/AuthContext';
import Cookies from 'js-cookie';

interface SessionRestorationProps {
  children: React.ReactNode;
}

const SessionRestoration: React.FC<SessionRestorationProps> = ({ children }) => {
  const { isLoaded, isSignedIn } = useUser();
  const { getLastRoute } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [hasRestoredSession, setHasRestoredSession] = useState(false);

  useEffect(() => {
    if (isLoaded && !hasRestoredSession) {
      const isAuthenticated = Cookies.get('user_authenticated') === 'true';
      const currentPath = location.pathname;

      // If user is authenticated and on auth page, redirect to last route
      if (isSignedIn && currentPath === '/auth') {
        const lastRoute = getLastRoute();
        console.log('SessionRestoration - Redirecting authenticated user from auth page to:', lastRoute);
        navigate(lastRoute, { replace: true });
      }
      // If user has persisted auth state but Clerk hasn't restored session yet
      else if (isAuthenticated && !isSignedIn && currentPath !== '/auth') {
        console.log('SessionRestoration - User has persisted session, waiting for Clerk...');
        // Wait a bit for Clerk to restore session, then redirect if needed
        setTimeout(() => {
          if (!isSignedIn) {
            console.log('SessionRestoration - Clerk session not restored, redirecting to auth');
            navigate('/auth', { replace: true });
          }
        }, 2000);
      }
      // If user is on root and authenticated, redirect to last route
      else if (isSignedIn && currentPath === '/') {
        const lastRoute = getLastRoute();
        console.log('SessionRestoration - Redirecting from root to last route:', lastRoute);
        navigate(lastRoute, { replace: true });
      }

      setHasRestoredSession(true);
    }
  }, [isLoaded, isSignedIn, location.pathname, navigate, getLastRoute, hasRestoredSession]);

  return <>{children}</>;
};

export default SessionRestoration;
