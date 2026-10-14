
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Globe, Star, ShoppingCart, Ticket, Clock, DollarSign } from "lucide-react";

interface Business {
  id: number;
  name: string;
  category: string;
  description: string;
  deal: string;
  coupon: string;
}

interface BusinessPopupProps {
  business: Business;
  mode: 'shop' | 'deals';
  isOpen: boolean;
  onClose: () => void;
}

const BusinessPopup = ({ business, mode, isOpen, onClose }: BusinessPopupProps) => {
  const shopItems = [
    { id: 1, name: "Premium Coffee Blend", price: "$12.99", image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=150&h=150&fit=crop" },
    { id: 2, name: "Fresh Croissant", price: "$3.50", image: "https://images.unsplash.com/photo-1549318380-fbc740c2dec4?w=150&h=150&fit=crop" },
    { id: 3, name: "Specialty Latte", price: "$5.75", image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=150&h=150&fit=crop" },
  ];

  const deals = [
    { id: 1, title: "Morning Special", description: "Free pastry with any coffee purchase", expires: "Today only", savings: "Save $3.50" },
    { id: 2, title: "Happy Hour", description: "20% off all beverages 3-5 PM", expires: "Daily", savings: "Save up to $2.00" },
    { id: 3, title: "Weekend Bundle", description: "Coffee + pastry + newspaper", expires: "Sat-Sun", savings: "Save $5.00" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            {mode === 'shop' ? <ShoppingCart className="w-5 h-5" /> : <Ticket className="w-5 h-5" />}
            {business.name} - {mode === 'shop' ? 'Shop' : 'Deals & Coupons'}
          </DialogTitle>
        </DialogHeader>

        {/* Business Header */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg mb-4">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary">{business.category}</Badge>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm">4.8</span>
            </div>
          </div>
          <p className="text-gray-600 mb-3">{business.description}</p>
          
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>123 Main St, Downtown</span>
            </div>
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>(555) 123-4567</span>
            </div>
            <div className="flex items-center gap-1">
              <Globe className="w-4 h-4" />
              <span>Visit Website</span>
            </div>
          </div>
        </div>

        {/* Featured Deal Banner */}
        <Card className="mb-4 border-l-4 border-l-green-500 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-green-800">Today's Special Deal</h3>
                <p className="text-green-700">{business.deal}</p>
                <p className="text-sm text-green-600">Use code: <strong>{business.coupon}</strong></p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        {mode === 'shop' ? (
          // Shop Mode Content
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Items</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {shopItems.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-lg font-semibold text-green-600">{item.price}</p>
                      </div>
                      <Button size="sm">Add to Cart</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Button className="flex-1">View Full Menu</Button>
              <Button variant="outline" className="flex-1">Order Online</Button>
            </div>
          </div>
        ) : (
          // Deals Mode Content
          <div>
            <h3 className="text-lg font-semibold mb-4">Current Deals & Offers</h3>
            <div className="space-y-3 mb-6">
              {deals.map((deal) => (
                <Card key={deal.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-blue-800">{deal.title}</h4>
                        <p className="text-gray-600 mb-2">{deal.description}</p>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Clock className="w-4 h-4" />
                            <span>{deal.expires}</span>
                          </div>
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            {deal.savings}
                          </Badge>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Claim Deal
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Button className="flex-1">View All Coupons</Button>
              <Button variant="outline" className="flex-1">Subscribe to Deals</Button>
            </div>
          </div>
        )}

        {/* Business Directory Footer */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            Part of BucksUp Local Business Directory • Discover more local businesses
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BusinessPopup;

