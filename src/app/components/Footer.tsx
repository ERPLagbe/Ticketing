import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import logoImage from 'figma:asset/ce59eeccef0d9776fa8fba765e5d4b98cd4ae7aa.png';

export function Footer() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Subscribe email:', email);
    setEmail('');
  };

  return (
    <footer style={{ backgroundColor: '#1a1a2e', color: '#ffffff' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ paddingTop: 'var(--spacing-8x)', paddingBottom: 'var(--spacing-4x)' }}>
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
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

          {/* Information */}
          <div>
            <h4 className="font-semibold mb-6" style={{ color: '#ffffff', fontSize: '16px' }}>
              Information
            </h4>
            <ul className="space-y-3">
              <li><Link to="/help" className="text-gray-400 hover:text-white transition-colors" style={{ fontSize: '14px' }}>FAQ</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors" style={{ fontSize: '14px' }}>Blog</Link></li>
              <li><Link to="/support" className="text-gray-400 hover:text-white transition-colors" style={{ fontSize: '14px' }}>Support</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-6" style={{ color: '#ffffff', fontSize: '16px' }}>
              Company
            </h4>
            <ul className="space-y-3">
              <li><Link to="/about-us" className="text-gray-400 hover:text-white transition-colors" style={{ fontSize: '14px' }}>About us</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-white transition-colors" style={{ fontSize: '14px' }}>Careers</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors" style={{ fontSize: '14px' }}>Contact us</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors" style={{ fontSize: '14px' }}>GetYourGuide</Link></li>
            </ul>
          </div>

          {/* Subscribe */}
          <div>
            <h4 className="font-semibold mb-6" style={{ color: '#ffffff', fontSize: '16px' }}>
              Subscribe
            </h4>
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#FF6F61] transition-colors"
                  style={{ fontSize: '14px' }}
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#FF6F61] hover:bg-[#FF5A4D] text-white rounded-lg transition-colors flex items-center justify-center"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </form>
            <p className="text-gray-400" style={{ fontSize: '13px', lineHeight: '1.6' }}>
              Hello, we are GetYourGuide. Our goal is to provide unforgettable travel experiences and help travelers discover amazing activities worldwide.
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '24px' }}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Logo */}
            <div>
              <Link to="/">
                <img 
                  src="/getyourguide-logo-white.svg" 
                  alt="GetYourGuide" 
                  style={{ height: '28px' }}
                />
              </Link>
            </div>

            {/* Center Links */}
            <div className="flex gap-8">
              <Link to="/terms-conditions" className="text-gray-400 hover:text-white transition-colors" style={{ fontSize: '14px' }}>
                Terms
              </Link>
              <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors" style={{ fontSize: '14px' }}>
                Privacy
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-white transition-colors" style={{ fontSize: '14px' }}>
                Cookies
              </Link>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4">
              <Link to="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4 text-white" />
              </Link>
              <Link to="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4 text-white" />
              </Link>
              <Link to="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4 text-white" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}