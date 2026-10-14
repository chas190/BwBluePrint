
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Users, DollarSign, TrendingUp, Star, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import IconDrawer from '@/components/IconDrawer';
import Icon_Goals from './Icon_Goals';
import Icon_Tribes from './Icon_Tribes';
import Icon_BuckUp from './Icon_BuckUp';
import Icon_Member from './Icon_Member';
import Icon_Deals from './Icon_Deals';

const Main3 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [openDrawer, setOpenDrawer] = useState<string | null>(null);

  const heroContent = [
    {
      id: 1,
      title: "Build Your Tribe",
      description: "Vip members building generational wealth together",
      buttonPrimary: "Join Now",
      buttonSecondary: "Learn More",
      align: "right",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&h=300"
    },
    {
      id: 2,
      title: "Costs Into Cash",
      description: (
        <>
          Unlock powerful strategies to<br className="block sm:hidden" /> grow your financial future
        </>
      ),
      buttonPrimary: "Start Earning",
      buttonSecondary: "View Calculator",
      align: "left",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&h=300"
    },
    {
      id: 3,
      title: "VIP Membership",
      description: "Access premium features & connect with high-value deals",
      buttonPrimary: "Upgrade Now",
      buttonSecondary: "See Benefits",
      align: "right",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&h=300"
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

  const features = [
    {
      icon: TrendingUp,
      color: "bg-blue-500",
      label: "Goals",
      onClick: () => setOpenDrawer("Goals")
    },
    {
      icon: Users,
      color: "bg-green-500",
      label: "Tribes",
      onClick: () => setOpenDrawer("Tribes")
    },
    {
      icon: DollarSign,
      color: "bg-yellow-500",
      label: "BuckUp",
      onClick: () => setOpenDrawer("BuckUp")
    },
    {
      icon: Plus,
      color: "bg-red-500",
      label: "Member",
      onClick: () => setOpenDrawer("Member")
    },
    {
      icon: Star,
      color: "bg-purple-500",
      label: "Deals",
      onClick: () => setOpenDrawer("Deals")
    }
  ];

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

  const testimonials = [
    {
      topTitle: "Americans Spend: 16% of house hold income on Car and Gas",
      bottomTitle: "Earn Back 20 to 30% of Gas Costs",
      quote: "BucksUp has completely changed how I think about spending and saving. The tribe community is amazing!",
      name: "Sarah M.",
      role: "Tribe Founder"
    },
    {
      topTitle: "44% Of Income Goes To Housing",
      bottomTitle: "Save & Make Back 10% Higher ROI On Your Biggest Investment, Your Home.",
      quote: "I've saved over $2,000 in the first year just by using the platform. Highly recommend!",
      name: "Mike R.",
      role: "Tribe Member"
    },
    {
      topTitle: "Food & Shopping Cost Homeowners 30% of Income",
      bottomTitle: "Covering These Costs Brings You Closer To Retirement. Amazing!",
      quote: "The rewards system is fantastic. I'm earning money while helping others save too!",
      name: "Jennifer L.",
      role: "Master Chief"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navigation />
      
      {/* Hero Section with Rotating Content */}
      <section className="relative pt-20" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <div className="h-64 relative overflow-hidden">
          {/* Background Image that changes with content */}
          <div 
            className="w-full h-64 bg-cover bg-center transition-all duration-1000" 
            style={{
              backgroundImage: `url(${currentHero.image})`
            }} 
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
          
          {/* Text Overlay with Rotating Content */}
          <div className={`absolute inset-0 bg-black/40 flex items-center transition-all duration-1000 ${currentHero.align === 'right' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-md p-8 text-white transition-all duration-1000 ${currentHero.align === 'right' ? 'text-right' : 'text-left'}`}>
              <h2 className="font-bold mb-4 text-4xl">{currentHero.title}</h2>
              <p className="text-lg mb-6 opacity-90 px-[24px]">{currentHero.description}</p>
              
              <div className="flex gap-4 py-0 px-0 mx-0 my-[24px]">
                <Button className="gradient-tribe hover:scale-105 transition-transform" size="lg">
                  {currentHero.buttonPrimary}
                </Button>
                <Button variant="outline" size="lg" className="border-purple-500 text-purple-500 bg-white/20 hover:bg-white/30 backdrop-blur-sm hover:scale-105 transition-transform">
                  {currentHero.buttonSecondary}
                </Button>
              </div>
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-7 left-1/2 transform -translate-x-1/2 flex space-x--5">
            {heroContent.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid Card */}
      <section className="container mx-auto py-0 px-0 -translate-y-[30%] sm:-translate-y-[20%] md:-translate-y-[15%]">
        <Card className="w-[90%] mx-auto bg-gradient-to-br from-gray-800 via-gray-500 to-gray-700 transform">
          <CardContent className="p-2 sm:p-4 md:p-6 px-[2px]">
            <div className="grid grid-cols-5 gap-2 sm:gap-4 md:gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center space-y-2 cursor-pointer transform transition-all duration-200 hover:scale-110 hover:bg-white/10 rounded-lg p-2"
                  onClick={feature.onClick}
                >
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 rounded-full ${feature.color} flex items-center justify-center transition-shadow duration-200 hover:shadow-lg`}>
                    <feature.icon className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 text-white" />
                  </div>
                  <span className="text-white text-xs sm:text-xs md:text-sm font-medium text-center">{feature.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Hero Section */}
      <div className="pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Welcome to BucksUp
            </h1>
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
        </div>
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
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="font-bold text-gray-900 mb-2 text-xl">{testimonial.topTitle}</h3>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <div className="text-lg font-semibold text-green-600 mb-4">{testimonial.bottomTitle}</div>
                  </div>
                  <p className="text-gray-600 mb-4 italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </CardContent>
              </Card>
            ))}
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

      {/* Icon Drawer */}
      <IconDrawer isOpen={!!openDrawer} onClose={() => setOpenDrawer(null)} title={openDrawer || ""}>
        {renderDrawerContent()}
      </IconDrawer>
    </div>
  );
};

export default Main3;

