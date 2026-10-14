import { useNavigate } from "react-router-dom";
import { Check, DollarSign, TrendingUp, Users } from "lucide-react";

export default function Page2Difference() {
  const navigate = useNavigate();

  return (
    <div className="onboarding-page bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="space-y-6">
        <h1 className="onboarding-heading">
          Other apps give you $30 back. We give you a revenue stream.
        </h1>
        
        <p className="onboarding-text">
          Most apps reward you with a few bucks here and there. BucksUp builds a recurring income engine from your everyday decisions.
        </p>
        
        <div className="onboarding-list">
          <div className="onboarding-list-item">
            <div className="w-6 h-6 bg-[#0E8A8A] rounded-full flex items-center justify-center mr-3">
              <Check className="w-4 h-4 text-white" />
            </div>
            <span>Real profit shares, not points</span>
          </div>
          <div className="onboarding-list-item">
            <div className="w-6 h-6 bg-[#0E8A8A] rounded-full flex items-center justify-center mr-3">
              <Check className="w-4 h-4 text-white" />
            </div>
            <span>Community-backed returns</span>
          </div>
          <div className="onboarding-list-item">
            <div className="w-6 h-6 bg-[#0E8A8A] rounded-full flex items-center justify-center mr-3">
              <Check className="w-4 h-4 text-white" />
            </div>
            <span>Retirement-aligned investment</span>
          </div>
        </div>
        
        <button 
          className="onboarding-button"
          onClick={() => navigate('/start/page3-autogrowth')}
        >
          Automated Wealth Creation
        </button>
      </div>
    </div>
  );
}
