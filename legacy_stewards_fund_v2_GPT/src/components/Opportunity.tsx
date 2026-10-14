import { Card } from "@/components/ui/card";
import { Award, Building, Users, TrendingUp, Heart, Shield } from "lucide-react";

const Opportunity = () => {
  const benefits = [
    {
      icon: Shield,
      title: "Safer Communities",
      description: "Economic strength leads to lower crime rates and stronger social bonds"
    },
    {
      icon: TrendingUp,
      title: "Higher Incomes",
      description: "Residents see lifetime income increases of $400k-$1.5M"
    },
    {
      icon: Building,
      title: "Stronger Tax Base",
      description: "Better schools, infrastructure, and public services for everyone"
    },
    {
      icon: Users,
      title: "Thriving Local Businesses",
      description: "More entrepreneurs, more jobs, more opportunities"
    },
    {
      icon: Heart,
      title: "Quality of Life",
      description: "Vibrant main streets, community events, and civic pride"
    },
    {
      icon: Award,
      title: "Lasting Legacy",
      description: "Your name in your town's history—forever"
    }
  ];

  return (
    <section className="py-24 bg-gradient-parchment relative overflow-hidden">
      <div className="absolute inset-0 parchment-texture opacity-20"></div>
      
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-secondary/20 rounded-full mb-6">
            <Award className="w-8 h-8 text-secondary" />
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-6">
            A Once-in-a-Lifetime <span className="text-secondary">Opportunity</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            This is your chance to put your name in your town's history—forever. To be remembered not just as someone who lived in the community, but as someone who transformed it.
          </p>
        </div>

        {/* Vision Statement */}
        <div className="max-w-3xl mx-auto mb-16">
          <Card className="p-8 bg-card border-2 border-secondary/20 shadow-elegant">
            <h3 className="font-serif text-2xl font-bold text-center text-foreground mb-6">
              Imagine Your Town in 30 Years
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed text-center mb-6">
              Main Street bustling with locally-owned shops. Young families buying their first homes. Grandchildren inheriting not just property, but prosperity. And at the center of it all—a plaque that reads:
            </p>
            <div className="bg-muted/50 p-6 rounded-lg border-l-4 border-secondary">
              <p className="font-serif text-xl italic text-center text-foreground">
                "Founded by the vision and dedication of the Founding Elders of [Year]"
              </p>
            </div>
          </Card>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {benefits.map((benefit, index) => (
            <Card key={index} className="p-6 bg-card border-border hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 text-center">
              <div className="bg-secondary/10 p-4 rounded-full inline-block mb-4">
                <benefit.icon className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </Card>
          ))}
        </div>

        {/* Call to Greatness */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-10 bg-primary text-primary-foreground shadow-elegant">
            <div className="text-center">
              <h3 className="font-serif text-3xl font-bold mb-6">
                This Is Your Moment
              </h3>
              <p className="text-xl leading-relaxed mb-6 text-primary-foreground/90">
                Most people spend their lives wondering if they'll ever do something truly significant. Something that matters beyond their own lifetime. Something that echoes through generations.
              </p>
              <p className="text-xl leading-relaxed mb-6 text-primary-foreground/90">
                <strong>This is that moment.</strong>
              </p>
              <p className="text-lg leading-relaxed text-primary-foreground/80">
                The Founding Fathers didn't know they were creating something that would last centuries. They just knew they had to step forward. You have the same choice. The same opportunity. The same potential for lasting impact.
              </p>
            </div>
          </Card>
        </div>

        {/* Historical Perspective */}
        <div className="mt-12 max-w-3xl mx-auto">
          <div className="bg-accent/10 border-l-4 border-accent p-6 rounded-r-lg">
            <p className="text-lg text-foreground font-medium">
              <strong>Historical fact:</strong> Every major American achievement started with a small group of dedicated leaders who refused to accept the status quo. Your town's transformation can begin the same way—with you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Opportunity;
