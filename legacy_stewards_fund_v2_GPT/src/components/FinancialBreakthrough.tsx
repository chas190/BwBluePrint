import { Card } from "@/components/ui/card";
import { TrendingUp, Home, Wallet, Building2 } from "lucide-react";

const FinancialBreakthrough = () => {
  const impacts = [
    {
      icon: TrendingUp,
      metric: "245%",
      label: "Economic Activity Increase",
      description: "When local spending rises from 15% to 30%, total economic activity increases by 245%"
    },
    {
      icon: Home,
      metric: "$19.5M",
      label: "Community Home Equity",
      description: "Over 45 years, the difference between weak and strong local economies is $19.5M in home equity alone"
    },
    {
      icon: Wallet,
      metric: "$400k-$1.5M",
      label: "Individual Lifetime Income",
      description: "Residents see lifetime income increases of $400,000 to $1.5M when their community keeps money local"
    },
    {
      icon: Building2,
      metric: "$6.63M",
      label: "30-Year Home Value",
      description: "Strong local economy homes reach $6.63M value vs. $2.16M in economically weak communities"
    }
  ];

  return (
    <section id="solution" className="py-24 bg-gradient-parchment relative">
      <div className="absolute inset-0 parchment-texture opacity-20"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-secondary/20 rounded-full mb-6">
            <TrendingUp className="w-8 h-8 text-secondary" />
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-6">
            The <span className="text-secondary">Financial Breakthrough</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            When a community shifts from 15% to 30% local spending, the transformation is nothing short of revolutionary. These aren't projections—they're verified economic realities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          {impacts.map((impact, index) => (
            <Card key={index} className="p-8 bg-card border-border shadow-elegant hover:shadow-glow transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start space-x-4">
                <div className="bg-secondary/10 p-4 rounded-lg flex-shrink-0">
                  <impact.icon className="w-8 h-8 text-secondary" />
                </div>
                <div className="flex-1">
                  <div className="text-4xl font-bold text-secondary mb-2">{impact.metric}</div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                    {impact.label}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {impact.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* The Math Visualization */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 bg-primary text-primary-foreground shadow-elegant">
            <h3 className="font-serif text-2xl font-bold text-center mb-8">
              The Economic Multiplier in Action
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="text-center p-6 bg-primary-foreground/10 rounded-lg border-2 border-primary-foreground/20">
                <div className="text-sm uppercase tracking-wide mb-3 text-primary-foreground/70">Current State</div>
                <div className="text-5xl font-bold mb-2">15%</div>
                <div className="text-sm text-primary-foreground/80 mb-4">Local Spending</div>
                <div className="space-y-2 text-left text-sm">
                  <div className="flex justify-between">
                    <span className="text-primary-foreground/70">Economic Activity:</span>
                    <span className="font-semibold">Low</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-foreground/70">Home Values:</span>
                    <span className="font-semibold">$2.16M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-foreground/70">Community Wealth:</span>
                    <span className="font-semibold">Declining</span>
                  </div>
                </div>
              </div>

              <div className="text-center p-6 bg-secondary/20 rounded-lg border-2 border-secondary">
                <div className="text-sm uppercase tracking-wide mb-3 text-primary-foreground/70">Transformed State</div>
                <div className="text-5xl font-bold mb-2 text-secondary">30%</div>
                <div className="text-sm text-primary-foreground/80 mb-4">Local Spending</div>
                <div className="space-y-2 text-left text-sm">
                  <div className="flex justify-between">
                    <span className="text-primary-foreground/70">Economic Activity:</span>
                    <span className="font-semibold text-secondary">+245%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-foreground/70">Home Values:</span>
                    <span className="font-semibold text-secondary">$6.63M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-foreground/70">Community Wealth:</span>
                    <span className="font-semibold text-secondary">Growing</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-lg leading-relaxed text-primary-foreground/90">
                This isn't theoretical. These numbers represent <strong>real economic dynamics</strong> that have been observed in communities that successfully redirect their spending patterns. The only question is: <strong>will your town be next?</strong>
              </p>
            </div>
          </Card>
        </div>

        <div className="max-w-3xl mx-auto mt-12">
          <div className="bg-accent/10 border-l-4 border-accent p-6 rounded-r-lg">
            <p className="text-lg text-foreground font-medium">
              <strong>The key insight:</strong> You don't need every resident to change their habits. You just need enough leadership and awareness to shift the community from 15% to 30% local spending. That's the tipping point—and it's achievable with the right guidance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinancialBreakthrough;
