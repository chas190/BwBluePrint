import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Legacy from "@/components/Legacy";
import LeakyBucket from "@/components/LeakyBucket";
import FinancialBreakthrough from "@/components/FinancialBreakthrough";
import WhatEldersDo from "@/components/WhatEldersDo";
import Opportunity from "@/components/Opportunity";
import HowItWorks from "@/components/HowItWorks";
import Membership from "@/components/Membership";
import JoinForm from "@/components/JoinForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="py-30"></div>
      <main>
        <Hero />
        <Legacy />
        <LeakyBucket />
        <FinancialBreakthrough />
        <WhatEldersDo />
        <Opportunity />
        <HowItWorks />
        <Membership />
        <JoinForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
