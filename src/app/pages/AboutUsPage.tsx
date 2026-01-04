export function AboutUsPage() {
  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', paddingTop: 'var(--spacing-10x)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" style={{ paddingTop: 'var(--spacing-6x)', paddingBottom: 'var(--spacing-10x)' }}>
        {/* Header */}
        <h1 style={{ 
          fontSize: '48px', 
          fontWeight: 700, 
          color: '#1a2b49', 
          marginBottom: 'var(--spacing-3x)',
          lineHeight: '1.2'
        }}>
          About Us
        </h1>
        
        {/* Decorative line */}
        <div 
          style={{ 
            width: '80px', 
            height: '4px', 
            backgroundColor: 'var(--interactive-primary)', 
            marginBottom: 'var(--spacing-6x)',
            borderRadius: '2px'
          }}
        />

        {/* Content */}
        <div style={{ color: '#4b5563', fontSize: '16px', lineHeight: '1.8' }}>
          <section style={{ marginBottom: 'var(--spacing-5x)' }}>
            <h2 style={{ 
              fontSize: '32px', 
              fontWeight: 600, 
              color: '#1a2b49', 
              marginBottom: 'var(--spacing-2-5x)' 
            }}>
              Who We Are
            </h2>
            <p style={{ marginBottom: 'var(--spacing-2x)' }}>
              We're a leading platform for discovering and booking unforgettable travel experiences around the world. 
              Since our founding, we've been committed to making travel more accessible, enjoyable, and enriching for everyone.
            </p>
            <p style={{ marginBottom: 'var(--spacing-2x)' }}>
              Our platform connects travelers with thousands of tours, activities, and attractions across the globe, 
              from skip-the-line tickets to world-famous landmarks to unique local experiences you won't find anywhere else.
            </p>
          </section>

          <section style={{ marginBottom: 'var(--spacing-5x)' }}>
            <h2 style={{ 
              fontSize: '32px', 
              fontWeight: 600, 
              color: '#1a2b49', 
              marginBottom: 'var(--spacing-2-5x)' 
            }}>
              Our Mission
            </h2>
            <p style={{ marginBottom: 'var(--spacing-2x)' }}>
              We believe that travel has the power to enrich lives, broaden perspectives, and create lasting memories. 
              Our mission is to inspire and enable more people to explore the world by providing easy access to 
              exceptional travel experiences.
            </p>
            <p style={{ marginBottom: 'var(--spacing-2x)' }}>
              We work closely with local guides, tour operators, and attraction partners worldwide to ensure 
              every experience meets our high standards for quality, safety, and authenticity.
            </p>
          </section>

          <section style={{ marginBottom: 'var(--spacing-5x)' }}>
            <h2 style={{ 
              fontSize: '32px', 
              fontWeight: 600, 
              color: '#1a2b49', 
              marginBottom: 'var(--spacing-2-5x)' 
            }}>
              Why Choose Us
            </h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr', 
              gap: '20px',
              marginTop: '24px'
            }}>
              <div style={{ 
                padding: '24px', 
                backgroundColor: '#f7f7f7', 
                borderRadius: '12px',
                border: '1px solid #e5e7eb'
              }}>
                <h3 style={{ 
                  fontSize: '20px', 
                  fontWeight: 700, 
                  color: '#1a2b49', 
                  marginBottom: '12px' 
                }}>
                  🌍 Worldwide Selection
                </h3>
                <p>
                  Access thousands of curated experiences in destinations around the world, 
                  from popular attractions to hidden gems.
                </p>
              </div>
              
              <div style={{ 
                padding: '24px', 
                backgroundColor: '#f7f7f7', 
                borderRadius: '12px',
                border: '1px solid #e5e7eb'
              }}>
                <h3 style={{ 
                  fontSize: '20px', 
                  fontWeight: 700, 
                  color: '#1a2b49', 
                  marginBottom: '12px' 
                }}>
                  ✓ Best Price Guarantee
                </h3>
                <p>
                  Find the best prices for your favorite activities with our best price guarantee 
                  and transparent pricing.
                </p>
              </div>
              
              <div style={{ 
                padding: '24px', 
                backgroundColor: '#f7f7f7', 
                borderRadius: '12px',
                border: '1px solid #e5e7eb'
              }}>
                <h3 style={{ 
                  fontSize: '20px', 
                  fontWeight: 700, 
                  color: '#1a2b49', 
                  marginBottom: '12px' 
                }}>
                  ⭐ Verified Reviews
                </h3>
                <p>
                  Read authentic reviews from millions of travelers who have experienced these 
                  activities firsthand.
                </p>
              </div>
              
              <div style={{ 
                padding: '24px', 
                backgroundColor: '#f7f7f7', 
                borderRadius: '12px',
                border: '1px solid #e5e7eb'
              }}>
                <h3 style={{ 
                  fontSize: '20px', 
                  fontWeight: 700, 
                  color: '#1a2b49', 
                  marginBottom: '12px' 
                }}>
                  🎫 Instant Confirmation
                </h3>
                <p>
                  Book with confidence knowing you'll receive instant confirmation and mobile 
                  tickets for most experiences.
                </p>
              </div>

              <div style={{ 
                padding: '24px', 
                backgroundColor: '#f7f7f7', 
                borderRadius: '12px',
                border: '1px solid #e5e7eb'
              }}>
                <h3 style={{ 
                  fontSize: '20px', 
                  fontWeight: 700, 
                  color: '#1a2b49', 
                  marginBottom: '12px' 
                }}>
                  💳 Secure Booking
                </h3>
                <p>
                  Your information is protected with industry-leading security measures and 
                  encrypted payment processing.
                </p>
              </div>

              <div style={{ 
                padding: '24px', 
                backgroundColor: '#f7f7f7', 
                borderRadius: '12px',
                border: '1px solid #e5e7eb'
              }}>
                <h3 style={{ 
                  fontSize: '20px', 
                  fontWeight: 700, 
                  color: '#1a2b49', 
                  marginBottom: '12px' 
                }}>
                  🔄 Free Cancellation
                </h3>
                <p>
                  Plans change? Many experiences offer free cancellation up to 24 hours before 
                  your activity starts.
                </p>
              </div>
            </div>
          </section>

          <section style={{ marginBottom: 'var(--spacing-5x)' }}>
            <h2 style={{ 
              fontSize: '32px', 
              fontWeight: 600, 
              color: '#1a2b49', 
              marginBottom: 'var(--spacing-2-5x)' 
            }}>
              Our Commitment
            </h2>
            <p style={{ marginBottom: 'var(--spacing-2x)' }}>
              We're committed to sustainable and responsible tourism. We work with partners who share our 
              values of respecting local communities, preserving cultural heritage, and protecting the environment.
            </p>
            <p style={{ marginBottom: 'var(--spacing-2x)' }}>
              Our customer support team is available 24/7 to assist you before, during, and after your travels. 
              We're here to ensure your experience is seamless from booking to the moment you return home.
            </p>
          </section>

          <section>
            <h2 style={{ 
              fontSize: '32px', 
              fontWeight: 600, 
              color: '#1a2b49', 
              marginBottom: 'var(--spacing-2-5x)' 
            }}>
              Join Millions of Happy Travelers
            </h2>
            <p style={{ marginBottom: 'var(--spacing-2x)' }}>
              Since our launch, millions of travelers have trusted us to help them discover and book 
              unforgettable experiences. Join our community and start exploring the world today.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}