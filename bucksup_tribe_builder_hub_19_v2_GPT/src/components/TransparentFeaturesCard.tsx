
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Users, DollarSign, Shield, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import BusinessPopup from "./BusinessPopup";
import { useSettingsPersistence } from "@/hooks/useSettingsPersistence";

const TransparentFeaturesCard = () => {
  const { settings } = useSettingsPersistence();
  const [showExtraCards, setShowExtraCards] = useState(settings.showExtraCards);
  const [localDealsToggles, setLocalDealsToggles] = useState(settings.localDealsToggles);

  // New state for faded color overlays
  const [transparentCard1FadedColor, setTransparentCard1FadedColor] = useState(settings.transparentCard1FadedColor);
  const [transparentCard2FadedColor, setTransparentCard2FadedColor] = useState(settings.transparentCard2FadedColor);
  const [transparentCard3FadedColor, setTransparentCard3FadedColor] = useState(settings.transparentCard3FadedColor);

  // Animation state for third card
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  // Business popup state
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [popupMode, setPopupMode] = useState(null); // 'shop' or 'deals'

  // Update local state when settings change
  useEffect(() => {
    setShowExtraCards(settings.showExtraCards);
    setLocalDealsToggles(settings.localDealsToggles);
    setTransparentCard1FadedColor(settings.transparentCard1FadedColor);
    setTransparentCard2FadedColor(settings.transparentCard2FadedColor);
    setTransparentCard3FadedColor(settings.transparentCard3FadedColor);
  }, [settings]);

  // Animation effect for third card background rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex(prev => (prev + 1) % 3);
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, []);

  // Transparent features data
  const transparentFeatures = [{
    icon: TrendingUp,
    color: "bg-transparent",
    label: "Growth"
  }, {
    icon: Users,
    color: "bg-transparent",
    label: "Community"
  }, {
    icon: DollarSign,
    color: "bg-transparent",
    label: "Earnings"
  }, {
    icon: Shield,
    color: "bg-transparent",
    label: "Security"
  }, {
    icon: Star,
    color: "bg-transparent",
    label: "Premium"
  }];

  // Business data for each card
  const businessData = [{
    id: 1,
    name: "Local Cafe Express",
    category: "Food & Beverage",
    description: "Fresh coffee and pastries daily",
    deal: "20% off all drinks today!",
    coupon: "COFFEE20"
  }, {
    id: 2,
    name: "Tech Store Plus",
    category: "Electronics",
    description: "Latest tech gadgets and accessories",
    deal: "Free shipping on orders over $50",
    coupon: "FREESHIP50"
  }, {
    id: 3,
    name: "Fashion Forward",
    category: "Clothing",
    description: "Trendy clothing for all seasons",
    deal: "Buy 2 get 1 free on all items",
    coupon: "BUY2GET1"
  }];

  // Background images for rotation (3.gif, 2.gif, 1.gif sequence)
  const backgroundImages = ["https://bucksup.org/assets/hotdealcard/3.gif", "https://bucksup.org/assets/hotdealcard/2.gif", "https://bucksup.org/assets/hotdealcard/1.gif"];

  // Card configurations with new GIF backgrounds
  const cardConfigs = [{
    id: 1,
    toggleId: 'local-cafe-express',
    backgroundImage: "url('https://bucksup.org/assets/hotdealcard/1.gif')",
    gradient: transparentCard1FadedColor ? "bg-gradient-to-br from-gray-800/80 via-gray-500/80 to-gray-700/80" : "",
    business: businessData[0]
  }, {
    id: 2,
    toggleId: 'tech-store-plus',
    backgroundImage: "url('https://bucksup.org/assets/hotdealcard/2.gif')",
    gradient: transparentCard2FadedColor ? "bg-gradient-to-br from-blue-800/80 via-blue-500/80 to-blue-700/80" : "",
    business: businessData[1]
  }, {
    id: 3,
    toggleId: 'fashion-forward',
    backgroundImage: `url('${backgroundImages[currentBgIndex]}')`,
    gradient: transparentCard3FadedColor ? "bg-gradient-to-br from-purple-800/80 via-purple-500/80 to-purple-700/80" : "",
    business: businessData[2]
  }];

  // Filter cards based on both showExtraCards setting and individual toggle settings
  const baseVisibleCards = showExtraCards ? cardConfigs : cardConfigs.slice(0, 1);
  const visibleCards = baseVisibleCards.filter(card => {
    const toggle = localDealsToggles.find(t => t.id === card.toggleId);
    return toggle ? toggle.visible : false; // Hide if toggle not found or not visible
  });
  
  const handleBusinessAction = (business, mode) => {
    setSelectedBusiness(business);
    setPopupMode(mode);
  };
  
  const closePopup = () => {
    setSelectedBusiness(null);
    setPopupMode(null);
  };

  return <>
      <section className="container mx-auto py-0 px-0 -translate-y-[8px] sm:-translate-y-[6px] md:-translate-y-[4px] mt-[25px] space-y-4">
        {/* Featured Local Deals Title Card with swapped colors */}
        <div className="w-3/5 mx-auto mb-4">
          <Card className="bg-white border-0 shadow-lg rounded-lg">
            <CardContent className="p-6">
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-br from-indigo-600 via-blue-800 to-indigo-500 bg-clip-text text-transparent text-center">
                Featured Local Deals
              </h2>
            </CardContent>
          </Card>
        </div>

        {visibleCards.map(config => <Card key={config.id} className="w-[90%] mx-auto shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000" style={{
          backgroundImage: config.backgroundImage
        }} />
            {config.gradient && <div className={`absolute inset-0 ${config.gradient}`} />}
            <CardContent className="p-2 sm:p-4 md:p-6 px-[2px] relative z-10 flex flex-col justify-between min-h-[120px]">
              <div className="grid grid-cols-5 gap-2 sm:gap-4 md:gap-8 mb-4">
                {transparentFeatures.map((feature, index) => <div key={index} className="flex flex-col items-center space-y-2">
                    <div className={`w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 rounded-full ${feature.color} flex items-center justify-center`}>
                      <feature.icon className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 text-transparent" />
                    </div>
                    <span className="text-transparent text-xs sm:text-xs md:text-sm font-medium text-center">{feature.label}</span>
                  </div>)}
              </div>
              
              {/* Business Action Buttons - Right justified and bottom aligned with reduced margin on larger screens */}
              <div className="flex gap-2 justify-end px-[3px] mb-0 md:mb-[-8px]">
                <Button onClick={() => handleBusinessAction(config.business, 'shop')} size="sm" className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm h-6 px-2">
                  Shop
                </Button>
                <Button onClick={() => handleBusinessAction(config.business, 'deals')} className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm h-6 px-2" size="sm">
                  See Deals
                </Button>
              </div>
            </CardContent>
          </Card>)}
      </section>

      {/* Business Popup */}
      {selectedBusiness && <BusinessPopup business={selectedBusiness} mode={popupMode} isOpen={!!selectedBusiness} onClose={closePopup} />}
    </>;
};

export default TransparentFeaturesCard;

