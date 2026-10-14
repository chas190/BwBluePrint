
import { useAuth } from '@/contexts/AuthContext';

// This hook now simply wraps the AuthContext for backward compatibility
// and provides a cleaner API for components that only need profile data
export const useProfile = () => {
  const { profile, loading, error, updateProfile, refetchProfile } = useAuth();

  return {
    profile,
    loading,
    error,
    updateProfile,
    refetch: refetchProfile,
  };
};

