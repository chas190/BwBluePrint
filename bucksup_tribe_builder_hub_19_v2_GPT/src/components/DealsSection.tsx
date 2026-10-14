import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { MapPin, Share, Users, Filter } from 'lucide-react';
import { useSearchParams, Link } from 'react-router-dom';
import { useState } from 'react';

const DealsSection = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const [showThankYouDialog, setShowThankYouDialog] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(false);
  
  const deals = [
    {
      id: 1,
      business: "Joe's Coffee Shop",
      deal: "20% off all drinks",
      category: "Food & Drinks",
      distance: "0.3 miles",
      savings: "$4.50",
      expires: "3 days",
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=300&h=200&fit=crop",
      verified: true
    }, {
      id: 2,
      business: "Local Fitness Center",
      deal: "Free month with annual membership",
      category: "Health & Fitness",
      distance: "0.7 miles",
      savings: "$89",
      expires: "1 week",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
      verified: true
    }, {
      id: 3,
      business: "Downtown Pharmacy",
      deal: "15% off vitamins & supplements",
      category: "Health",
      distance: "1.2 miles",
      savings: "$12.30",
      expires: "5 days",
      image: "https://images.unsplash.com/photo-1524230572899-a752b3835840?w=300&h=200&fit=crop",
      verified: false
    }, {
      id: 4,
      business: "Fresh Market Grocery",
      deal: "Buy 2 Get 1 Free on organic produce",
      category: "Food & Drinks",
      distance: "0.5 miles",
      savings: "$8.25",
      expires: "2 days",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=200&fit=crop",
      verified: true
    }, {
      id: 5,
      business: "Tony's Italian Deli",
      deal: "25% off fresh sandwiches after 3pm",
      category: "Food & Drinks",
      distance: "0.8 miles",
      savings: "$6.75",
      expires: "1 week",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&h=200&fit=crop",
      verified: true
    }, {
      id: 6,
      business: "Corner Bakery & Cafe",
      deal: "Free pastry with coffee purchase",
      category: "Food & Drinks",
      distance: "0.4 miles",
      savings: "$3.50",
      expires: "4 days",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=200&fit=crop",
      verified: false
    }, {
      id: 7,
      business: "Farm Fresh Produce Co.",
      deal: "30% off seasonal fruits & vegetables",
      category: "Food & Drinks",
      distance: "1.0 miles",
      savings: "$11.40",
      expires: "6 days",
      image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=300&h=200&fit=crop",
      verified: true
    }, {
      id: 8,
      business: "Mama Rosa's Pizza",
      deal: "Buy one pizza, get second 50% off",
      category: "Food & Drinks",
      distance: "0.6 miles",
      savings: "$9.95",
      expires: "3 days",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=200&fit=crop",
      verified: true
    }, {
      id: 9,
      business: "Golden Dragon Restaurant",
      deal: "20% off dinner orders over $30",
      category: "Food & Drinks",
      distance: "0.9 miles",
      savings: "$7.80",
      expires: "1 week",
      image: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=300&h=200&fit=crop",
      verified: true
    }, {
      id: 10,
      business: "Sweet Treats Ice Cream",
      deal: "Free toppings with any sundae",
      category: "Food & Drinks",
      distance: "0.3 miles",
      savings: "$2.75",
      expires: "5 days",
      image: "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=300&h=200&fit=crop",
      verified: false
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
  
  return (
    <>
      {/* Full Width Card with Image and Two Category Cards */}
      <Card className="w-full mb-6 overflow-hidden">
        <div className="flex h-48">
          {/* Left Child Card with Image */}
          <div className="flex-1 relative">
            <img 
              src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=400&fit=crop" 
              alt="Food background" 
              className="w-full h-full object-cover"
            />
          </div>
          {/* Right Food Card */}
          <div className="w-48 h-full bg-gradient-to-br from-orange-400 to-red-500 flex flex-col items-center justify-center text-white">
            <div className="text-center">
              <div className="text-3xl mb-2">🍕</div>
              <h3 className="text-lg font-bold">Local Food</h3>
              <p className="text-sm opacity-90">Discover deals</p>
            </div>
          </div>
          {/* Right Shop & Buy Card */}
          <Link to="/shop-buy" className="block hidden">
            <div className="w-48 h-full bg-gradient-to-br from-purple-500 to-indigo-600 flex flex-col items-center justify-center text-white hover:from-purple-600 hover:to-indigo-700 transition-colors cursor-pointer">
              <div className="text-center">
                <div className="text-3xl mb-2">🛍️</div>
                <h3 className="text-lg font-bold">Shop & Buy</h3>
                <p className="text-sm opacity-90">Local merchants</p>
              </div>
            </div>
          </Link>
        </div>
      </Card>
      
      {/* VIP Online Shopping Benefits Section */}
      <section className="container mx-auto px-4 py-6 mb-6">
        <div className="text-center space-y-1">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-indigo-600 via-blue-800 to-indigo-500 bg-clip-text text-transparent">
            VIP Online Shopping Benefits
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Exclusive perks and rewards for our VIP members
          </p>
        </div>
      </section>

      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <h2 className="text-2xl font-bold text-blue-600">
            Shop Local Merchants & Specials {category && `${category.charAt(0).toUpperCase() + category.slice(1)}`}
          </h2>
          <div className="flex flex-col space-y-2">
            <Button variant="outline" size="sm" className="md:size-default size-sm">
              View All Merchants
            </Button>
            <Button variant="outline" size="sm" className="md:size-default size-sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter by Category
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deals.map(deal => (
            <Card key={deal.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img src={deal.image} alt={deal.business} className="w-full h-48 object-cover" />
                <div className="absolute top-2 right-2">
                  {deal.verified && (
                    <Badge className="bg-prosperity-500 hover:bg-prosperity-600">
                      Verified
                    </Badge>
                  )}
                </div>
                <div className="absolute bottom-2 left-2">
                  <Badge variant="secondary" className="bg-black/50 text-white">
                    Save {deal.savings}
                  </Badge>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-lg">{deal.business}</CardTitle>
                <p className="text-sm text-muted-foreground">{deal.deal}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{deal.distance}</span>
                  </div>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  Expires in {deal.expires}
                </div>
                
                <div className="flex space-x-2">
                  <Button className="flex-1 gradient-prosperity" onClick={handleClaimDeal}>
                    Claim Deal
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
              For being one of the early Beta Application Member Evaluation users to help craft our joint effort community development platform. As more members from your area join this app our team will continue to bring local companies onto the local deal search directory for your area and create even more options to save on every dollar you spend. Turns out the average American spends over 60% of their monthly hard earned money on home and auto expenses. But for starters Phase One of this program is to help focus and save on the 60% Plus spending on what you buy on Amazon on your house and auto expenses.
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
                Check the box below if you would like to receive email notice of upgrades to and notification when your directory launches in your area
              </label>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DealsSection;

