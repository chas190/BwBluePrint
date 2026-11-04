import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp } from "lucide-react";
import heroRocket from "@/assets/hero-rocket.jpg";
const Hero = () => {
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img src={heroRocket} alt="Business acceleration" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--navy-dark))]/95 via-[hsl(var(--navy-medium))]/90 to-[hsl(var(--navy-dark))]/95" />
      </div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl text-center pt-15 mt-15 mx-0 my-[11px]">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 backdrop-blur-sm">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Accelerating Business Growth Since 2010</span>
          </div>
          
          <h1 className="mb-6 text-white mt-25">
            ADD <span className="text-gradient-accent">Multi-Million</span> Revenue
            <br />
            & <span className="text-gradient-accent">Increase</span> Profits that
            <br />
            <span className="text-gradient-accent">Catapult</span> Business Value
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            Where Ai Knowledge and industry expertise meets entrepreneurial vision. Stig Capital provides capital, expertise and Ai intelligence needed to provide the acceleration needed to transform your business into your industry leader.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" variant="default" className="group">
              Start Your Journey
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10 text-orange-500">
              Explore Our Services
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pb-25 mb-20">
            <div className="backdrop-blur-md bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="text-4xl md:text-5xl font-bold text-gradient-primary mb-2">$1.3B</div>
              <div className="text-gray-300">Assets Under Management</div>
            </div>
            <div className="backdrop-blur-md bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="text-4xl md:text-5xl font-bold text-gradient-primary mb-2">30+</div>
              <div className="text-gray-300">Portfolio Companies</div>
            </div>
            <div className="backdrop-blur-md bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="text-4xl md:text-5xl font-bold text-gradient-primary mb-2">11K+</div>
              <div className="text-gray-300">Units Managed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full" />
        </div>
      </div>
    </section>;
};
export default Hero;