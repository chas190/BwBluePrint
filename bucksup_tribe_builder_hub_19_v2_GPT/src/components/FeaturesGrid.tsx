
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Users, DollarSign, Plus, Star } from "lucide-react";

interface FeaturesGridProps {
  onFeatureClick: (feature: string) => void;
}

const FeaturesGrid = ({ onFeatureClick }: FeaturesGridProps) => {
  const features = [{
    icon: TrendingUp,
    color: "bg-blue-500",
    label: "Goals",
    onClick: () => onFeatureClick("Goals")
  }, {
    icon: Users,
    color: "bg-green-500",
    label: "Tribes",
    onClick: () => onFeatureClick("Tribes")
  }, {
    icon: DollarSign,
    color: "bg-yellow-500",
    label: "BuckUp",
    onClick: () => onFeatureClick("BuckUp")
  }, {
    icon: Plus,
    color: "bg-red-500",
    label: "Member",
    onClick: () => onFeatureClick("Member")
  }, {
    icon: Star,
    color: "bg-purple-500",
    label: "Deals",
    onClick: () => onFeatureClick("Deals")
  }];

  return (
    <section className="container mx-auto py-0 px-0 -translate-y-[30%] sm:-translate-y-[20%] md:-translate-y-[15%]">
      <Card className="w-[90%] mx-auto bg-gradient-to-br from-gray-800 via-gray-500 to-gray-700 transform">
        <CardContent className="p-2 sm:p-4 md:p-6 px-[2px]">
          <div className="grid grid-cols-5 gap-2 sm:gap-4 md:gap-8">
            {features.map((feature, index) => 
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
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default FeaturesGrid;

