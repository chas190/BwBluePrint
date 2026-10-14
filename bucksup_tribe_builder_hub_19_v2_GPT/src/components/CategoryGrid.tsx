
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Utensils, ShoppingBag, Heart, Shirt, Wrench, Plus, Home, Car, Gamepad2, Search, CreditCard, ShoppingCart, SearchX } from "lucide-react";
import { useSettingsPersistence } from "@/hooks/useSettingsPersistence";

const CategoryGrid = () => {
  const navigate = useNavigate();
  const { settings } = useSettingsPersistence();
  const categories = [{
    name: 'food',
    icon: Utensils,
    gradient: 'from-orange-400 to-red-500'
  }, {
    name: 'retail',
    icon: ShoppingBag,
    gradient: 'from-blue-400 to-purple-500'
  }, {
    name: 'online shopping',
    icon: ShoppingCart,
    gradient: 'from-teal-400 to-cyan-500'
  }, {
    name: 'pets',
    icon: Heart,
    gradient: 'from-pink-400 to-rose-500'
  }, {
    name: 'clothes',
    icon: Shirt,
    gradient: 'from-indigo-400 to-blue-500'
  }, {
    name: 'services',
    icon: Wrench,
    gradient: 'from-green-400 to-teal-500'
  }, {
    name: 'auto',
    icon: Car,
    gradient: 'from-gray-400 to-slate-500'
  }, {
    name: 'home',
    icon: Home,
    gradient: 'from-yellow-400 to-orange-500'
  }, {
    name: 'health',
    icon: Plus,
    gradient: 'from-emerald-400 to-green-500'
  }];

  // Add card button for 5x2 grid mode
  const cardButton = {
    name: 'card',
    icon: CreditCard,
    gradient: 'from-cyan-400 to-blue-500'
  };
  
  // Filter categories based on toggle settings
  const filteredCategories = categories.filter(category => {
    const toggle = settings.localDealsToggles.find(t => t.id === category.name || t.id === category.name.replace(' ', '-'));
    return toggle ? toggle.visible : false;
  });
  
  // Check if card toggle is visible
  const isCardVisible = () => {
    const cardToggle = settings.localDealsToggles.find(t => t.id === 'card');
    return cardToggle ? cardToggle.visible : false;
  };
  
  // Check if we should show the 6th "Search More" card (only when 5 cards visible and in mobile 3x3 grid)
  const shouldShowSearchMoreCard = () => {
    return filteredCategories.length === 5;
  };
  
  // Check if we should hide the More Categories button (when showing the 6th search card)
  const shouldHideMoreButton = () => {
    return shouldShowSearchMoreCard();
  };
  
  const handleCategoryClick = (category: string) => {
    if (category === 'retail') {
      // Navigate to shop-buy page with retail category
      navigate(`/shop-buy?category=retail`);
    } else {
      // Navigate to search deals page with category parameter
      navigate(`/search-deals?category=${category}`);
    }
  };
  const handleMoreClick = () => {
    navigate('/search-deals');
  };
  return <Card className="w-full bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 border-0 shadow-lg">
      <section>
        <CardContent className="p-3 py-[11px] px-[12px]">
        {/* BwTown Dir Title Card - always visible */}
        <div className="mb-4">
          <div className="w-[95%] md:w-3/5 mx-auto">
            <Card className="bg-gradient-to-br from-indigo-600 via-blue-800 to-indigo-500 border-0 shadow-lg rounded-lg">
              <CardContent className="p-3 md:p-6 py-[15px]">
                <h2 className="text-white text-xl font-bold text-center md:text-3xl">Discover Amazing Deals</h2>
                <p className="text-white/90 text-sm text-center mt-2 md:text-base">Find Exclusive BwTown Offers & Savings</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* BwTown Local Vip-Perks Title Card - conditionally rendered */}
        {settings.showBwTownVipPerksCard && (
          <div className="mb-4">
            <div className="w-3/5 mx-auto">
              <Card className="bg-gradient-to-br from-indigo-600 via-blue-800 to-indigo-500 border-0 shadow-lg rounded-lg">
                <CardContent className="p-6 py-[15px]">
                  <h2 className="text-white text-xl font-bold text-center md:text-3xl">BwTown Local Vip-Perks</h2>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Original BwTown Local Search Title */}
        <div className="text-center mb-4">
          
        </div>

        {/* Grid that adapts to screen size - 3x3 on mobile, 5x2 on larger screens */}
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-4 mb-6">
          {filteredCategories.map((category, index) => <div key={category.name} onClick={() => handleCategoryClick(category.name)} className="cursor-pointer group">
              <Card className={`bg-gradient-to-br ${category.gradient} border-0 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105`}>
                <CardContent className="p-4 flex flex-col items-center justify-center aspect-square">
                  <category.icon className="w-8 h-8 text-white mb-2 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-white text-sm font-medium capitalize text-center">
                    {category.name === 'retail' ? 'Shop & Buy' : category.name}
                  </span>
                </CardContent>
              </Card>
            </div>)}
          
          {/* Card button - only shown on md and lg screens (5x2 grid mode) */}
          {isCardVisible() && (
            <div className="hidden md:block cursor-pointer group" onClick={() => handleCategoryClick('card')}>
              <Card className={`bg-gradient-to-br ${cardButton.gradient} border-0 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105`}>
                <CardContent className="p-4 flex flex-col items-center justify-center aspect-square">
                  <cardButton.icon className="w-8 h-8 text-white mb-2 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-white text-sm font-medium capitalize text-center">
                    {cardButton.name}
                  </span>
                </CardContent>
              </Card>
            </div>
          )}
          
          {/* Search More card - only shown on mobile (3x3 grid) when there are exactly 5 cards */}
          {shouldShowSearchMoreCard() && (
            <div className="block md:hidden cursor-pointer group" onClick={handleMoreClick}>
              <Card className="bg-gradient-to-br from-purple-400 to-pink-500 border-0 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-4 flex flex-col items-center justify-center aspect-square">
                  <SearchX className="w-8 h-8 text-white mb-2 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-white text-sm font-medium capitalize text-center">
                    Search More
                  </span>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* More button - hidden when showing the 6th search card on mobile */}
        {!shouldHideMoreButton() && (
          <div className="flex justify-center">
            <Button onClick={handleMoreClick} className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105">
              <Search className="w-4 h-4 mr-2" />
              More Categories
            </Button>
          </div>
        )}
        </CardContent>
      </section>
    </Card>;
};
export default CategoryGrid;

