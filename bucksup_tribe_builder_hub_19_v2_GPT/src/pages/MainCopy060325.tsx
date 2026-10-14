import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogDescription } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ArrowRight, Users, DollarSign, TrendingUp, Star, ChevronLeft, ChevronRight, Plus, ShoppingCart, BookOpen, Store, X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import IconDrawer from '@/components/IconDrawer';
import Icon_Goals from './Icon_Goals';
import Icon_Tribes from './Icon_Tribes';
import Icon_BuckUp from './Icon_BuckUp';
import Icon_Member from './Icon_Member';
import Icon_Deals from './Icon_Deals';
import DashboardStats from '@/components/DashboardStats';
import AmazonSuccessPopup from '@/components/AmazonSuccessPopup';

const MainCopy060325 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
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
  const [showAmazonSuccessPopup, setShowAmazonSuccessPopup] = useState(false);

  // Move handleBuyOrSellClick function here, before topCards array
  const handleBuyOrSellClick = () => {
    if (demoToggle) {
      setShowVipBenefitsDialog(true);
    } else {
      setShowBuyStuffDialog(true);
    }
  };

  const heroContent = [{
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
  }];

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
  const features = [{
    icon: TrendingUp,
    color: "bg-blue-500",
    label: "Goals",
    onClick: () => setOpenDrawer("Goals")
  }, {
    icon: Users,
    color: "bg-green-500",
    label: "Tribes",
    onClick: () => setOpenDrawer("Tribes")
  }, {
    icon: DollarSign,
    color: "bg-yellow-500",
    label: "BuckUp",
    onClick: () => setOpenDrawer("BuckUp")
  }, {
    icon: Plus,
    color: "bg-red-500",
    label: "Member",
    onClick: () => setOpenDrawer("Member")
  }, {
    icon: Star,
    color: "bg-purple-500",
    label: "Deals",
    onClick: () => setOpenDrawer("Deals")
  }];
  const currentHero = heroContent[currentSlide];
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
  const testimonials = [{
    topTitle: "Americans Spend: 16% of house hold income on Car and Gas",
    bottomTitle: "Earn Back 20 to 30% of Gas Costs",
    quote: "BucksUp has completely changed how I think about spending and saving. The tribe community is amazing!",
    name: "Sarah M.",
    role: "Tribe Founder"
  }, {
    topTitle: "44% Of Income Goes To Housing",
    bottomTitle: "Save & Make Back 10% Higher ROI On Your Biggest Investment, Your Home.",
    quote: "I've saved over $2,000 in the first year just by using the platform. Highly recommend!",
    name: "Mike R.",
    role: "Tribe Member"
  }, {
    topTitle: "Food & Shopping Cost Homeowners 30% of Income",
    bottomTitle: "Covering These Costs Brings You Closer To Retirement. Amazing!",
    quote: "The rewards system is fantastic. I'm earning money while helping others save too!",
    name: "Jennifer L.",
    role: "Master Chief"
  }];
  const topCards = [{
    title: "Buy or Sell",
    icon: ShoppingCart,
    gradient: "bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600",
    onClick: handleBuyOrSellClick
  }, {
    title: "New Programs",
    icon: BookOpen,
    gradient: "bg-gradient-to-br from-purple-400 via-violet-500 to-indigo-600",
    onClick: () => setShowNewProgramsDialog(true)
  }, {
    title: "Marketplace",
    icon: Store,
    gradient: "bg-gradient-to-br from-orange-400 via-red-500 to-pink-600",
    onClick: () => setShowGrowTribeDialog(true)
  }];
  const handleCategorySelect = (category: string) => {
    setShowVipBenefitsDialog(false);
    if (category === 'Online Shopping') {
      setShowBuyStuffDialog(true);
    } else {
      setSelectedCategory(category);
      setShowCategoryDialog(true);
    }
  };
  const handleAmazonClick = () => {
    setShowAmazonDialog(true);
  };

  const handleAmazonRedirect = () => {
    setShowAmazonDialog(false);
    setShowBuyStuffDialog(false);
    setShowAmazonSuccessPopup(true);
  };

  const handleOnlineStore2Click = () => {
    setShowBuyStuffDialog(false);
    setShowComingSoonDialog(true);
  };
  const handleComingSoonClick = () => {
    setShowBuyStuffDialog(false);
    setShowComingSoonDialog(true);
  };
  const handleBwTownVipDirectClick = () => {
    setShowBuyStuffDialog(false);
    // Add VIP functionality if needed
  };
  const handleCategoryOptionClick = () => {
    setShowCategoryDialog(false);
    setShowComingSoonDialog(true);
  };
  const handleDemoModeClick = () => {
    setShowBuyStuffDialog(false);
    setShowVipBenefitsDialog(true);
  };
  const getCategoryOptions = (category: string) => {
    const options = {
      'Local Food & Stuff': ['Grocery Stores', 'Restaurants', 'Farmers Markets', 'Local Vendors', 'Specialty Foods', 'BwFarms'],
      'Automotive': ['Car Dealers', 'Auto Parts', 'Car Rentals', 'Auto Services', 'Car Insurance'],
      'Housing': ['Real Estate', 'Home Improvement', 'Furniture', 'Home Insurance', 'Moving Services'],
      'Bank & Finance': ['Banking', 'Credit Cards', 'Loans', 'Investment', 'Insurance'],
      'Other': ['Travel', 'Health & Wellness', 'Entertainment', 'Education', 'Professional Services']
    };
    return options[category as keyof typeof options] || [];
  };
  const getDialogBackgroundClass = (category: string) => {
    switch (category) {
      case 'Local Food & Stuff':
        return 'bg-orange-200';
      case 'Automotive':
        return 'bg-indigo-200';
      case 'Housing':
        return 'bg-teal-200';
      case 'Bank & Finance':
        return 'bg-cyan-200';
      case 'Other':
        return 'bg-violet-200';
      default:
        return '';
    }
  };
  return <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navigation />
      
      {/* Hero Section with Rotating Content */}
      <section className="relative pt-20" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <div className="h-64 relative overflow-hidden">
          {/* Background Image that changes with content */}
          <div className="w-full h-64 bg-cover bg-center transition-all duration-1000" style={{
          backgroundImage: `url(${currentHero.image})`
        }} />
          
          {/* Manual Navigation Arrows */}
          <button onClick={handlePrevSlide} className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-105 z-10">
            <ChevronLeft className="h-4 w-4 text-white" />
          </button>
          <button onClick={handleNextSlide} className="absolute right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-105 z-10">
            <ChevronRight className="h-4 w-4 text-white" />
          </button>
          
          {/* Text Overlay with Rotating Content */}
          <div className={`absolute inset-0 bg-black/40 flex items-center transition-all duration-1000 ${currentHero.align === 'right' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-md p-8 text-white transition-all duration-1000 ${currentHero.align === 'right' ? 'text-right' : 'text-left'}`}>
              <h2 className="font-bold mb-4 text-4xl">{currentHero.title}</h2>
              <p className="text-lg mb-6 opacity-90 px-[24px]">{currentHero.description}</p>
              
              <div className="flex gap-4 py-0 px-0 mx-0 my-[24px]">
                <Button className="gradient-tribe hover:scale-105 transition-transform" size="lg">
                  {currentHero.buttonPrimary}
                </Button>
                <Button variant="outline" size="lg" className="border-purple-500 text-black bg-white/40 hover:bg-white/50 backdrop-blur-sm hover:scale-105 transition-transform">
                  {currentHero.buttonSecondary}
                </Button>
              </div>
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-7 left-1/2 transform -translate-x-1/2 flex space-x--5">
            {heroContent.map((_, index) => <button key={index} onClick={() => setCurrentSlide(index)} className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white' : 'bg-white/50'}`} />)}
          </div>
        </div>
      </section>

      {/* Features Grid Card */}
      <section className="container mx-auto py-0 px-0 -translate-y-[30%] sm:-translate-y-[20%] md:-translate-y-[15%]">
        <Card className="w-[90%] mx-auto bg-gradient-to-br from-gray-800 via-gray-500 to-gray-700 transform">
          <CardContent className="p-2 sm:p-4 md:p-6 px-[2px]">
            <div className="grid grid-cols-5 gap-2 sm:gap-4 md:gap-8">
              {features.map((feature, index) => <div key={index} className="flex flex-col items-center space-y-2 cursor-pointer transform transition-all duration-200 hover:scale-110 hover:bg-white/10 rounded-lg p-2" onClick={feature.onClick}>
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 rounded-full ${feature.color} flex items-center justify-center transition-shadow duration-200 hover:shadow-lg`}>
                    <feature.icon className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 text-white" />
                  </div>
                  <span className="text-white text-xs sm:text-xs md:text-sm font-medium text-center">{feature.label}</span>
                </div>)}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto py-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          What Our Tribe Members Are Saying
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="shadow-lg">
              <CardContent className="p-6">
                <p className="text-sm text-gray-500 italic mb-2">{testimonial.topTitle}</p>
                <p className="text-lg text-gray-700 font-semibold mb-4">{testimonial.bottomTitle}</p>
                <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="ml-3">
                    <div className="text-sm font-semibold text-gray-800">{testimonial.name}</div>
                    <div className="text-xs text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Top Cards Section */}
      <section className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topCards.map((card, index) => (
            <Card key={index} className="shadow-md cursor-pointer transform transition-transform duration-200 hover:scale-105" onClick={card.onClick}>
              <div className={`h-32 rounded-md ${card.gradient} flex items-center justify-center text-white text-2xl font-bold`}>
                <card.icon className="mr-2" size={40} />
                {card.title}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Collapsible Wealth Building Dashboard Section */}
      <section className="container mx-auto px-4 py-12">
        <Collapsible open={isWealthBuildingOpen} onOpenChange={setIsWealthBuildingOpen}>
          <Card className="w-full shadow-lg">
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full rounded-none h-16">
                <div className="flex items-center justify-between w-full">
                  <h2 className="text-xl font-semibold">Wealth Building Dashboard</h2>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isWealthBuildingOpen ? "rotate-180" : ""}`} />
                </div>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4">
              <DashboardStats />
            </CollapsibleContent>
          </Card>
        </Collapsible>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Ready to Join Our Tribe?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Start saving, earning, and building wealth with a supportive community.
          </p>
          <Link to="/signup">
            <Button className="gradient-tribe hover:scale-105 transition-transform" size="lg">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Dialogs Container */}
      <Dialog open={showNewProgramsDialog} onOpenChange={setShowNewProgramsDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>New Programs</DialogTitle>
            <DialogDescription>
              Explore our latest programs designed to help you save and earn more.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="email" className="text-right text-gray-600">
                Program 1:
              </label>
              <p className="col-span-3">Details about Program 1...</p>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="email" className="text-right text-gray-600">
                Program 2:
              </label>
              <p className="col-span-3">Details about Program 2...</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showGrowTribeDialog} onOpenChange={setShowGrowTribeDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Grow Your Tribe</DialogTitle>
            <DialogDescription>
              Discover ways to expand your tribe and increase your earning potential.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="email" className="text-right text-gray-600">
                Referral Program:
              </label>
              <p className="col-span-3">Details about Referral Program...</p>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="email" className="text-right text-gray-600">
                Community Events:
              </label>
              <p className="col-span-3">Details about Community Events...</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showDemoDialog} onOpenChange={setShowDemoDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Demo Mode</DialogTitle>
            <DialogDescription>
              Experience the platform with a demo account.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <p>Activate demo mode to explore the features.</p>
            <Switch id="demo-mode" onCheckedChange={setDemoToggle} />
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showVipBenefitsDialog} onOpenChange={setShowVipBenefitsDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>VIP Benefits</DialogTitle>
            <DialogDescription>
              Exclusive benefits for VIP members.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <p>Access premium deals and rewards.</p>
            <ul>
              <li>Exclusive discounts</li>
              <li>Priority support</li>
              <li>Early access to new features</li>
            </ul>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showBuyStuffDialog} onOpenChange={setShowBuyStuffDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Buy Stuff</DialogTitle>
            <DialogDescription>
              Find great deals on products and services.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Button onClick={handleAmazonClick}>Shop on Amazon</Button>
            <Button onClick={handleOnlineStore2Click}>Shop Online Store 2</Button>
            <Button onClick={handleComingSoonClick}>Shop Coming Soon</Button>
            <Button onClick={handleBwTownVipDirectClick}>Shop BwTown VIP Direct</Button>
            <Button onClick={handleDemoModeClick}>Shop Demo Mode</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showAmazonDialog} onOpenChange={setShowAmazonDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Amazon</DialogTitle>
            <DialogDescription>
              Redirecting to Amazon...
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <p>You are about to be redirected to Amazon.</p>
            <Button onClick={handleAmazonRedirect}>Continue to Amazon</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showCategoryDialog} onOpenChange={setShowCategoryDialog}>
        <DialogContent className={`max-w-md ${getDialogBackgroundClass(selectedCategory)}`}>
          <DialogHeader>
            <DialogTitle>{selectedCategory}</DialogTitle>
            <DialogDescription>
              Explore options in {selectedCategory}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {getCategoryOptions(selectedCategory).map((option, index) => (
              <Button key={index} onClick={handleCategoryOptionClick}>{option}</Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showComingSoonDialog} onOpenChange={setShowComingSoonDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Coming Soon</DialogTitle>
            <DialogDescription>
              This feature is coming soon!
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <p>Stay tuned for updates.</p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showAmazonSuccessPopup} onOpenChange={setShowAmazonSuccessPopup}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Success!</DialogTitle>
            <DialogDescription>
              You have been redirected to Amazon.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <p>Happy shopping!</p>
          </div>
        </DialogContent>
      </Dialog>
      
      <div className="text-center text-gray-500 text-sm p-4">
        <p>Original Main Page - Copied 06/03/25</p>
      </div>
      
      <IconDrawer isOpen={!!openDrawer} onClose={() => setOpenDrawer(null)} title={openDrawer || ""}>
        {renderDrawerContent()}
      </IconDrawer>
    </div>;
};

export default MainCopy060325;

