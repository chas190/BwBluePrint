import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import bucksupLogo from "@/assets/bucksup-logo.png";
export default function Cover() {
  const navigate = useNavigate();
  const handleStart = () => {
    navigate("/info/question");
  };
  return <div className="min-h-screen bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center p-4 py-[8px]">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600">
            Welcome to
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold my-[3px]">
            <span className="text-prosperity-350">The </span>
            <span className="text-prosperity-600 tracking-wider" style={{
            transform: 'scaleY(1.15)'
          }}>BUCKSUP</span>
            <span className="text-prosperity-450">.app</span>
          </h2>
          <p className="text-lg text-blue-500 font-medium mt-1 mb-1 my-0">
            Access Better-Life, Fast-Path Gurus
          </p>
        </div>

        <div className="flex justify-center mb-0 mt-6 my-[0px]">
          <img src={`${import.meta.env.BASE_URL}phoneicon.jpg`} alt="BucksUp Logo" className="w-20 h-20" />
        </div>
        
        <div className="space-y-6">
          <h3 className="text-xl md:text-2xl font-bold text-foreground -mt-[10px]">
            A Revolutionary Better Way To:
          </h3>
          <ul className="text-lg space-y-1 max-w-md mx-auto text-left">
            <li className="flex items-center px-[16px]">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                <Check className="w-4 h-4 text-white" />
              </div>
              <span className="text-foreground ml-5">Generate Wealth</span>
            </li>
            <li className="flex items-center px-[16px]">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                <Check className="w-4 h-4 text-white" />
              </div>
              <span className="text-foreground ml-5">Financial Security</span>
            </li>
            <li className="flex items-center px-[16px]">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                <Check className="w-4 h-4 text-white" />
              </div>
              <span className="text-foreground ml-5">Vip-Benefits & Savings</span>
            </li>
            <li className="flex items-center px-[16px]">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                <Check className="w-4 h-4 text-white" />
              </div>
              <span className="text-foreground ml-5">Faster Retirement</span>
            </li>
            <li className="flex items-center px-[16px]">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                <Check className="w-4 h-4 text-white" />
              </div>
              <span className="text-foreground ml-5">More Time For Fun</span>
            </li>
          </ul>
        </div>

        <h4 className="md:text-3xl font-bold bg-gradient-to-r from-prosperity-300 via-prosperity-500 to-prosperity-300 bg-clip-text text-3xl text-blue-600 my-[7px]">
          Building Your Best Life
        </h4>
        
        <p className="font-medium text-lg text-white bg-black px-4 py-2 rounded my-[12px]">By Making A Lot More Money!</p>
        
        <div className="pt-8 py-0">
          <Button onClick={handleStart} size="lg" className="text-lg px-8 py-4 rounded-full">
            Start Quest
          </Button>
        </div>
      </div>
    </div>;
}
