import logo from "@/assets/logo.png";
import { Linkedin, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[hsl(var(--navy-dark))] border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <img src={logo} alt="STIG" className="h-10 w-auto mb-4" />
            <p className="text-gray-400 max-w-md">
              Building wealth, scaling businesses, and empowering innovation. 
              Where Ai Knowledge and industry expertise meets entrepreneurial vision. Stig Capital provides acceleration.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <Linkedin className="w-5 h-5 text-gray-400" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <Twitter className="w-5 h-5 text-gray-400" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <Mail className="w-5 h-5 text-gray-400" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#services" className="text-gray-400 hover:text-primary transition-colors">Business Investment</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-primary transition-colors">Business Consulting</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-primary transition-colors">Business Incubator</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-primary transition-colors">Business Accelerator</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-400 hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#portfolio" className="text-gray-400 hover:text-primary transition-colors">Portfolio</a></li>
              <li><a href="#process" className="text-gray-400 hover:text-primary transition-colors">Our Process</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} STIG Capital. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
