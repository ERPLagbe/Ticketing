import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, TrendingUp, Users, DollarSign, Calendar, Globe, Award, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export function PartnerPage() {
  const [selectedType, setSelectedType] = useState<'creator' | 'affiliate'>('creator');
  const [creatorFormData, setCreatorFormData] = useState({
    fullName: '',
    email: '',
    instagram: '',
    youtube: '',
    tiktok: '',
    otherPlatforms: '',
    followerCount: '',
    contentNiche: '',
    portfolioLinks: '',
    brandPartnerships: '',
    partnerType: 'creator'
  });

  const [affiliateFormData, setAffiliateFormData] = useState({
    fullName: '',
    email: '',
    websiteUrl: '',
    monthlyTraffic: '',
    emailListSize: '',
    marketingChannels: '',
    affiliateExperience: '',
    promotionStrategy: '',
    partnerType: 'affiliate'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submittedData = selectedType === 'creator' ? creatorFormData : affiliateFormData;
    // Form submission logic would go here
    toast.success('Application submitted successfully! We\'ll review your application and get back to you within 3-5 business days.');
    
    // Reset form based on type
    if (selectedType === 'creator') {
      setCreatorFormData({
        fullName: '',
        email: '',
        instagram: '',
        youtube: '',
        tiktok: '',
        otherPlatforms: '',
        followerCount: '',
        contentNiche: '',
        portfolioLinks: '',
        brandPartnerships: '',
        partnerType: 'creator'
      });
    } else {
      setAffiliateFormData({
        fullName: '',
        email: '',
        websiteUrl: '',
        monthlyTraffic: '',
        emailListSize: '',
        marketingChannels: '',
        affiliateExperience: '',
        promotionStrategy: '',
        partnerType: 'affiliate'
      });
    }
  };

  const handleCreatorChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setCreatorFormData({
      ...creatorFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAffiliateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setAffiliateFormData({
      ...affiliateFormData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div 
        className="relative py-20 px-4 mt-8"
        style={{
          background: 'linear-gradient(135deg, #0071eb 0%, #1a2b49 100%)',
        }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Earn with Gotiquet
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Join thousands of content creators and affiliate marketers earning commissions by sharing amazing travel experiences
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
              <div className="text-3xl font-bold text-white">15%</div>
              <div className="text-white/80 text-sm">Commission Rate</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
              <div className="text-3xl font-bold text-white">10K+</div>
              <div className="text-white/80 text-sm">Activities</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
              <div className="text-3xl font-bold text-white">180+</div>
              <div className="text-white/80 text-sm">Countries</div>
            </div>
          </div>
        </div>
      </div>

      {/* Partner Type Selection */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Partner with Gotiquet?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: '#f0f8ff' }}
              >
                <DollarSign className="w-8 h-8" style={{ color: '#0071eb' }} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Competitive Commissions</h3>
              <p className="text-gray-600">
                Earn up to 15% commission on every booking with performance-based bonuses
              </p>
            </div>

            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: '#f0f8ff' }}
              >
                <Globe className="w-8 h-8" style={{ color: '#0071eb' }} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Global Reach</h3>
              <p className="text-gray-600">
                Promote experiences in 180+ countries with millions of travelers worldwide
              </p>
            </div>

            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: '#f0f8ff' }}
              >
                <Award className="w-8 h-8" style={{ color: '#0071eb' }} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Trusted Brand</h3>
              <p className="text-gray-600">
                Partner with a leading platform trusted by millions of travelers
              </p>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16 bg-gray-50 rounded-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold"
                style={{ backgroundColor: '#0071eb' }}
              >
                1
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Apply</h4>
              <p className="text-gray-600 text-sm">Fill out the application form below</p>
            </div>

            <div className="text-center">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold"
                style={{ backgroundColor: '#0071eb' }}
              >
                2
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Get Approved</h4>
              <p className="text-gray-600 text-sm">We'll review and approve your application</p>
            </div>

            <div className="text-center">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold"
                style={{ backgroundColor: '#0071eb' }}
              >
                3
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Promote</h4>
              <p className="text-gray-600 text-sm">Share experiences with your audience</p>
            </div>

            <div className="text-center">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold"
                style={{ backgroundColor: '#0071eb' }}
              >
                4
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Earn</h4>
              <p className="text-gray-600 text-sm">Get paid for every successful booking</p>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl border-2 border-gray-200 p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Apply Now</h2>
            <p className="text-gray-600 mb-8">
              Join as a {selectedType === 'creator' ? 'Content Creator' : 'Affiliate Marketer'} and start earning today
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Choose Your Path - Partner Type Selection */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Choose Your Path</h3>
                <p className="text-gray-600 mb-6 text-center">Select the partnership type that fits your goals</p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {/* Content Creator Card */}
                  <div
                    onClick={() => setSelectedType('creator')}
                    className="cursor-pointer border-2 rounded-xl p-6 transition-all hover:shadow-lg"
                    style={{
                      borderColor: selectedType === 'creator' ? '#0071eb' : '#e5e7eb',
                      backgroundColor: selectedType === 'creator' ? '#f0f8ff' : 'white',
                    }}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: '#0071eb' }}
                      >
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-900 mb-1">Content Creator</h4>
                        <p className="text-sm text-gray-600">
                          Perfect for bloggers, YouTubers, Instagram influencers
                        </p>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">Dedicated account manager</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">Exclusive promotional materials</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">Higher commission tiers available</span>
                      </li>
                    </ul>
                  </div>

                  {/* Affiliate Marketer Card */}
                  <div
                    onClick={() => setSelectedType('affiliate')}
                    className="cursor-pointer border-2 rounded-xl p-6 transition-all hover:shadow-lg"
                    style={{
                      borderColor: selectedType === 'affiliate' ? '#0071eb' : '#e5e7eb',
                      backgroundColor: selectedType === 'affiliate' ? '#f0f8ff' : 'white',
                    }}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: '#FF4905' }}
                      >
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-900 mb-1">Affiliate Marketer</h4>
                        <p className="text-sm text-gray-600">
                          Ideal for website owners, email marketers
                        </p>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">90-day cookie tracking</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">Real-time reporting dashboard</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">Performance bonuses</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={selectedType === 'creator' ? creatorFormData.fullName : affiliateFormData.fullName}
                    onChange={selectedType === 'creator' ? handleCreatorChange : handleAffiliateChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={selectedType === 'creator' ? creatorFormData.email : affiliateFormData.email}
                    onChange={selectedType === 'creator' ? handleCreatorChange : handleAffiliateChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              {selectedType === 'creator' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Instagram Profile
                    </label>
                    <input
                      type="text"
                      name="instagram"
                      value={creatorFormData.instagram}
                      onChange={handleCreatorChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://www.instagram.com/yourusername"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      YouTube Channel
                    </label>
                    <input
                      type="text"
                      name="youtube"
                      value={creatorFormData.youtube}
                      onChange={handleCreatorChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://www.youtube.com/yourchannel"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      TikTok Profile
                    </label>
                    <input
                      type="text"
                      name="tiktok"
                      value={creatorFormData.tiktok}
                      onChange={handleCreatorChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://www.tiktok.com/yourusername"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Other Platforms
                    </label>
                    <input
                      type="text"
                      name="otherPlatforms"
                      value={creatorFormData.otherPlatforms}
                      onChange={handleCreatorChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Facebook, Twitter, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Follower Count *
                    </label>
                    <input
                      type="text"
                      name="followerCount"
                      required
                      value={creatorFormData.followerCount}
                      onChange={handleCreatorChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="100,000+"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Content Type/Niche *
                    </label>
                    <input
                      type="text"
                      name="contentNiche"
                      required
                      value={creatorFormData.contentNiche}
                      onChange={handleCreatorChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Travel, Food, Adventure, Lifestyle, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Portfolio Links
                    </label>
                    <input
                      type="text"
                      name="portfolioLinks"
                      value={creatorFormData.portfolioLinks}
                      onChange={handleCreatorChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Links to your best content"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Previous Brand Partnerships
                    </label>
                    <textarea
                      name="brandPartnerships"
                      value={creatorFormData.brandPartnerships}
                      onChange={handleCreatorChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Tell us about your experience with brand partnerships..."
                    />
                  </div>
                </>
              )}

              {selectedType === 'affiliate' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website/Blog URL *
                    </label>
                    <input
                      type="url"
                      name="websiteUrl"
                      required
                      value={affiliateFormData.websiteUrl}
                      onChange={handleAffiliateChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://www.example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly Traffic *
                    </label>
                    <input
                      type="text"
                      name="monthlyTraffic"
                      required
                      value={affiliateFormData.monthlyTraffic}
                      onChange={handleAffiliateChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="100,000+"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email List Size *
                    </label>
                    <input
                      type="text"
                      name="emailListSize"
                      required
                      value={affiliateFormData.emailListSize}
                      onChange={handleAffiliateChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="10,000+"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Marketing Channels *
                    </label>
                    <input
                      type="text"
                      name="marketingChannels"
                      required
                      value={affiliateFormData.marketingChannels}
                      onChange={handleAffiliateChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Email, Social Media, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Previous Affiliate Experience
                    </label>
                    <textarea
                      name="affiliateExperience"
                      value={affiliateFormData.affiliateExperience}
                      onChange={handleAffiliateChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Tell us about your experience with affiliate programs..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Promotion Strategy
                    </label>
                    <textarea
                      name="promotionStrategy"
                      value={affiliateFormData.promotionStrategy}
                      onChange={handleAffiliateChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Describe your promotion strategy..."
                    />
                  </div>
                </>
              )}

              <input type="hidden" name="partnerType" value={selectedType} />

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg text-white font-semibold transition-all hover:shadow-lg"
                style={{ backgroundColor: '#FF4905' }}
              >
                Submit Application
                <ArrowRight className="w-5 h-5" />
              </button>

              <p className="text-sm text-gray-500 text-center">
                By submitting this form, you agree to our{' '}
                <Link to="/terms-conditions" className="text-blue-600 hover:underline">
                  Terms & Conditions
                </Link>{' '}
                and{' '}
                <Link to="/privacy-policy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-bold text-gray-900 mb-2">How much can I earn?</h4>
              <p className="text-gray-600">
                You can earn up to 15% commission on every booking. Top performers can unlock higher commission tiers and performance bonuses.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-bold text-gray-900 mb-2">When do I get paid?</h4>
              <p className="text-gray-600">
                Commissions are paid monthly via PayPal or bank transfer. You need to reach a minimum threshold of $100 to receive payment.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-bold text-gray-900 mb-2">How long does the approval process take?</h4>
              <p className="text-gray-600">
                We typically review applications within 3-5 business days. You'll receive an email notification once your application is reviewed.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-bold text-gray-900 mb-2">What marketing materials do you provide?</h4>
              <p className="text-gray-600">
                We provide banners, text links, product feeds, email templates, and exclusive promotional codes for your audience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}