export function TermsConditionsPage() {
  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', paddingTop: '80px' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" style={{ paddingTop: '48px', paddingBottom: '80px' }}>
        {/* Header */}
        <h1 style={{ 
          fontSize: '48px', 
          fontWeight: 700, 
          color: '#1a2b49', 
          marginBottom: '24px',
          lineHeight: '1.2'
        }}>
          General Terms and Conditions
        </h1>
        
        <div style={{ 
          height: '4px', 
          width: '80px', 
          backgroundColor: 'var(--interactive-primary)', 
          marginBottom: '24px',
          borderRadius: '2px'
        }} />

        <p style={{ 
          color: '#6b7280', 
          fontSize: '14px', 
          marginBottom: '48px' 
        }}>
          Last updated: December 24, 2024
        </p>

        {/* Content */}
        <div style={{ color: '#4b5563', fontSize: '16px', lineHeight: '1.8' }}>
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ 
              fontSize: '28px', 
              fontWeight: 700, 
              color: '#1a2b49', 
              marginBottom: '16px' 
            }}>
              1. Acceptance of Terms
            </h2>
            <p style={{ marginBottom: '16px' }}>
              By accessing and using this website and our services, you accept and agree to be bound by the 
              terms and provisions of this agreement. If you do not agree to these terms, please do not use 
              our services.
            </p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ 
              fontSize: '28px', 
              fontWeight: 700, 
              color: '#1a2b49', 
              marginBottom: '16px' 
            }}>
              2. Service Description
            </h2>
            <p style={{ marginBottom: '16px' }}>
              We provide an online platform that allows users to search, compare, and book tours, activities, 
              and attractions worldwide. We act as an intermediary between travelers and service providers 
              (tour operators, attractions, etc.).
            </p>
            <p style={{ marginBottom: '16px' }}>
              We are not the direct provider of the travel services and activities listed on our platform. 
              Each booking is subject to the specific terms and conditions of the respective service provider.
            </p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ 
              fontSize: '28px', 
              fontWeight: 700, 
              color: '#1a2b49', 
              marginBottom: '16px' 
            }}>
              3. Booking and Payment
            </h2>
            <h3 style={{ 
              fontSize: '20px', 
              fontWeight: 600, 
              color: '#1a2b49', 
              marginBottom: '12px',
              marginTop: '24px'
            }}>
              3.1 Booking Process
            </h3>
            <ul style={{ 
              listStyleType: 'disc', 
              paddingLeft: '24px', 
              marginBottom: '16px' 
            }}>
              <li style={{ marginBottom: '8px' }}>All bookings are subject to availability and confirmation</li>
              <li style={{ marginBottom: '8px' }}>You must provide accurate and complete information</li>
              <li style={{ marginBottom: '8px' }}>You must be at least 18 years old to make a booking</li>
              <li style={{ marginBottom: '8px' }}>A booking confirmation will be sent to your email address</li>
            </ul>

            <h3 style={{ 
              fontSize: '20px', 
              fontWeight: 600, 
              color: '#1a2b49', 
              marginBottom: '12px',
              marginTop: '24px'
            }}>
              3.2 Payment
            </h3>
            <ul style={{ 
              listStyleType: 'disc', 
              paddingLeft: '24px', 
              marginBottom: '16px' 
            }}>
              <li style={{ marginBottom: '8px' }}>Payment is required at the time of booking unless otherwise stated</li>
              <li style={{ marginBottom: '8px' }}>We accept major credit cards, debit cards, and other payment methods as displayed</li>
              <li style={{ marginBottom: '8px' }}>All prices are displayed in the selected currency and include applicable taxes unless stated otherwise</li>
              <li style={{ marginBottom: '8px' }}>Exchange rates are updated regularly but may fluctuate</li>
            </ul>

            <h3 style={{ 
              fontSize: '20px', 
              fontWeight: 600, 
              color: '#1a2b49', 
              marginBottom: '12px',
              marginTop: '24px'
            }}>
              3.3 Pricing
            </h3>
            <p style={{ marginBottom: '16px' }}>
              While we strive to ensure pricing accuracy, errors may occur. If we discover a pricing error 
              after you've made a booking, we will notify you and give you the option to confirm at the 
              correct price or cancel your booking for a full refund.
            </p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ 
              fontSize: '28px', 
              fontWeight: 700, 
              color: '#1a2b49', 
              marginBottom: '16px' 
            }}>
              4. Cancellation and Refunds
            </h2>
            <p style={{ marginBottom: '16px' }}>
              Cancellation policies vary by activity and service provider. Each activity listing displays 
              the specific cancellation policy that applies.
            </p>
            <h3 style={{ 
              fontSize: '20px', 
              fontWeight: 600, 
              color: '#1a2b49', 
              marginBottom: '12px',
              marginTop: '24px'
            }}>
              General Guidelines:
            </h3>
            <ul style={{ 
              listStyleType: 'disc', 
              paddingLeft: '24px', 
              marginBottom: '16px' 
            }}>
              <li style={{ marginBottom: '8px' }}>
                <strong>Free Cancellation:</strong> Many activities offer free cancellation up to 24 hours 
                before the start time
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Partial Refunds:</strong> Some activities may offer partial refunds depending on 
                cancellation timing
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Non-Refundable:</strong> Some bookings are non-refundable as specified at time of booking
              </li>
              <li style={{ marginBottom: '8px' }}>
                Refunds are processed to the original payment method within 5-10 business days
              </li>
            </ul>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ 
              fontSize: '28px', 
              fontWeight: 700, 
              color: '#1a2b49', 
              marginBottom: '16px' 
            }}>
              5. Changes and Modifications
            </h2>
            <p style={{ marginBottom: '16px' }}>
              If you need to modify your booking (change date, time, or number of participants), contact us 
              as soon as possible. Modifications are subject to availability and may incur additional fees.
            </p>
            <p style={{ marginBottom: '16px' }}>
              Service providers reserve the right to modify or cancel activities due to weather, insufficient 
              bookings, or other circumstances. In such cases, we will offer alternative dates or a full refund.
            </p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ 
              fontSize: '28px', 
              fontWeight: 700, 
              color: '#1a2b49', 
              marginBottom: '16px' 
            }}>
              6. User Responsibilities
            </h2>
            <ul style={{ 
              listStyleType: 'disc', 
              paddingLeft: '24px', 
              marginBottom: '16px' 
            }}>
              <li style={{ marginBottom: '8px' }}>Arrive at the meeting point on time with required documents and tickets</li>
              <li style={{ marginBottom: '8px' }}>Follow safety instructions and guidelines provided by service providers</li>
              <li style={{ marginBottom: '8px' }}>Ensure you meet health, fitness, and age requirements for activities</li>
              <li style={{ marginBottom: '8px' }}>Have necessary travel documents (passport, visa, etc.)</li>
              <li style={{ marginBottom: '8px' }}>Inform us of any special requirements or accessibility needs</li>
              <li style={{ marginBottom: '8px' }}>Behave respectfully toward guides, other participants, and local communities</li>
            </ul>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ 
              fontSize: '28px', 
              fontWeight: 700, 
              color: '#1a2b49', 
              marginBottom: '16px' 
            }}>
              7. Liability and Insurance
            </h2>
            <p style={{ marginBottom: '16px' }}>
              We act as an intermediary and are not responsible for the acts, errors, omissions, 
              representations, warranties, or negligence of service providers or for any personal injuries, 
              death, property damage, or other damages resulting from your activities.
            </p>
            <p style={{ marginBottom: '16px' }}>
              We strongly recommend purchasing comprehensive travel insurance covering trip cancellation, 
              medical emergencies, and personal belongings.
            </p>
            <p style={{ marginBottom: '16px' }}>
              To the maximum extent permitted by law, our liability is limited to the amount paid for the 
              specific booking.
            </p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ 
              fontSize: '28px', 
              fontWeight: 700, 
              color: '#1a2b49', 
              marginBottom: '16px' 
            }}>
              8. Intellectual Property
            </h2>
            <p style={{ marginBottom: '16px' }}>
              All content on this website, including text, graphics, logos, images, and software, is the 
              property of our company or our content suppliers and protected by copyright and intellectual 
              property laws.
            </p>
            <p style={{ marginBottom: '16px' }}>
              You may not reproduce, distribute, modify, or create derivative works without our express 
              written permission.
            </p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ 
              fontSize: '28px', 
              fontWeight: 700, 
              color: '#1a2b49', 
              marginBottom: '16px' 
            }}>
              9. Reviews and User Content
            </h2>
            <p style={{ marginBottom: '16px' }}>
              By submitting reviews, photos, or other content, you grant us a non-exclusive, royalty-free, 
              worldwide license to use, reproduce, and display such content.
            </p>
            <p style={{ marginBottom: '16px' }}>
              You are responsible for the content you submit and warrant that:
            </p>
            <ul style={{ 
              listStyleType: 'disc', 
              paddingLeft: '24px', 
              marginBottom: '16px' 
            }}>
              <li style={{ marginBottom: '8px' }}>Content is accurate and based on personal experience</li>
              <li style={{ marginBottom: '8px' }}>Content does not infringe on third-party rights</li>
              <li style={{ marginBottom: '8px' }}>Content does not contain offensive, defamatory, or inappropriate material</li>
            </ul>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ 
              fontSize: '28px', 
              fontWeight: 700, 
              color: '#1a2b49', 
              marginBottom: '16px' 
            }}>
              10. Privacy
            </h2>
            <p style={{ marginBottom: '16px' }}>
              Your use of our services is also governed by our Privacy Policy. Please review our Privacy 
              Policy to understand how we collect, use, and protect your personal information.
            </p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ 
              fontSize: '28px', 
              fontWeight: 700, 
              color: '#1a2b49', 
              marginBottom: '16px' 
            }}>
              11. Force Majeure
            </h2>
            <p style={{ marginBottom: '16px' }}>
              We are not liable for any failure to perform our obligations due to circumstances beyond our 
              reasonable control, including natural disasters, pandemics, war, terrorism, strikes, or 
              government restrictions.
            </p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ 
              fontSize: '28px', 
              fontWeight: 700, 
              color: '#1a2b49', 
              marginBottom: '16px' 
            }}>
              12. Dispute Resolution
            </h2>
            <p style={{ marginBottom: '16px' }}>
              Any disputes arising from these terms or your use of our services shall be governed by the 
              laws of the jurisdiction in which we operate.
            </p>
            <p style={{ marginBottom: '16px' }}>
              We encourage you to contact our customer service first to resolve any issues. If a dispute 
              cannot be resolved informally, you agree to submit to the exclusive jurisdiction of the courts 
              in our jurisdiction.
            </p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ 
              fontSize: '28px', 
              fontWeight: 700, 
              color: '#1a2b49', 
              marginBottom: '16px' 
            }}>
              13. Changes to Terms
            </h2>
            <p style={{ marginBottom: '16px' }}>
              We reserve the right to modify these terms at any time. Changes will be effective immediately 
              upon posting to the website. Your continued use of our services after changes constitutes 
              acceptance of the modified terms.
            </p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ 
              fontSize: '28px', 
              fontWeight: 700, 
              color: '#1a2b49', 
              marginBottom: '16px' 
            }}>
              14. Severability
            </h2>
            <p style={{ marginBottom: '16px' }}>
              If any provision of these terms is found to be invalid or unenforceable, the remaining 
              provisions shall remain in full force and effect.
            </p>
          </section>

          <section>
            <h2 style={{ 
              fontSize: '28px', 
              fontWeight: 700, 
              color: '#1a2b49', 
              marginBottom: '16px' 
            }}>
              15. Contact Information
            </h2>
            <p style={{ marginBottom: '16px' }}>
              For questions about these terms and conditions, please contact us:
            </p>
            <div style={{ 
              padding: '20px', 
              backgroundColor: '#f7f7f7', 
              borderRadius: '8px',
              border: '1px solid #e5e7eb'
            }}>
              <p style={{ marginBottom: '8px' }}>
                <strong>Email:</strong> support@getyourguide.com
              </p>
              <p style={{ marginBottom: '8px' }}>
                <strong>Address:</strong> 123 Travel Street, San Francisco, CA 94102, USA
              </p>
              <p style={{ marginBottom: '8px' }}>
                <strong>Phone:</strong> +1 (555) 123-4567
              </p>
              <p>
                <strong>Hours:</strong> 24/7 Customer Support
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
