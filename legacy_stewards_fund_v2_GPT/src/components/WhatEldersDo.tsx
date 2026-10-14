import { Card } from "@/components/ui/card";
import { Lightbulb, Users, MessageSquare, TrendingUp, Shield, BookOpen } from "lucide-react";

const WhatEldersDo = () => {
  const responsibilities = [
    {
      icon: Lightbulb,
      title: "Provide Leadership",
      description: "Guide your community through economic transformation with vision and integrity"
    },
    {
      icon: BookOpen,
      title: "Share Knowledge",
      description: "Educate residents about the power of local spending and economic multipliers"
    },
    {
      icon: Users,
      title: "Rally the Community",
      description: "Bring people together around a shared vision of prosperity"
    },
    {
      icon: TrendingUp,
      title: "Guide Economic Flow",
      description: "Help redirect community spending to strengthen the local economy"
    },
    {
      icon: MessageSquare,
      title: "Champion Local Business",
      description: "Advocate for and support local entrepreneurs and merchants"
    },
    {
      icon: Shield,
      title: "Preserve Legacy",
      description: "Build systems that will benefit your town for generations to come"
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-6">
            What <span className="text-secondary">Founding Elders</span> Do
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            Being a Founding Elder isn't about money, degrees, or technical expertise. It's about stepping forward with dedication and love for your community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {responsibilities.map((item, index) => (
            <Card key={index} className="p-6 bg-card border-border hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
              <div className="bg-secondary/10 p-4 rounded-lg inline-block mb-4">
                <item.icon className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                {item.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </Card>
          ))}
        </div>

        {/* Requirements Section */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="p-8 bg-muted/30 border-2 border-border">
              <h3 className="font-serif text-2xl font-bold text-foreground mb-6 text-center">
                Not Required
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-muted-foreground mr-3">✗</span>
                  <span className="text-muted-foreground">MBA or economics degree</span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-foreground mr-3">✗</span>
                  <span className="text-muted-foreground">AI or technology expertise</span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-foreground mr-3">✗</span>
                  <span className="text-muted-foreground">Large financial contribution</span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-foreground mr-3">✗</span>
                  <span className="text-muted-foreground">Previous nonprofit experience</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 bg-secondary/10 border-2 border-secondary/20">
              <h3 className="font-serif text-2xl font-bold text-foreground mb-6 text-center">
                Required
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-secondary mr-3">✓</span>
                  <span className="text-foreground font-medium">Deep love for your community</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-3">✓</span>
                  <span className="text-foreground font-medium">Respected local reputation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-3">✓</span>
                  <span className="text-foreground font-medium">Willingness to lead</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-3">✓</span>
                  <span className="text-foreground font-medium">Long-term dedication</span>
                </li>
              </ul>
            </Card>
          </div>

          <Card className="p-8 bg-primary text-primary-foreground shadow-elegant">
            <blockquote className="text-center">
              <p className="font-serif text-2xl italic mb-4">
                "The Founding Fathers weren't the wealthiest or most educated people in the colonies. They were ordinary citizens who became extraordinary leaders by stepping forward when their communities needed them most."
              </p>
              <p className="text-lg text-primary-foreground/80">
                Today, your community needs the same courage. Will you answer the call?
              </p>
            </blockquote>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default WhatEldersDo;
