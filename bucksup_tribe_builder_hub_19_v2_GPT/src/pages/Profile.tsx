import React, { useState } from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { User, Mail, Phone, MapPin, Edit, Settings, Save, X, Shield, Calendar, Globe, Smartphone, LogOut, AlertCircle, RefreshCw, Users } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { useToast } from '@/hooks/use-toast';
import { useProfile } from '@/hooks/useProfile';
import MyTribeTab from '@/components/MyTribeTab';

interface ProfileFormData {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone_number: string;
  location: string;
  bio: string;
}

const Profile = () => {
  const { user, isLoaded: userLoaded } = useUser();
  const { signOut } = useClerk();
  const { profile, loading: profileLoading, error, updateProfile, refetch } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState<ProfileFormData>({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    phone_number: '',
    location: '',
    bio: '',
  });
  const { toast } = useToast();

  console.log('Profile component render:', {
    userLoaded,
    userExists: !!user,
    userEmail: user?.primaryEmailAddress?.emailAddress,
    profileLoading,
    profileExists: !!profile,
    error
  });

  // Mock session data for demonstration
  const sessionData = [
    { id: '1', device: 'Chrome on Windows', location: 'New York, NY', lastActive: new Date().toISOString(), current: true },
    { id: '2', device: 'Mobile App', location: 'New York, NY', lastActive: new Date(Date.now() - 86400000).toISOString(), current: false },
  ];

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleEdit = () => {
    if (!profile) return;
    setTempData({
      first_name: profile.first_name || '',
      last_name: profile.last_name || '',
      username: profile.username || '',
      email: profile.email || '',
      phone_number: profile.phone_number || '',
      location: profile.location || '',
      bio: profile.bio || '',
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!profile) return;
    
    const result = await updateProfile(tempData);
    if (result) {
      setIsEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated."
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleCancel = () => {
    setTempData({
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      phone_number: '',
      location: '',
      bio: '',
    });
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof ProfileFormData, value: string) => {
    setTempData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignOut = () => {
    signOut();
  };

  const handleRefresh = () => {
    console.log('Manual refresh triggered');
    refetch();
  };

  // Show loading state while Clerk is initializing
  if (!userLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading authentication...</p>
        </div>
      </div>
    );
  }

  // Show error state if there's an authentication issue
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Authentication Error</h2>
          <p className="text-gray-600 mb-4">Unable to load user data. Please try signing in again.</p>
          <Button onClick={() => window.location.href = `${import.meta.env.BASE_URL}auth`}>
            Go to Sign In
          </Button>
        </div>
      </div>
    );
  }

  // Show error state for profile loading issues
  if (error && !profileLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <Navigation />
        <div className="pt-20 pb-8 px-4 flex items-center justify-center">
          <div className="text-center max-w-md">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Error</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Debug info:</p>
              <p className="text-xs text-gray-400">User ID: {user.id}</p>
              <p className="text-xs text-gray-400">Email: {user.primaryEmailAddress?.emailAddress}</p>
            </div>
            <div className="mt-6 space-x-2">
              <Button onClick={handleRefresh}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Retry
              </Button>
              <Button variant="outline" onClick={() => window.location.reload()}>
                Reload Page
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show loading state for profile data
  if (profileLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <Navigation />
        <div className="pt-20 pb-8 px-4 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading profile...</p>
            <p className="mt-2 text-sm text-gray-500">User: {user.primaryEmailAddress?.emailAddress}</p>
          </div>
        </div>
      </div>
    );
  }

  // Show fallback if profile is still null after loading
  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <Navigation />
        <div className="pt-20 pb-8 px-4 flex items-center justify-center">
          <div className="text-center max-w-md">
            <AlertCircle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Not Found</h2>
            <p className="text-gray-600 mb-4">We couldn't find your profile. Let's try to create one.</p>
            <div className="space-y-2 mb-6">
              <p className="text-sm text-gray-500">Debug info:</p>
              <p className="text-xs text-gray-400">User ID: {user.id}</p>
              <p className="text-xs text-gray-400">Email: {user.primaryEmailAddress?.emailAddress}</p>
            </div>
            <Button onClick={handleRefresh}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Create Profile
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Navigation />
      
      <div className="pt-20 pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
            <p className="text-gray-600">Manage your account information, security settings, and active sessions</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Profile Picture and Basic Info */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6 text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={user?.imageUrl} />
                    <AvatarFallback className="text-xl">
                      {profile.first_name?.[0]}{profile.last_name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-bold mb-1">
                    {profile.first_name} {profile.last_name}
                  </h3>
                  <p className="text-gray-600 mb-2">@{profile.username}</p>
                  <p className="text-gray-600 mb-4">{profile.email}</p>
                  
                  {/* Account Status */}
                  <div className="pt-4 border-t space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span>Email Verified</span>
                      <span className={`flex items-center ${user?.hasVerifiedEmailAddress ? 'text-green-600' : 'text-red-600'}`}>
                        <div className={`w-2 h-2 rounded-full mr-2 ${user?.hasVerifiedEmailAddress ? 'bg-green-600' : 'bg-red-600'}`}></div>
                        {user?.hasVerifiedEmailAddress ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Phone Verified</span>
                      <span className={`flex items-center ${profile.phone_verified ? 'text-green-600' : 'text-red-600'}`}>
                        <div className={`w-2 h-2 rounded-full mr-2 ${profile.phone_verified ? 'bg-green-600' : 'bg-red-600'}`}></div>
                        {profile.phone_verified ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>2FA Enabled</span>
                      <span className={`flex items-center ${profile.two_factor_enabled ? 'text-green-600' : 'text-red-600'}`}>
                        <div className={`w-2 h-2 rounded-full mr-2 ${profile.two_factor_enabled ? 'bg-green-600' : 'bg-red-600'}`}></div>
                        {profile.two_factor_enabled ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>

                  {/* Sign Out Button */}
                  <div className="pt-4 border-t">
                    <Button onClick={handleSignOut} variant="outline" className="w-full justify-start">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="my-tribe">My Tribe</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                  <TabsTrigger value="sessions">Sessions</TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="space-y-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle>Profile Information</CardTitle>
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
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          {isEditing ? (
                            <Input
                              id="firstName"
                              value={tempData.first_name || ''}
                              onChange={(e) => handleInputChange('first_name', e.target.value)}
                            />
                          ) : (
                            <div className="flex items-center pt-2">
                              <User className="w-4 h-4 mr-2 text-gray-400" />
                              <span>{profile.first_name}</span>
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          {isEditing ? (
                            <Input
                              id="lastName"
                              value={tempData.last_name || ''}
                              onChange={(e) => handleInputChange('last_name', e.target.value)}
                            />
                          ) : (
                            <div className="flex items-center pt-2">
                              <User className="w-4 h-4 mr-2 text-gray-400" />
                              <span>{profile.last_name}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="username">Username</Label>
                        {isEditing ? (
                          <Input
                            id="username"
                            value={tempData.username || ''}
                            onChange={(e) => handleInputChange('username', e.target.value)}
                          />
                        ) : (
                          <div className="flex items-center pt-2">
                            <User className="w-4 h-4 mr-2 text-gray-400" />
                            <span>@{profile.username}</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="email">Email</Label>
                        <div className="flex items-center pt-2">
                          <Mail className="w-4 h-4 mr-2 text-gray-400" />
                          <span>{profile.email}</span>
                          {user?.hasVerifiedEmailAddress && (
                            <span className="ml-2 text-green-600 text-sm">✓ Verified</span>
                          )}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        {isEditing ? (
                          <Input
                            id="phone"
                            value={tempData.phone_number || ''}
                            onChange={(e) => handleInputChange('phone_number', e.target.value)}
                          />
                        ) : (
                          <div className="flex items-center pt-2">
                            <Phone className="w-4 h-4 mr-2 text-gray-400" />
                            <span>{profile.phone_number || 'Not provided'}</span>
                            {!profile.phone_verified && profile.phone_number && (
                              <span className="ml-2 text-red-600 text-sm">Not verified</span>
                            )}
                          </div>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="location">Location</Label>
                        {isEditing ? (
                          <Input
                            id="location"
                            value={tempData.location || ''}
                            onChange={(e) => handleInputChange('location', e.target.value)}
                          />
                        ) : (
                          <div className="flex items-center pt-2">
                            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                            <span>{profile.location || 'Not provided'}</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="bio">Bio</Label>
                        {isEditing ? (
                          <textarea
                            id="bio"
                            className="w-full p-2 border border-gray-300 rounded-md resize-none"
                            rows={3}
                            value={tempData.bio || ''}
                            onChange={(e) => handleInputChange('bio', e.target.value)}
                          />
                        ) : (
                          <div className="pt-2">
                            <p className="text-gray-700">{profile.bio || 'No bio provided'}</p>
                          </div>
                        )}
                      </div>

                      <div className="pt-4 border-t">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span>Joined {formatDate(profile.created_at)}</span>
                          </div>
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-2" />
                            <span>Last sign in {formatDate(profile.last_sign_in)}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="my-tribe" className="space-y-6">
                  <MyTribeTab />
                </TabsContent>

                <TabsContent value="security" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Shield className="w-5 h-5 mr-2" />
                        Security Settings
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Two-Factor Authentication</h4>
                          <p className="text-sm text-gray-600">Managed through Clerk Dashboard</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm ${profile.two_factor_enabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {profile.two_factor_enabled ? 'Enabled' : 'Disabled'}
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Change Password</h4>
                          <p className="text-sm text-gray-600">Managed through Clerk</p>
                        </div>
                        <Button variant="outline" size="sm" disabled>
                          Managed by Clerk
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Email Verification</h4>
                          <p className="text-sm text-gray-600">
                            {user?.hasVerifiedEmailAddress ? "Your email is verified" : "Please verify your email address"}
                          </p>
                        </div>
                        {user?.hasVerifiedEmailAddress && (
                          <span className="text-green-600 text-sm">✓ Verified</span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="sessions" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Smartphone className="w-5 h-5 mr-2" />
                        Active Sessions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Device</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Last Active</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {sessionData.map((session) => (
                            <TableRow key={session.id}>
                              <TableCell className="flex items-center">
                                <Globe className="w-4 h-4 mr-2 text-gray-400" />
                                {session.device}
                              </TableCell>
                              <TableCell>{session.location}</TableCell>
                              <TableCell>{formatDate(session.lastActive)}</TableCell>
                              <TableCell>
                                {session.current ? (
                                  <span className="text-green-600 font-medium">Current</span>
                                ) : (
                                  <span className="text-gray-600">Active</span>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

