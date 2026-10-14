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

const Main = () => {
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

      {/* Collapsible Welcome Section */}
      <div className="container mx-auto md:px-6 pb-8 px-[11px]">
        <Collapsible open={isWelcomeOpen} onOpenChange={setIsWelcomeOpen}>
          <Card className="w-full shadow-lg py-[9px]">
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

      {/* Top Cards Section - Positioned after the welcome section */}
      <div className="container mx-auto px-4 md:px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {topCards.map((card, index) => <Card key={index} className={`${card.gradient} border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105`} onClick={card.onClick}>
              <CardContent className="p-8 text-center px-[33px]">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <card.icon className="w-8 h-8 text-gray-700" />
                </div>
                <h3 className="text-xl font-semibold text-white">{card.title}</h3>
              </CardContent>
            </Card>)}
        </div>
      </div>

      {/* Collapsible Wealth Building Dashboard Section */}
      <div className="container mx-auto px-4 md:px-6 pb-16">
        <Collapsible open={isWealthBuildingOpen} onOpenChange={setIsWealthBuildingOpen}>
          <Card className="w-full shadow-lg">
            <CollapsibleTrigger asChild>
              <div className="cursor-pointer p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="text-center flex-1">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
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

      {/* Features Section */}
      <div className="bg-white/50 py-[45px]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Why Choose BucksUp?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join thousands of members who are already building wealth together
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Build Your Tribe</h3>
                <p className="text-gray-600 leading-relaxed">
                  Connect with like-minded individuals and grow your network while building wealth together.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <DollarSign className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Save Money</h3>
                <p className="text-gray-600 leading-relaxed">
                  Access exclusive deals and discounts from local businesses and online retailers.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Earn Rewards</h3>
                <p className="text-gray-600 leading-relaxed">
                  Get rewarded for your purchases and referrals. Watch your wealth grow over time.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Awsome Deals &amp; Vip Perks</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="font-bold text-gray-900 mb-2 text-xl">{testimonial.topTitle}</h3>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />)}
                    </div>
                    <div className="text-lg font-semibold text-green-600 mb-4">{testimonial.bottomTitle}</div>
                  </div>
                  <p className="text-gray-600 mb-4 italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Building Wealth?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join our community today and start your journey towards financial freedom.
          </p>
          <Link to="/auth">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
              Join BucksUp Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Amazon Dialog */}
      <Dialog open={showAmazonDialog} onOpenChange={setShowAmazonDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">Amazon Shopping</DialogTitle>
            <DialogDescription className="sr-only">
              Access Amazon through our affiliate link to support BucksUp
            </DialogDescription>
          </DialogHeader>
          <div className="py-6 text-center space-y-4">
            <p className="text-lg text-gray-600">
              Shop on Amazon and support BucksUp through our affiliate partnership!
            </p>
            <p className="text-sm text-gray-500">
              When you shop through our link, we earn a small commission at no extra cost to you.
            </p>
            <Button 
              onClick={handleAmazonRedirect} 
              className="gradient-prosperity text-white px-8 py-3 text-lg font-semibold w-full"
            >
              Shop on Amazon
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* VIP Member Benefits Dialog */}
      <Dialog open={showVipBenefitsDialog} onOpenChange={setShowVipBenefitsDialog}>
        <DialogContent className="max-w-2xl bg-sky-200">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">Buy & Sell VIP Member Benefits</DialogTitle>
            <DialogDescription className="sr-only">
              Choose a category to see the best options for your lifestyle
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-center text-gray-600 mb-6">
              Pick the category to see the current best options for your best life.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Button onClick={() => handleCategorySelect('Online Shopping')} variant="outline" className="h-20 flex flex-col items-center justify-center">
                <ShoppingCart className="w-6 h-6 mb-2" />
                Online Shopping
              </Button>
              <Button onClick={() => handleCategorySelect('Local Food & Stuff')} variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Users className="w-6 h-6 mb-2" />
                Local Food & Stuff
              </Button>
              <Button onClick={() => handleCategorySelect('Automotive')} variant="outline" className="h-20 flex flex-col items-center justify-center">
                <ShoppingCart className="w-6 h-6 mb-2" />
                Automotive
              </Button>
              <Button onClick={() => handleCategorySelect('Housing')} variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Users className="w-6 h-6 mb-2" />
                Housing
              </Button>
              <Button onClick={() => handleCategorySelect('Bank & Finance')} variant="outline" className="h-20 flex flex-col items-center justify-center">
                <ShoppingCart className="w-6 h-6 mb-2" />
                Bank & Finance
              </Button>
              <Button onClick={() => handleCategorySelect('Other')} variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Users className="w-6 h-6 mb-2" />
                Other
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Buy Stuff Dialog */}
      <Dialog open={showBuyStuffDialog} onOpenChange={setShowBuyStuffDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-4xl font-bold">Buy, Sell or Profit Share</DialogTitle>
            <DialogDescription className="sr-only">
              Choose how you want to buy, sell, or profit share
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <Button onClick={handleAmazonClick} className="gradient-prosperity h-20 flex flex-col items-center justify-center text-white">
              <div className="font-semibold text-xl">Amazon</div>
              <div className="text-xs mt-0 hidden sm:block">
                <span>Shop Great Deals -</span>
                <span> READY NOW</span>
              </div>
            </Button>
            <Button onClick={handleOnlineStore2Click} className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 h-20 flex flex-col items-center justify-center text-white">
              <div className="font-semibold text-xl">Online Store 2</div>
              <div className="text-xs mt-0 hidden sm:block">
                Super Deals - Coming Soon
              </div>
            </Button>
            {demoToggle && (
              <>
                <Button onClick={handleComingSoonClick} className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 h-24 sm:h-34 flex flex-col items-center justify-center text-white">
                  <div className="font-semibold text-xl">
                    More Online<br className="block sm:hidden" /> Deals
                  </div>
                  <div className="text-xs mt-0 hidden sm:block">Many Perks - Coming Soon</div>
                </Button>
                <Button onClick={handleBwTownVipDirectClick} className="bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 h-24 sm:h-34 flex flex-col items-center justify-center text-white">
                  <div className="font-semibold text-xl">
                    BwTown VIP<br className="block sm:hidden" /> Direct
                  </div>
                  <div className="text-xs mt-0 hidden sm:block">
                    Member Saving & Profit Share
                  </div>
                </Button>
              </>
            )}
          </div>
          
          {/* Demo Section */}
          <div className="flex items-center justify-between pt-4 border-t">
            {demoToggle && (
              <Button onClick={handleDemoModeClick} variant="outline" className="px-6">
                Demo Mode
              </Button>
            )}
            <div className="flex items-center space-x-2 ml-auto">
              <span className="text-sm font-medium">Demo</span>
              <Switch checked={demoToggle} onCheckedChange={setDemoToggle} />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dynamic Category Dialog */}
      <Dialog open={showCategoryDialog} onOpenChange={setShowCategoryDialog}>
        <DialogContent className={getDialogBackgroundClass(selectedCategory)}>
          <DialogHeader>
            <DialogTitle>{selectedCategory}</DialogTitle>
            <DialogDescription className="sr-only">
              Select an option from the {selectedCategory} category
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            {getCategoryOptions(selectedCategory).map(option => <Button key={option} onClick={handleCategoryOptionClick} variant="outline" className="h-16 flex items-center justify-center">
                {option}
              </Button>)}
          </div>
        </DialogContent>
      </Dialog>

      {/* Coming Soon Dialog */}
      <Dialog open={showComingSoonDialog} onOpenChange={setShowComingSoonDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Coming Soon</DialogTitle>
            <DialogDescription className="sr-only">
              This feature will be available soon
            </DialogDescription>
          </DialogHeader>
          <p className="py-4">This feature will be available soon!</p>
        </DialogContent>
      </Dialog>

      {/* New Programs Dialog */}
      <Dialog open={showNewProgramsDialog} onOpenChange={setShowNewProgramsDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center mb-4">New Programs</DialogTitle>
            <DialogDescription className="sr-only">
              Information about new programs coming soon
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Exciting New Programs Coming Soon!</h3>
              <p className="text-gray-600 mb-6">
                We're constantly working on new ways to help you build wealth and grow your tribe. 
                Here are some of the exciting programs we're developing:
              </p>
            </div>
            
            <div className="grid gap-4">
              <Card className="p-4">
                <h4 className="font-semibold text-lg mb-2">Home Selling More Money Credits</h4>
                <p className="text-gray-600">Maximize your home's value and earn additional credits when selling your property.</p>
              </Card>
              
              <Card className="p-4">
                <h4 className="font-semibold text-lg mb-2">Car Savings & New Revenues</h4>
                <p className="text-gray-600">Discover innovative ways to save on car expenses and generate new income streams from your vehicle.</p>
              </Card>
              
              <Card className="p-4">
                <h4 className="font-semibold text-lg mb-2">Investment Masterclass</h4>
                <p className="text-gray-600">Learn advanced investment strategies from industry experts.</p>
              </Card>
              
              <Card className="p-4">
                <h4 className="font-semibold text-lg mb-2">Tribe Leadership Program</h4>
                <p className="text-gray-600">Develop skills to lead and grow your tribe effectively.</p>
              </Card>
              
              <Card className="p-4">
                <h4 className="font-semibold text-lg mb-2">Financial Freedom Blueprint</h4>
                <p className="text-gray-600">A step-by-step guide to achieving financial independence.</p>
              </Card>
            </div>
            
            <div className="text-center pt-4">
              <Button className="gradient-main text-white">
                Get Notified When Available
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Grow Tribe Dialog */}
      <Dialog open={showGrowTribeDialog} onOpenChange={setShowGrowTribeDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">Coming Soon to Your Area</DialogTitle>
            <DialogDescription className="sr-only">
              Information about expanding to new markets
            </DialogDescription>
          </DialogHeader>
          <div className="text-center space-y-6">
            <p className="text-gray-600">
              We're expanding to new markets! Get ready for amazing opportunities in your area.
            </p>
            
            <div className="space-y-3">
              <Button className="w-full gradient-tribe text-white" onClick={() => {
              setShowGrowTribeDialog(false);
              // Add learn more functionality here
            }}>
                Would Like to Learn More
              </Button>
              
              <Button variant="outline" className="w-full" onClick={() => {
              setShowGrowTribeDialog(false);
              setShowDemoDialog(true);
            }}>
                See Demo Marketplace
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Demo Marketplace Dialog */}
      <Dialog open={showDemoDialog} onOpenChange={setShowDemoDialog}>
        <DialogContent className="max-w-6xl max-h-[90vh] p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-xl font-bold">Demo Marketplace</DialogTitle>
            <DialogDescription className="sr-only">
              Demo marketplace showing available features
            </DialogDescription>
            <DialogClose className="absolute right-4 top-4">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </DialogHeader>
          <div className="h-[80vh]">
            <iframe src="https://bwtownvip.lovable.app/" className="w-full h-full border-0" title="Demo Marketplace" />
          </div>
        </DialogContent>
      </Dialog>

      {/* Amazon Success Popup */}
      <AmazonSuccessPopup 
        open={showAmazonSuccessPopup} 
        onOpenChange={setShowAmazonSuccessPopup} 
      />

      {/* Icon Drawer */}
      <IconDrawer isOpen={!!openDrawer} onClose={() => setOpenDrawer(null)} title={openDrawer || ""}>
        {renderDrawerContent()}
      </IconDrawer>
    </div>;
};

export default Main;

