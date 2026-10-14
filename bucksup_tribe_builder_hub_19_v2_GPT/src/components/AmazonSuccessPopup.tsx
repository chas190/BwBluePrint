
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Clock, Gift, X } from "lucide-react";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

interface AmazonSuccessPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  platformName?: string;
  platformUrl?: string;
}

const AmazonSuccessPopup = ({ open, onOpenChange, platformName = 'Amazon', platformUrl = 'https://amzn.to/3H8wmqG' }: AmazonSuccessPopupProps) => {
  const [showLearnMoreDrawer, setShowLearnMoreDrawer] = useState(false);

  useEffect(() => {
    if (open) {
      // Trigger confetti animation when popup opens
      const duration = 3000;
      const end = Date.now() + duration;

      const colors = ['#FFD700', '#32CD32', '#FF6347', '#87CEEB', '#DDA0DD'];

      (function frame() {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }
  }, [open]);

  const handleShopNow = () => {
    window.open(platformUrl, '_blank');
    onOpenChange(false);
  };

  const handleLearnMore = () => {
    setShowLearnMoreDrawer(true);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-lg bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-green-700 flex items-center justify-center gap-2">
              <CheckCircle className="w-8 h-8 text-green-600" />
              Great Job!
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="text-center space-y-3">
              <p className="text-lg font-semibold text-gray-800">
                You're leveraging your everyday purchases to build your wealth!
              </p>
              
              <p className="text-gray-600">
                This is just one great step toward building your best life and building your 
                generational wealth cashflow income.
              </p>
            </div>

            <Card className="p-4 bg-gradient-to-r from-purple-100 to-pink-100 border-purple-200">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Gift className="w-6 h-6 text-purple-600" />
                <h3 className="text-xl font-bold text-purple-700">VIP Shopping Code</h3>
              </div>
              
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-purple-800 bg-white rounded-lg py-2 px-4 border-2 border-purple-300">
                  VIP-ACTIVE-NOW
                </div>
                
                <div className="flex items-center justify-center gap-2 text-orange-600 font-semibold">
                  <Clock className="w-4 h-4" />
                  <span>Active for the next 10 hours</span>
                </div>
              </div>
            </Card>

            <div className="flex gap-3">
              <Button 
                onClick={handleShopNow}
                className="flex-1 gradient-prosperity text-white font-semibold py-3 text-lg"
              >
                Shop {platformName} Now
              </Button>
              
              <Button 
                onClick={handleLearnMore}
                variant="outline" 
                className="flex-1 py-3"
              >
                Learn More
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Drawer open={showLearnMoreDrawer} onOpenChange={setShowLearnMoreDrawer}>
        <DrawerContent className="h-[98vh]">
          <DrawerHeader className="bg-blue-600 text-white -mt-7 mb-0 flex items-center justify-between">
            <DrawerTitle className="text-center text-white flex-1">BucksUp VIP Training</DrawerTitle>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-blue-700 p-1 h-auto"
              onClick={() => setShowLearnMoreDrawer(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </DrawerHeader>
          <div className="flex-1 p-0 overflow-hidden">
            <iframe
              src="https://bucksup-vip-courses.lovable.app/player?videodi=ZmzLT6kmajM"
              className="w-full h-full border-0"
              title="BucksUp VIP Training"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch'
              }}
            />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AmazonSuccessPopup;

