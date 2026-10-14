import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Crown, Users, Check, Star, Video } from 'lucide-react';
import Navigation from '@/components/Navigation';
const Membership = () => {
  const [selectedMembershipType, setSelectedMembershipType] = useState<'member' | 'founder'>('member');
  const memberTiers = [{
    id: 'free',
    name: 'Free',
    price: 0,
    period: '',
    features: ['Basic access to community', 'Limited resources', 'Email support'],
    popular: false
  }, {
    id: 'basic',
    name: 'Basic',
    price: 12,
    period: 'per month',
    features: ['Full community access', 'Premium resources', 'Priority email support', 'Monthly webinars'],
    popular: true
  }, {
    id: 'premium',
    name: 'Premium',
    price: 26,
    period: 'per month',
    features: ['Everything in Basic', 'One-on-one coaching sessions', 'Advanced analytics', 'Exclusive events'],
    popular: false
  }];
  const founderTiers = [{
    id: 'starter',
    name: 'Starter Founder',
    price: 27,
    period: 'per month',
    features: ['Build your own tribe', 'Leadership training', 'Tribe management tools', 'Founder community access'],
    popular: false
  }, {
    id: 'growth',
    name: 'Growth Founder',
    price: 45,
    period: 'per month',
    features: ['Everything in Starter', 'Advanced tribe analytics', 'Marketing support', 'Revenue sharing program'],
    popular: true
  }, {
    id: 'elite',
    name: 'Elite Founder',
    price: 120,
    period: 'per month',
    features: ['Everything in Growth', 'Personal success coach', 'Co-Op Business Partners', 'Maximum revenue potential'],
    popular: false
  }];
  const currentTiers = selectedMembershipType === 'member' ? memberTiers : founderTiers;
  const handleSubscribe = (tierId: string, price: number) => {
    console.log(`Subscribing to ${tierId} for $${price}`);
    // Here you would integrate with your payment system
  };
  return <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 my-[14px]">Choose Your Membership</h1>
          <p className="text-xl text-gray-600 mb-8">
            Join our community and start your journey to financial prosperity
          </p>
          
          {/* Membership Type Selector */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg p-2 shadow-md">
              <RadioGroup value={selectedMembershipType} onValueChange={value => setSelectedMembershipType(value as 'member' | 'founder')} className="flex flex-row gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="member" id="member" />
                  <label htmlFor="member" className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-md hover:bg-gray-50">
                    <Users className="w-4 h-4" />
                    Member
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="founder" id="founder" />
                  <label htmlFor="founder" className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-md hover:bg-gray-50">
                    <Crown className="w-4 h-4" />
                    Tribe Founder
                  </label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* Video Button */}
          <div className="flex justify-center mb-8">
            <Dialog>
              <DialogTrigger asChild>
                <Button className={`rounded-full text-white px-6 py-2 flex items-center gap-2 ${selectedMembershipType === 'member' ? 'bg-blue-400 hover:bg-blue-500' : 'bg-purple-600 hover:bg-purple-700'}`}>
                  <Video className="w-4 h-4" />
                  {selectedMembershipType === 'member' ? 'Member Levels Video' : 'Watch Founder Levels Video'}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl w-full">
                <div className="aspect-video">
                  <iframe width="100%" height="100%" src={selectedMembershipType === 'member' ? "https://www.youtube.com/embed/dQw4w9WgXcQ" : "https://www.youtube.com/embed/jNQXAC9IVRw"} title={selectedMembershipType === 'member' ? 'Member Levels Video' : 'Founder Levels Video'} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {currentTiers.map(tier => <Card key={tier.id} className={`relative ${tier.popular ? 'border-2 border-purple-500 shadow-xl' : 'border shadow-lg'} hover:shadow-xl transition-shadow`}>
              {tier.popular && <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="gradient-tribe">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">
                    {tier.price === 0 ? 'Free' : `$${tier.price}`}
                  </span>
                  {tier.period && <span className="text-gray-600 ml-2">{tier.period}</span>}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {tier.features.map((feature, index) => <li key={index} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>)}
                </ul>
                
                <Button onClick={() => handleSubscribe(tier.id, tier.price)} className={`w-full ${tier.popular ? 'gradient-tribe' : tier.price === 0 ? 'bg-gray-600 hover:bg-gray-700' : 'gradient-prosperity'}`} size="lg">
                  {tier.price === 0 ? 'Get Started Free' : 'Subscribe Now'}
                </Button>
              </CardContent>
            </Card>)}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            All plans include a 30-day money-back guarantee
          </p>
          <p className="text-sm text-gray-500">
            {selectedMembershipType === 'member' ? 'Ready to lead? Consider upgrading to a Tribe Founder membership' : 'Start building your financial empire as a Tribe Founder'}
          </p>
        </div>
      </div>
    </div>;
};
export default Membership;
