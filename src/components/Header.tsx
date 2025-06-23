
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import GoogleTranslator from './GoogleTranslator';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigationLinks = [
    { name: 'Home', href: '/' },
    { name: 'Schemes', href: '/schemes' },
    { name: 'Services', href: '/services' },
    { name: 'About Us', href: '/about' },
    { name: 'Our Team', href: '/team' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top Banner */}
      <div className="bg-orange-500 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
          Government of India | Government of Maharashtra
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/4/41/Flag_of_India.svg" 
              alt="India Flag" 
              className="h-12 w-18"
            />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Panchayat Samiti Navapur</h1>
              <p className="text-sm text-gray-600">Nandurbar, Maharashtra</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-gray-700 hover:text-blue-600 font-medium transition-colors ${
                  location.pathname === link.href ? 'text-blue-600' : ''
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Language Selector */}
            <GoogleTranslator />
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="outline"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              {navigationLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-gray-700 hover:text-blue-600 font-medium transition-colors ${
                    location.pathname === link.href ? 'text-blue-600' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="pt-4 border-t">
                <GoogleTranslator />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
