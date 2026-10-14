
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Bell, Crown, Code, Moon, Globe, Palette, Wifi, Shield, Key, ChevronRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { Link } from 'react-router-dom';

const Settings = () => {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [megaAccount, setMegaAccount] = useState(false);
  const [developerMode, setDeveloperMode] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSync, setAutoSync] = useState(true);
  const [limitDataUsage, setLimitDataUsage] = useState(false);
  const [secureMode, setSecureMode] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <Navigation />
      
      <div className="pt-20 px-4 md:px-6">
        <div className="container mx-auto max-w-2xl">
          <div className="mb-8">
            <Link to="/dev-dashboard" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dev Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
            <p className="text-gray-600">Customize your app experience</p>
          </div>

          <div className="space-y-6">
            {/* Preferences Section */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-gray-600" />
                    <div>
                      <Label className="text-base font-medium">Push Notifications</Label>
                    </div>
                  </div>
                  <Switch
                    checked={pushNotifications}
                    onCheckedChange={setPushNotifications}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Crown className="w-5 h-5 text-orange-600" />
                    <div>
                      <Label className="text-base font-medium">Mega Account</Label>
                      <p className="text-sm text-gray-600">Enable premium features and advanced settings</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full font-medium">
                      PREMIUM
                    </span>
                    <Switch
                      checked={megaAccount}
                      onCheckedChange={setMegaAccount}
                    />
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Code className="w-5 h-5 text-purple-600" />
                    <div>
                      <Label className="text-base font-medium">Developer Mode</Label>
                      <p className="text-sm text-gray-600">Enable developer features and debugging tools</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full font-medium">
                      BETA
                    </span>
                    <Switch
                      checked={developerMode}
                      onCheckedChange={setDeveloperMode}
                    />
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Moon className="w-5 h-5 text-gray-600" />
                    <div>
                      <Label className="text-base font-medium">Dark Mode</Label>
                    </div>
                  </div>
                  <Switch
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-gray-600" />
                    <div>
                      <Label className="text-base font-medium">Language</Label>
                      <p className="text-sm text-gray-600">English</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Palette className="w-5 h-5 text-gray-600" />
                    <div>
                      <Label className="text-base font-medium">App Theme</Label>
                      <p className="text-sm text-gray-600">System Default</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </CardContent>
            </Card>

            {/* Data & Sync Section */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Data & Sync</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Wifi className="w-5 h-5 text-green-600" />
                    <div>
                      <Label className="text-base font-medium">Auto Sync</Label>
                      <p className="text-sm text-gray-600">Automatically sync data</p>
                    </div>
                  </div>
                  <Switch
                    checked={autoSync}
                    onCheckedChange={setAutoSync}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Wifi className="w-5 h-5 text-gray-600" />
                    <div>
                      <Label className="text-base font-medium">Limit Data Usage</Label>
                      <p className="text-sm text-gray-600">Use Wi-Fi only</p>
                    </div>
                  </div>
                  <Switch
                    checked={limitDataUsage}
                    onCheckedChange={setLimitDataUsage}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Security Section */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-green-600" />
                    <div>
                      <Label className="text-base font-medium">Secure Mode</Label>
                      <p className="text-sm text-gray-600">Enhanced security features</p>
                    </div>
                  </div>
                  <Switch
                    checked={secureMode}
                    onCheckedChange={setSecureMode}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Key className="w-5 h-5 text-gray-600" />
                    <div>
                      <Label className="text-base font-medium">API Keys</Label>
                      <p className="text-sm text-gray-600">Manage your API credentials</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="pt-4">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

