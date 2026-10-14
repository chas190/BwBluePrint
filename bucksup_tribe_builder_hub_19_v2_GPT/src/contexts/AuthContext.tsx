import React, { createContext, useContext, useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';

interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  username: string | null;
  phone_number: string | null;
  avatar_url: string | null;
  bio: string | null;
  location: string | null;
  phone_verified: boolean;
  two_factor_enabled: boolean;
  last_sign_in: string | null;
  membership_type: 'member' | 'founder' | null;
  parent_profile_id: string;
  created_at: string;
  updated_at: string;
}

interface UserVisit {
  id: string;
  user_id: string | null;
  first_visit: string;
  last_visit: string;
  visit_count: number;
  email: string | null;
  phone: string | null;
  city: string | null;
  state: string | null;
  zipcode: string | null;
  county: string | null;
}

interface AuthContextType {
  profile: Profile | null;
  userVisit: UserVisit | null;
  loading: boolean;
  error: string | null;
  updateProfile: (updates: Partial<Profile>) => Promise<Profile | null>;
  refetchProfile: () => Promise<void>;
  trackVisit: () => Promise<void>;
  getLastRoute: () => string;
  setLastRoute: (route: string) => void;
  restoreUserSession: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoaded } = useUser();
  const location = useLocation();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [userVisit, setUserVisit] = useState<UserVisit | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Get or create user visit record
  const getOrCreateUserVisit = async (userId?: string): Promise<UserVisit | null> => {
    try {
      // First try to get existing visit record by user ID or from localStorage
      const storedVisitId = localStorage.getItem('bucksup_visit_id');
      let existingVisit = null;

      if (userId) {
        // Try to find by user ID first
        const { data: userVisitData } = await supabase
          .from('user_visits')
          .select('*')
          .eq('user_id', userId)
          .maybeSingle();
        
        existingVisit = userVisitData;
      } else if (storedVisitId) {
        // Try to find by stored visit ID
        const { data: visitData } = await supabase
          .from('user_visits')
          .select('*')
          .eq('id', storedVisitId)
          .maybeSingle();
        
        existingVisit = visitData;
      }

      if (existingVisit) {
        // Update existing visit
        const { data: updatedVisit, error } = await supabase
          .from('user_visits')
          .update({
            last_visit: new Date().toISOString(),
            visit_count: existingVisit.visit_count + 1,
            user_id: userId || existingVisit.user_id
          })
          .eq('id', existingVisit.id)
          .select()
          .single();

        if (error) throw error;
        
        // Store visit ID in localStorage
        localStorage.setItem('bucksup_visit_id', updatedVisit.id);
        return updatedVisit;
      } else {
        // Create new visit record
        const { data: newVisit, error } = await supabase
          .from('user_visits')
          .insert({
            user_id: userId || null,
            first_visit: new Date().toISOString(),
            last_visit: new Date().toISOString(),
            visit_count: 1
          })
          .select()
          .single();

        if (error) throw error;
        
        // Store visit ID in localStorage
        localStorage.setItem('bucksup_visit_id', newVisit.id);
        return newVisit;
      }
    } catch (error) {
      console.error('Error managing user visit:', error);
      return null;
    }
  };

  const trackVisit = async () => {
    const visit = await getOrCreateUserVisit(user?.id);
    setUserVisit(visit);
  };

  const createOrUpdateProfile = async (clerkUser: any): Promise<Profile | null> => {
    console.log('AuthContext: Creating/updating profile for user:', clerkUser.id);
    
    try {
      // Check if profile exists by Clerk user ID
      const { data: existingProfile, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', clerkUser.id)
        .maybeSingle();

      if (fetchError && fetchError.code !== 'PGRST116') {
        console.error('AuthContext: Error fetching profile:', fetchError);
        throw fetchError;
      }

      // Get membership type and referral data from Clerk metadata
      const membershipTypeFromClerk = clerkUser.publicMetadata?.membershipType || clerkUser.unsafeMetadata?.membershipType;
      const referralCodeFromClerk = clerkUser.unsafeMetadata?.referralCode;
      const membershipTypeFromStorage = localStorage.getItem('selectedMembershipType');
      
      // Determine membership type and parent profile ID
      const membershipType = membershipTypeFromClerk || membershipTypeFromStorage || 'founder';
      const parentProfileId = referralCodeFromClerk || 'main4041';

      // Clear the localStorage value after using it
      if (membershipTypeFromStorage) {
        localStorage.removeItem('selectedMembershipType');
      }

      if (existingProfile) {
        console.log('AuthContext: Found existing profile, updating last sign in');
        
        // Update last sign in time and other fields that might have changed
        const { data: updatedProfile, error: updateError } = await supabase
          .from('profiles')
          .update({ 
            last_sign_in: new Date().toISOString(),
            first_name: clerkUser.firstName || existingProfile.first_name,
            last_name: clerkUser.lastName || existingProfile.last_name,
            email: clerkUser.primaryEmailAddress?.emailAddress || existingProfile.email,
            avatar_url: clerkUser.imageUrl || existingProfile.avatar_url,
            phone_number: clerkUser.primaryPhoneNumber?.phoneNumber || existingProfile.phone_number,
            phone_verified: clerkUser.primaryPhoneNumber?.verification?.status === 'verified',
            two_factor_enabled: clerkUser.twoFactorEnabled || false,
            // Only update membership_type if it's not already set or if we have a new value from Clerk
            membership_type: membershipTypeFromClerk || existingProfile.membership_type,
          })
          .eq('id', clerkUser.id)
          .select()
          .single();

        if (updateError) {
          console.error('AuthContext: Error updating profile:', updateError);
          throw updateError;
        }

        return updatedProfile;
      } else {
        console.log('AuthContext: Creating new profile');
        
        // Create new profile
        const newProfile = {
          id: clerkUser.id,
          first_name: clerkUser.firstName || '',
          last_name: clerkUser.lastName || '',
          email: clerkUser.primaryEmailAddress?.emailAddress || '',
          username: clerkUser.username || clerkUser.firstName || 'user',
          phone_number: clerkUser.primaryPhoneNumber?.phoneNumber || null,
          avatar_url: clerkUser.imageUrl || null,
          bio: null,
          location: null,
          phone_verified: clerkUser.primaryPhoneNumber?.verification?.status === 'verified' || false,
          two_factor_enabled: clerkUser.twoFactorEnabled || false,
          last_sign_in: new Date().toISOString(),
          membership_type: membershipType,
          parent_profile_id: parentProfileId, // Use referral code from Clerk metadata
        };

        const { data: createdProfile, error: createError } = await supabase
          .from('profiles')
          .insert(newProfile)
          .select()
          .single();

        if (createError) {
          console.error('AuthContext: Error creating profile:', createError);
          throw createError;
        }

        console.log('AuthContext: Successfully created profile:', createdProfile);
        return createdProfile;
      }
    } catch (error) {
      console.error('AuthContext: Error in createOrUpdateProfile:', error);
      throw error;
    }
  };

  const updateProfile = async (updates: Partial<Profile>): Promise<Profile | null> => {
    if (!user || !profile) {
      console.log('AuthContext: No user or profile available for update');
      return null;
    }

    try {
      console.log('AuthContext: Updating profile with:', updates);
      
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        console.error('AuthContext: Error updating profile:', error);
        toast({
          title: "Update Failed",
          description: "Failed to update profile. Please try again.",
          variant: "destructive"
        });
        return null;
      }

      console.log('AuthContext: Profile updated successfully:', data);
      setProfile(data);
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
      return data;
    } catch (error) {
      console.error('AuthContext: Unexpected error updating profile:', error);
      toast({
        title: "Update Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
      return null;
    }
  };

  const refetchProfile = async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const profile = await createOrUpdateProfile(user);
      setProfile(profile);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to sync profile';
      setError(errorMessage);
      toast({
        title: "Profile Sync Failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Track visit for anonymous users on component mount
  useEffect(() => {
    trackVisit();
  }, []);

  // Route tracking and persistence functions
  const getLastRoute = () => {
    return Cookies.get('bucksup_last_route') || '/main';
  };

  const setLastRoute = (route: string) => {
    if (route !== '/auth' && route !== '/') {
      Cookies.set('bucksup_last_route', route, { expires: 30 });
    }
  };

  const restoreUserSession = (): boolean => {
    const isAuthenticated = Cookies.get('user_authenticated') === 'true';
    const userId = Cookies.get('clerk_user_id');
    return isAuthenticated && !!userId;
  };

  // Track current route changes
  useEffect(() => {
    if (user && location.pathname !== '/auth' && location.pathname !== '/') {
      setLastRoute(location.pathname);
    }
  }, [location.pathname, user]);

  // Save/restore user session state to cookies for persistence
  useEffect(() => {
    if (user && isLoaded) {
      // Save user session data to cookies (expires in 30 days)
      Cookies.set('clerk_user_id', user.id, { expires: 30 });
      Cookies.set('clerk_user_email', user.primaryEmailAddress?.emailAddress || '', { expires: 30 });
      Cookies.set('clerk_user_name', `${user.firstName || ''} ${user.lastName || ''}`.trim(), { expires: 30 });
      Cookies.set('user_authenticated', 'true', { expires: 30 });
      
      // Save current route
      if (location.pathname !== '/auth' && location.pathname !== '/') {
        setLastRoute(location.pathname);
      }
    } else if (isLoaded && !user) {
      // Clear cookies when user logs out
      Cookies.remove('clerk_user_id');
      Cookies.remove('clerk_user_email');
      Cookies.remove('clerk_user_name');
      Cookies.remove('user_authenticated');
      // Keep last route for potential return visits
    }
  }, [user, isLoaded, location.pathname]);

  useEffect(() => {
    console.log('AuthContext: Effect triggered - isLoaded:', isLoaded, 'user:', !!user);
    
    if (!isLoaded) {
      console.log('AuthContext: Clerk not loaded yet');
      return;
    }

    if (!user) {
      console.log('AuthContext: No user found, clearing profile but keeping visit tracking');
      setProfile(null);
      setLoading(false);
      setError(null);
      return;
    }

    console.log('AuthContext: User found, syncing profile and updating visit');
    
    const syncProfile = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const syncedProfile = await createOrUpdateProfile(user);
        setProfile(syncedProfile);
        
        // Update visit record with user ID
        await trackVisit();
        
        if (syncedProfile) {
          console.log('AuthContext: Profile synced successfully');
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to sync profile';
        console.error('AuthContext: Profile sync failed:', errorMessage);
        setError(errorMessage);
        
        toast({
          title: "Profile Sync Failed",
          description: "We couldn't sync your profile. Please try refreshing the page.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    syncProfile();
  }, [user, isLoaded, toast]);

  const value: AuthContextType = {
    profile,
    userVisit,
    loading,
    error,
    updateProfile,
    refetchProfile,
    trackVisit,
    getLastRoute,
    setLastRoute,
    restoreUserSession,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

