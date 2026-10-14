import { Card } from "@/components/ui/card";
import { Crown, Star, Shield, Users } from "lucide-react";

const Membership = () => {
  const tiers = [
    {
      icon: Crown,
      name: "Founding Elder",
      description: "The core leadership group—architects of the community's economic transformation",
      responsibilities: [
        "Set strategic vision and direction",
        "Lead community education initiatives",
        "Guide major fund decisions",
        "Serve as primary community ambassadors"
      ],
      commitment: "Active leadership role with regular engagement"
    },
    {
      icon: Star,
      name: "Senior Guardian",
      description: "Experienced advisors who provide wisdom and institutional knowledge",
      responsibilities: [
        "Advise on fund strategy and operations",
        "Mentor newer Founding Elders",
        "Represent the fund in community forums",
        "Support major initiatives"
      ],
      commitment: "Advisory role with periodic involvement"
    },
    {
      icon: Shield,
      name: "Council Member",
      description: "Active participants who champion the mission across the community",
      responsibilities: [
        "Advocate for local business support",
        "Educate peers about economic impact",
        "Attend quarterly council meetings",
        "Support community events"
      ],
      commitment: "Regular participation in key activities"
    },
    {
      icon: Users,
      name: "Town Steward",
      description: "Community members who support the vision and spread awareness",
      responsibilities: [
        "Practice conscious local spending",
        "Share the mission with neighbors",
        "Attend annual gatherings",
        "Celebrate community victories"
      ],
      commitment: "Supportive role with flexible involvement"
    }
  ];

  return (
    <section id="membership" className="py-24 bg-gradient-parchment relative">
      <div className="absolute inset-0 parchment-texture opacity-20"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-6">
            <span className="text-secondary">Membership</span> Levels
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            The Founding Elders Circle welcomes community members at different levels of involvement. Every role is vital to the mission—from strategic leadership to grassroots advocacy.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          {tiers.map((tier, index) => (
            <Card 
              key={index} 
              className={`p-8 border-2 hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 ${
                index === 0 
                  ? 'bg-secondary/5 border-secondary/30' 
                  : 'bg-card border-border'
              }`}
            >
              <div className="flex items-start space-x-4 mb-6">
                <div className={`p-4 rounded-lg flex-shrink-0 ${
                  index === 0 ? 'bg-secondary/20' : 'bg-secondary/10'
                }`}>
                  <tier.icon className="w-8 h-8 text-secondary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
                    {tier.name}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {tier.description}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-foreground mb-3">Key Responsibilities:</h4>
                <ul className="space-y-2">
                  {tier.responsibilities.map((responsibility, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-secondary mr-2 mt-1">•</span>
                      <span className="text-muted-foreground">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-border">
                <div className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Commitment:</strong> {tier.commitment}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Important Note */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 bg-primary text-primary-foreground shadow-elegant">
            <div className="text-center">
              <h3 className="font-serif text-2xl font-bold mb-4">
                Leadership Over Wealth
              </h3>
              <p className="text-lg leading-relaxed text-primary-foreground/90 mb-4">
                Membership levels reflect involvement and responsibility, not financial contribution. The Fund values your time, expertise, and community standing far more than monetary donations.
              </p>
              <p className="text-lg leading-relaxed text-primary-foreground/90">
                <strong>What matters:</strong> Your dedication to the vision, your willingness to lead, and your commitment to building generational prosperity for your community.
              </p>
            </div>
          </Card>
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          <div className="bg-accent/10 border-l-4 border-accent p-6 rounded-r-lg">
            <p className="text-lg text-foreground font-medium text-center">
              Ready to choose your level of impact? The application process will help match you with the role that fits your vision and capacity for involvement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Membership;
