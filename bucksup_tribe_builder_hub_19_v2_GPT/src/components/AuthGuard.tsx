
import React, { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isSignedIn, isLoaded, user } = useUser();
  const { getLastRoute, restoreUserSession } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  console.log('AuthGuard - isLoaded:', isLoaded, 'isSignedIn:', isSignedIn, 'user:', user?.id);

  // Redirect authenticated users to their last visited page
  useEffect(() => {
    if (isSignedIn && isLoaded && user) {
      const lastRoute = getLastRoute();
      const currentPath = location.pathname;
      
      // If user is on auth page and they're already signed in, redirect to last route
      if (currentPath === '/auth' && lastRoute !== currentPath) {
        console.log('AuthGuard - Redirecting authenticated user to last route:', lastRoute);
        navigate(lastRoute, { replace: true });
      }
    }
  }, [isSignedIn, isLoaded, user, navigate, getLastRoute]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    // Check if user has a persisted session before redirecting
    const hasPersistedSession = restoreUserSession();
    
    if (!hasPersistedSession) {
      console.log('AuthGuard - User not signed in, redirecting to /auth');
      return <Navigate to="/auth" replace />;
    }
    
    // If we have a persisted session but Clerk hasn't loaded yet, show loading
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Restoring session...</p>
        </div>
      </div>
    );
  }

  console.log('AuthGuard - User authenticated, rendering children');
  return <>{children}</>;
};

export default AuthGuard;

