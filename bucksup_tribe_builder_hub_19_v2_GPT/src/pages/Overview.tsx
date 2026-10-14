import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ChevronLeft, ChevronRight, TrendingUp, Users, DollarSign, Shield, Star, Zap, Award } from 'lucide-react';
import Navigation from '@/components/Navigation';
import BucksUpMemberCard from '@/components/BucksUpMemberCard';
import ReadyToLevelUp from '@/components/ReadyToLevelUp';

const Overview = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  const heroContent = [{
    id: 1,
    title: "Build Your Tribe",
    description: "Join thousands of members building generational wealth together",
    buttonPrimary: "Join Now",
    buttonSecondary: "Learn More",
    align: "right",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&h=300"
  }, {
    id: 2,
    title: "Maximize Your Earnings",
    description: "Unlock powerful strategies to grow your financial future",
    buttonPrimary: "Start Earning",
    buttonSecondary: "View Calculator",
    align: "left",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&h=300"
  }, {
    id: 3,
    title: "Exclusive Membership",
    description: "Access premium features and connect with high-performing members",
    buttonPrimary: "Upgrade Now",
    buttonSecondary: "See Benefits",
    align: "right",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&h=300"
  }];
  const allImages = ["https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&h=300", "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&h=300", "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&h=300", "https://images.unsplash.com/photo-1515378791036-0a1dd7228f2d?auto=format&fit=crop&w=800&h=300", "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&h=300", "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&h=300", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&h=300", "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&h=300", "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=800&h=300", "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&h=300", "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=800&h=300", "https://images.unsplash.com/photo-1556728744382-61accd4aa148?auto=format&fit=crop&w=800&h=300", "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&h=300", "https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&w=800&h=300", "https://images.unsplash.com/photo-1565728744382-61accd4aa148?auto=format&fit=crop&w=800&h=300"];

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
    label: "Growth"
  }, {
    icon: Users,
    color: "bg-green-500",
    label: "Community"
  }, {
    icon: DollarSign,
    color: "bg-yellow-500",
    label: "Earnings"
  }, {
    icon: Shield,
    color: "bg-red-500",
    label: "Security"
  }, {
    icon: Star,
    color: "bg-purple-500",
    label: "Premium"
  }];
  const infoCards = [{
    icon: Zap,
    title: "Lightning Fast Growth",
    description: "Watch your tribe and earnings grow exponentially with our proven system"
  }, {
    icon: Award,
    title: "Premium Rewards",
    description: "Unlock exclusive benefits and bonuses as you reach new milestones"
  }];
  const currentHero = heroContent[currentSlide];
  return <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 space-y-12">
        {/* Single Hero Section with Rotating Content */}
        <section className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
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
                
                <div className="flex gap-4 py-0 px-0 mx-0 my-[20px]">
                  <Button className="gradient-tribe hover:scale-105 transition-transform" size="lg">
                    {currentHero.buttonPrimary}
                  </Button>
                  <Button variant="outline" size="lg" className="border-purple-500 text-purple-500 bg-white/40 hover:bg-white/50 backdrop-blur-sm hover:scale-105 transition-transform">
                    {currentHero.buttonSecondary}
                  </Button>
                </div>
              </div>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {heroContent.map((_, index) => <button key={index} onClick={() => setCurrentSlide(index)} className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white' : 'bg-white/50'}`} />)}
            </div>
          </div>
        </section>

        {/* Features Grid Card */}
        <section className="container mx-auto py-0 px-0 -translate-y-[90%] sm:-translate-y-[65%] md:-translate-y-[47%]">
          <Card className="w-[90%] mx-auto bg-gradient-to-br from-gray-800 via-gray-500 to-gray-700 transform">
            <CardContent className="p-2 sm:p-4 md:p-6 px-[2px]">
              <div className="grid grid-cols-5 gap-2 sm:gap-4 md:gap-8">
                {features.map((feature, index) => <div key={index} className="flex flex-col items-center space-y-2">
                    <div className={`w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 rounded-full ${feature.color} flex items-center justify-center`}>
                      <feature.icon className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 text-white" />
                    </div>
                    <span className="text-white text-xs sm:text-xs md:text-sm font-medium text-center">{feature.label}</span>
                  </div>)}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Member Credit Card - Moved above Info Cards */}
        <section className="container mx-auto px-4">
          <BucksUpMemberCard />
        </section>

        {/* Info Cards */}
        <section className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-[90%] mx-auto">
            {infoCards.map((card, index) => <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="space-y-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                    <card.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">{card.title}</h3>
                  <p className="text-gray-600">{card.description}</p>
                </CardContent>
              </Card>)}
          </div>
        </section>

        {/* Ready to Level Up Section */}
        <section className="container mx-auto px-4">
          <Card className="w-[90%] mx-auto overflow-hidden">
            <CardContent className="p-0">
              <ReadyToLevelUp />
            </CardContent>
          </Card>
        </section>

        <div className="pb-12" />
      </main>
    </div>;
};

export default Overview;

