import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Users, Landmark, TrendingUp, Heart } from "lucide-react";
const Legacy = () => {
  const principles = [{
    icon: Users,
    title: "United Vision",
    description: "A small group of dedicated leaders can accomplish what seems impossible when they stand together with purpose."
  }, {
    icon: Landmark,
    title: "Civic Duty",
    description: "True leadership means stepping forward not for personal gain, but for the prosperity of future generations."
  }, {
    icon: TrendingUp,
    title: "Economic Power",
    description: "Local economic strength creates lasting community prosperity, stability, and opportunity for all residents."
  }, {
    icon: Heart,
    title: "Generational Impact",
    description: "The decisions we make today will echo through decades, shaping the lives of our children and grandchildren."
  }];
  return <section id="legacy" className="py-24 bg-gradient-parchment relative">
      <div className="absolute inset-0 parchment-texture opacity-30"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-6">
            A Legacy of <span className="text-secondary">Leadership</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Three hundred years ago, a small group of visionary leaders gathered to create something unprecedented—a foundation that would endure for generations. They were ordinary people who stepped forward in an extraordinary moment.
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-16">
          <Card className="p-8 border-2 border-secondary/20 shadow-elegant bg-card">
            <blockquote className="text-center">
              <p className="font-serif text-2xl italic text-foreground/90 mb-4">
                "If you had lived 300 years ago, would you have stepped forward to become a Founding Father?"
              </p>
              <p className="text-lg text-muted-foreground">
                Today, you face that same choice. Not to build a nation, but to rebuild your community's economic foundation. The principles remain the same: vision, courage, and commitment to something greater than yourself.
              </p>
            </blockquote>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {principles.map((principle, index) => <Card key={index} className="p-8 hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 bg-card border-border">
              <div className="flex items-start space-x-4">
                <div className="bg-secondary/10 p-4 rounded-lg flex-shrink-0">
                  <principle.icon className="w-8 h-8 text-secondary" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-foreground mb-3">
                    {principle.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </div>
            </Card>)}
        </div>

        <div className="mt-16 max-w-3xl mx-auto text-center">
          <div className="bg-accent/10 border-l-4 border-accent p-6 rounded-r-lg">
            <p className="text-lg text-foreground font-medium">This is not about nostalgia. This is about recognizing that the same principles that built nations can build better world towns and communities. And it starts with leaders like you.</p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" className="text-lg px-8 py-6">
                Hear a podcast about the modern village
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-serif">The Modern Village Podcast</DialogTitle>
              </DialogHeader>
              <div className="py-6">
                <p className="text-muted-foreground">The podcast recording is not available yet. Please check back soon.</p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>;
};
export default Legacy;
