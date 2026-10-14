import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Store, Utensils, Car, Home, ShoppingBag, Scissors } from "lucide-react";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import TransparentFeaturesCard from "./TransparentFeaturesCard";
const ImageGalleryCarousel = () => {
  const [showDealsDialog, setShowDealsDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showTransparentCard, setShowTransparentCard] = useState(true); // Default to visible
  const isMobile = useIsMobile();

  // Load transparent card visibility setting from localStorage
  useEffect(() => {
    const savedTransparentCard = localStorage.getItem('devSettings_showTransparentCard');
    if (savedTransparentCard !== null) {
      setShowTransparentCard(JSON.parse(savedTransparentCard));
    }
  }, []);

  // Local business category cards
  const galleryCards = [{
    id: 1,
    title: "Local Restaurants",
    subtitle: "Up to 50% Off Meals",
    bgColor: "from-orange-500 to-red-600",
    topBarColor: "bg-orange-800",
    icon: Utensils,
    category: "restaurants",
    image: "photo-1618160702438-9b02ab6515c9",
    cardTitle: "Fresh Dining",
    cardDescription: "Best local flavors"
  }, {
    id: 2,
    title: "Auto Services",
    subtitle: "Member Discounts",
    bgColor: "from-blue-500 to-indigo-600",
    topBarColor: "bg-blue-800",
    icon: Car,
    category: "automotive",
    image: "photo-1449824913935-59a10b8d2000",
    cardTitle: "Expert Care",
    cardDescription: "Professional auto"
  }, {
    id: 3,
    title: "Home & Garden",
    subtitle: "Super Savings 70% Off",
    bgColor: "from-green-500 to-teal-600",
    topBarColor: "bg-green-800",
    icon: Home,
    category: "home-garden",
    image: "photo-1465146344425-f00d5f5c8f07",
    cardTitle: "Garden Paradise",
    cardDescription: "Transform space"
  }, {
    id: 4,
    title: "Local Shopping",
    subtitle: "VIP Benefits",
    bgColor: "from-purple-500 to-pink-600",
    topBarColor: "bg-purple-800",
    icon: ShoppingBag,
    category: "shopping",
    image: "photo-1500673922987-e212871fec22",
    cardTitle: "Style & Fashion",
    cardDescription: "Unique local finds"
  }, {
    id: 5,
    title: "Health & Beauty",
    subtitle: "Exclusive Deals",
    bgColor: "from-pink-500 to-rose-600",
    topBarColor: "bg-pink-800",
    icon: Scissors,
    category: "health-beauty",
    image: "photo-1522337360788-8b13dee7a37e",
    cardTitle: "Wellness & Care",
    cardDescription: "Premium services"
  }, {
    id: 6,
    title: "Local Services",
    subtitle: "Member Specials",
    bgColor: "from-teal-500 to-cyan-600",
    topBarColor: "bg-teal-800",
    icon: Store,
    category: "services",
    image: "photo-1556742049-0cfed4f6a45d",
    cardTitle: "Professional Help",
    cardDescription: "Quality services"
  }];

  // Full-width deal cards data
  const fullWidthDeals = [{
    id: 1,
    title: "Best Local Restaurant Deals",
    description: "Save up to 60% on your favorite local dining spots. From pizza to fine dining, discover amazing deals near you.",
    image: "photo-1618160702438-9b02ab6515c9",
    savings: "Up to 60% Off"
  }, {
    id: 2,
    title: "Home & Garden Super Savings",
    description: "Transform your home with exclusive member discounts. Garden supplies, home improvement, and decor deals.",
    image: "photo-1465146344425-f00d5f5c8f07",
    savings: "70% Off Selected Items"
  }, {
    id: 3,
    title: "Local Shopping VIP Benefits",
    description: "Exclusive access to local boutiques and specialty stores. Member-only pricing and early access to sales.",
    image: "photo-1500673922987-e212871fec22",
    savings: "VIP Member Pricing"
  }];
  const handleViewDeals = (category: string) => {
    setSelectedCategory(category);
    setShowDealsDialog(true);
  };
  return <>
      <div className="w-full bg-gradient-to-br from-indigo-600 via-blue-800 to-indigo-500 touch-pan-y py-[11px]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-6">
            <h5 className="text-2xl md:text-3xl font-bold text-white mb-2">
              BwTown Local Deals & Specials
            </h5>
            <p className="text-indigo-100 text-lg">Discover local stores &amp; VIP Benefits</p>
          </div>
          
          <Carousel opts={{
          align: "start",
          loop: true,
          dragFree: true,
          containScroll: "trimSnaps"
        }} className="w-full max-w-7xl mx-auto touch-pan-x">
            <CarouselContent className={`${isMobile ? '-ml-1' : '-ml-2 md:-ml-4'}`}>
              {galleryCards.map(card => <CarouselItem key={card.id} className={`${isMobile ? 'pl-1' : 'pl-2 md:pl-4'} basis-1/2 md:basis-1/3 lg:basis-1/4`}>
                  <div className="p-1">
                    <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                      <CardContent className="p-0">
                        <AspectRatio ratio={isMobile ? 9 / 20.8 : 9 / 16} className="w-full">
                          <div className={`w-full h-full bg-gradient-to-br ${card.bgColor} rounded-lg flex flex-col relative overflow-hidden`}>
                            {/* Top Bar */}
                            <div className={`${card.topBarColor} w-full px-4 py-2 flex items-center justify-between rounded-t-lg`}>
                              <card.icon className="w-5 h-5 text-white" />
                              <Badge className="bg-black/80 text-white hover:bg-black/90 cursor-pointer text-xs px-2 py-1" onClick={() => handleViewDeals(card.category)}>
                                View Deals
                              </Badge>
                            </div>

                            {/* Main content area */}
                            <div className="flex-1 px-2 flex flex-col relative">
                              {/* Decorative background pattern */}
                              <div className="absolute inset-0 opacity-20">
                                <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-white/10"></div>
                                <div className="absolute bottom-1/3 left-4 w-8 h-8 rounded-full bg-white/10"></div>
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-white/5"></div>
                              </div>
                              
                              {/* Title and paragraph text - above image card */}
                              <div className="relative z-10 text-white pt-1 pb-0 mb-1">
                                <h3 className={`font-bold truncate ${isMobile ? 'text-[0.9rem] leading-[1.1] max-w-full' : 'text-[0.7rem] sm:text-[0.75rem] md:text-[0.8rem] lg:text-[0.85rem] leading-[1.1] max-w-full'} whitespace-nowrap overflow-hidden text-ellipsis`}>
                                  {card.title}
                                </h3>
                                <p className={`opacity-90 truncate mb-1 ${isMobile ? 'text-[0.75rem] leading-[1.1] max-w-full' : 'text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] lg:text-[0.8rem] leading-[1.1] max-w-full'} whitespace-nowrap overflow-hidden text-ellipsis`}>
                                  {card.subtitle}
                                </p>
                              </div>

                              {/* Image Card - set to 85% height */}
                              <div className="h-[85%] pb-6">
                                <div className="relative h-full rounded-lg overflow-hidden bg-black/20 backdrop-blur-sm">
                                  <img src={`https://images.unsplash.com/${card.image}?auto=format&fit=crop&w=300&q=80`} alt={card.cardTitle} className="w-full h-full object-cover" />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                  <div className="absolute bottom-1 left-2 right-2 text-white">
                                    <div className="flex items-center mb-1">
                                      <card.icon className="w-3 h-3 mr-1" />
                                      <h4 className="text-xs font-semibold">{card.cardTitle}</h4>
                                    </div>
                                    <p className="text-xs opacity-90 leading-tight">{card.cardDescription}</p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Bottom Dive Section */}
                            <div className="bg-black/50 backdrop-blur-sm px-4 py-3 relative z-20">
                              <div className="text-white text-center">
                                <p className="text-sm font-semibold mb-2">EXCLUSIVE DEALS</p>
                                <Button className="w-4/5 bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm" onClick={() => handleViewDeals(card.category)}>
                                  Shop Now
                                </Button>
                              </div>
                            </div>
                          </div>
                        </AspectRatio>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>)}
            </CarouselContent>
            <CarouselPrevious className="text-white border-white/30 hover:bg-white/20 hover:text-white" />
            <CarouselNext className="text-white border-white/30 hover:bg-white/20 hover:text-white" />
          </Carousel>

          {/* Transparent Features Card - conditionally rendered above Hot Local Deals */}
          {showTransparentCard && <TransparentFeaturesCard />}

          {/* H5 Heading for Hot Local Deals - improved spacing */}
          <div className="container mx-auto px-4 md:px-6 mt-12">
            <h5 className="text-2xl md:text-3xl font-bold text-white text-left mb-8 px-1" style={{
            marginLeft: isMobile ? '2%' : '0',
            marginRight: isMobile ? '2%' : '0'
          }}>
              BwTown Hot Local Deals
            </h5>
          </div>

          {/* Full Width Deal Cards - Mobile Vertical Layout */}
          <div className="mt-0 space-y-6 rounded-none px-1" style={{
          marginLeft: isMobile ? '2%' : '0',
          marginRight: isMobile ? '2%' : '0'
        }}>
            {fullWidthDeals.map(deal => <Card key={deal.id} className="w-full max-w-6xl mx-auto shadow-lg hover:shadow-xl transition-shadow py-0 my-[8px]">
                <CardContent className="p-0">
                  {/* Mobile: Vertical Layout */}
                  {isMobile ? <div className="flex flex-col">
                      {/* Image Section - Mobile */}
                      <div className="w-full h-48">
                        <img src={`https://images.unsplash.com/${deal.image}?auto=format&fit=crop&w=400&q=80`} alt={deal.title} className="w-full h-full object-cover rounded-t-lg" />
                      </div>
                      
                      {/* Content Section - Mobile */}
                      <div className="p-4 bg-white rounded-b-lg">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-lg font-bold text-gray-900 leading-tight pr-2 flex-1">
                            {deal.title}
                          </h3>
                          <Badge className="bg-green-600 text-white hover:bg-green-700 flex-shrink-0">
                            {deal.savings}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                          {deal.description}
                        </p>
                        <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                          View Deals
                        </Button>
                      </div>
                    </div> : (/* Desktop: Horizontal Layout */
              <div className="flex flex-row h-32">
                      {/* Image Section - Desktop */}
                      <div className="w-1/3 h-full">
                        <img src={`https://images.unsplash.com/${deal.image}?auto=format&fit=crop&w=400&q=80`} alt={deal.title} className="w-full h-full object-cover rounded-l-lg" />
                      </div>
                      
                      {/* Content Section - Desktop */}
                      <div className="flex-1 p-6 flex flex-col justify-between bg-white rounded-r-lg">
                        <div className="px-0">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-xl font-bold text-gray-900 pr-2" style={{
                        lineHeight: '1.2'
                      }}>
                              {deal.title}
                            </h3>
                            <Badge className="bg-green-600 text-white hover:bg-green-700 ml-2 flex-shrink-0">
                              {deal.savings}
                            </Badge>
                          </div>
                          <p className="text-gray-600 text-sm leading-relaxed" style={{
                      lineHeight: '1.5'
                    }}>
                            {deal.description}
                          </p>
                        </div>
                      </div>
                    </div>)}
                </CardContent>
              </Card>)}
          </div>
        </div>
      </div>

      {/* Local Deals Dialog */}
      {showDealsDialog && <LocalDealsDialog isOpen={showDealsDialog} onClose={() => setShowDealsDialog(false)} category={selectedCategory} />}
    </>;
};

// Local Deals Dialog Component
const LocalDealsDialog = ({
  isOpen,
  onClose,
  category
}: {
  isOpen: boolean;
  onClose: () => void;
  category: string;
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const dealCategories = {
    restaurants: "Restaurant Deals",
    automotive: "Auto Service Deals",
    "home-garden": "Home & Garden Deals",
    shopping: "Shopping Deals",
    "health-beauty": "Health & Beauty Deals",
    services: "Local Service Deals"
  };
  const sampleDeals = [{
    id: 1,
    title: "Mario's Pizza",
    discount: "50% Off Large Pizza",
    type: "restaurant",
    location: "Downtown"
  }, {
    id: 2,
    title: "Quick Oil Change",
    discount: "30% Off Oil Change",
    type: "automotive",
    location: "Main St"
  }, {
    id: 3,
    title: "Garden Center Plus",
    discount: "Buy 2 Get 1 Free Plants",
    type: "home-garden",
    location: "Garden District"
  }, {
    id: 4,
    title: "Fashion Boutique",
    discount: "70% Off Winter Collection",
    type: "shopping",
    location: "Mall Plaza"
  }, {
    id: 5,
    title: "Spa Relaxation",
    discount: "VIP Member 40% Off",
    type: "health-beauty",
    location: "Wellness Center"
  }, {
    id: 6,
    title: "Home Cleaning Pro",
    discount: "First Service 60% Off",
    type: "services",
    location: "City Wide"
  }];
  const filteredDeals = sampleDeals.filter(deal => {
    const matchesSearch = deal.title.toLowerCase().includes(searchTerm.toLowerCase()) || deal.discount.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || deal.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });
  const filterTags = [{
    id: 'all',
    label: 'All Deals'
  }, {
    id: 'restaurant',
    label: 'Food'
  }, {
    id: 'automotive',
    label: 'Auto'
  }, {
    id: 'home-garden',
    label: 'Home'
  }, {
    id: 'shopping',
    label: 'Shopping'
  }, {
    id: 'health-beauty',
    label: 'Beauty'
  }, {
    id: 'services',
    label: 'Services'
  }];
  if (!isOpen) return null;
  return <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              {dealCategories[category as keyof typeof dealCategories] || "Local Deals"}
            </h2>
            <button onClick={onClose} className="text-white hover:bg-white/20 rounded-full p-2">
              ×
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="p-6 border-b space-y-4">
          <input type="text" placeholder="Search deals..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          
          <div className="flex flex-wrap gap-2">
            {filterTags.map(tag => <button key={tag.id} onClick={() => setSelectedFilter(tag.id)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedFilter === tag.id ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                {tag.label}
              </button>)}
          </div>
        </div>

        {/* Deals List */}
        <div className="p-6 overflow-y-auto max-h-96">
          <div className="grid gap-4">
            {filteredDeals.map(deal => <Card key={deal.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{deal.title}</h3>
                      <p className="text-green-600 font-medium">{deal.discount}</p>
                      <p className="text-gray-500 text-sm">{deal.location}</p>
                    </div>
                    <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                      Get Deal
                    </button>
                  </div>
                </CardContent>
              </Card>)}
          </div>
          
          {filteredDeals.length === 0 && <div className="text-center py-8 text-gray-500">
              No deals found matching your criteria.
            </div>}
        </div>
      </div>
    </div>;
};
export default ImageGalleryCarousel;
