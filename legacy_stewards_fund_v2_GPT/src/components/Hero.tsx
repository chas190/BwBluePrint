import { Button } from "@/components/ui/button";
import { ArrowRight, Scroll } from "lucide-react";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 border-2 border-gold rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 border-2 border-gold/50 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Icon */}
          <div className="flex justify-center mb-8 animate-fade-in">
            <div className="bg-secondary/20 p-6 rounded-full shadow-glow">
              <Scroll className="w-16 h-16 text-secondary" />
            </div>
          </div>

          {/* Main heading */}
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 animate-fade-in text-balance">
            Become a Modern <span className="text-secondary">Founding Elder</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-primary-foreground/90 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in text-balance">
            Lead your town into a new era of prosperity, unity, and generational wealth. Just as the Founding Fathers
            shaped a nation, you can reshape your community's future.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
            <Button
              size="lg"
              onClick={() => scrollToSection("join")}
              className="bg-secondary hover:bg-secondary/90 text-primary font-semibold px-8 py-6 text-lg shadow-elegant hover:shadow-glow transition-all duration-300 hover:scale-105"
            >
              Join the Founding Elders <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("how-it-works")}
              className="border-2 border-primary-foreground/30 text-primary hover:bg-primary-foreground/10 font-semibold px-8 py-6 text-lg backdrop-blur-sm"
            >
              Learn How the Fund Works
            </Button>
          </div>

          {/* Stats bar */}
          <div className="mt-20 mb- 20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-6 border border-primary-foreground/20">
              <div className="text-4xl font-bold text-secondary mb-2">245%</div>
              <div className="text-primary-foreground/80">Economic Activity Increase</div>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-6 border border-primary-foreground/20">
              <div className="text-4xl font-bold text-secondary mb-2">$19.5M</div>
              <div className="text-primary-foreground/80">Community Wealth Preserved</div>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-6 border border-primary-foreground/20">
              <div className="text-4xl font-bold text-secondary mb-2">300 Years</div>
              <div className="text-primary-foreground/80">Legacy of Leadership</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-secondary rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
