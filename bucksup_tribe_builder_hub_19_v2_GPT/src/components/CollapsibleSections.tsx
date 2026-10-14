
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardStats from "@/components/DashboardStats";

interface CollapsibleSectionsProps {
  isWelcomeOpen: boolean;
  setIsWelcomeOpen: (open: boolean) => void;
  isWealthBuildingOpen: boolean;
  setIsWealthBuildingOpen: (open: boolean) => void;
}

const CollapsibleSections = ({ 
  isWelcomeOpen, 
  setIsWelcomeOpen, 
  isWealthBuildingOpen, 
  setIsWealthBuildingOpen 
}: CollapsibleSectionsProps) => {
  return (
    <>
      {/* Collapsible Welcome Section */}
      <div className="container mx-auto md:px-6 pb-8 px-[11px]">
        <Collapsible open={isWelcomeOpen} onOpenChange={setIsWelcomeOpen}>
          <Card className="w-full shadow-lg py-[9px]">
            <CollapsibleTrigger asChild>
              <div className="cursor-pointer p-6 hover:bg-gray-50 transition-colors px-[5px] py-[2px]">
                <div className="flex items-center justify-between">
                  <div className="text-center flex-1">
                    <h1 className="md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent text-3xl my-[3px]">
                      Welcome to BucksUp
                    </h1>
                  </div>
                  <ChevronDown className={`h-6 w-6 text-gray-600 transition-transform duration-200 ${isWelcomeOpen ? 'rotate-180' : ''}`} />
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-6 pt-0 text-center">
                <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">Save money, earn rewards, and grow your financial future, with your tribe.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/auth">
                    <Button size="lg" className="gradient-main text-white px-8 py-4 text-lg">
                      Get Started
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <Link to="/profile-demo">
                    <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-2">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      </div>

      {/* Collapsible Wealth Building Dashboard Section */}
      <div className="container mx-auto px-4 md:px-6 pb-16">
        <Collapsible open={isWealthBuildingOpen} onOpenChange={setIsWealthBuildingOpen}>
          <Card className="w-full shadow-lg">
            <CollapsibleTrigger asChild>
              <div className="cursor-pointer p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="text-center flex-1">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                      Wealth Building
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                      Track your progress, grow your tribe, and build lasting wealth together
                    </p>
                  </div>
                  <ChevronDown className={`h-6 w-6 text-gray-600 transition-transform duration-200 ${isWealthBuildingOpen ? 'rotate-180' : ''}`} />
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-6 pt-0">
                <DashboardStats />
              </div>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      </div>
    </>
  );
};

export default CollapsibleSections;

