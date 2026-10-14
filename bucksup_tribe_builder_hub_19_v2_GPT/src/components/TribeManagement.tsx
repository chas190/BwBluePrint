
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import DashboardStats from "@/components/DashboardStats";
import BarGraphCard from "@/components/BarGraphCard";
import MinimalGraphCard from "@/components/MinimalGraphCard";
import FullWidthBarCard from "@/components/FullWidthBarCard";
import TribeSliderCard from "@/components/TribeSliderCard";
import BucksUpMemberCard from "@/components/BucksUpMemberCard";
import DealsSection from "@/components/DealsSection";
import ReadyToLevelUp from "@/components/ReadyToLevelUp";
import TribeSection from "@/components/TribeSection";

interface TribeManagementProps {
  showTribeOverviewSheet: boolean;
  setShowTribeOverviewSheet: (show: boolean) => void;
  showTribeGrowthSheet: boolean;
  setShowTribeGrowthSheet: (show: boolean) => void;
  startingTribes: number[];
  setStartingTribes: (tribes: number[]) => void;
}

const TribeManagement = ({
  showTribeOverviewSheet,
  setShowTribeOverviewSheet,
  showTribeGrowthSheet,
  setShowTribeGrowthSheet,
  startingTribes,
  setStartingTribes
}: TribeManagementProps) => {
  const [showTribeOverviewSection, setShowTribeOverviewSection] = useState(false);
  const [showTribeGrowthSection, setShowTribeGrowthSection] = useState(false);

  // Load settings from localStorage
  useEffect(() => {
    const savedTribeOverview = localStorage.getItem('devSettings_showTribeOverviewSection');
    if (savedTribeOverview !== null) {
      setShowTribeOverviewSection(JSON.parse(savedTribeOverview));
    }

    const savedTribeGrowth = localStorage.getItem('devSettings_showTribeGrowthSection');
    if (savedTribeGrowth !== null) {
      setShowTribeGrowthSection(JSON.parse(savedTribeGrowth));
    }
  }, []);

  return (
    <>
      <section className="container mx-auto py-8 px-4 md:px-6">
        <Card className="w-full bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Sheet open={showTribeOverviewSheet} onOpenChange={setShowTribeOverviewSheet}>
                <SheetTrigger asChild>
                  <Button className="h-16 bg-white text-purple-700 hover:bg-gray-100 font-semibold text-lg">
                    Tribe Overview
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[90vh]">
                  <SheetHeader>
                    <SheetTitle>Tribe Overview</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 overflow-y-auto h-full pb-20">
                    <DashboardStats />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <BarGraphCard startingTribes={startingTribes} />
                      <MinimalGraphCard startingTribes={startingTribes} />
                    </div>

                    <FullWidthBarCard startingTribes={startingTribes} onStartingTribesChange={setStartingTribes} />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                      <TribeSliderCard startingTribes={startingTribes} onStartingTribesChange={setStartingTribes} />
                      <BucksUpMemberCard />
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <Sheet open={showTribeGrowthSheet} onOpenChange={setShowTribeGrowthSheet}>
                <SheetTrigger asChild>
                  <Button className="h-16 bg-white text-purple-700 hover:bg-gray-100 font-semibold text-lg">
                    Tribe Growth Metrics
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[90vh]">
                  <SheetHeader>
                    <SheetTitle>Tribe Growth Metrics</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 overflow-y-auto h-full pb-20">
                    <DealsSection />
                    <ReadyToLevelUp />
                    <TribeSection />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Conditionally render tribe overview content on main page */}
      {showTribeOverviewSection && (
        <section className="container mx-auto py-8 px-4 md:px-6">
          <DashboardStats />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <BarGraphCard startingTribes={startingTribes} />
            <MinimalGraphCard startingTribes={startingTribes} />
          </div>

          <FullWidthBarCard startingTribes={startingTribes} onStartingTribesChange={setStartingTribes} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <TribeSliderCard startingTribes={startingTribes} onStartingTribesChange={setStartingTribes} />
            <BucksUpMemberCard />
          </div>
        </section>
      )}

      {/* Conditionally render tribe growth content on main page */}
      {showTribeGrowthSection && (
        <section className="container mx-auto py-8 px-4 md:px-6">
          <DealsSection />
          <ReadyToLevelUp />
          <TribeSection />
        </section>
      )}
    </>
  );
};

export default TribeManagement;

