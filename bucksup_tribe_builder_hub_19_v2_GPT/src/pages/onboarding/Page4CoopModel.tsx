import { useNavigate } from "react-router-dom";
import { Users, Shield, Heart } from "lucide-react";

export default function Page4CoopModel() {
  const navigate = useNavigate();

  return (
    <div className="onboarding-page bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="space-y-6">
        <div className="w-20 h-20 bg-gradient-to-r from-[#0E8A8A] to-[#FFCB05] rounded-full flex items-center justify-center mx-auto mb-6">
          <Users className="w-10 h-10 text-white" />
        </div>
        
        <h1 className="onboarding-heading">
          Stronger together: how members win more
        </h1>
        
        <p className="onboarding-text">
          BucksUp is built like a community fund. We harness collective financial power, like REI and farming co-ops, to give you access to deals, shares, and smart growth — not extract profits from you.
        </p>
        
        <div className="onboarding-list">
          <div className="onboarding-list-item">
            <Shield className="w-6 h-6 text-[#0E8A8A] mr-3" />
            <span>Owned by members, not investors</span>
          </div>
          <div className="onboarding-list-item">
            <Heart className="w-6 h-6 text-[#0E8A8A] mr-3" />
            <span>Profits go back to you</span>
          </div>
          <div className="onboarding-list-item">
            <Users className="w-6 h-6 text-[#0E8A8A] mr-3" />
            <span>Financial dignity for every member</span>
          </div>
        </div>
        
        <button 
          className="onboarding-button"
          onClick={() => navigate('/start/page5-retireearly')}
        >
          What Your Future Looks Like
        </button>
      </div>
    </div>
  );
}
