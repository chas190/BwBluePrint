import { useNavigate } from "react-router-dom";
import { Sunset, Coffee, Palmtree } from "lucide-react";

export default function Page5RetireEarly() {
  const navigate = useNavigate();

  return (
    <div className="onboarding-page bg-gradient-to-br from-rose-50 to-pink-50">
      <div className="space-y-6">
        <h1 className="onboarding-heading">
          Retire earlier. Stress less. Enjoy more.
        </h1>
        
        <p className="onboarding-text">
          BucksUp builds a passive financial engine that helps pay your future bills, reduces money stress, and helps you get more out of life without mastering money.
        </p>
        
        <div className="flex justify-center space-x-8 my-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#0E8A8A] rounded-full flex items-center justify-center mx-auto mb-2">
              <Sunset className="w-8 h-8 text-white" />
            </div>
            <span className="text-sm text-gray-600">Early Retirement</span>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-[#FFCB05] rounded-full flex items-center justify-center mx-auto mb-2">
              <Coffee className="w-8 h-8 text-white" />
            </div>
            <span className="text-sm text-gray-600">Less Stress</span>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-[#0E8A8A] to-[#FFCB05] rounded-full flex items-center justify-center mx-auto mb-2">
              <Palmtree className="w-8 h-8 text-white" />
            </div>
            <span className="text-sm text-gray-600">More Freedom</span>
          </div>
        </div>
        
        <p className="onboarding-text">
          This is your new toolkit for sustainable, member-powered wealth. It's not just an app. It's a movement.
        </p>
        
        <button 
          className="onboarding-button"
          onClick={() => navigate('/signup')}
        >
          Complete Your Registration
        </button>
      </div>
    </div>
  );
}
