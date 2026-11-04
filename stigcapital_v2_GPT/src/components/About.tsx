import { Target, Users, Award, TrendingUp } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Institutional Excellence",
    description: "Over a decade of proven expertise in managing $1.3B+ in assets with institutional rigor and transparency."
  },
  {
    icon: Users,
    title: "True Partnership",
    description: "We don't just provide capital—we become your strategic partners, bringing networks, expertise, and genuine alignment."
  },
  {
    icon: Award,
    title: "Track Record",
    description: "Consistent exceptional returns across 30+ properties and 11,000+ units, now applied to scaling businesses."
  },
  {
    icon: TrendingUp,
    title: "Operational Focus",
    description: "Real-world operational knowledge that goes beyond recommendations to hands-on execution support."
  }
];

const About = () => {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="text-sm font-medium text-primary">Our Foundation</span>
            </div>
            
            <h2 className="mb-6">
              <span className="text-gradient-accent text-[120%]">Stig Capital</span> <span className="text-[80%]">Building Wealth, Scaling Businesses,</span> <span className="text-gradient-accent">Empowering Innovation</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              For over a decade, STIG Capital has established itself as a trusted private equity firm 
              specializing in value-add investments. Our institutional approach, combined with deep 
              market expertise in high-growth markets, has consistently delivered exceptional returns.
            </p>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Now, we're leveraging this foundation to expand into business investment, consulting, 
              and venture development—bringing the same rigor, expertise, and investor-first philosophy 
              to help businesses achieve breakthrough growth.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/5 border border-primary/10">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-sm font-medium">Transparency</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/5 border border-primary/10">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-sm font-medium">Excellence</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/5 border border-primary/10">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-sm font-medium">Partnership</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div 
                  key={index}
                  className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
