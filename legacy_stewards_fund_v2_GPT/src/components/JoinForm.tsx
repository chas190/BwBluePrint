import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Send, CheckCircle2 } from "lucide-react";

const JoinForm = () => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    town: "",
    involvement: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
      toast({
        title: "Application Received!",
        description: "Thank you for your interest. We'll be in touch within 48 hours.",
      });
    }, 500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (isSubmitted) {
    return (
      <section id="join" className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <Card className="p-12 bg-secondary/5 border-2 border-secondary/20 text-center">
              <div className="bg-secondary/20 p-4 rounded-full inline-block mb-6">
                <CheckCircle2 className="w-16 h-16 text-secondary" />
              </div>
              <h3 className="font-serif text-3xl font-bold text-foreground mb-4">
                Welcome, Future Founding Elder!
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Your application has been received. A member of our team will reach out within 48 hours to discuss the next steps in your journey as a community leader.
              </p>
              <p className="text-muted-foreground">
                In the meantime, consider which community members you know who might also be called to this mission.
              </p>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="join" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Join the <span className="text-secondary">Movement</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Ready to become a Modern Founding Elder? Submit your application below. We'll review it carefully and reach out to discuss how you can best serve your community.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="p-8 border-2 border-border shadow-elegant">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-foreground font-medium">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-2"
                    placeholder="John Adams"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-foreground font-medium">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-2"
                    placeholder="john@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="phone" className="text-foreground font-medium">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-2"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <Label htmlFor="town" className="text-foreground font-medium">
                    Your Town/City *
                  </Label>
                  <Input
                    id="town"
                    name="town"
                    required
                    value={formData.town}
                    onChange={handleChange}
                    className="mt-2"
                    placeholder="Springfield"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="involvement" className="text-foreground font-medium">
                  Desired Level of Involvement *
                </Label>
                <select
                  id="involvement"
                  name="involvement"
                  required
                  value={formData.involvement}
                  onChange={handleChange}
                  className="w-full mt-2 px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select a membership level...</option>
                  <option value="founding-elder">Founding Elder - Core Leadership</option>
                  <option value="senior-guardian">Senior Guardian - Advisory Role</option>
                  <option value="council-member">Council Member - Active Participant</option>
                  <option value="town-steward">Town Steward - Supportive Role</option>
                  <option value="not-sure">Not Sure - Help Me Decide</option>
                </select>
              </div>

              <div>
                <Label htmlFor="message" className="text-foreground font-medium">
                  Why do you want to become a Founding Elder? *
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-2 min-h-[150px]"
                  placeholder="Share your vision for your community's future and why this mission resonates with you..."
                />
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-secondary hover:bg-secondary/90 text-primary font-semibold text-lg shadow-elegant hover:shadow-glow transition-all duration-300"
                >
                  Submit Application <Send className="ml-2 w-5 h-5" />
                </Button>
              </div>

              <p className="text-sm text-muted-foreground text-center mt-4">
                By submitting this form, you're taking the first step toward creating lasting change in your community. We review all applications carefully and personally.
              </p>
            </form>
          </Card>

          <div className="mt-12">
            <Card className="p-6 bg-muted/30 border-border">
              <h3 className="font-serif text-xl font-semibold text-foreground mb-4 text-center">
                What Happens Next?
              </h3>
              <div className="space-y-3 text-muted-foreground">
                <div className="flex items-start">
                  <span className="text-secondary mr-3 mt-1">1.</span>
                  <p>We review your application within 48 hours</p>
                </div>
                <div className="flex items-start">
                  <span className="text-secondary mr-3 mt-1">2.</span>
                  <p>A founding member schedules a conversation with you</p>
                </div>
                <div className="flex items-start">
                  <span className="text-secondary mr-3 mt-1">3.</span>
                  <p>We discuss how you can best serve your community</p>
                </div>
                <div className="flex items-start">
                  <span className="text-secondary mr-3 mt-1">4.</span>
                  <p>You join the Founding Elders and begin making history</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinForm;
