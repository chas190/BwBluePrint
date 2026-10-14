
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Edit, Save, X, Users, Phone, Palette, Hash, RefreshCw, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTeam } from '@/hooks/useTeam';
import { useAuth } from '@/contexts/AuthContext';

interface TeamFormData {
  team_name: string;
  team_color: string;
  team_phone: string;
  use_profile_phone: boolean;
}

const MyTribeTab = () => {
  const { team, loading, error, createTeam, updateTeam, refetch } = useTeam();
  const { profile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<TeamFormData>({
    team_name: '',
    team_color: '#3B82F6',
    team_phone: '',
    use_profile_phone: false,
  });
  const { toast } = useToast();

  console.log('MyTribeTab render:', { team, loading, error, isEditing, isCreating });

  const handleEdit = () => {
    if (!team) return;
    setFormData({
      team_name: team.team_name,
      team_color: team.team_color || '#3B82F6',
      team_phone: team.team_phone || '',
      use_profile_phone: team.use_profile_phone || false,
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    const result = await updateTeam(formData);
    if (result) {
      setIsEditing(false);
      toast({
        title: "Team Updated",
        description: "Your team information has been successfully updated."
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to update team. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleCreate = async () => {
    if (!formData.team_name.trim()) {
      toast({
        title: "Error",
        description: "Team name is required.",
        variant: "destructive"
      });
      return;
    }

    const result = await createTeam(formData);
    if (result) {
      setIsCreating(false);
      setFormData({ team_name: '', team_color: '#3B82F6', team_phone: '', use_profile_phone: false });
      toast({
        title: "Team Created",
        description: "Your team has been successfully created."
      });
    } else {
      toast({
        title: "Error",
        description: error || "Failed to create team. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleCancel = () => {
    setFormData({ team_name: '', team_color: '#3B82F6', team_phone: '', use_profile_phone: false });
    setIsEditing(false);
    setIsCreating(false);
  };

  const handleInputChange = (field: keyof TeamFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRefresh = () => {
    console.log('Manual refresh triggered for team');
    refetch();
  };

  const getDisplayPhone = () => {
    if (team?.use_profile_phone && profile?.phone_number) {
      return profile.phone_number;
    }
    return team?.team_phone || 'Not provided';
  };

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading team information...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error && !team) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center max-w-md">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Team</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={handleRefresh}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  // Show create team form if no team exists
  if (!team && !isCreating) {
    return (
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center">
            <Users className="w-6 h-6 mr-2" />
            Create Your Tribe
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">You haven't created a team yet. Start building your tribe!</p>
          <Button onClick={() => setIsCreating(true)} className="w-full max-w-sm mx-auto">
            <Users className="w-4 h-4 mr-2" />
            Create Team
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Show create team form
  if (isCreating) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Create Your Team</CardTitle>
          <div className="flex gap-2">
            <Button onClick={handleCreate} size="sm">
              <Save className="w-4 h-4 mr-2" />
              Create
            </Button>
            <Button onClick={handleCancel} variant="outline" size="sm">
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="teamName">Team Name *</Label>
            <p className="text-sm text-gray-500 mb-2">6-25 characters. Letters, numbers, spaces, and !, &, # only.</p>
            <Input
              id="teamName"
              placeholder="Enter your team name"
              value={formData.team_name}
              onChange={(e) => handleInputChange('team_name', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="teamColor">Team Color</Label>
            <div className="flex items-center gap-3 pt-2">
              <input
                type="color"
                id="teamColor"
                value={formData.team_color}
                onChange={(e) => handleInputChange('team_color', e.target.value)}
                className="w-12 h-8 rounded border border-gray-300 cursor-pointer"
              />
              <Input
                value={formData.team_color}
                onChange={(e) => handleInputChange('team_color', e.target.value)}
                placeholder="#3B82F6"
                className="flex-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="teamPhone">Team Phone</Label>
            <div className="space-y-3">
              <div className="flex items-center gap-3 pt-2">
                <Input
                  id="teamPhone"
                  placeholder="Enter team phone number"
                  value={formData.team_phone}
                  onChange={(e) => handleInputChange('team_phone', e.target.value)}
                  disabled={formData.use_profile_phone}
                  className={formData.use_profile_phone ? 'bg-gray-100' : ''}
                />
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="useProfilePhone"
                    checked={formData.use_profile_phone}
                    onCheckedChange={(checked) => handleInputChange('use_profile_phone', !!checked)}
                  />
                  <Label htmlFor="useProfilePhone" className="text-sm whitespace-nowrap">
                    Use My Profile Phone
                  </Label>
                </div>
              </div>
              {formData.use_profile_phone && profile?.phone_number && (
                <p className="text-sm text-gray-600">Using: {profile.phone_number}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Show team information
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>My Tribe Information</CardTitle>
        {!isEditing ? (
          <Button onClick={handleEdit} variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button onClick={handleSave} size="sm">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button onClick={handleCancel} variant="outline" size="sm">
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="teamName">Team Name</Label>
          {isEditing ? (
            <div>
              <p className="text-sm text-gray-500 mb-2">6-25 characters. Letters, numbers, spaces, and !, &, # only.</p>
              <Input
                id="teamName"
                value={formData.team_name}
                onChange={(e) => handleInputChange('team_name', e.target.value)}
              />
            </div>
          ) : (
            <div className="flex items-center pt-2">
              <Users className="w-4 h-4 mr-2 text-gray-400" />
              <span className="font-medium">{team.team_name}</span>
            </div>
          )}
        </div>

        <div>
          <Label htmlFor="teamId">Team ID</Label>
          <div className="flex items-center pt-2">
            <Hash className="w-4 h-4 mr-2 text-gray-400" />
            <span className="font-mono bg-gray-100 px-2 py-1 rounded">{team.team_id}</span>
          </div>
        </div>

        <div>
          <Label htmlFor="teamColor">Team Color</Label>
          {isEditing ? (
            <div className="flex items-center gap-3 pt-2">
              <input
                type="color"
                id="teamColor"
                value={formData.team_color}
                onChange={(e) => handleInputChange('team_color', e.target.value)}
                className="w-12 h-8 rounded border border-gray-300 cursor-pointer"
              />
              <Input
                value={formData.team_color}
                onChange={(e) => handleInputChange('team_color', e.target.value)}
                className="flex-1"
              />
            </div>
          ) : (
            <div className="flex items-center pt-2">
              <Palette className="w-4 h-4 mr-2 text-gray-400" />
              <div className="flex items-center gap-2">
                <div 
                  className="w-6 h-6 rounded border border-gray-300"
                  style={{ backgroundColor: team.team_color || '#3B82F6' }}
                ></div>
                <span>{team.team_color || '#3B82F6'}</span>
              </div>
            </div>
          )}
        </div>

        <div>
          <Label htmlFor="teamPhone">Team Phone</Label>
          {isEditing ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 pt-2">
                <Input
                  id="teamPhone"
                  value={formData.team_phone}
                  onChange={(e) => handleInputChange('team_phone', e.target.value)}
                  disabled={formData.use_profile_phone}
                  className={formData.use_profile_phone ? 'bg-gray-100' : ''}
                />
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="useProfilePhone"
                    checked={formData.use_profile_phone}
                    onCheckedChange={(checked) => handleInputChange('use_profile_phone', !!checked)}
                  />
                  <Label htmlFor="useProfilePhone" className="text-sm whitespace-nowrap">
                    Use My Profile Phone
                  </Label>
                </div>
              </div>
              {formData.use_profile_phone && profile?.phone_number && (
                <p className="text-sm text-gray-600">Using: {profile.phone_number}</p>
              )}
            </div>
          ) : (
            <div className="flex items-center pt-2">
              <Phone className="w-4 h-4 mr-2 text-gray-400" />
              <span>{getDisplayPhone()}</span>
              {team.use_profile_phone && (
                <span className="ml-2 text-sm text-gray-500">(from profile)</span>
              )}
            </div>
          )}
        </div>

        <div className="pt-4 border-t">
          <div className="text-sm text-gray-600">
            <p>Team created: {new Date(team.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MyTribeTab;

