import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Globe, MapPin, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer style={{ backgroundColor: '#1a1a2e', color: '#ffffff' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ paddingTop: 'var(--spacing-8x)', paddingBottom: 'var(--spacing-4x)' }}>
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About Section */}
          <div className="lg:col-span-2">
            <Link to="/">
              <img 
                src="/getyourguide-logo-white.svg" 
                alt="GetYourGuide" 
                style={{ height: '32px', marginBottom: '24px' }}
              />
            </Link>
            <p className="text-gray-400 mb-6" style={{ fontSize: '14px', lineHeight: '1.7' }}>
              Your trusted platform for discovering and booking unique travel experiences worldwide. 
              From iconic landmarks to hidden gems, we help you create unforgettable memories.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400" style={{ fontSize: '14px' }}>
                <Globe className="w-4 h-4" />
                <span>Available in 190+ countries</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400" style={{ fontSize: '14px' }}>
                <MapPin className="w-4 h-4" />
                <span>50,000+ experiences worldwide</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400" style={{ fontSize: '14px' }}>
                <Mail className="w-4 h-4" />
                <span>support@getyourguide.com</span>
              </div>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-6" style={{ color: '#ffffff', fontSize: '16px' }}>
              Product
            </h4>
            <ul className="space-y-3">
              <li><Link to="/search?category=tours" className="text-gray-400 hover:text-white transition-colors" style={{ fontSize: '14px' }}>Attractions & Tours</Link></li>
              <li><Link to="/search?category=food" className="text-gray-400 hover:text-white transition-colors" style={{ fontSize: '14px' }}>Food & Drinks</Link></li>
              <li><Link to="/search?category=adventure" className="text-gray-400 hover:text-white transition-colors" style={{ fontSize: '14px' }}>Adventure Activities</Link></li>
              <li><Link to="/search?category=cultural" className="text-gray-400 hover:text-white transition-colors" style={{ fontSize: '14px' }}>Cultural Experiences</Link></li>
              <li><Link to="/search?category=day-trips" className="text-gray-400 hover:text-white transition-colors" style={{ fontSize: '14px' }}>Day Trips</Link></li>
              <li><Link to="/search" className="text-gray-400 hover:text-white transition-colors" style={{ fontSize: '14px' }}>Browse All</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-6" style={{ color: '#ffffff', fontSize: '16px' }}>
              Company
            </h4>
            <ul className="space-y-3">
              <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors" style={{ fontSize: '14px' }}>Blog</Link></li>
              <li><Link to="/about-us" className="text-gray-400 hover:text-white transition-colors" style={{ fontSize: '14px' }}>About us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors" style={{ fontSize: '14px' }}>Contact us</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '24px' }}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6">
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <span className="text-gray-400" style={{ fontSize: '14px' }}>Follow us:</span>
              <Link to="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#0077b5] flex items-center justify-center transition-all">
                <Linkedin className="w-4 h-4 text-white" />
              </Link>
              <Link to="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#1877f2] flex items-center justify-center transition-all">
                <Facebook className="w-4 h-4 text-white" />
              </Link>
              <Link to="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#1da1f2] flex items-center justify-center transition-all">
                <Twitter className="w-4 h-4 text-white" />
              </Link>
              <Link to="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#e4405f] flex items-center justify-center transition-all">
                <Instagram className="w-4 h-4 text-white" />
              </Link>
            </div>

            {/* Legal Links */}
            <div className="flex gap-6">
              <Link to="/terms-conditions" className="text-gray-400 hover:text-white transition-colors" style={{ fontSize: '14px' }}>
                Terms & Conditions
              </Link>
              <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors" style={{ fontSize: '14px' }}>
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center pt-6" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <p className="text-gray-400" style={{ fontSize: '13px' }}>
              © {new Date().getFullYear()} GetYourGuide. All rights reserved. | Made with ❤️ for travelers worldwide
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
