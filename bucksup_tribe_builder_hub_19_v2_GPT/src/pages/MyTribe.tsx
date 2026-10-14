
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import TribeSection from '@/components/TribeSection';
import FullWidthBarCard from '@/components/FullWidthBarCard';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"

const MyTribe = () => {
  const [showVipBenefitsDialog, setShowVipBenefitsDialog] = useState(false);
  const [showBuyStuffDialog, setShowBuyStuffDialog] = useState(false);
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showComingSoonDialog, setShowComingSoonDialog] = useState(false);
  const [showCarDealersDialog, setShowCarDealersDialog] = useState(false);
  const [showCarDealersDrawer, setShowCarDealersDrawer] = useState(false);
  const [startingTribes, setStartingTribes] = useState([25]);

  const handleBuyStuffClick = () => {
    setShowVipBenefitsDialog(true);
  };

  const handleCategorySelect = (category: string) => {
    setShowVipBenefitsDialog(false);
    
    if (category === 'Online Shopping') {
      setShowBuyStuffDialog(true);
    } else {
      setSelectedCategory(category);
      setShowCategoryDialog(true);
    }
  };

  const handleAmazonClick = () => {
    window.open('https://amzn.to/3H8wmqG', '_blank');
    setShowBuyStuffDialog(false);
  };

  const handleComingSoonClick = () => {
    setShowBuyStuffDialog(false);
    setShowComingSoonDialog(true);
  };

  const handleCategoryOptionClick = (option: string) => {
    if (option === 'Car Dealers') {
      setShowCategoryDialog(false);
      setShowCarDealersDialog(true);
    } else {
      setShowCategoryDialog(false);
      setShowComingSoonDialog(true);
    }
  };

  const handleCarDealersDemo = () => {
    setShowCarDealersDialog(false);
    setShowCarDealersDrawer(true);
  };

  const handleCarDealersReturn = () => {
    setShowCarDealersDialog(false);
    setShowCategoryDialog(true);
  };

  const getCategoryOptions = (category: string) => {
    const options = {
      'Local Food & Stuff': ['Grocery Stores', 'Restaurants', 'Farmers Markets', 'Local Vendors', 'Specialty Foods'],
      'Automotive': ['Car Dealers', 'Auto Parts', 'Car Rentals', 'Auto Services', 'Car Insurance'],
      'Housing': ['Real Estate', 'Home Improvement', 'Furniture', 'Home Insurance', 'Moving Services'],
      'Bank & Finance': ['Banking', 'Credit Cards', 'Loans', 'Investment', 'Insurance'],
      'Other': ['Travel', 'Health & Wellness', 'Entertainment', 'Education', 'Professional Services']
    };
    return options[category as keyof typeof options] || [];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="pt-20 md:pt-24 pb-8">
        <div className="container mx-auto px-4 md:px-6 space-y-8">
          
          {/* Header */}
          <div className="text-center py-6">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
              My Tribe
            </h1>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Manage your tribe members and grow your community together.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center mb-8">
            <Button 
              onClick={handleBuyStuffClick}
              className="gradient-prosperity"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Buy or Sell
            </Button>
            <Link to="/join-my-tribe">
              <Button className="gradient-tribe">
                <Users className="w-4 h-4 mr-2" />
                Create Team
              </Button>
            </Link>
          </div>

          {/* Full Width Bar Card with embedded TribeSliderCard */}
          <FullWidthBarCard 
            startingTribes={startingTribes}
            onStartingTribesChange={setStartingTribes}
          />

          <TribeSection />

          {/* VIP Member Benefits Dialog */}
          <Dialog open={showVipBenefitsDialog} onOpenChange={setShowVipBenefitsDialog}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-center">Buy & Sell VIP Member Benefits</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <p className="text-center text-gray-600 mb-6">
                  Pick the category to see the current best options for your best life.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <Button 
                    onClick={() => handleCategorySelect('Online Shopping')}
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center"
                  >
                    <ShoppingCart className="w-6 h-6 mb-2" />
                    Online Shopping
                  </Button>
                  <Button 
                    onClick={() => handleCategorySelect('Local Food & Stuff')}
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center"
                  >
                    <Users className="w-6 h-6 mb-2" />
                    Local Food & Stuff
                  </Button>
                  <Button 
                    onClick={() => handleCategorySelect('Automotive')}
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center"
                  >
                    <ShoppingCart className="w-6 h-6 mb-2" />
                    Automotive
                  </Button>
                  <Button 
                    onClick={() => handleCategorySelect('Housing')}
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center"
                  >
                    <Users className="w-6 h-6 mb-2" />
                    Housing
                  </Button>
                  <Button 
                    onClick={() => handleCategorySelect('Bank & Finance')}
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center"
                  >
                    <ShoppingCart className="w-6 h-6 mb-2" />
                    Bank & Finance
                  </Button>
                  <Button 
                    onClick={() => handleCategorySelect('Other')}
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center"
                  >
                    <Users className="w-6 h-6 mb-2" />
                    Other
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Buy Stuff Dialog (Updated) */}
          <Dialog open={showBuyStuffDialog} onOpenChange={setShowBuyStuffDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Buy, Sell or Profit Share</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <Button 
                  onClick={handleAmazonClick}
                  className="gradient-prosperity h-20 flex flex-col items-center justify-center text-white"
                >
                  <div className="font-semibold">Amazon</div>
                  <div className="text-xs mt-1">Shop Great Deals - READY NOW</div>
                </Button>
                <Button 
                  onClick={handleComingSoonClick}
                  className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 h-20 flex flex-col items-center justify-center text-white"
                >
                  <div className="font-semibold">Online Store 2</div>
                  <div className="text-xs mt-1">Super Deals - Coming Soon</div>
                </Button>
                <Button 
                  onClick={handleComingSoonClick}
                  className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 h-20 flex flex-col items-center justify-center text-white"
                >
                  <div className="font-semibold">More Online Deals</div>
                  <div className="text-xs mt-1">Many Perks - Coming Soon</div>
                </Button>
                <Button 
                  onClick={handleComingSoonClick}
                  className="bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 h-20 flex flex-col items-center justify-center text-white"
                >
                  <div className="font-semibold">BwTown VIP Direct</div>
                  <div className="text-xs mt-1">Member Saving & Profit Share</div>
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Dynamic Category Dialog */}
          <Dialog open={showCategoryDialog} onOpenChange={setShowCategoryDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{selectedCategory}</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                {getCategoryOptions(selectedCategory).map((option) => (
                  <Button 
                    key={option}
                    onClick={() => handleCategoryOptionClick(option)}
                    variant="outline"
                    className="h-16 flex items-center justify-center"
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          {/* Car Dealers Dialog */}
          <Dialog open={showCarDealersDialog} onOpenChange={setShowCarDealersDialog}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-center">Car Dealers</DialogTitle>
              </DialogHeader>
              <div className="py-6 text-center space-y-6">
                <p className="text-lg text-gray-600">
                  Sample Car Search Coming Soon to Your Area
                </p>
                <div className="flex gap-4 justify-center">
                  <Button 
                    onClick={handleCarDealersDemo}
                    className="gradient-prosperity text-white px-6 py-2"
                  >
                    See Demo
                  </Button>
                  <Button 
                    onClick={handleCarDealersReturn}
                    variant="outline"
                    className="px-6 py-2"
                  >
                    Return Back
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Car Dealers Demo Drawer */}
          <Drawer open={showCarDealersDrawer} onOpenChange={setShowCarDealersDrawer}>
            <DrawerContent className="h-[90vh]">
              <DrawerHeader>
                <DrawerTitle>Car Dealers Demo</DrawerTitle>
              </DrawerHeader>
              <div className="flex-1 overflow-hidden">
                <iframe 
                  src="https://bwtownvip.lovable.app/" 
                  className="w-full h-full border-0" 
                  title="Car Dealers Demo"
                />
              </div>
            </DrawerContent>
          </Drawer>

          {/* Coming Soon Dialog */}
          <Dialog open={showComingSoonDialog} onOpenChange={setShowComingSoonDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Coming Soon</DialogTitle>
              </DialogHeader>
              <p className="py-4">This feature will be available soon!</p>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  );
};

export default MyTribe;

