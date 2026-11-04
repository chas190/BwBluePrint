import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-[hsl(var(--navy-dark))] via-[hsl(var(--navy-medium))] to-[hsl(var(--navy-dark))] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-white">
              Let's Build Your <span className="text-gradient-accent">Success Story</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Ready to take your business to the next level? Get in touch with our team to discuss 
              how we can help accelerate your growth.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="backdrop-blur-md bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-primary-glow">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Email Us</h3>
                    <p className="text-gray-300 text-sm">info@stigcapital.com</p>
                  </div>
                </div>
              </div>

              <div className="backdrop-blur-md bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-primary-glow">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Call Us</h3>
                    <p className="text-gray-300 text-sm">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>

              <div className="backdrop-blur-md bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-primary-glow">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Visit Us</h3>
                    <p className="text-gray-300 text-sm">Dallas / Houston, TX</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 backdrop-blur-md bg-white/5 rounded-2xl p-8 border border-white/10">
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      First Name
                    </label>
                    <Input 
                      placeholder="John" 
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Last Name
                    </label>
                    <Input 
                      placeholder="Doe" 
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <Input 
                    type="email" 
                    placeholder="john@company.com" 
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Company Stage
                  </label>
                  <select className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20">
                    <option value="">Select your stage</option>
                    <option value="early">Early Stage ($0-500K)</option>
                    <option value="growth">Growth Stage ($500K-5M)</option>
                    <option value="scale">Scale Stage ($5M-25M)</option>
                    <option value="enterprise">Enterprise ($25M+)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <Textarea 
                    placeholder="Tell us about your business and how we can help..."
                    rows={4}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-primary"
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
