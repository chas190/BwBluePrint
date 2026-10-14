import { useNavigate } from "react-router-dom";
import { Bot, Zap, TrendingUp } from "lucide-react";

export default function Page3AutoGrowth() {
  const navigate = useNavigate();

  return (
    <div className="onboarding-page bg-gradient-to-br from-purple-50 to-violet-50">
      <div className="space-y-6">
        <div className="w-20 h-20 bg-gradient-to-r from-[#0E8A8A] to-[#FFCB05] rounded-full flex items-center justify-center mx-auto mb-6">
          <Bot className="w-10 h-10 text-white" />
        </div>
        
        <h1 className="onboarding-heading">
          Let AI grow your money while you live your life.
        </h1>
        
        <p className="onboarding-text">
          While others tell you how to save, we just do it. BucksUp automates compound-growth investing and delivers high-yield opportunities — hands-free.
        </p>
        
        <div className="onboarding-quote">
          "The best investment is one that doesn't rely on your free time."
        </div>
        
        <button 
          className="onboarding-button"
          onClick={() => navigate('/start/page4-coopmodel')}
        >
          Why This Works So Well
        </button>
      </div>
    </div>
  );
}
