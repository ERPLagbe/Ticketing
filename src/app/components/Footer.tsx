import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { toast } from 'sonner';
import { Logo } from './Logo';

export function Footer() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent successfully! We\'ll get back to you within 24 hours.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      category: 'general',
      message: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <footer style={{ backgroundColor: '#1a1a2e', color: '#ffffff' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ paddingTop: 'var(--spacing-8x)', paddingBottom: 'var(--spacing-4x)' }}>
        {/* Main Footer Content - 3 Grid System */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Column 1: Logo + Company Overview + Company Links */}
          <div>
            <Link to="/" className="block mb-6">
              <h2 style={{ 
                color: '#FF4905',
                fontSize: '32px',
                fontWeight: 700,
                margin: 0
              }}>
                Gotiquet
              </h2>
            </Link>
            <p className="text-gray-400 mb-6" style={{ fontSize: '14px', lineHeight: '1.7' }}>
              Your trusted platform for discovering and booking unique travel experiences worldwide. 
              From iconic landmarks to hidden gems, we help you create unforgettable memories.
            </p>

            {/* Company Links */}
            <div>
              <h4 className="font-semibold mb-4" style={{ color: '#ffffff', fontSize: '16px' }}>
                Company
              </h4>
              <ul className="space-y-3">
                <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors" style={{ fontSize: '14px' }}>Blog</Link></li>
                <li><Link to="/about-us" className="text-gray-400 hover:text-white transition-colors" style={{ fontSize: '14px' }}>About us</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors" style={{ fontSize: '14px' }}>Contact us</Link></li>
              </ul>
            </div>

            {/* Work with us Links */}
            <div className="mt-6">
              <h4 className="font-semibold mb-4" style={{ color: '#ffffff', fontSize: '16px' }}>
                Work with us
              </h4>
              <ul className="space-y-3">
                <li><Link to="/partner" className="text-gray-400 hover:text-white transition-colors" style={{ fontSize: '14px' }}>As an affiliate partner</Link></li>
                <li><Link to="/partner" className="text-gray-400 hover:text-white transition-colors" style={{ fontSize: '14px' }}>As a content creator</Link></li>
              </ul>
            </div>
          </div>

          {/* Column 2: Activity Categories */}
          <div>
            <h4 className="font-semibold mb-6" style={{ color: '#ffffff', fontSize: '16px' }}>
              Activity Categories
            </h4>
            <ul className="space-y-3">
              <li><Link to="/search?category=Attractions & Museums" className="text-gray-400 hover:text-white transition-colors" style={{ fontSize: '14px' }}>Attractions & Museums</Link></li>
              <li><Link to="/search?category=Tours & Sightseeing" className="text-gray-400 hover:text-white transition-colors" style={{ fontSize: '14px' }}>Tours & Sightseeing</Link></li>
              <li><Link to="/search?category=Cruises & Water Tours" className="text-gray-400 hover:text-white transition-colors" style={{ fontSize: '14px' }}>Cruises & Water Tours</Link></li>
              <li><Link to="/search?category=Food & Drink" className="text-gray-400 hover:text-white transition-colors" style={{ fontSize: '14px' }}>Food & Drink</Link></li>
              <li><Link to="/search?category=Cultural & Theme Tours" className="text-gray-400 hover:text-white transition-colors" style={{ fontSize: '14px' }}>Cultural & Theme Tours</Link></li>
              <li><Link to="/search?category=Outdoor Activities" className="text-gray-400 hover:text-white transition-colors" style={{ fontSize: '14px' }}>Outdoor Activities</Link></li>
            </ul>
          </div>

          {/* Column 3: Mini Contact Form */}
          <div>
            <h4 className="font-semibold mb-6" style={{ color: '#ffffff', fontSize: '16px' }}>
              Quick Contact
            </h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border transition-colors text-sm"
                  style={{ 
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    color: '#ffffff'
                  }}
                  placeholder="Your Name"
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border transition-colors text-sm"
                  style={{ 
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    color: '#ffffff'
                  }}
                  placeholder="Your Email"
                />
              </div>

              <div>
                <select
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border transition-colors text-sm"
                  style={{ 
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    color: '#ffffff'
                  }}
                >
                  <option value="general" style={{ backgroundColor: '#1a1a2e', color: '#ffffff' }}>General Inquiry</option>
                  <option value="booking" style={{ backgroundColor: '#1a1a2e', color: '#ffffff' }}>Booking Support</option>
                  <option value="cancellation" style={{ backgroundColor: '#1a1a2e', color: '#ffffff' }}>Cancellation & Refunds</option>
                  <option value="technical" style={{ backgroundColor: '#1a1a2e', color: '#ffffff' }}>Technical Issue</option>
                  <option value="partnership" style={{ backgroundColor: '#1a1a2e', color: '#ffffff' }}>Partnership Inquiry</option>
                  <option value="feedback" style={{ backgroundColor: '#1a1a2e', color: '#ffffff' }}>Feedback</option>
                </select>
              </div>

              <div>
                <input
                  type="text"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border transition-colors text-sm"
                  style={{ 
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    color: '#ffffff'
                  }}
                  placeholder="Subject"
                />
              </div>

              <div>
                <textarea
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-lg border transition-colors resize-none text-sm"
                  style={{ 
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    color: '#ffffff'
                  }}
                  placeholder="Your Message"
                />
              </div>

              <Button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg transition-all"
                style={{
                  backgroundColor: '#FF4905',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: 500,
                }}
              >
                Send Message
              </Button>
            </form>
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
              <Link to="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#ff0000] flex items-center justify-center transition-all">
                <Youtube className="w-4 h-4 text-white" />
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
              © {new Date().getFullYear()} Gotiquet. All rights reserved. | Made with ❤️ for travelers worldwide
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}