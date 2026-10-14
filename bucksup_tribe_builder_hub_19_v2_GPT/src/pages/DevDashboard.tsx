import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { ChevronDown, Settings, Monitor, Palette, Layout, Users, Navigation as NavigationIcon, Smartphone } from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import GreetingCards from "@/components/GreetingCards";
import { useViewportInfo } from "@/hooks/useViewportInfo";
import { useSettingsPersistence } from "@/hooks/useSettingsPersistence";

const DevDashboard = () => {
  // Use the shared settings persistence hook
  const { 
    settings, 
    saveSettings, 
    resetSettings, 
    updateShowExtraCards,
    updateTransparentCardSettings 
  } = useSettingsPersistence();

  // Local state for non-transparent card settings that aren't in useSettingsPersistence
  const [showBlueCard, setShowBlueCard] = useState(true);
  const [showTopSpacerCard, setShowTopSpacerCard] = useState(false);
  const [greenCardColor, setGreenCardColor] = useState(false);
  const [showCarousel, setShowCarousel] = useState(true);
  const [showGalleryCarousel, setShowGalleryCarousel] = useState(true);
  const [autoCloseBlueCard, setAutoCloseBlueCard] = useState(false);
  const [sessionMain8bLeavesPageCount, setSessionMain8bLeavesPageCount] = useState(0);
  const [showTribeOverviewSection, setShowTribeOverviewSection] = useState(false);
  const [showTribeGrowthSection, setShowTribeGrowthSection] = useState(false);
  const [showTribeManagementCard, setShowTribeManagementCard] = useState(false);
  const [showMyTribeCalc, setShowMyTribeCalc] = useState(false);

  // Collapsible states
  const [isLayoutOpen, setIsLayoutOpen] = useState(false);
  const [isCardsOpen, setIsCardsOpen] = useState(false);
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const [isTribeOpen, setIsTribeOpen] = useState(false);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  // Get viewport information
  const viewportInfo = useViewportInfo();

  // Load settings from localStorage for non-transparent card settings
  useEffect(() => {
    console.log('🔄 DevDashboard: Loading settings from localStorage');
    
    const localSettings = [
      { key: 'devSettings_showBlueCard', setter: setShowBlueCard },
      { key: 'devSettings_showTopSpacerCard', setter: setShowTopSpacerCard },
      { key: 'devSettings_greenCardColor', setter: setGreenCardColor },
      { key: 'devSettings_showCarousel', setter: setShowCarousel },
      { key: 'devSettings_showGalleryCarousel', setter: setShowGalleryCarousel },
      { key: 'devSettings_autoCloseBlueCard', setter: setAutoCloseBlueCard },
      { key: 'devSettings_sessionMain8bLeavesPageCount', setter: setSessionMain8bLeavesPageCount },
      { key: 'devSettings_showTribeOverviewSection', setter: setShowTribeOverviewSection },
      { key: 'devSettings_showTribeGrowthSection', setter: setShowTribeGrowthSection },
      { key: 'devSettings_showTribeManagementCard', setter: setShowTribeManagementCard },
      { key: 'devSettings_showMyTribeCalc', setter: setShowMyTribeCalc }
    ];

    localSettings.forEach(({ key, setter }) => {
      const saved = localStorage.getItem(key);
      if (saved !== null) {
        setter(JSON.parse(saved));
      }
    });
  }, []);

  // Handler functions for local settings
  const createToggleHandler = (setter: React.Dispatch<React.SetStateAction<boolean>>, key: string) => {
    return (checked: boolean) => {
      setter(checked);
      localStorage.setItem(key, JSON.stringify(checked));
      console.log(`📱 DevDashboard: Updated ${key}:`, checked);
    };
  };

  const handleBlueCardToggle = createToggleHandler(setShowBlueCard, 'devSettings_showBlueCard');
  const handleTopSpacerCardToggle = createToggleHandler(setShowTopSpacerCard, 'devSettings_showTopSpacerCard');
  const handleGreenCardColorToggle = createToggleHandler(setGreenCardColor, 'devSettings_greenCardColor');
  const handleCarouselToggle = createToggleHandler(setShowCarousel, 'devSettings_showCarousel');
  const handleGalleryCarouselToggle = createToggleHandler(setShowGalleryCarousel, 'devSettings_showGalleryCarousel');
  const handleTribeOverviewSectionToggle = createToggleHandler(setShowTribeOverviewSection, 'devSettings_showTribeOverviewSection');
  const handleTribeGrowthSectionToggle = createToggleHandler(setShowTribeGrowthSection, 'devSettings_showTribeGrowthSection');
  const handleTribeManagementCardToggle = createToggleHandler(setShowTribeManagementCard, 'devSettings_showTribeManagementCard');
  const handleMyTribeCalcToggle = createToggleHandler(setShowMyTribeCalc, 'devSettings_showMyTribeCalc');

  // Handler functions for transparent card settings using useSettingsPersistence
  const handleTransparentCard1FadedColorToggle = (checked: boolean) => {
    updateTransparentCardSettings(checked, settings.transparentCard2FadedColor, settings.transparentCard3FadedColor);
  };

  const handleTransparentCard2FadedColorToggle = (checked: boolean) => {
    updateTransparentCardSettings(settings.transparentCard1FadedColor, checked, settings.transparentCard3FadedColor);
  };

  const handleTransparentCard3FadedColorToggle = (checked: boolean) => {
    updateTransparentCardSettings(settings.transparentCard1FadedColor, settings.transparentCard2FadedColor, checked);
  };

  const handleExtraTransparentCardsToggle = (checked: boolean) => {
    updateShowExtraCards(checked);
  };

  const handleAutoCloseToggle = (checked: boolean) => {
    setAutoCloseBlueCard(checked);
    localStorage.setItem('devSettings_autoCloseBlueCard', JSON.stringify(checked));
    localStorage.setItem('devSettings_sessionMain8bLeavesPageCount', '3');
    setSessionMain8bLeavesPageCount(3);
    toast.success(`Auto-close ${checked ? 'enabled' : 'disabled'}. Session count reset to 3.`);
  };

  const handleSessionCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCount = parseInt(event.target.value, 10) || 0;
    setSessionMain8bLeavesPageCount(newCount);
    localStorage.setItem('devSettings_sessionMain8bLeavesPageCount', newCount.toString());
  };

  const resetAllSettings = () => {
    // Reset settings persistence
    resetSettings();
    
    // Reset local settings
    const keys = [
      'devSettings_showBlueCard',
      'devSettings_showTopSpacerCard',
      'devSettings_greenCardColor',
      'devSettings_showCarousel',
      'devSettings_showGalleryCarousel',
      'devSettings_autoCloseBlueCard',
      'devSettings_sessionMain8bLeavesPageCount',
      'devSettings_showTribeOverviewSection',
      'devSettings_showTribeGrowthSection',
      'devSettings_showTribeManagementCard',
      'devSettings_showMyTribeCalc'
    ];
    
    keys.forEach(key => localStorage.removeItem(key));
    window.location.reload();
    toast.success('All settings reset to defaults');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navigation />
      
      <GreetingCards 
        showBlueCard={showBlueCard} 
        showTopSpacerCard={showTopSpacerCard} 
        greenCardColor={greenCardColor} 
      />
      
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Developer Dashboard
          </h1>
          <Button onClick={resetAllSettings} variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
            Reset All Settings
          </Button>
        </div>

        {/* Viewport Information Card */}
        <Card className="mb-6 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Smartphone className="h-5 w-5 text-blue-600" />
              <span>Viewport Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">Width</p>
                <p className="text-lg font-semibold text-blue-600">{viewportInfo.width}px</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600">Height</p>
                <p className="text-lg font-semibold text-green-600">{viewportInfo.height}px</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-600">Device Type</p>
                <p className="text-lg font-semibold text-purple-600">{viewportInfo.deviceType}</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <p className="text-sm text-gray-600">Platform</p>
                <p className="text-lg font-semibold text-orange-600">{viewportInfo.platform}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Layout & Display Settings */}
        <Collapsible open={isLayoutOpen} onOpenChange={setIsLayoutOpen}>
          <Card className="mb-6 shadow-lg">
            <CollapsibleTrigger asChild>
              <div className="cursor-pointer p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Layout className="h-6 w-6 text-blue-600" />
                    <div>
                      <CardTitle className="text-xl">Layout & Display Settings</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">Control page layout and visual elements</p>
                    </div>
                  </div>
                  <ChevronDown className={`h-6 w-6 text-gray-600 transition-transform duration-200 ${isLayoutOpen ? 'rotate-180' : ''}`} />
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-6 pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-blue-card">Show Blue Card</Label>
                    <Switch
                      id="show-blue-card"
                      checked={showBlueCard}
                      onCheckedChange={handleBlueCardToggle}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-top-spacer-card">Show Top Spacer Card</Label>
                    <Switch
                      id="show-top-spacer-card"
                      checked={showTopSpacerCard}
                      onCheckedChange={handleTopSpacerCardToggle}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="green-card-color">Green Card Color</Label>
                    <Switch
                      id="green-card-color"
                      checked={greenCardColor}
                      onCheckedChange={handleGreenCardColorToggle}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-carousel">Show Top Tab Carousel</Label>
                    <Switch
                      id="show-carousel"
                      checked={showCarousel}
                      onCheckedChange={handleCarouselToggle}
                    />
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Card Components Settings */}
        <Collapsible open={isCardsOpen} onOpenChange={setIsCardsOpen}>
          <Card className="mb-6 shadow-lg">
            <CollapsibleTrigger asChild>
              <div className="cursor-pointer p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Palette className="h-6 w-6 text-purple-600" />
                    <div>
                      <CardTitle className="text-xl">Card Components Settings</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">Configure transparent cards and styling</p>
                    </div>
                  </div>
                  <ChevronDown className={`h-6 w-6 text-gray-600 transition-transform duration-200 ${isCardsOpen ? 'rotate-180' : ''}`} />
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-6 pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="transparent-card-1-faded-color">Transparent Card 1 Faded Color</Label>
                    <Switch
                      id="transparent-card-1-faded-color"
                      checked={settings.transparentCard1FadedColor}
                      onCheckedChange={handleTransparentCard1FadedColorToggle}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="transparent-card-2-faded-color">Transparent Card 2 Faded Color</Label>
                    <Switch
                      id="transparent-card-2-faded-color"
                      checked={settings.transparentCard2FadedColor}
                      onCheckedChange={handleTransparentCard2FadedColorToggle}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="transparent-card-3-faded-color">Transparent Card 3 Faded Color</Label>
                    <Switch
                      id="transparent-card-3-faded-color"
                      checked={settings.transparentCard3FadedColor}
                      onCheckedChange={handleTransparentCard3FadedColorToggle}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-extra-transparent-cards">Show Extra Transparent Cards</Label>
                    <Switch
                      id="show-extra-transparent-cards"
                      checked={settings.showExtraCards}
                      onCheckedChange={handleExtraTransparentCardsToggle}
                    />
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Navigation Settings */}
        <Collapsible open={isNavigationOpen} onOpenChange={setIsNavigationOpen}>
          <Card className="mb-6 shadow-lg">
            <CollapsibleTrigger asChild>
              <div className="cursor-pointer p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <NavigationIcon className="h-6 w-6 text-green-600" />
                    <div>
                      <CardTitle className="text-xl">Navigation Settings</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">Control navigation buttons and parameters</p>
                    </div>
                  </div>
                  <ChevronDown className={`h-6 w-6 text-gray-600 transition-transform duration-200 ${isNavigationOpen ? 'rotate-180' : ''}`} />
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-6 pt-0">
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-my-tribe-calc">Show My Tribe Calculator Button</Label>
                  <Switch
                    id="show-my-tribe-calc"
                    checked={showMyTribeCalc}
                    onCheckedChange={handleMyTribeCalcToggle}
                  />
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Tribe Management Settings */}
        <Collapsible open={isTribeOpen} onOpenChange={setIsTribeOpen}>
          <Card className="mb-6 shadow-lg">
            <CollapsibleTrigger asChild>
              <div className="cursor-pointer p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Users className="h-6 w-6 text-orange-600" />
                    <div>
                      <CardTitle className="text-xl">Tribe Management Settings</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">Configure tribe-related features and sections</p>
                    </div>
                  </div>
                  <ChevronDown className={`h-6 w-6 text-gray-600 transition-transform duration-200 ${isTribeOpen ? 'rotate-180' : ''}`} />
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-6 pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-tribe-overview-section">Show Tribe Overview Section</Label>
                    <Switch
                      id="show-tribe-overview-section"
                      checked={showTribeOverviewSection}
                      onCheckedChange={handleTribeOverviewSectionToggle}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-tribe-growth-section">Show Tribe Growth Section</Label>
                    <Switch
                      id="show-tribe-growth-section"
                      checked={showTribeGrowthSection}
                      onCheckedChange={handleTribeGrowthSectionToggle}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-tribe-management-card">Show Tribe Management Card</Label>
                    <Switch
                      id="show-tribe-management-card"
                      checked={showTribeManagementCard}
                      onCheckedChange={handleTribeManagementCardToggle}
                    />
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Advanced Settings */}
        <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
          <Card className="mb-6 shadow-lg">
            <CollapsibleTrigger asChild>
              <div className="cursor-pointer p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Settings className="h-6 w-6 text-red-600" />
                    <div>
                      <CardTitle className="text-xl">Advanced Settings</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">Auto-close behavior and session management</p>
                    </div>
                  </div>
                  <ChevronDown className={`h-6 w-6 text-gray-600 transition-transform duration-200 ${isAdvancedOpen ? 'rotate-180' : ''}`} />
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-6 pt-0">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-close-blue-card">Auto-Close Blue Card</Label>
                  <Switch
                    id="auto-close-blue-card"
                    checked={autoCloseBlueCard}
                    onCheckedChange={handleAutoCloseToggle}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="session-count">Session Count for Auto-Close</Label>
                  <Input
                    id="session-count"
                    type="number"
                    value={sessionMain8bLeavesPageCount}
                    onChange={handleSessionCountChange}
                    className="w-32"
                    min="0"
                    max="10"
                  />
                  <p className="text-xs text-gray-500">
                    Number of times user can leave Main8b page before blue card auto-closes
                  </p>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Status Summary */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Monitor className="h-5 w-5" />
              <span>Current Settings Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm">
              <div className={`p-2 rounded ${showBlueCard ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                Blue Card: {showBlueCard ? 'ON' : 'OFF'}
              </div>
              <div className={`p-2 rounded ${showCarousel ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                Carousel: {showCarousel ? 'ON' : 'OFF'}
              </div>
              <div className={`p-2 rounded ${showGalleryCarousel ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                Gallery Carousel: {showGalleryCarousel ? 'ON' : 'OFF'}
              </div>
              <div className={`p-2 rounded ${autoCloseBlueCard ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                Auto-Close: {autoCloseBlueCard ? 'ON' : 'OFF'}
              </div>
              <div className="p-2 rounded bg-blue-100 text-blue-800">
                Session Count: {sessionMain8bLeavesPageCount}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DevDashboard;

