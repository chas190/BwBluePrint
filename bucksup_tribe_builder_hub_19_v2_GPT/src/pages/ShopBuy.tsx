import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, MapPin, Share, Users, Filter, ShoppingBag, Star, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import AmazonSuccessPopup from '@/components/AmazonSuccessPopup';

const ShopBuy = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState(category || '');
  const [showThankYouDialog, setShowThankYouDialog] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [showAmazonDialog, setShowAmazonDialog] = useState(false);
  const [showAmazonSuccessPopup, setShowAmazonSuccessPopup] = useState(false);
  const [showEbayDialog, setShowEbayDialog] = useState(false);
  const [showEbaySuccessPopup, setShowEbaySuccessPopup] = useState(false);
  const [showWalmartDialog, setShowWalmartDialog] = useState(false);
  const [showWalmartSuccessPopup, setShowWalmartSuccessPopup] = useState(false);
  const [showTargetDialog, setShowTargetDialog] = useState(false);
  const [showTargetSuccessPopup, setShowTargetSuccessPopup] = useState(false);
  const [showBestBuyDialog, setShowBestBuyDialog] = useState(false);
  const [showBestBuySuccessPopup, setShowBestBuySuccessPopup] = useState(false);
  const [showCostcoDialog, setShowCostcoDialog] = useState(false);
  const [showCostcoSuccessPopup, setShowCostcoSuccessPopup] = useState(false);
  const [showHomeDepotDialog, setShowHomeDepotDialog] = useState(false);
  const [showHomeDepotSuccessPopup, setShowHomeDepotSuccessPopup] = useState(false);
  const [showLowesDialog, setShowLowesDialog] = useState(false);
  const [showLowesSuccessPopup, setShowLowesSuccessPopup] = useState(false);
  const [showBwFarmsDialog, setShowBwFarmsDialog] = useState(false);
  const [showBwFarmsSuccessPopup, setShowBwFarmsSuccessPopup] = useState(false);

  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    }
  }, [category]);

  const merchants = [
    {
      id: 1,
      business: "Tech Haven Electronics",
      deal: "15% off all laptops & tablets",
      category: "Electronics",
      distance: "0.2 miles",
      savings: "$150",
      expires: "2 weeks",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop",
      verified: true,
      rating: 4.8
    },
    {
      id: 2,
      business: "Fashion Forward Boutique",
      deal: "Buy 2 Get 1 Free on summer collection",
      category: "Fashion",
      distance: "0.4 miles",
      savings: "$85",
      expires: "1 week",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop",
      verified: true,
      rating: 4.6
    },
    {
      id: 3,
      business: "Home & Garden Paradise",
      deal: "30% off outdoor furniture",
      category: "Home & Garden",
      distance: "0.8 miles",
      savings: "$200",
      expires: "5 days",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop",
      verified: true,
      rating: 4.7
    },
    {
      id: 4,
      business: "Book Nook & More",
      deal: "25% off all bestsellers",
      category: "Books & Media",
      distance: "0.3 miles",
      savings: "$12",
      expires: "3 days",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
      verified: false,
      rating: 4.5
    },
    {
      id: 5,
      business: "Sports Central",
      deal: "Free shipping on orders over $50",
      category: "Sports & Recreation",
      distance: "1.1 miles",
      savings: "$15",
      expires: "1 week",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
      verified: true,
      rating: 4.9
    },
    {
      id: 6,
      business: "Beauty Bliss Salon",
      deal: "20% off premium skincare products",
      category: "Beauty & Personal Care",
      distance: "0.6 miles",
      savings: "$45",
      expires: "4 days",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&h=200&fit=crop",
      verified: true,
      rating: 4.8
    }
  ];

  const handleClaimDeal = () => {
    setShowThankYouDialog(true);
  };

  const handleShare = () => {
    setShowThankYouDialog(true);
  };

  const handleEmailNotificationChange = (checked: boolean | "indeterminate") => {
    setEmailNotifications(checked === true);
  };

  const handleAmazonClick = () => {
    setShowAmazonDialog(true);
  };

  const handleAmazonRedirect = () => {
    setShowAmazonDialog(false);
    setShowAmazonSuccessPopup(true);
  };

  const handleEbayClick = () => {
    setShowEbayDialog(true);
  };

  const handleEbayRedirect = () => {
    setShowEbayDialog(false);
    setShowEbaySuccessPopup(true);
  };

  const handleWalmartClick = () => {
    setShowWalmartDialog(true);
  };

  const handleWalmartRedirect = () => {
    setShowWalmartDialog(false);
    setShowWalmartSuccessPopup(true);
  };

  const handleTargetClick = () => {
    setShowTargetDialog(true);
  };

  const handleTargetRedirect = () => {
    setShowTargetDialog(false);
    setShowTargetSuccessPopup(true);
  };

  const handleBestBuyClick = () => {
    setShowBestBuyDialog(true);
  };

  const handleBestBuyRedirect = () => {
    setShowBestBuyDialog(false);
    setShowBestBuySuccessPopup(true);
  };

  const handleCostcoClick = () => {
    setShowCostcoDialog(true);
  };

  const handleCostcoRedirect = () => {
    setShowCostcoDialog(false);
    setShowCostcoSuccessPopup(true);
  };

  const handleHomeDepotClick = () => {
    setShowHomeDepotDialog(true);
  };

  const handleHomeDepotRedirect = () => {
    setShowHomeDepotDialog(false);
    setShowHomeDepotSuccessPopup(true);
  };

  const handleLowesClick = () => {
    setShowLowesDialog(true);
  };

  const handleLowesRedirect = () => {
    setShowLowesDialog(false);
    setShowLowesSuccessPopup(true);
  };

  const handleBwFarmsClick = () => {
    setShowBwFarmsDialog(true);
  };

  const handleBwFarmsRedirect = () => {
    setShowBwFarmsDialog(false);
    setShowBwFarmsSuccessPopup(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navigation />
      
      <div className="container mx-auto px-[12px] py-[30px]">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4 pt-4">
            <Link to="/main">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h4 className="font-bold text-xl text-indigo-500 pt-0 md:hidden">BwTown Marketplace</h4>
              <h1 className="hidden md:block font-bold text-2xl text-indigo-500 pt-0">BwTown Marketplace</h1>
            </div>
          </div>
        </div>

        {/* Full Width Card with Shop & Buy Theme */}
        <Card className="w-full mb-6 overflow-hidden">
          <div className="flex h-32 md:h-48">
            {/* Left Child Card with Image */}
            <div className="flex-1 relative">
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop" 
                alt="Shopping background" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Right Square Shop & Buy Card */}
            <div className="w-32 md:w-48 h-full bg-gradient-to-br from-purple-500 to-indigo-600 flex flex-col items-center justify-center text-white">
              <div className="text-center">
                <div className="text-3xl mb-2">🛍️</div>
                <h3 className="text-lg font-bold">Shop & Buy</h3>
                <p className="text-sm opacity-90">Local merchants</p>
              </div>
            </div>
          </div>
        </Card>

        {/* VIP Online Shopping Benefits Section */}
        <section className="w-full pt-3 pb-6 mb-6">
          <div className="container mx-auto px-0 md:px-4">
            {/* Main VIP Card */}
            <div className="w-full md:w-[95%] md:mx-auto mb-6">
              <Card className="bg-gradient-to-br from-white via-blue-50 to-indigo-100 border-0 shadow-lg">
                <CardContent className="p-4 text-center w-full md:w-auto">
                  <h3 className="text-3xl font-bold bg-gradient-to-br from-indigo-600 via-blue-800 to-indigo-500 bg-clip-text text-transparent mb-4 md:hidden">
                    VIP Online Benefits
                  </h3>
                  <h2 className="hidden md:block text-4xl font-bold bg-gradient-to-br from-indigo-600 via-blue-800 to-indigo-500 bg-clip-text text-transparent mb-4">
                    VIP Online Benefits
                  </h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
                    <span className="md:hidden">VIP perks & rewards</span>
                    <span className="hidden md:inline">Exclusive perks and rewards for our VIP members</span>
                  </p>
                  
                  {/* Shopping Platforms Grid */}
                  <div className="px-1 w-full">
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
                      {[
                        { name: 'Amazon', icon: ShoppingBag, gradient: 'from-orange-400 to-yellow-500', onClick: handleAmazonClick },
                        { name: 'eBay', icon: ShoppingCart, gradient: 'from-blue-400 to-purple-500', onClick: handleEbayClick },
                        { name: 'Walmart', icon: ShoppingBag, gradient: 'from-blue-500 to-blue-600', onClick: handleWalmartClick },
                        { name: 'Target', icon: ShoppingCart, gradient: 'from-red-400 to-red-500', onClick: handleTargetClick },
                        { name: 'Best Buy', icon: ShoppingBag, gradient: 'from-yellow-400 to-orange-500', onClick: handleBestBuyClick },
                        { name: 'Costco', icon: ShoppingCart, gradient: 'from-red-500 to-red-600', onClick: handleCostcoClick },
                        { name: 'Home Depot', icon: ShoppingBag, gradient: 'from-orange-500 to-red-500', onClick: handleHomeDepotClick },
                        { name: 'Lowes', icon: ShoppingCart, gradient: 'from-blue-600 to-indigo-600', onClick: handleLowesClick },
                        { name: 'BwFarms', icon: ShoppingBag, gradient: 'from-green-400 to-green-600', onClick: handleBwFarmsClick }
                      ].map((platform, index) => (
                        <Card key={index} className={`bg-gradient-to-br ${platform.gradient} border-0 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer`} onClick={platform.onClick}>
                          <CardContent className="p-3 flex flex-row items-center justify-center h-16">
                            <platform.icon className="w-6 h-6 text-white mr-3 hidden md:block" />
                            <span className="text-white text-base font-bold text-center">
                              {platform.name}
                            </span>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <h2 className="text-2xl font-bold text-blue-600">
              <span className="md:hidden">Shop Local</span>
              <span className="hidden md:block">Shop Local Merchants & Specials</span>
            </h2>
            <div className="flex flex-col space-y-2">
              <Button variant="outline" size="sm" className="md:size-default size-sm">
                <span className="md:hidden">View All</span>
                <span className="hidden md:block">View All Merchants</span>
              </Button>
              <Button variant="outline" size="sm" className="md:size-default size-sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter by Category
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {merchants.map(merchant => (
              <Card key={merchant.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img src={merchant.image} alt={merchant.business} className="w-full h-48 object-cover" />
                  <div className="absolute top-2 right-2">
                    {merchant.verified && (
                      <Badge className="bg-prosperity-500 hover:bg-prosperity-600">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <Badge variant="secondary" className="bg-black/50 text-white">
                      Save {merchant.savings}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-lg">{merchant.business}</CardTitle>
                  <p className="text-sm text-muted-foreground">{merchant.deal}</p>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{merchant.rating}</span>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{merchant.distance}</span>
                    </div>
                    <Badge variant="outline">{merchant.category}</Badge>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    Expires in {merchant.expires}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button className="flex-1 gradient-prosperity" onClick={handleClaimDeal}>
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Shop Now
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleShare}>
                      <Share className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Dialog open={showThankYouDialog} onOpenChange={setShowThankYouDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center mb-4">
                Thank You
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <p className="text-sm leading-relaxed">
                For being one of the early Beta Application Member Evaluation users to help craft our joint effort community development platform. As more members from your area join this app our team will continue to bring local companies onto the local merchant directory for your area and create even more options to save on every dollar you spend.
              </p>
              
              <div className="flex items-center space-x-2 pt-4">
                <Checkbox 
                  id="email-notifications" 
                  checked={emailNotifications}
                  onCheckedChange={handleEmailNotificationChange}
                />
                <label 
                  htmlFor="email-notifications" 
                  className="text-sm leading-relaxed cursor-pointer"
                >
                  Check the box below if you would like to receive email notice of upgrades to and notification when your merchant directory launches in your area
                </label>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Amazon Dialog */}
        <Dialog open={showAmazonDialog} onOpenChange={setShowAmazonDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center">Amazon Shopping</DialogTitle>
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

        {/* Amazon Success Popup */}
        <AmazonSuccessPopup 
          open={showAmazonSuccessPopup} 
          onOpenChange={setShowAmazonSuccessPopup} 
        />

        {/* eBay Dialog */}
        <Dialog open={showEbayDialog} onOpenChange={setShowEbayDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center">eBay Shopping</DialogTitle>
            </DialogHeader>
            <div className="py-6 text-center space-y-4">
              <p className="text-lg text-gray-600">
                Shop on eBay and support BucksUp through our affiliate partnership!
              </p>
              <p className="text-sm text-gray-500">
                When you shop through our link, we earn a small commission at no extra cost to you.
              </p>
              <Button 
                onClick={handleEbayRedirect} 
                className="gradient-prosperity text-white px-8 py-3 text-lg font-semibold w-full"
              >
                Shop on eBay
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Walmart Dialog */}
        <Dialog open={showWalmartDialog} onOpenChange={setShowWalmartDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center">Walmart Shopping</DialogTitle>
            </DialogHeader>
            <div className="py-6 text-center space-y-4">
              <p className="text-lg text-gray-600">
                Shop on Walmart and support BucksUp through our affiliate partnership!
              </p>
              <p className="text-sm text-gray-500">
                When you shop through our link, we earn a small commission at no extra cost to you.
              </p>
              <Button 
                onClick={handleWalmartRedirect} 
                className="gradient-prosperity text-white px-8 py-3 text-lg font-semibold w-full"
              >
                Shop on Walmart
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Target Dialog */}
        <Dialog open={showTargetDialog} onOpenChange={setShowTargetDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center">Target Shopping</DialogTitle>
            </DialogHeader>
            <div className="py-6 text-center space-y-4">
              <p className="text-lg text-gray-600">
                Shop on Target and support BucksUp through our affiliate partnership!
              </p>
              <p className="text-sm text-gray-500">
                When you shop through our link, we earn a small commission at no extra cost to you.
              </p>
              <Button 
                onClick={handleTargetRedirect} 
                className="gradient-prosperity text-white px-8 py-3 text-lg font-semibold w-full"
              >
                Shop on Target
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Best Buy Dialog */}
        <Dialog open={showBestBuyDialog} onOpenChange={setShowBestBuyDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center">Best Buy Shopping</DialogTitle>
            </DialogHeader>
            <div className="py-6 text-center space-y-4">
              <p className="text-lg text-gray-600">
                Shop on Best Buy and support BucksUp through our affiliate partnership!
              </p>
              <p className="text-sm text-gray-500">
                When you shop through our link, we earn a small commission at no extra cost to you.
              </p>
              <Button 
                onClick={handleBestBuyRedirect} 
                className="gradient-prosperity text-white px-8 py-3 text-lg font-semibold w-full"
              >
                Shop on Best Buy
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Costco Dialog */}
        <Dialog open={showCostcoDialog} onOpenChange={setShowCostcoDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center">Costco Shopping</DialogTitle>
            </DialogHeader>
            <div className="py-6 text-center space-y-4">
              <p className="text-lg text-gray-600">
                Shop on Costco and support BucksUp through our affiliate partnership!
              </p>
              <p className="text-sm text-gray-500">
                When you shop through our link, we earn a small commission at no extra cost to you.
              </p>
              <Button 
                onClick={handleCostcoRedirect} 
                className="gradient-prosperity text-white px-8 py-3 text-lg font-semibold w-full"
              >
                Shop on Costco
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Home Depot Dialog */}
        <Dialog open={showHomeDepotDialog} onOpenChange={setShowHomeDepotDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center">Home Depot Shopping</DialogTitle>
            </DialogHeader>
            <div className="py-6 text-center space-y-4">
              <p className="text-lg text-gray-600">
                Shop on Home Depot and support BucksUp through our affiliate partnership!
              </p>
              <p className="text-sm text-gray-500">
                When you shop through our link, we earn a small commission at no extra cost to you.
              </p>
              <Button 
                onClick={handleHomeDepotRedirect} 
                className="gradient-prosperity text-white px-8 py-3 text-lg font-semibold w-full"
              >
                Shop on Home Depot
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Lowes Dialog */}
        <Dialog open={showLowesDialog} onOpenChange={setShowLowesDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center">Lowes Shopping</DialogTitle>
            </DialogHeader>
            <div className="py-6 text-center space-y-4">
              <p className="text-lg text-gray-600">
                Shop on Lowes and support BucksUp through our affiliate partnership!
              </p>
              <p className="text-sm text-gray-500">
                When you shop through our link, we earn a small commission at no extra cost to you.
              </p>
              <Button 
                onClick={handleLowesRedirect} 
                className="gradient-prosperity text-white px-8 py-3 text-lg font-semibold w-full"
              >
                Shop on Lowes
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* BwFarms Dialog */}
        <Dialog open={showBwFarmsDialog} onOpenChange={setShowBwFarmsDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center">BwFarms Shopping</DialogTitle>
            </DialogHeader>
            <div className="py-6 text-center space-y-4">
              <p className="text-lg text-gray-600">
                Shop on BwFarms and support BucksUp through our affiliate partnership!
              </p>
              <p className="text-sm text-gray-500">
                When you shop through our link, we earn a small commission at no extra cost to you.
              </p>
              <Button 
                onClick={handleBwFarmsRedirect} 
                className="gradient-prosperity text-white px-8 py-3 text-lg font-semibold w-full"
              >
                Shop on BwFarms
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Success Popups for other platforms */}
        <AmazonSuccessPopup 
          open={showEbaySuccessPopup} 
          onOpenChange={setShowEbaySuccessPopup}
          platformName="eBay"
          platformUrl="https://ebay.com"
        />
        <AmazonSuccessPopup 
          open={showWalmartSuccessPopup} 
          onOpenChange={setShowWalmartSuccessPopup}
          platformName="Walmart"
          platformUrl="https://walmart.com"
        />
        <AmazonSuccessPopup 
          open={showTargetSuccessPopup} 
          onOpenChange={setShowTargetSuccessPopup}
          platformName="Target"
          platformUrl="https://target.com"
        />
        <AmazonSuccessPopup 
          open={showBestBuySuccessPopup} 
          onOpenChange={setShowBestBuySuccessPopup}
          platformName="Best Buy"
          platformUrl="https://bestbuy.com"
        />
        <AmazonSuccessPopup 
          open={showCostcoSuccessPopup} 
          onOpenChange={setShowCostcoSuccessPopup}
          platformName="Costco"
          platformUrl="https://costco.com"
        />
        <AmazonSuccessPopup 
          open={showHomeDepotSuccessPopup} 
          onOpenChange={setShowHomeDepotSuccessPopup}
          platformName="Home Depot"
          platformUrl="https://homedepot.com"
        />
        <AmazonSuccessPopup 
          open={showLowesSuccessPopup} 
          onOpenChange={setShowLowesSuccessPopup}
          platformName="Lowes"
          platformUrl="https://lowes.com"
        />
        <AmazonSuccessPopup 
          open={showBwFarmsSuccessPopup} 
          onOpenChange={setShowBwFarmsSuccessPopup}
          platformName="BwFarms"
          platformUrl="https://bwfarms.org"
        />
      </div>
    </div>
  );
};

export default ShopBuy;
