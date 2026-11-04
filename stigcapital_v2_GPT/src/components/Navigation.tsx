import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { Menu } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[hsl(var(--navy-dark))]/80 border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src={logo} alt="STIG" className="h-12 w-auto" />
            <span className="text-white text-2xl font-semibold pt-4 -ml-2">Capital</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-gray-300 hover:text-primary transition-colors">
              About
            </a>
            <a href="#services" className="text-gray-300 hover:text-primary transition-colors">
              Services
            </a>
            <a href="#process" className="text-gray-300 hover:text-primary transition-colors">
              Our Process
            </a>
            <a href="#portfolio" className="text-gray-300 hover:text-primary transition-colors">
              Portfolio
            </a>
            <Button variant="default" size="sm">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4">
            <a
              href="#about"
              className="block text-gray-300 hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About
            </a>
            <a
              href="#services"
              className="block text-gray-300 hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Services
            </a>
            <a
              href="#process"
              className="block text-gray-300 hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Our Process
            </a>
            <a
              href="#portfolio"
              className="block text-gray-300 hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Portfolio
            </a>
            <Button variant="default" size="sm" className="w-full">
              Get Started
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
