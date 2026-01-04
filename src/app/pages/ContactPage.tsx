import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, HelpCircle, FileText } from 'lucide-react';
import { toast } from 'sonner';

export function ContactPage() {
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
    <div style={{ paddingTop: 'var(--spacing-8x)', backgroundColor: 'var(--background-secondary)' }}>
      {/* Hero Section */}
      <div style={{ backgroundColor: 'var(--background-primary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="mb-4" style={{ color: 'var(--label-primary)' }}>
              Get in Touch
            </h1>
            <p className="text-lg" style={{ color: 'var(--label-secondary)' }}>
              Have questions about your booking? Need help planning your next adventure? Our team is here to help you 24/7.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Options Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6 text-center">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: 'var(--background-brand-subtle)' }}
              >
                <Phone className="w-8 h-8" style={{ color: 'var(--decorative-guiding-red)' }} />
              </div>
              <h3 className="mb-2" style={{ color: 'var(--label-primary)' }}>Phone Support</h3>
              <p className="text-sm mb-3" style={{ color: 'var(--label-secondary)' }}>
                Speak with our team
              </p>
              <a 
                href="tel:+18001234567"
                className="font-medium hover:underline"
                style={{ color: 'var(--decorative-guiding-red)' }}
              >
                +1 (800) 123-4567
              </a>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6 text-center">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: 'var(--background-brand-subtle)' }}
              >
                <Mail className="w-8 h-8" style={{ color: 'var(--decorative-guiding-red)' }} />
              </div>
              <h3 className="mb-2" style={{ color: 'var(--label-primary)' }}>Email Us</h3>
              <p className="text-sm mb-3" style={{ color: 'var(--label-secondary)' }}>
                Get help via email
              </p>
              <a 
                href="mailto:support@getyourguide.com"
                className="font-medium hover:underline"
                style={{ color: 'var(--decorative-guiding-red)' }}
              >
                support@getyourguide.com
              </a>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6 text-center">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: 'var(--background-brand-subtle)' }}
              >
                <MessageSquare className="w-8 h-8" style={{ color: 'var(--decorative-guiding-red)' }} />
              </div>
              <h3 className="mb-2" style={{ color: 'var(--label-primary)' }}>Live Chat</h3>
              <p className="text-sm mb-3" style={{ color: 'var(--label-secondary)' }}>
                Chat with us now
              </p>
              <button 
                className="font-medium hover:underline"
                style={{ color: 'var(--decorative-guiding-red)' }}
                onClick={() => toast.info('Live chat coming soon!')}
              >
                Start Chat
              </button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6 text-center">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: 'var(--background-brand-subtle)' }}
              >
                <HelpCircle className="w-8 h-8" style={{ color: 'var(--decorative-guiding-red)' }} />
              </div>
              <h3 className="mb-2" style={{ color: 'var(--label-primary)' }}>Help Center</h3>
              <p className="text-sm mb-3" style={{ color: 'var(--label-secondary)' }}>
                Browse FAQs
              </p>
              <Link 
                to="/blog"
                className="font-medium hover:underline"
                style={{ color: 'var(--decorative-guiding-red)' }}
              >
                Visit Help Center
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Main Content: Form + Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-8">
                <div className="mb-6">
                  <h2 className="mb-2" style={{ color: 'var(--label-primary)' }}>Send us a Message</h2>
                  <p style={{ color: 'var(--label-secondary)' }}>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label 
                        htmlFor="name" 
                        className="block text-sm font-medium mb-2"
                        style={{ color: 'var(--label-primary)' }}
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border transition-colors"
                        style={{ 
                          borderColor: 'var(--border-primary)',
                          backgroundColor: 'var(--background-primary)',
                          color: 'var(--label-primary)'
                        }}
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label 
                        htmlFor="email" 
                        className="block text-sm font-medium mb-2"
                        style={{ color: 'var(--label-primary)' }}
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border transition-colors"
                        style={{ 
                          borderColor: 'var(--border-primary)',
                          backgroundColor: 'var(--background-primary)',
                          color: 'var(--label-primary)'
                        }}
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label 
                      htmlFor="category" 
                      className="block text-sm font-medium mb-2"
                      style={{ color: 'var(--label-primary)' }}
                    >
                      Category *
                    </label>
                    <select
                      id="category"
                      name="category"
                      required
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border transition-colors"
                      style={{ 
                        borderColor: 'var(--border-primary)',
                        backgroundColor: 'var(--background-primary)',
                        color: 'var(--label-primary)'
                      }}
                    >
                      <option value="general">General Inquiry</option>
                      <option value="booking">Booking Support</option>
                      <option value="cancellation">Cancellation & Refunds</option>
                      <option value="technical">Technical Issue</option>
                      <option value="partnership">Partnership Inquiry</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>

                  <div>
                    <label 
                      htmlFor="subject" 
                      className="block text-sm font-medium mb-2"
                      style={{ color: 'var(--label-primary)' }}
                    >
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border transition-colors"
                      style={{ 
                        borderColor: 'var(--border-primary)',
                        backgroundColor: 'var(--background-primary)',
                        color: 'var(--label-primary)'
                      }}
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div>
                    <label 
                      htmlFor="message" 
                      className="block text-sm font-medium mb-2"
                      style={{ color: 'var(--label-primary)' }}
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg border transition-colors resize-none"
                      style={{ 
                        borderColor: 'var(--border-primary)',
                        backgroundColor: 'var(--background-primary)',
                        color: 'var(--label-primary)'
                      }}
                      placeholder="Please provide as much detail as possible..."
                    />
                  </div>

                  <Button 
                    type="submit"
                    className="w-full flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: 'var(--decorative-guiding-red)',
                      color: 'white',
                      padding: 'var(--spacing-3x)',
                    }}
                  >
                    <Send className="w-5 h-5" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            {/* Office Hours */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <Clock className="w-6 h-6 mt-1" style={{ color: 'var(--decorative-guiding-red)' }} />
                  <div>
                    <h3 className="mb-2" style={{ color: 'var(--label-primary)' }}>Office Hours</h3>
                    <div className="space-y-1 text-sm" style={{ color: 'var(--label-secondary)' }}>
                      <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p>Saturday: 10:00 AM - 4:00 PM</p>
                      <p>Sunday: Closed</p>
                      <p className="mt-2 font-medium" style={{ color: 'var(--label-primary)' }}>
                        24/7 Emergency Support Available
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Office Location */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <MapPin className="w-6 h-6 mt-1" style={{ color: 'var(--decorative-guiding-red)' }} />
                  <div>
                    <h3 className="mb-2" style={{ color: 'var(--label-primary)' }}>Office Location</h3>
                    <div className="space-y-1 text-sm" style={{ color: 'var(--label-secondary)' }}>
                      <p>123 Travel Street</p>
                      <p>Suite 456</p>
                      <p>San Francisco, CA 94102</p>
                      <p>United States</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Resources */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <FileText className="w-6 h-6 mt-1" style={{ color: 'var(--decorative-guiding-red)' }} />
                  <div>
                    <h3 className="mb-3" style={{ color: 'var(--label-primary)' }}>Quick Resources</h3>
                    <div className="space-y-2">
                      <Link 
                        to="/blog"
                        className="block text-sm hover:underline"
                        style={{ color: 'var(--decorative-guiding-red)' }}
                      >
                        Visit our Blog
                      </Link>
                      <Link 
                        to="/account/bookings"
                        className="block text-sm hover:underline"
                        style={{ color: 'var(--decorative-guiding-red)' }}
                      >
                        Manage Bookings
                      </Link>
                      <a 
                        href="#"
                        className="block text-sm hover:underline"
                        style={{ color: 'var(--decorative-guiding-red)' }}
                      >
                        Cancellation Policy
                      </a>
                      <a 
                        href="#"
                        className="block text-sm hover:underline"
                        style={{ color: 'var(--decorative-guiding-red)' }}
                      >
                        Terms & Conditions
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <Card>
            <CardContent className="p-8">
              <h2 className="mb-6" style={{ color: 'var(--label-primary)' }}>Frequently Asked Questions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2" style={{ color: 'var(--label-primary)' }}>
                    How do I cancel my booking?
                  </h4>
                  <p className="text-sm" style={{ color: 'var(--label-secondary)' }}>
                    You can cancel your booking through your account dashboard. Most bookings offer free cancellation up to 24 hours before the activity.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2" style={{ color: 'var(--label-primary)' }}>
                    When will I receive my tickets?
                  </h4>
                  <p className="text-sm" style={{ color: 'var(--label-secondary)' }}>
                    E-tickets are sent immediately after booking confirmation. Mobile tickets are available in your account 24 hours before your activity.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2" style={{ color: 'var(--label-primary)' }}>
                    What payment methods do you accept?
                  </h4>
                  <p className="text-sm" style={{ color: 'var(--label-secondary)' }}>
                    We accept all major credit cards, debit cards, PayPal, and Apple Pay for secure and convenient payment.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2" style={{ color: 'var(--label-primary)' }}>
                    Can I modify my booking?
                  </h4>
                  <p className="text-sm" style={{ color: 'var(--label-secondary)' }}>
                    Yes, many activities allow modifications. Contact us or check your booking details for modification options.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}