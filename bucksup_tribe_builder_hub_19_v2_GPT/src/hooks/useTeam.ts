
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface Team {
  id: string;
  team_id: string;
  team_name: string;
  team_color: string | null;
  team_phone: string | null;
  use_profile_phone: boolean;
  creator_profile_id: string;
  parent_profile_id: string;
  top_team_id: string;
  created_at: string;
  updated_at: string;
}

interface TeamFormData {
  team_name: string;
  team_color: string;
  team_phone: string;
  use_profile_phone: boolean;
}

export const useTeam = () => {
  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { profile } = useAuth();

  const validateTeamName = (name: string): string | null => {
    // Check length (6-25 characters)
    if (name.length < 6 || name.length > 25) {
      return 'Team name must be between 6 and 25 characters';
    }
    
    // Check allowed characters (alphanumeric, spaces, and !,&,#)
    const allowedPattern = /^[a-zA-Z0-9 !&#]+$/;
    if (!allowedPattern.test(name)) {
      return 'Team name can only contain letters, numbers, spaces, and the characters !, &, #';
    }
    
    return null;
  };

  const checkTeamNameUniqueness = async (teamName: string): Promise<boolean> => {
    const { data, error } = await supabase
      .from('teams')
      .select('team_name')
      .eq('team_name', teamName)
      .maybeSingle();

    if (error) {
      console.error('Error checking team name uniqueness:', error);
      return false;
    }

    return data === null; // Returns true if name is unique (no existing team found)
  };

  const fetchTeam = async () => {
    if (!profile?.id) {
      setLoading(false);
      return;
    }

    console.log('Fetching team for user:', profile.id);
    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('teams')
        .select('*')
        .eq('creator_profile_id', profile.id)
        .maybeSingle();

      if (fetchError) {
        console.error('Error fetching team:', fetchError);
        setError(fetchError.message);
      } else {
        console.log('Team fetched:', data);
        setTeam(data);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createTeam = async (teamData: TeamFormData): Promise<boolean> => {
    if (!profile?.id) {
      setError('User not authenticated');
      return false;
    }

    // Validate team name format
    const nameValidationError = validateTeamName(teamData.team_name);
    if (nameValidationError) {
      setError(nameValidationError);
      return false;
    }

    // Check if team name is unique
    const isUnique = await checkTeamNameUniqueness(teamData.team_name);
    if (!isUnique) {
      setError('Team name is not available. Please choose a different name.');
      return false;
    }

    console.log('Creating team:', teamData);
    console.log('Current user profile ID:', profile.id);
    console.log('Current auth user ID:', (await supabase.auth.getUser()).data.user?.id);
    setError(null);

    try {
      // Generate a unique team ID
      const { data: generatedId, error: idError } = await supabase
        .rpc('generate_team_id');

      if (idError) {
        console.error('Error generating team ID:', idError);
        setError(idError.message);
        return false;
      }

      console.log('Generated team ID:', generatedId);

      const teamInsertData = {
        team_id: generatedId,
        team_name: teamData.team_name,
        team_color: teamData.team_color || null,
        team_phone: teamData.use_profile_phone ? null : (teamData.team_phone || null),
        use_profile_phone: teamData.use_profile_phone,
        creator_profile_id: profile.id,
        parent_profile_id: '0000',
        top_team_id: '0000'
      };

      console.log('Team insert data:', teamInsertData);

      const { data, error: createError } = await supabase
        .from('teams')
        .insert([teamInsertData])
        .select('*')
        .single();

      if (createError) {
        console.error('Error creating team:', createError);
        console.error('Detailed error:', JSON.stringify(createError, null, 2));
        setError(createError.message);
        return false;
      }

      console.log('Team created successfully:', data);
      setTeam(data);
      return true;
    } catch (err) {
      console.error('Unexpected error creating team:', err);
      setError('An unexpected error occurred');
      return false;
    }
  };

  const updateTeam = async (teamData: TeamFormData): Promise<boolean> => {
    if (!profile?.id || !team) {
      setError('User not authenticated or no team to update');
      return false;
    }

    // Validate team name format
    const nameValidationError = validateTeamName(teamData.team_name);
    if (nameValidationError) {
      setError(nameValidationError);
      return false;
    }

    // Check if team name is unique (only if name changed)
    if (teamData.team_name !== team.team_name) {
      const isUnique = await checkTeamNameUniqueness(teamData.team_name);
      if (!isUnique) {
        setError('Team name is not available. Please choose a different name.');
        return false;
      }
    }

    console.log('Updating team:', teamData);
    setError(null);

    try {
      const { data, error: updateError } = await supabase
        .from('teams')
        .update({
          team_name: teamData.team_name,
          team_color: teamData.team_color || null,
          team_phone: teamData.use_profile_phone ? null : (teamData.team_phone || null),
          use_profile_phone: teamData.use_profile_phone,
        })
        .eq('id', team.id)
        .select('*')
        .single();

      if (updateError) {
        console.error('Error updating team:', updateError);
        setError(updateError.message);
        return false;
      }

      console.log('Team updated successfully:', data);
      setTeam(data);
      return true;
    } catch (err) {
      console.error('Unexpected error updating team:', err);
      setError('An unexpected error occurred');
      return false;
    }
  };

  useEffect(() => {
    fetchTeam();
  }, [profile?.id]);

  return {
    team,
    loading,
    error,
    createTeam,
    updateTeam,
    refetch: fetchTeam,
    validateTeamName,
  };
};

