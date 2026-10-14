
import { Card, CardContent } from "@/components/ui/card";
import { Users, DollarSign, TrendingUp } from "lucide-react";

const FeaturesSection = () => {
  return (
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
  );
};

export default FeaturesSection;

