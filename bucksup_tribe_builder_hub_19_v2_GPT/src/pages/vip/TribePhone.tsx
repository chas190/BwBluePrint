
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function TribePhone() {
  const navigate = useNavigate();
  const [showLearnMoreDialog, setShowLearnMoreDialog] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.trim()) {
      // Navigate to tribe-welcome with the phone number via state
      navigate('/vip/tribe-welcome', { 
        state: { 
          phone: phoneNumber.trim() 
        } 
      });
    }
  };

  const handleLearnMoreClick = () => {
    setShowLearnMoreDialog(true);
  };

  return (
    <div className="min-h-screen">
      {/* First Section */}
      <section className="w-full py-8 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-3">
            Welcome to the BucksUp Revolution!
          </h1>
        </div>
      </section>

      {/* Second Section - Blue Indigo Gradient */}
      <section className="w-full py-10 bg-gradient-to-br from-indigo-500 via-indigo-600 to-indigo-500 bg-[length:400%_400%] animate-gradient-x">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg md:text-xl text-white/90 mb-4 max-w-2xl mx-auto">
            Your Best-Life, Fast-Path journey is underway.
          </p>
          <h3 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4">
            Find Your Team
          </h3>
          <h4 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            Enter Team Phone Number
          </h4>
          
          <form onSubmit={handlePhoneSubmit} className="space-y-4 max-w-md mx-auto mb-6">
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-white font-medium text-lg">
                Team Phone Number
              </label>
              <Input
                id="phone"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter team phone number"
                className="text-lg p-4 bg-white/90 border-0"
                required
              />
            </div>
            
            <div className="flex justify-center pt-4">
              <Button 
                type="submit"
                className="gradient-prosperity h-16 md:h-20 text-white px-8 md:px-12 py-4 text-lg md:text-xl font-semibold min-w-[200px]"
              >
                Find My Team
              </Button>
            </div>
          </form>
          
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Connect with your team & start building something amazing together.
          </p>
        </div>
      </section>

      {/* Third Section - Phone Form */}
      <section className="w-full py-8 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6">

            {/* Learn More Card */}
            <Card className="bg-gradient-to-br from-green-300 to-emerald-300 border-0 shadow-2xl">
              <CardContent className="p-6">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 text-center">
                  New to BucksUp?
                </h3>
                
                <div className="flex justify-center">
                  <Button 
                    onClick={handleLearnMoreClick}
                    className="bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 hover:from-blue-500 hover:via-blue-600 hover:to-blue-500 h-16 md:h-20 text-white px-8 md:px-12 py-4 text-lg md:text-xl font-semibold min-w-[200px]"
                  >
                    Learn More
                  </Button>
                </div>
                
                <p className="text-center text-white/90 mt-4 text-base md:text-lg">
                  Discover how BucksUp can transform your financial future
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Learn More Dialog */}
      <Dialog open={showLearnMoreDialog} onOpenChange={setShowLearnMoreDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-center mb-4">Learn About BucksUp</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">What is BucksUp?</h3>
              <p className="text-lg leading-relaxed">
                BucksUp is a revolutionary platform that helps you build wealth through smart financial strategies, 
                team cooperation, and automated growth systems. Our mission is to help ordinary people achieve 
                extraordinary financial success.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">How It Works</h3>
              <ul className="space-y-2 text-lg">
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  Join a team of like-minded individuals focused on financial growth
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  Access exclusive deals and cashback opportunities
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  Benefit from our cooperative model that amplifies everyone's success
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  Use automated systems to grow your wealth while you sleep
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Why Choose BucksUp?</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-primary/5 p-4 rounded-lg">
                  <h4 className="font-semibold text-lg mb-2">Team Power</h4>
                  <p>Leverage the collective strength of your team to achieve more than you could alone.</p>
                </div>
                <div className="bg-primary/5 p-4 rounded-lg">
                  <h4 className="font-semibold text-lg mb-2">Smart Automation</h4>
                  <p>Our systems work 24/7 to find opportunities and optimize your financial growth.</p>
                </div>
                <div className="bg-primary/5 p-4 rounded-lg">
                  <h4 className="font-semibold text-lg mb-2">Proven Results</h4>
                  <p>Join thousands of members who have transformed their financial futures with BucksUp.</p>
                </div>
                <div className="bg-primary/5 p-4 rounded-lg">
                  <h4 className="font-semibold text-lg mb-2">Early Retirement</h4>
                  <p>Build the foundation for financial independence and retire on your own terms.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg text-center">
              <h3 className="text-2xl font-semibold mb-4">Ready to Get Started?</h3>
              <p className="text-lg mb-4">
                Enter your team phone number above to connect with your team master and begin your journey to financial freedom.
              </p>
              <Button 
                onClick={() => setShowLearnMoreDialog(false)}
                className="gradient-prosperity text-white px-8 py-3 text-lg font-semibold"
              >
                Get Started Now
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

