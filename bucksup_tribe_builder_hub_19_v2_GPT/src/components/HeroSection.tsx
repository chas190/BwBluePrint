import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface HeroContent {
  id: number;
  title: string;
  description: React.ReactNode;
  buttonPrimary: string;
  buttonSecondary: string;
  align: "left" | "right";
  image: string;
  hideOverlay?: boolean;
  hideText?: boolean;
  showButtonsOnly?: boolean;
}

interface HeroSectionProps {
  onLearnMoreClick?: () => void;
}

const HeroSection = ({ onLearnMoreClick }: HeroSectionProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();

  const heroContent: HeroContent[] = [
    {
      id: 1,
      title: "Build Your Tribe",
      description: "Vip members building generational wealth together",
      buttonPrimary: "Join Now",
      buttonSecondary: "Learn More",
      align: "right",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&h=300"
    }, {
      id: 2,
      title: "Costs Into Cash",
      description: <>
              Unlock powerful strategies to<br className="block sm:hidden" /> grow your financial future
            </>,
      buttonPrimary: "Start Earning",
      buttonSecondary: "View Calculator",
      align: "left",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&h=300"
    }, {
      id: 3,
      title: "VIP Membership",
      description: "Access premium features & connect with high-value deals",
      buttonPrimary: "Upgrade Now",
      buttonSecondary: "See Benefits",
      align: "right",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&h=300"
    }, {
      id: 4,
      title: "Fresh Food Deals",
      description: "Discover amazing local food deals and save on your favorites",
      buttonPrimary: "Browse Deals",
      buttonSecondary: "Learn More",
      align: "left",
      image: "https://x10homes.com/bwtassets/samples/food/burfrideal.gif"
    }, {
      id: 5,
      title: "",
      description: "",
      buttonPrimary: "",
      buttonSecondary: "",
      align: "left",
      image: "https://x10homes.com/bwtassets/samples/food/burfrideal.gif",
      hideOverlay: true,
      hideText: true
    }, {
      id: 6,
      title: "Get Started",
      description: "Learn More",
      buttonPrimary: "Get Started",
      buttonSecondary: "Learn More",
      align: "right",
      image: "https://x10homes.com/bwtassets/samples/food/burfrideal.gif",
      showButtonsOnly: true
    }
  ];

  // Auto-rotation effect with hover pause
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % heroContent.length);
      }, 7000);
      return () => clearInterval(interval);
    }
  }, [heroContent.length, isHovered]);

  const handlePrevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + heroContent.length) % heroContent.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % heroContent.length);
  };

  const handleLearnMoreClick = () => {
    if (currentSlide === 0 && onLearnMoreClick) {
      onLearnMoreClick();
    }
  };

  const currentHero = heroContent[currentSlide];

  return (
    <section 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)} 
      className="relative py-0"
    >
      <div className="h-64 relative overflow-hidden">
        {/* Background Image that changes with content */}
        <div 
          className={`w-full h-64 bg-cover bg-center transition-all duration-1000 ${currentSlide === 5 ? 'pb-[25px]' : ''}`}
          style={{ backgroundImage: `url(${currentHero.image})` }} 
        />
        
        {/* Manual Navigation Arrows */}
        <button 
          onClick={handlePrevSlide} 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-105 z-10"
        >
          <ChevronLeft className="h-4 w-4 text-white" />
        </button>
        <button 
          onClick={handleNextSlide} 
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-105 z-10"
        >
          <ChevronRight className="h-4 w-4 text-white" />
        </button>
        
        {/* Text Overlay with Rotating Content - Only show if not hidden */}
        {!currentHero.hideText && (
          <div className={`absolute inset-0 ${currentHero.hideOverlay || currentHero.showButtonsOnly ? '' : 'bg-black/40'} flex flex-col transition-all duration-1000 ${currentHero.align === 'right' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-md p-8 text-white transition-all duration-1000 ${currentHero.align === 'right' ? 'text-right' : 'text-left'} ${isMobile ? 'flex-1 flex flex-col justify-between' : ''}`}>
              {!currentHero.showButtonsOnly && (
                <div>
                  <h2 className="font-bold mb-4 text-4xl">{currentHero.title}</h2>
                  <p className="text-lg mb-6 opacity-90 px-[24px]">{currentHero.description}</p>
                </div>
              )}
              
              <div className={`flex gap-4 py-0 px-0 mx-0 ${isMobile ? 'pb-[15px]' : currentSlide === 5 ? 'mt-[40px] my-[24px]' : 'my-[24px]'}`}>
                <Button 
                  className="gradient-tribe hover:scale-105 transition-transform" 
                  size={isMobile ? "sm" : "lg"}
                >
                  {currentHero.buttonPrimary}
                </Button>
                <Button 
                  variant="outline" 
                  size={isMobile ? "sm" : "lg"}
                  className="border-purple-500 text-black bg-white/40 hover:bg-white/50 backdrop-blur-sm hover:scale-105 transition-transform"
                  onClick={handleLearnMoreClick}
                >
                  {currentHero.buttonSecondary}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Slide Indicators */}
        <div className="absolute bottom-7 left-1/2 transform -translate-x-1/2 flex space-x--5">
          {heroContent.map((_, index) => 
            <button 
              key={index} 
              onClick={() => setCurrentSlide(index)} 
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white' : 'bg-white/50'}`} 
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

