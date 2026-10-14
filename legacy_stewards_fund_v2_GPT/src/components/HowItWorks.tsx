import { Card } from "@/components/ui/card";
import { Database, Users, Building2, TrendingUp, FileText, Brain } from "lucide-react";

const HowItWorks = () => {
  const features = [
    {
      icon: Users,
      title: "Nonprofit Structure",
      description: "The Fund operates as a 501(c)(3) nonprofit, ensuring transparency, accountability, and tax benefits for all participants"
    },
    {
      icon: Building2,
      title: "Local Business Support",
      description: "Strategic investments in local businesses that strengthen the community's economic foundation"
    },
    {
      icon: TrendingUp,
      title: "Revenue Cycling",
      description: "Profits from fund activities are reinvested back into the community, creating a self-sustaining economic engine"
    },
    {
      icon: FileText,
      title: "Transparent Reporting",
      description: "Regular public reports on fund performance, community impact, and economic indicators"
    },
    {
      icon: Database,
      title: "Community-Guided",
      description: "Founding Elders provide strategic direction while engaging the broader community in decision-making"
    },
    {
      icon: Brain,
      title: "Data-Driven Strategy",
      description: "Advanced analytics track economic flow patterns and identify opportunities for maximum community benefit"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Founding Elders Convene",
      description: "A small group of respected community leaders commit to the vision"
    },
    {
      number: "02",
      title: "Community Education",
      description: "Residents learn about the leaky bucket problem and local spending power"
    },
    {
      number: "03",
      title: "Strategic Investments",
      description: "The Fund supports local businesses and economic infrastructure"
    },
    {
      number: "04",
      title: "Economic Redirection",
      description: "Spending patterns shift from 15% to 30% local, triggering the multiplier effect"
    },
    {
      number: "05",
      title: "Wealth Builds",
      description: "Community prosperity grows: higher home values, incomes, and quality of life"
    },
    {
      number: "06",
      title: "Legacy Established",
      description: "The system becomes self-sustaining, benefiting generations to come"
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-6">
            How the <span className="text-secondary">Fund Works</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            The Founding Elders Community Development Fund is a sophisticated yet simple system designed to redirect economic power back to your community.
          </p>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 bg-card border-border hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
              <div className="bg-secondary/10 p-4 rounded-lg inline-block mb-4">
                <feature.icon className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>

        {/* Process Timeline */}
        <div className="max-w-4xl mx-auto mb-16">
          <h3 className="font-serif text-3xl font-bold text-center text-foreground mb-12">
            The Path to Transformation
          </h3>
          <div className="space-y-6">
            {steps.map((step, index) => (
              <Card key={index} className="p-6 bg-card border-border hover:shadow-elegant transition-all duration-300">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center">
                      <span className="font-serif text-2xl font-bold text-secondary">{step.number}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-serif text-xl font-semibold text-foreground mb-2">
                      {step.title}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* The Engine */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-10 bg-primary text-primary-foreground shadow-elegant">
            <h3 className="font-serif text-3xl font-bold text-center mb-8">
              The Self-Sustaining Engine
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2 text-secondary">$</div>
                <div className="text-sm uppercase tracking-wide mb-2 text-primary-foreground/70">Fund Investments</div>
                <p className="text-sm text-primary-foreground/80">Support local businesses</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2 text-secondary">↻</div>
                <div className="text-sm uppercase tracking-wide mb-2 text-primary-foreground/70">Revenue Returns</div>
                <p className="text-sm text-primary-foreground/80">Profits cycle back to Fund</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2 text-secondary">↑</div>
                <div className="text-sm uppercase tracking-wide mb-2 text-primary-foreground/70">Community Grows</div>
                <p className="text-sm text-primary-foreground/80">Prosperity compounds over time</p>
              </div>
            </div>
            <p className="text-center text-lg text-primary-foreground/90 leading-relaxed">
              Unlike traditional charity, this system creates <strong>permanent economic infrastructure</strong>. Once established, it generates prosperity for generations—all guided by the wisdom of the Founding Elders.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
