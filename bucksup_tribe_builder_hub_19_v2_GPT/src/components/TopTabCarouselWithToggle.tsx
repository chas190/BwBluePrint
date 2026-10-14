import { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Home, Building2, ShoppingBag, TrendingUp, ShoppingCart, Globe, Gift, Crown } from "lucide-react";
import { useViewportInfo } from "@/hooks/useViewportInfo";
import AmazonSuccessPopup from "@/components/AmazonSuccessPopup";

interface TopTabCarouselWithToggleProps {
  onTabClick: (tabId: string) => void;
}

interface ButtonToggle {
  id: string;
  title: string;
  visible: boolean;
}

const TopTabCarouselWithToggle = ({ onTabClick }: TopTabCarouselWithToggleProps) => {
  const { width } = useViewportInfo();
  const [showAmazonPopup, setShowAmazonPopup] = useState(false);
  const [buttonToggles, setButtonToggles] = useState<ButtonToggle[]>([
    { id: 'amazon', title: 'Amazon', visible: true },
    { id: 'shop-online', title: 'Shop Online', visible: true },
    { id: 'specials', title: 'Specials', visible: true },
    { id: 'vip-benefits', title: 'VIP Benefits', visible: true },
    { id: 'home-deals', title: 'Home Deals', visible: true },
    { id: 'upbank', title: 'UpBank', visible: true },
    { id: 'mega-buys', title: 'Mega Buys', visible: true },
    { id: 'capital-creation', title: 'Capital Creation', visible: true }
  ]);

  // Load button toggles from localStorage
  useEffect(() => {
    const savedToggles = localStorage.getItem('main11_buttonToggles');
    if (savedToggles) {
      setButtonToggles(JSON.parse(savedToggles));
    }
  }, []);

  // Original buttons that are always visible
  const originalTabButtons = [{
    id: 'amazon',
    title: 'Amazon',
    icon: ShoppingCart,
    bgColor: 'bg-orange-100',
    iconColor: 'text-orange-600'
  }, {
    id: 'shop-online',
    title: 'Shop Online',
    icon: Globe,
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600'
  }, {
    id: 'specials',
    title: 'Specials',
    icon: Gift,
    bgColor: 'bg-red-100',
    iconColor: 'text-red-600'
  }, {
    id: 'vip-benefits',
    title: 'VIP Benefits',
    icon: Crown,
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600'
  }];

  // New responsive buttons that appear based on width
  const responsiveTabButtons = [{
    id: 'home-deals',
    title: 'Home Deals',
    icon: Home,
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600',
    minWidth: 850
  }, {
    id: 'upbank',
    title: 'UpBank',
    icon: Building2,
    bgColor: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
    minWidth: 950
  }, {
    id: 'mega-buys',
    title: 'Mega Buys',
    icon: ShoppingBag,
    bgColor: 'bg-pink-100',
    iconColor: 'text-pink-600',
    minWidth: 1250
  }, {
    id: 'capital-creation',
    title: 'Capital Creation',
    icon: TrendingUp,
    bgColor: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
    minWidth: 1450
  }];

  // Filter responsive buttons based on current viewport width
  const visibleResponsiveButtons = responsiveTabButtons.filter(button => width >= button.minWidth);

  // Combine original buttons with visible responsive buttons
  const allPossibleButtons = [...originalTabButtons, ...visibleResponsiveButtons];

  // Filter buttons based on toggle settings
  const visibleButtons = allPossibleButtons.filter(button => {
    const toggle = buttonToggles.find(t => t.id === button.id);
    return toggle ? toggle.visible : true;
  });

  const handleTabClick = (tabId: string) => {
    if (tabId === 'amazon') {
      setShowAmazonPopup(true);
    } else {
      onTabClick(tabId);
    }
  };

  // Don't render anything if no buttons are visible
  if (visibleButtons.length === 0) {
    return null;
  }

  return (
    <>
      <div className="w-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 px-0 py-[6px]">
        <div className="w-full">
          <Carousel opts={{
            align: "start",
            loop: false,
            dragFree: true
          }} className="w-full">
            <CarouselContent className="ml-2">
              {visibleButtons.map((button) => 
                <CarouselItem key={button.id} className="basis-auto">
                  <div 
                    onClick={() => handleTabClick(button.id)} 
                    className="flex-shrink-0 backdrop-blur-sm border-red-50 drop-shadow-md hover:shadow-md transition-shadow cursor-pointer p-2 min-w-[140px] rounded-full py-[2px] px-[11px] bg-slate-200"
                  >
                    <div className="flex items-center gap-1">
                      <div className={`w-8 h-8 ${button.bgColor} rounded-full flex items-center justify-center`}>
                        <button.icon className={`w-4 h-4 ${button.iconColor}`} />
                      </div>
                      <p className="text-sm font-medium text-gray-800 whitespace-nowrap">{button.title}</p>
                    </div>
                  </div>
                </CarouselItem>
              )}
            </CarouselContent>
          </Carousel>
        </div>
      </div>

      <AmazonSuccessPopup 
        open={showAmazonPopup} 
        onOpenChange={setShowAmazonPopup} 
      />
    </>
  );
};

export default TopTabCarouselWithToggle;
