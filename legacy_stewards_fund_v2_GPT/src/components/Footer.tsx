import { Landmark, Mail, MapPin } from "lucide-react";

const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-secondary p-2 rounded-lg">
                <Landmark className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="font-serif font-bold text-lg leading-tight">
                  Founding Elders
                </div>
                <div className="text-xs text-primary-foreground/70">Community Development Fund</div>
              </div>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Building generational wealth through local economic empowerment and visionary leadership.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection("legacy")}
                  className="text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  The Legacy
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("problem")}
                  className="text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  The Problem
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("solution")}
                  className="text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  The Solution
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("membership")}
                  className="text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  Membership
                </button>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-serif font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection("how-it-works")}
                  className="text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  How It Works
                </button>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Economic Impact Studies
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Success Stories
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                <a href="mailto:info@foundingelders.org" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  info@foundingelders.org
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                <span className="text-primary-foreground/80">
                  Serving Communities Nationwide
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-primary-foreground/70 text-sm">
              © {new Date().getFullYear()} Founding Elders Community Development Fund. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-primary-foreground/70 hover:text-secondary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-primary-foreground/70 hover:text-secondary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-primary-foreground/70 hover:text-secondary transition-colors">
                501(c)(3) Status
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
