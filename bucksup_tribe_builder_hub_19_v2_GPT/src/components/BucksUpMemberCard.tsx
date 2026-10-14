
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Crown } from 'lucide-react';

const BucksUpMemberCard = () => {
  const [masterChiefs, setMasterChiefs] = useState([25]);

  return (
    <Card className="w-[90%] mx-auto overflow-hidden">
      <CardContent className="p-0">
        {/* Credit Card Design */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-600 p-8 text-white">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-2xl font-bold">BucksUp Member</h3>
              <p className="text-gray-300">Premium Membership</p>
            </div>
            <Crown className="w-8 h-8 text-yellow-400" />
          </div>

          {/* Centered Master Chiefs Label */}
          <div className="text-center mb-6">
            <h2 className="text-cyan-300 text-3xl font-bold">
              Master Chiefs: {masterChiefs[0]}
            </h2>
          </div>
          
          <div className="mb-6">
            <div className="text-sm text-gray-300 mb-2">Progress to Next Level</div>
            <div className="w-full h-2 bg-gray-600 rounded-full overflow-hidden">
              <div className="h-full bg-orange-500 rounded-full" style={{
                width: '65%'
              }} />
            </div>
            <div className="text-sm text-gray-300 mt-1">65% Complete</div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center mb-6">
            <div>
              <div className="text-2xl font-bold">142</div>
              <div className="text-xs text-gray-300">Tribe Members</div>
            </div>
            <div>
              <div className="text-2xl font-bold">$8.2K</div>
              <div className="text-xs text-gray-300">Monthly Earnings</div>
            </div>
            <div>
              <div className="text-2xl font-bold">Gold</div>
              <div className="text-xs text-gray-300">Current Tier</div>
            </div>
          </div>

          {/* Horizontal Divider */}
          <Separator className="mb-4 bg-gray-500" />

          {/* Master Chiefs Slider at bottom */}
          <div className="px-4">
            <Slider
              value={masterChiefs}
              onValueChange={setMasterChiefs}
              max={100}
              min={15}
              step={5}
              className="w-full [&>*:first-child]:bg-cyan-300 [&>*:last-child]:border-cyan-300"
            />
            <div className="flex justify-between text-xs text-gray-300 mt-1">
              <span>15</span>
              <span>100</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BucksUpMemberCard;

