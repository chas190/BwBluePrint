import { Button } from '@/components/ui/button';
import { Rocket, Target } from 'lucide-react';
const ReadyToLevelUp = () => {
  return <div className="gradient-main p-8 text-white text-center my-[10px]">
      <div className="max-w-2xl mx-auto">
        <h3 className="text-3xl font-bold mb-4">Ready to Level Up?</h3>
        <p className="text-lg mb-6 opacity-90">
          Join thousands building generational wealth. Your financial freedom starts here.
        </p>
        
        <div className="flex gap-4 justify-center">
          <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 hover:scale-105 transition-transform">
            <Rocket className="w-5 h-5 mr-2" />
            Upgrade Membership
          </Button>
          <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 hover:scale-105 transition-transform">
            <Target className="w-5 h-5 mr-2" />
            View Calculator
          </Button>
        </div>
      </div>
    </div>;
};
export default ReadyToLevelUp;
