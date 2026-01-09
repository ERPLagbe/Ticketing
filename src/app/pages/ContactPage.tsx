import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import { FAQSection } from '../components/FAQSection';

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
                        name="name"
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

          {/* Sidebar Info - 2 Cards */}
          <div className="space-y-6">
            {/* Card 1: Contact Us */}
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4" style={{ color: 'var(--label-primary)', fontSize: '18px', fontWeight: 600 }}>Contact Us</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 mt-0.5" style={{ color: 'var(--decorative-guiding-red)' }} />
                    <div>
                      <p className="text-sm font-medium mb-1" style={{ color: 'var(--label-primary)' }}>Phone</p>
                      <a 
                        href="tel:+18001234567"
                        className="text-sm hover:underline"
                        style={{ color: 'var(--decorative-guiding-red)' }}
                      >
                        +1 (800) 123-4567
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 mt-0.5" style={{ color: 'var(--decorative-guiding-red)' }} />
                    <div>
                      <p className="text-sm font-medium mb-1" style={{ color: 'var(--label-primary)' }}>Email</p>
                      <a 
                        href="mailto:support@tourticket.com"
                        className="text-sm hover:underline"
                        style={{ color: 'var(--decorative-guiding-red)' }}
                      >
                        support@tourticket.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MessageCircle className="w-5 h-5 mt-0.5" style={{ color: 'var(--decorative-guiding-red)' }} />
                    <div>
                      <p className="text-sm font-medium mb-1" style={{ color: 'var(--label-primary)' }}>WhatsApp</p>
                      <a 
                        href="https://wa.me/18001234567"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm hover:underline"
                        style={{ color: 'var(--decorative-guiding-red)' }}
                      >
                        +1 (800) 123-4567
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card 2: Office Location & Hours Combined */}
            <Card>
              <CardContent className="p-6">
                <div className="mb-5">
                  <div className="flex items-start gap-3 mb-2">
                    <MapPin className="w-5 h-5 mt-0.5" style={{ color: 'var(--decorative-guiding-red)' }} />
                    <h3 style={{ color: 'var(--label-primary)', fontSize: '18px', fontWeight: 600 }}>Office Location</h3>
                  </div>
                  <div className="ml-8 space-y-1 text-sm" style={{ color: 'var(--label-secondary)' }}>
                    <p>123 Travel Street</p>
                    <p>Suite 456</p>
                    <p>San Francisco, CA 94102</p>
                    <p>United States</p>
                  </div>
                </div>

                <div className="pt-5 border-t" style={{ borderColor: 'var(--border-primary)' }}>
                  <div className="flex items-start gap-3 mb-2">
                    <Clock className="w-5 h-5 mt-0.5" style={{ color: 'var(--decorative-guiding-red)' }} />
                    <h3 style={{ color: 'var(--label-primary)', fontSize: '18px', fontWeight: 600 }}>Office Hours</h3>
                  </div>
                  <div className="ml-8 space-y-1 text-sm" style={{ color: 'var(--label-secondary)' }}>
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 10:00 AM - 4:00 PM</p>
                    <p>Sunday: Closed</p>
                    <p className="mt-2 font-medium" style={{ color: 'var(--label-primary)' }}>
                      24/7 Emergency Support Available
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <h2 className="text-center mb-3" style={{ color: 'var(--label-primary)' }}>
            Frequently Asked Questions
          </h2>
          <p className="text-center mb-12" style={{ color: 'var(--label-secondary)', fontSize: '16px' }}>
            Everything you need to know about booking with TourTicket
          </p>
          <FAQSection />
        </div>
      </div>
    </div>
  );
}