import { Card, CardContent } from "@/components/ui/card";
import { Rocket, TrendingUp, Lightbulb, Zap } from "lucide-react";

const services = [
  {
    icon: TrendingUp,
    title: "Business Investment",
    description: "Strategic capital deployment in high-growth operating companies across proptech, hospitality, and real estate-adjacent sectors.",
    features: [
      "$2M-$25M investment range",
      "Proven product-market fit",
      "Institutional diligence process",
      "Active value creation support"
    ]
  },
  {
    icon: Lightbulb,
    title: "Business Consulting",
    description: "Hands-on operational expertise helping businesses scale, optimize, and execute winning strategies.",
    features: [
      "Operations & asset management",
      "Technology & digital transformation",
      "Growth strategy & investor readiness",
      "Data-driven decision frameworks"
    ]
  },
  {
    icon: Rocket,
    title: "Business Incubator",
    description: "Six-month intensive programs nurturing early-stage companies with capital, mentorship, and market access.",
    features: [
      "Seed capital & funding access",
      "Product-market fit validation",
      "Mentor network & guidance",
      "Go-to-market strategy"
    ]
  },
  {
    icon: Zap,
    title: "Business Accelerator",
    description: "Rapid-scale programs for growth-stage companies ready to expand into new markets and opportunities.",
    features: [
      "3-month intensive program",
      "Market expansion support",
      "Revenue acceleration tactics",
      "Strategic partnership access"
    ]
  }
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="mb-4 text-gradient-accent">
            Four Pillars of Growth
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive services designed to take your business from concept to market leader.
            Each division leverages our proven expertise and extensive network.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card 
                key={index}
                className="group hover:shadow-[0_0_30px_rgba(255,149,0,0.2)] transition-all duration-300 border-border/50 hover:border-primary/50 bg-card"
              >
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-primary-glow group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className="text-sm text-foreground/80">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
