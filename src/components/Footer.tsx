import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span className="text-sm">Panchayat Samiti Office, Navapur, Nandurbar, Maharashtra - 425418</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-blue-400" />
                <a
                  href="tel:9689560349"
                  className="text-sm text-white hover:text-blue-300 transition-colors"
                >
                  +91 9689560349
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-blue-400" />
                <a
                  href="/contact#contact-form"
                  className="text-sm hover:text-blue-300 transition-colors"
                >
                  (Fill in the contact form)
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-4 w-4 text-blue-400" />
                <span className="text-sm">Mon-Fri: 10:00 AM - 5:30 PM</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/schemes" className="hover:text-blue-400 transition-colors">Government Schemes</a></li>
              <li><a href="/services" className="hover:text-blue-400 transition-colors">Public Services</a></li>
              <li><a href="/about" className="hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="/team" className="hover:text-blue-400 transition-colors">Our Team</a></li>
              <li><a href="/gallery" className="hover:text-blue-400 transition-colors">Gallery</a></li>
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Important Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="https://india.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">India.gov.in</a></li>
              <li><a href="https://maharashtra.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">Maharashtra Government</a></li>
              <li><a href="https://pmkisan.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">PM Kisan</a></li>
              <li><a href="https://pmayg.nic.in" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">PM Awaas Yojana</a></li>
              <li><a href="https://nrega.nic.in" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">MGNREGA</a></li>
            </ul>
          </div>

          {/* Find Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Find Us</h3>
            <div className="space-y-3">
              <div className="bg-gray-800 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119066.1398464812!2d73.8567437!3d21.1702401!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd29c9dc0b2a5c5%3A0x31b1b1b1b1b1b1b1!2sNavapur%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1635678901234!5m2!1sen!2sin"
                  width="100%"
                  height="120"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Panchayat Samiti Navapur Location"
                ></iframe>
              </div>
              <a 
                href="https://maps.google.com/?q=Navapur,Maharashtra" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
              >
                View on Google Maps
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © 2025 Panchayat Samiti Navapur, Nandurbar. All rights reserved. | 
            <span className="ml-2">Last updated: August 5th, 2025</span>
          </p>
          <p className="text-xs text-gray-500 mt-2">
            This site is officially developed for Panchayat Samiti Navapur and is currently hosted on a development server.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
