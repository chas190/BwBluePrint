
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, BookOpen, Store } from "lucide-react";

interface TopCardsSectionProps {
  onBuyOrSellClick: () => void;
  onNewProgramsClick: () => void;
  onMarketplaceClick: () => void;
}

const TopCardsSection = ({ onBuyOrSellClick, onNewProgramsClick, onMarketplaceClick }: TopCardsSectionProps) => {
  const topCards = [{
    title: "Buy or Sell",
    icon: ShoppingCart,
    gradient: "bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600",
    onClick: onBuyOrSellClick
  }, {
    title: "New Programs",
    icon: BookOpen,
    gradient: "bg-gradient-to-br from-purple-400 via-violet-500 to-indigo-600",
    onClick: onNewProgramsClick
  }, {
    title: "Marketplace",
    icon: Store,
    gradient: "bg-gradient-to-br from-orange-400 via-red-500 to-pink-600",
    onClick: onMarketplaceClick
  }];

  return (
    <div className="container mx-auto px-4 md:px-6 pb-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {topCards.map((card, index) => 
          <Card 
            key={index} 
            className={`${card.gradient} border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105`} 
            onClick={card.onClick}
          >
            <CardContent className="p-8 text-center px-[33px]">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <card.icon className="w-8 h-8 text-gray-700" />
              </div>
              <h3 className="text-xl font-semibold text-white">{card.title}</h3>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TopCardsSection;

