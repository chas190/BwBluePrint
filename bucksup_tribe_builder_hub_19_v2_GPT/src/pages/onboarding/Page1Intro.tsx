import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import phoneIcon from "@/assets/phoneicon.jpg";

export default function Page1Intro() {
  const navigate = useNavigate();

  return (
    <div className="onboarding-page bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="space-y-6">
        <h1 className="text-[#0E8A8A] text-4xl font-bold">BucksUp</h1>
        <p className="text-lg font-medium text-[#222222]">Super Wealthy-VIP Powers <br className="md:hidden" />In The Palm Of Your Hand</p>
        
        <img 
          src={phoneIcon} 
          alt="BucksUp Phone Icon" 
          className="w-20 h-20 mx-auto mb-6"
        />
        
        <h1 className="onboarding-hero-heading">
          Your Spending. Your Future. Reimagined.
        </h1>
        
        <p className="onboarding-text">
          Turn everyday purchases into lifetime wealth. BucksUp transforms your spending into income, ownership, and financial independence — automatically.
        </p>
        
        <button 
          className="onboarding-button"
          onClick={() => navigate('/start/page2-difference')}
        >
          How BucksUp is Different
        </button>
      </div>
    </div>
  );
}
