import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { ShoppingCart, Users, X } from "lucide-react";
import VipAccessDialog from "@/components/VipAccessDialog";
import AmazonSuccessPopup from "@/components/AmazonSuccessPopup";
import { toast } from "sonner";
import { useState } from "react";

interface DialogsContainerProps {
  // Buy/Sell Dialog
  showBuySellDialog: boolean;
  setShowBuySellDialog: (show: boolean) => void;
  
  // Online Store Dialog
  showOnlineStoreDialog: boolean;
  setShowOnlineStoreDialog: (show: boolean) => void;
  
  // Coming Soon Dialog
  showComingSoonDialog: boolean;
  setShowComingSoonDialog: (show: boolean) => void;
  
  // VIP Dialog
  showVipDialog: boolean;
  setShowVipDialog: (show: boolean) => void;
  
  // Amazon Dialog
  showAmazonDialog: boolean;
  setShowAmazonDialog: (show: boolean) => void;
  
  // VIP Benefits Dialog
  showVipBenefitsDialog: boolean;
  setShowVipBenefitsDialog: (show: boolean) => void;
  
  // Buy Stuff Dialog
  showBuyStuffDialog: boolean;
  setShowBuyStuffDialog: (show: boolean) => void;
  
  // Category Dialog
  showCategoryDialog: boolean;
  setShowCategoryDialog: (show: boolean) => void;
  selectedCategory: string;
  
  // New Programs Dialog
  showNewProgramsDialog: boolean;
  setShowNewProgramsDialog: (show: boolean) => void;
  
  // Grow Tribe Dialog
  showGrowTribeDialog: boolean;
  setShowGrowTribeDialog: (show: boolean) => void;
  
  // Demo Dialog
  showDemoDialog: boolean;
  setShowDemoDialog: (show: boolean) => void;
  
  // Demo toggle
  demoToggle: boolean;
  setDemoToggle: (toggle: boolean) => void;
}

const DialogsContainer = ({
  showBuySellDialog,
  setShowBuySellDialog,
  showOnlineStoreDialog,
  setShowOnlineStoreDialog,
  showComingSoonDialog,
  setShowComingSoonDialog,
  showVipDialog,
  setShowVipDialog,
  showAmazonDialog,
  setShowAmazonDialog,
  showVipBenefitsDialog,
  setShowVipBenefitsDialog,
  showBuyStuffDialog,
  setShowBuyStuffDialog,
  showCategoryDialog,
  setShowCategoryDialog,
  selectedCategory,
  showNewProgramsDialog,
  setShowNewProgramsDialog,
  showGrowTribeDialog,
  setShowGrowTribeDialog,
  showDemoDialog,
  setShowDemoDialog,
  demoToggle,
  setDemoToggle
}: DialogsContainerProps) => {
  
  const [showAmazonSuccessPopup, setShowAmazonSuccessPopup] = useState(false);
  
  // Event handlers
  const handleBuyClick = () => {
    toast.success("Buy option selected");
    setShowBuySellDialog(false);
  };

  const handleSellClick = () => {
    toast.success("Sell option selected");
    setShowBuySellDialog(false);
  };

  const handleProfitClick = () => {
    toast.success("Profit option selected");
    setShowBuySellDialog(false);
  };

  const handleAmazonClick = () => {
    toast.success("Amazon selected");
    setShowOnlineStoreDialog(false);
  };

  const handleOnlineStore2Click = () => {
    setShowOnlineStoreDialog(false);
    setShowComingSoonDialog(true);
  };

  const handleVipSuccess = (redirectUrl: string) => {
    toast.success("VIP access granted!");
    setShowVipDialog(false);
    console.log("Redirecting to:", redirectUrl);
  };

  const handleAmazonRedirect = () => {
    setShowAmazonDialog(false);
    setShowBuyStuffDialog(false);
    setShowAmazonSuccessPopup(true);
  };

  const handleCategorySelect = (category: string) => {
    setShowVipBenefitsDialog(false);
    if (category === 'Online Shopping') {
      setShowBuyStuffDialog(true);
    } else {
      setShowCategoryDialog(true);
    }
  };

  const handleComingSoonClick = () => {
    setShowBuyStuffDialog(false);
    setShowComingSoonDialog(true);
  };

  const handleBwTownVipDirectClick = () => {
    setShowBuyStuffDialog(false);
  };

  const handleCategoryOptionClick = () => {
    setShowCategoryDialog(false);
    setShowComingSoonDialog(true);
  };

  const handleDemoModeClick = () => {
    setShowBuyStuffDialog(false);
    setShowVipBenefitsDialog(true);
  };

  const getCategoryOptions = (category: string) => {
    const options = {
      'Local Food & Stuff': ['Grocery Stores', 'Restaurants', 'Farmers Markets', 'Local Vendors', 'Specialty Foods', 'BwFarms'],
      'Automotive': ['Car Dealers', 'Auto Parts', 'Car Rentals', 'Auto Services', 'Car Insurance'],
      'Housing': ['Real Estate', 'Home Improvement', 'Furniture', 'Home Insurance', 'Moving Services'],
      'Bank & Finance': ['Banking', 'Credit Cards', 'Loans', 'Investment', 'Insurance'],
      'Other': ['Travel', 'Health & Wellness', 'Entertainment', 'Education', 'Professional Services']
    };
    return options[category as keyof typeof options] || [];
  };

  const getDialogBackgroundClass = (category: string) => {
    switch (category) {
      case 'Local Food & Stuff':
        return 'bg-orange-200';
      case 'Automotive':
        return 'bg-indigo-200';
      case 'Housing':
        return 'bg-teal-200';
      case 'Bank & Finance':
        return 'bg-cyan-200';
      case 'Other':
        return 'bg-violet-200';
      default:
        return '';
    }
  };

  return (
    <>
      {/* Buy/Sell Dialog */}
      <Dialog open={showBuySellDialog} onOpenChange={setShowBuySellDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Choose Action</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-4 py-4">
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2" onClick={handleBuyClick}>
              <div className="text-2xl">🛒</div>
              <span>Buy</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2" onClick={handleSellClick}>
              <div className="text-2xl">💰</div>
              <span>Sell</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2" onClick={handleProfitClick}>
              <div className="text-2xl">📈</div>
              <span>Profit</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Online Store Dialog */}
      <Dialog open={showOnlineStoreDialog} onOpenChange={setShowOnlineStoreDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Choose Store</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2" onClick={handleAmazonClick}>
              <div className="text-2xl">📦</div>
              <span>Amazon</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2" onClick={handleOnlineStore2Click}>
              <div className="text-2xl">🏪</div>
              <span>Online Store 2</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Coming Soon Dialog */}
      <Dialog open={showComingSoonDialog} onOpenChange={setShowComingSoonDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Coming Soon!</DialogTitle>
          </DialogHeader>
          <div className="py-4 text-center">
            <p className="text-gray-600">This feature will be available soon.</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* VIP Access Dialog */}
      <VipAccessDialog open={showVipDialog} onOpenChange={setShowVipDialog} onSuccess={handleVipSuccess} redirectUrl="/vip-dashboard" />

      {/* Amazon Dialog */}
      <Dialog open={showAmazonDialog} onOpenChange={setShowAmazonDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">Amazon Shopping</DialogTitle>
            <DialogDescription className="sr-only">
              Access Amazon through our affiliate link to support BucksUp
            </DialogDescription>
          </DialogHeader>
          <div className="py-6 text-center space-y-4">
            <p className="text-lg text-gray-600">
              Shop on Amazon and support BucksUp through our affiliate partnership!
            </p>
            <p className="text-sm text-gray-500">
              When you shop through our link, we earn a small commission at no extra cost to you.
            </p>
            <Button onClick={handleAmazonRedirect} className="gradient-prosperity text-white px-8 py-3 text-lg font-semibold w-full">
              Shop on Amazon
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* VIP Member Benefits Dialog */}
      <Dialog open={showVipBenefitsDialog} onOpenChange={setShowVipBenefitsDialog}>
        <DialogContent className="max-w-2xl bg-sky-200">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">Buy & Sell VIP Member Benefits</DialogTitle>
            <DialogDescription className="sr-only">
              Choose a category to see the best options for your lifestyle
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-center text-gray-600 mb-6">
              Pick the category to see the current best options for your best life.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Button onClick={() => handleCategorySelect('Online Shopping')} variant="outline" className="h-20 flex flex-col items-center justify-center">
                <ShoppingCart className="w-6 h-6 mb-2" />
                Online Shopping
              </Button>
              <Button onClick={() => handleCategorySelect('Local Food & Stuff')} variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Users className="w-6 h-6 mb-2" />
                Local Food & Stuff
              </Button>
              <Button onClick={() => handleCategorySelect('Automotive')} variant="outline" className="h-20 flex flex-col items-center justify-center">
                <ShoppingCart className="w-6 h-6 mb-2" />
                Automotive
              </Button>
              <Button onClick={() => handleCategorySelect('Housing')} variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Users className="w-6 h-6 mb-2" />
                Housing
              </Button>
              <Button onClick={() => handleCategorySelect('Bank & Finance')} variant="outline" className="h-20 flex flex-col items-center justify-center">
                <ShoppingCart className="w-6 h-6 mb-2" />
                Bank & Finance
              </Button>
              <Button onClick={() => handleCategorySelect('Other')} variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Users className="w-6 h-6 mb-2" />
                Other
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Buy Stuff Dialog */}
      <Dialog open={showBuyStuffDialog} onOpenChange={setShowBuyStuffDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-4xl font-bold">Buy, Sell or Profit Share</DialogTitle>
            <DialogDescription className="sr-only">
              Choose how you want to buy, sell, or profit share
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <Button onClick={() => setShowAmazonDialog(true)} className="gradient-prosperity h-20 flex flex-col items-center justify-center text-white">
              <div className="font-semibold text-xl">Amazon</div>
              <div className="text-xs mt-0 hidden sm:block">
                <span>Shop Great Deals -</span>
                <span> READY NOW</span>
              </div>
            </Button>
            <Button onClick={handleOnlineStore2Click} className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 h-20 flex flex-col items-center justify-center text-white">
              <div className="font-semibold text-xl">Online Store 2</div>
              <div className="text-xs mt-0 hidden sm:block">
                Super Deals - Coming Soon
              </div>
            </Button>
            {demoToggle && (
              <>
                <Button onClick={handleComingSoonClick} className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 h-24 sm:h-34 flex flex-col items-center justify-center text-white">
                  <div className="font-semibold text-xl">
                    More Online<br className="block sm:hidden" /> Deals
                  </div>
                  <div className="text-xs mt-0 hidden sm:block">Many Perks - Coming Soon</div>
                </Button>
                <Button onClick={handleBwTownVipDirectClick} className="bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 h-24 sm:h-34 flex flex-col items-center justify-center text-white">
                  <div className="font-semibold text-xl">
                    BwTown VIP<br className="block sm:hidden" /> Direct
                  </div>
                  <div className="text-xs mt-0 hidden sm:block">
                    Member Saving & Profit Share
                  </div>
                </Button>
              </>
            )}
          </div>
          
          {/* Demo Section */}
          <div className="flex items-center justify-between pt-4 border-t">
            {demoToggle && (
              <Button onClick={handleDemoModeClick} variant="outline" className="px-6">
                Demo Mode
              </Button>
            )}
            <div className="flex items-center space-x-2 ml-auto">
              <span className="text-sm font-medium">Demo</span>
              <Switch checked={demoToggle} onCheckedChange={setDemoToggle} />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dynamic Category Dialog */}
      <Dialog open={showCategoryDialog} onOpenChange={setShowCategoryDialog}>
        <DialogContent className={getDialogBackgroundClass(selectedCategory)}>
          <DialogHeader>
            <DialogTitle>{selectedCategory}</DialogTitle>
            <DialogDescription className="sr-only">
              Select an option from the {selectedCategory} category
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            {getCategoryOptions(selectedCategory).map(option => 
              <Button key={option} onClick={handleCategoryOptionClick} variant="outline" className="h-16 flex items-center justify-center">
                {option}
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* New Programs Dialog */}
      <Dialog open={showNewProgramsDialog} onOpenChange={setShowNewProgramsDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center mb-4">New Programs</DialogTitle>
            <DialogDescription className="sr-only">
              Information about new programs coming soon
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Exciting New Programs Coming Soon!</h3>
              <p className="text-gray-600 mb-6">
                We're constantly working on new ways to help you build wealth and grow your tribe. 
                Here are some of the exciting programs we're developing:
              </p>
            </div>
            
            <div className="grid gap-4">
              <Card className="p-4">
                <h4 className="font-semibold text-lg mb-2">Home Selling More Money Credits</h4>
                <p className="text-gray-600">Maximize your home's value and earn additional credits when selling your property.</p>
              </Card>
              
              <Card className="p-4">
                <h4 className="font-semibold text-lg mb-2">Car Savings & New Revenues</h4>
                <p className="text-gray-600">Discover innovative ways to save on car expenses and generate new income streams from your vehicle.</p>
              </Card>
              
              <Card className="p-4">
                <h4 className="font-semibold text-lg mb-2">Investment Masterclass</h4>
                <p className="text-gray-600">Learn advanced investment strategies from industry experts.</p>
              </Card>
              
              <Card className="p-4">
                <h4 className="font-semibold text-lg mb-2">Tribe Leadership Program</h4>
                <p className="text-gray-600">Develop skills to lead and grow your tribe effectively.</p>
              </Card>
              
              <Card className="p-4">
                <h4 className="font-semibold text-lg mb-2">Financial Freedom Blueprint</h4>
                <p className="text-gray-600">A step-by-step guide to achieving financial independence.</p>
              </Card>
            </div>
            
            <div className="text-center pt-4">
              <Button className="gradient-main text-white">
                Get Notified When Available
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Grow Tribe Dialog */}
      <Dialog open={showGrowTribeDialog} onOpenChange={setShowGrowTribeDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">Coming Soon to Your Area</DialogTitle>
            <DialogDescription className="sr-only">
              Information about expanding to new markets
            </DialogDescription>
          </DialogHeader>
          <div className="text-center space-y-6">
            <p className="text-gray-600">
              We're expanding to new markets! Get ready for amazing opportunities in your area.
            </p>
            
            <div className="space-y-3">
              <Button className="w-full gradient-tribe text-white" onClick={() => setShowGrowTribeDialog(false)}>
                Would Like to Learn More
              </Button>
              
              <Button variant="outline" className="w-full" onClick={() => {
                setShowGrowTribeDialog(false);
                setShowDemoDialog(true);
              }}>
                See Demo Marketplace
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Demo Marketplace Dialog */}
      <Dialog open={showDemoDialog} onOpenChange={setShowDemoDialog}>
        <DialogContent className="max-w-6xl max-h-[90vh] p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-xl font-bold">Demo Marketplace</DialogTitle>
            <DialogDescription className="sr-only">
              Demo marketplace showing available features
            </DialogDescription>
            <DialogClose className="absolute right-4 top-4">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </DialogHeader>
          <div className="h-[80vh]">
            <iframe src="https://bwtownvip.lovable.app/" className="w-full h-full border-0" title="Demo Marketplace" />
          </div>
        </DialogContent>
      </Dialog>

      {/* Amazon Success Popup */}
      <AmazonSuccessPopup 
        open={showAmazonSuccessPopup} 
        onOpenChange={setShowAmazonSuccessPopup} 
      />
    </>
  );
};

export default DialogsContainer;

