
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import IconDrawer from "@/components/IconDrawer";
import Icon_Goals from "./Icon_Goals";
import Icon_Tribes from "./Icon_Tribes";
import Icon_BuckUp from "./Icon_BuckUp";
import Icon_Member from "./Icon_Member";
import Icon_Deals from "./Icon_Deals";
import HeroSection from "@/components/HeroSection";
import FeaturesGrid from "@/components/FeaturesGrid";
import TopTabCarousel from "@/components/TopTabCarousel";
import GreetingCards from "@/components/GreetingCards";
import TopCardsSection from "@/components/TopCardsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import CollapsibleSections from "@/components/CollapsibleSections";
import TribeManagement from "@/components/TribeManagement";
import DialogsContainer from "@/components/DialogsContainer";
import FeaturesSection from "@/components/FeaturesSection";
import ImageGalleryCarousel from "@/components/ImageGalleryCarousel";
import CategoryGrid from "@/components/CategoryGrid";
import TransparentFeaturesCard from "@/components/TransparentFeaturesCard";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ArrowRight, ChevronDown, TrendingUp, Users, DollarSign, Shield, Star, X } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardStats from "@/components/DashboardStats";

const Main8b = () => {
  const location = useLocation();
  const [openDrawer, setOpenDrawer] = useState<string | null>(null);
  const [showNewProgramsDialog, setShowNewProgramsDialog] = useState(false);
  const [showGrowTribeDialog, setShowGrowTribeDialog] = useState(false);
  const [showDemoDialog, setShowDemoDialog] = useState(false);
  const [showVipBenefitsDialog, setShowVipBenefitsDialog] = useState(false);
  const [showBuyStuffDialog, setShowBuyStuffDialog] = useState(false);
  const [showAmazonDialog, setShowAmazonDialog] = useState(false);
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showComingSoonDialog, setShowComingSoonDialog] = useState(false);
  const [demoToggle, setDemoToggle] = useState(false);
  const [isWealthBuildingOpen, setIsWealthBuildingOpen] = useState(false);
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(false);
  const [startingTribes, setStartingTribes] = useState([25]);
  const [showBlueCard, setShowBlueCard] = useState(true);
  const [showTopSpacerCard, setShowTopSpacerCard] = useState(false);
  const [greenCardColor, setGreenCardColor] = useState(false);
  const [showCarousel, setShowCarousel] = useState(true);
  const [autoCloseBlueCard, setAutoCloseBlueCard] = useState(false);
  const [sessionMain8bLeavesPageCount, setSessionMain8bLeavesPageCount] = useState(0);
  const [showTribeManagementCard, setShowTribeManagementCard] = useState(false);
  const [showGalleryCarousel, setShowGalleryCarousel] = useState(true);

  // New state for top carousel dialogs
  const [showBuySellDialog, setShowBuySellDialog] = useState(false);
  const [showOnlineStoreDialog, setShowOnlineStoreDialog] = useState(false);
  const [showVipDialog, setShowVipDialog] = useState(false);

  // New state for tribe sheets
  const [showTribeOverviewSheet, setShowTribeOverviewSheet] = useState(false);
  const [showTribeGrowthSheet, setShowTribeGrowthSheet] = useState(false);

  // New state for video player dialog
  const [showVideoPlayerDialog, setShowVideoPlayerDialog] = useState(false);

  // Load settings from localStorage
  useEffect(() => {
    console.log('🔄 Main8b: Loading settings from localStorage');
    const saved = localStorage.getItem('devSettings_showBlueCard');
    if (saved !== null) {
      setShowBlueCard(JSON.parse(saved));
      console.log('📱 Main8b: Loaded showBlueCard:', JSON.parse(saved));
    }
    const savedTopSpacer = localStorage.getItem('devSettings_showTopSpacerCard');
    if (savedTopSpacer !== null) {
      setShowTopSpacerCard(JSON.parse(savedTopSpacer));
    }
    const savedGreenCardColor = localStorage.getItem('devSettings_greenCardColor');
    if (savedGreenCardColor !== null) {
      setGreenCardColor(JSON.parse(savedGreenCardColor));
    }
    const savedCarousel = localStorage.getItem('devSettings_showCarousel');
    if (savedCarousel !== null) {
      setShowCarousel(JSON.parse(savedCarousel));
    }
    const savedAutoClose = localStorage.getItem('devSettings_autoCloseBlueCard');
    if (savedAutoClose !== null) {
      setAutoCloseBlueCard(JSON.parse(savedAutoClose));
      console.log('🔄 Main8b: Loaded autoCloseBlueCard:', JSON.parse(savedAutoClose));
    }
    const savedSessionCount = localStorage.getItem('devSettings_sessionMain8bLeavesPageCount');
    if (savedSessionCount !== null) {
      setSessionMain8bLeavesPageCount(JSON.parse(savedSessionCount));
      console.log('📊 Main8b: Loaded sessionMain8bLeavesPageCount:', JSON.parse(savedSessionCount));
    }
    const savedTribeManagementCard = localStorage.getItem('devSettings_showTribeManagementCard');
    if (savedTribeManagementCard !== null) {
      setShowTribeManagementCard(JSON.parse(savedTribeManagementCard));
    }
    const savedGalleryCarousel = localStorage.getItem('devSettings_showGalleryCarousel');
    if (savedGalleryCarousel !== null) {
      setShowGalleryCarousel(JSON.parse(savedGalleryCarousel));
    }
  }, []);

  // Main visibility logic for blue card
  useEffect(() => {
    const blueCardToggle = localStorage.getItem('devSettings_showBlueCard') === 'true';
    const autoCloseEnabled = localStorage.getItem('devSettings_autoCloseBlueCard') === 'true';
    const currentSessionCount = sessionMain8bLeavesPageCount;
    console.log('🎯 Main8b: Blue card visibility logic check');
    console.log('   - blueCardToggle:', blueCardToggle);
    console.log('   - autoCloseEnabled:', autoCloseEnabled);
    console.log('   - sessionCount:', currentSessionCount);

    // Primary Rule: If toggle is OFF → card is HIDDEN, no other logic runs
    if (!blueCardToggle) {
      console.log('🚫 Main8b: Blue card toggle is OFF - hiding card and skipping auto-logic');
      setShowBlueCard(false);
      return;
    }

    // Secondary Rule: If auto-close is enabled and session count is 0, hide the card
    if (autoCloseEnabled && currentSessionCount === 0) {
      console.log('⏰ Main8b: Auto-close enabled and session count is 0 - hiding card');
      setShowBlueCard(false);
      localStorage.setItem('devSettings_showBlueCard', 'false');
      return;
    }

    // Tertiary Rule: Show the card if toggle is ON and conditions allow
    console.log('✅ Main8b: Showing blue card');
    setShowBlueCard(true);
  }, [sessionMain8bLeavesPageCount, autoCloseBlueCard]);

  // Handle page navigation away from main8b
  useEffect(() => {
    return () => {
      const currentAutoClose = localStorage.getItem('devSettings_autoCloseBlueCard') === 'true';
      const currentShowBlue = localStorage.getItem('devSettings_showBlueCard') === 'true';
      if (currentAutoClose && currentShowBlue) {
        const currentCount = parseInt(localStorage.getItem('devSettings_sessionMain8bLeavesPageCount') || '0');
        const newCount = Math.max(0, currentCount - 1);
        console.log('🚪 Main8b: User leaving page, updating session count from', currentCount, 'to', newCount);
        localStorage.setItem('devSettings_sessionMain8bLeavesPageCount', newCount.toString());
        setSessionMain8bLeavesPageCount(newCount);
      }
    };
  }, []);

  const handleTabClick = (tabId: string) => {
    switch (tabId) {
      case 'home-deals':
        setShowBuySellDialog(true);
        break;
      case 'upbank':
        setShowOnlineStoreDialog(true);
        break;
      case 'mega-buys':
        setShowComingSoonDialog(true);
        break;
      case 'capital-creation':
        setShowVipDialog(true);
        break;
      case 'amazon':
        setShowBuySellDialog(true);
        break;
      case 'shop-online':
        setShowOnlineStoreDialog(true);
        break;
      case 'specials':
        setShowComingSoonDialog(true);
        break;
      case 'vip-benefits':
        setShowVipDialog(true);
        break;
    }
  };

  const handleBuyOrSellClick = () => {
    if (demoToggle) {
      setShowVipBenefitsDialog(true);
    } else {
      setShowBuyStuffDialog(true);
    }
  };

  const renderDrawerContent = () => {
    switch (openDrawer) {
      case "Goals":
        return <Icon_Goals />;
      case "Tribes":
        return <Icon_Tribes />;
      case "BuckUp":
        return <Icon_BuckUp />;
      case "Member":
        return <Icon_Member />;
      case "Deals":
        return <Icon_Deals />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 my-0">
      <Navigation />

      <GreetingCards showBlueCard={showBlueCard} showTopSpacerCard={showTopSpacerCard} greenCardColor={greenCardColor} />

      {showCarousel && <TopTabCarousel onTabClick={handleTabClick} />}

      <HeroSection onLearnMoreClick={() => setShowVideoPlayerDialog(true)} />

      <FeaturesGrid onFeatureClick={setOpenDrawer} />

      {/* New Category Grid Section */}
      <div className="container mx-auto px-0 pb-0">
        <CategoryGrid />
      </div>

      {/* New Featured Local Deals Title Card */}
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="w-3/5 mx-auto">
          <Card className="bg-gradient-to-br from-indigo-600 via-blue-800 to-indigo-500 border-0 shadow-lg rounded-lg">
            <CardContent className="p-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white text-center">
                Featured Local Deals
              </h2>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* New Gradient Card with TransparentFeaturesCard */}
      <div className="w-full bg-gradient-to-br from-indigo-600 via-blue-800 to-indigo-500 py-8">
        <div className="container mx-auto px-4 md:px-6">
          <TransparentFeaturesCard />
        </div>
      </div>

      {/* Image Gallery Carousel Section - conditionally rendered */}
      {showGalleryCarousel && <ImageGalleryCarousel />}

      {/* Welcome to BucksUp Collapsible Section */}
      <div className="container mx-auto md:px-3 pb-8 px-[5px]">
        <Collapsible open={isWelcomeOpen} onOpenChange={setIsWelcomeOpen}>
          <Card className="w-full shadow-lg py-[9px] my-[25px]">
            <CollapsibleTrigger asChild>
              <div className="cursor-pointer p-6 hover:bg-gray-50 transition-colors px-[5px] py-[2px]">
                <div className="flex items-center justify-between">
                  <div className="text-center flex-1">
                    <h1 className="md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent text-3xl my-[3px]">
                      Welcome to BucksUp
                    </h1>
                  </div>
                  <ChevronDown className={`h-6 w-6 text-gray-600 transition-transform duration-200 ${isWelcomeOpen ? 'rotate-180' : ''}`} />
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-6 pt-0 text-center">
                <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">Save money, earn rewards, and grow your financial future, with your tribe.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/auth">
                    <Button size="lg" className="gradient-main text-white px-8 py-4 text-lg">
                      Get Started
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <Link to="/profile-demo">
                    <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-2">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      </div>

      <TopCardsSection onBuyOrSellClick={handleBuyOrSellClick} onNewProgramsClick={() => setShowNewProgramsDialog(true)} onMarketplaceClick={() => setShowGrowTribeDialog(true)} />

      <FeaturesSection />

      <TestimonialsSection />

      {/* Collapsible Wealth Building Dashboard Section */}
      <div className="container mx-auto px-2 md:px-3 pb-16">
        <Collapsible open={isWealthBuildingOpen} onOpenChange={setIsWealthBuildingOpen}>
          <Card className="w-full shadow-lg">
            <CollapsibleTrigger asChild>
              <div className="cursor-pointer p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="text-center flex-1">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                      Wealth Building
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                      Track your progress, grow your tribe, and build lasting wealth together
                    </p>
                  </div>
                  <ChevronDown className={`h-6 w-6 text-gray-600 transition-transform duration-200 ${isWealthBuildingOpen ? 'rotate-180' : ''}`} />
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-6 pt-0">
                <DashboardStats />
              </div>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      </div>

      {/* Conditionally rendered TribeManagement section */}
      {showTribeManagementCard && (
        <TribeManagement showTribeOverviewSheet={showTribeOverviewSheet} setShowTribeOverviewSheet={setShowTribeOverviewSheet} showTribeGrowthSheet={showTribeGrowthSheet} setShowTribeGrowthSheet={setShowTribeGrowthSheet} startingTribes={startingTribes} setStartingTribes={setStartingTribes} />
      )}

      <CTASection />

      {/* Video Player Dialog */}
      <Dialog open={showVideoPlayerDialog} onOpenChange={setShowVideoPlayerDialog}>
        <DialogContent className="max-w-[95vw] h-[95vh] p-0 overflow-hidden">
          <div className="absolute right-4 top-4 z-10">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowVideoPlayerDialog(false)}
              className="h-8 w-8 p-0 bg-black/20 hover:bg-black/40 text-white rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <iframe 
            src={`${import.meta.env.BASE_URL}video-player?v=kJQP7kiw5Fk`} 
            className="w-full h-full border-0" 
            title="Video Player" 
          />
        </DialogContent>
      </Dialog>

      <DialogsContainer showBuySellDialog={showBuySellDialog} setShowBuySellDialog={setShowBuySellDialog} showOnlineStoreDialog={showOnlineStoreDialog} setShowOnlineStoreDialog={setShowOnlineStoreDialog} showComingSoonDialog={showComingSoonDialog} setShowComingSoonDialog={setShowComingSoonDialog} showVipDialog={showVipDialog} setShowVipDialog={setShowVipDialog} showAmazonDialog={showAmazonDialog} setShowAmazonDialog={setShowAmazonDialog} showVipBenefitsDialog={showVipBenefitsDialog} setShowVipBenefitsDialog={setShowVipBenefitsDialog} showBuyStuffDialog={showBuyStuffDialog} setShowBuyStuffDialog={setShowBuyStuffDialog} showCategoryDialog={showCategoryDialog} setShowCategoryDialog={setShowCategoryDialog} selectedCategory={selectedCategory} showNewProgramsDialog={showNewProgramsDialog} setShowNewProgramsDialog={setShowNewProgramsDialog} showGrowTribeDialog={showGrowTribeDialog} setShowGrowTribeDialog={setShowGrowTribeDialog} showDemoDialog={showDemoDialog} setShowDemoDialog={setShowDemoDialog} demoToggle={demoToggle} setDemoToggle={setDemoToggle} />

      <IconDrawer isOpen={!!openDrawer} onClose={() => setOpenDrawer(null)} title={openDrawer || ""}>
        {renderDrawerContent()}
      </IconDrawer>
    </div>
  );
};

export default Main8b;

