import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { useSettingsPersistence } from "@/hooks/useSettingsPersistence";

interface ButtonToggle {
  id: string;
  title: string;
  visible: boolean;
}

const Main11Guide = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLocalDealsOpen, setIsLocalDealsOpen] = useState(false);
  const [isBwTownOpen, setIsBwTownOpen] = useState(false);
  const [isBigNewsOpen, setIsBigNewsOpen] = useState(false);
  const [isMainPageOpen, setIsMainPageOpen] = useState(false);
  const { settings, updateButtonToggles, updateLocalDealsToggles, updateShowBwTownVipPerksCard, updateShowDiscoverDealsTitle, updateShowBigNewsTitle, updateBigNewsTitle } = useSettingsPersistence();
  const [buttonToggles, setButtonToggles] = useState<ButtonToggle[]>(settings.buttonToggles);
  const [localDealsToggles, setLocalDealsToggles] = useState<ButtonToggle[]>(settings.localDealsToggles);

  // Update local state when settings change
  useEffect(() => {
    setButtonToggles(settings.buttonToggles);
    setLocalDealsToggles(settings.localDealsToggles);
  }, [settings]);

  const handleToggleChange = (buttonId: string, checked: boolean) => {
    const updatedToggles = buttonToggles.map(toggle => 
      toggle.id === buttonId 
        ? { ...toggle, visible: checked }
        : toggle
    );
    setButtonToggles(updatedToggles);
    updateButtonToggles(updatedToggles);
  };
  
  const handleLocalDealsToggleChange = (buttonId: string, checked: boolean) => {
    const updatedToggles = localDealsToggles.map(toggle => 
      toggle.id === buttonId 
        ? { ...toggle, visible: checked }
        : toggle
    );
    setLocalDealsToggles(updatedToggles);
    updateLocalDealsToggles(updatedToggles);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Main11 Guide
            </h1>
            <Link to="/main">
              <Button variant="outline" size="sm">
                See Main Page
              </Button>
            </Link>
          </div>
          
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <Card className="w-full shadow-lg">
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">Fav Links</CardTitle>
                    <ChevronDown className={`h-6 w-6 text-gray-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <p className="text-gray-600 mb-6">
                    Control which buttons are visible on the Main page by checking/unchecking the boxes below:
                  </p>
                  
                  <div className="space-y-4">
                    {buttonToggles.map((toggle) => (
                      <div key={toggle.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                        <Checkbox
                          id={toggle.id}
                          checked={toggle.visible}
                          onCheckedChange={(checked) => handleToggleChange(toggle.id, !!checked)}
                          className="h-5 w-5"
                        />
                        <label
                          htmlFor={toggle.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                        >
                          {toggle.title}
                        </label>
                        <span className={`text-xs px-2 py-1 rounded-full ${toggle.visible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {toggle.visible ? 'Visible' : 'Hidden'}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> Changes will be applied immediately to the Main page. 
                      The settings are saved automatically and will persist across browser sessions.
                    </p>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
          
          {/* Big News Title Control Card */}
          <Collapsible open={isBigNewsOpen} onOpenChange={setIsBigNewsOpen}>
            <Card className="w-full shadow-lg mt-6">
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">Big News Title Control</CardTitle>
                    <ChevronDown className={`h-6 w-6 text-gray-600 transition-transform duration-200 ${isBigNewsOpen ? 'rotate-180' : ''}`} />
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <p className="text-gray-600 mb-6">
                    Control the big news title that appears above the category grid on the Main page:
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                      <Checkbox
                        id="show-big-news-title"
                        checked={settings.showBigNewsTitle}
                        onCheckedChange={(checked) => updateShowBigNewsTitle(!!checked)}
                        className="h-5 w-5"
                      />
                      <label
                        htmlFor="show-big-news-title"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                      >
                        Show Big News Title
                      </label>
                      <span className={`text-xs px-2 py-1 rounded-full ${settings.showBigNewsTitle ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {settings.showBigNewsTitle ? 'Visible' : 'Hidden'}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="big-news-title">Title Text</Label>
                      <Input
                        id="big-news-title"
                        value={settings.bigNewsTitle}
                        onChange={(e) => updateBigNewsTitle(e.target.value)}
                        placeholder="Enter title text"
                        className="w-full"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> Changes will be applied immediately to the Main page. 
                      The settings are saved automatically and will persist across browser sessions.
                    </p>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
          
          {/* Main Page Options Card */}
          <Collapsible open={isMainPageOpen} onOpenChange={setIsMainPageOpen}>
            <Card className="w-full shadow-lg mt-6">
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">Main Page Options</CardTitle>
                    <ChevronDown className={`h-6 w-6 text-gray-600 transition-transform duration-200 ${isMainPageOpen ? 'rotate-180' : ''}`} />
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <p className="text-gray-600 mb-6">
                    Control which content appears on the Main page:
                  </p>
                  
                  <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <Checkbox
                      id="show-discover-deals-title"
                      checked={settings.showDiscoverDealsTitle}
                      onCheckedChange={(checked) => updateShowDiscoverDealsTitle(!!checked)}
                      className="h-5 w-5"
                    />
                    <label
                      htmlFor="show-discover-deals-title"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                    >
                      Show "Discover Amazing Deals" Title & Description
                    </label>
                    <span className={`text-xs px-2 py-1 rounded-full ${settings.showDiscoverDealsTitle ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {settings.showDiscoverDealsTitle ? 'Visible' : 'Hidden'}
                    </span>
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> This controls the "Discover Amazing Deals" title and description that appear above the category grid. 
                      The setting is saved automatically and will persist across browser sessions.
                    </p>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
          
          {/* Local Deals Control Card */}
          <Collapsible open={isLocalDealsOpen} onOpenChange={setIsLocalDealsOpen}>
            <Card className="w-full shadow-lg mt-6">
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">BwTown Local Vip-Perks Control</CardTitle>
                    <ChevronDown className={`h-6 w-6 text-gray-600 transition-transform duration-200 ${isLocalDealsOpen ? 'rotate-180' : ''}`} />
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <p className="text-gray-600 mb-6">
                    Control which cards are visible in the BwTown Local Vip-Perks section on the Main page:
                  </p>
                  
                  <div className="space-y-4">
                    {localDealsToggles.map((toggle) => (
                      <div key={toggle.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                        <Checkbox
                          id={toggle.id}
                          checked={toggle.visible}
                          onCheckedChange={(checked) => handleLocalDealsToggleChange(toggle.id, !!checked)}
                          className="h-5 w-5"
                        />
                        <label
                          htmlFor={toggle.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                        >
                          {toggle.title}
                        </label>
                        <span className={`text-xs px-2 py-1 rounded-full ${toggle.visible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {toggle.visible ? 'Visible' : 'Hidden'}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> Changes will be applied immediately to the BwTown Local Vip-Perks cards on the Main page. 
                      The settings are saved automatically and will persist across browser sessions.
                    </p>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
          
          {/* BwTown Local Vip-Perks Toggle Card */}
          <Collapsible open={isBwTownOpen} onOpenChange={setIsBwTownOpen}>
            <Card className="w-full shadow-lg mt-6">
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">BwTown Local Vip-Perks Card Control</CardTitle>
                    <ChevronDown className={`h-6 w-6 text-gray-600 transition-transform duration-200 ${isBwTownOpen ? 'rotate-180' : ''}`} />
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <p className="text-gray-600 mb-6">
                    Control whether the BwTown Local Vip-Perks title card is visible on the Main page:
                  </p>
                  
                  <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <Checkbox
                      id="bwtown-vip-perks"
                      checked={settings.showBwTownVipPerksCard}
                      onCheckedChange={(checked) => updateShowBwTownVipPerksCard(!!checked)}
                      className="h-5 w-5"
                    />
                    <label
                      htmlFor="bwtown-vip-perks"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                    >
                      Show BwTown Local Vip-Perks Card
                    </label>
                    <span className={`text-xs px-2 py-1 rounded-full ${settings.showBwTownVipPerksCard ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {settings.showBwTownVipPerksCard ? 'Visible' : 'Hidden'}
                    </span>
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> This controls the BwTown Local Vip-Perks title card that appears above the category grid. 
                      The setting is saved automatically and will persist across browser sessions.
                    </p>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        </div>
      </div>
    </div>
  );
};

export default Main11Guide;
