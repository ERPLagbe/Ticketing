export function PrivacyPolicyPage() {
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
          Privacy Policy
        </h1>
        
        {/* Last Updated */}
        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: 'var(--spacing-3x)' }}>
          Last updated: January 1, 2025
        </p>
        
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
              fontSize: '28px', 
              fontWeight: 700, 
              color: '#1a2b49', 
              marginBottom: 'var(--spacing-2x)' 
            }}>
              1. Introduction
            </h2>
            <p style={{ marginBottom: 'var(--spacing-2x)' }}>
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
              when you visit our website and use our services. Please read this privacy policy carefully. 
              If you do not agree with the terms of this privacy policy, please do not access the site.
            </p>
          </section>

          <section style={{ marginBottom: 'var(--spacing-5x)' }}>
            <h2 style={{ 
              fontSize: '28px', 
              fontWeight: 700, 
              color: '#1a2b49', 
              marginBottom: 'var(--spacing-2x)' 
            }}>
              2. Information We Collect
            </h2>
            <h3 style={{ 
              fontSize: '20px', 
              fontWeight: 600, 
              color: '#1a2b49', 
              marginBottom: 'var(--spacing-1x)',
              marginTop: 'var(--spacing-3x)'
            }}>
              Personal Information
            </h3>
            <p style={{ marginBottom: 'var(--spacing-2x)' }}>
              We may collect personal information that you provide to us such as:
            </p>
            <ul style={{ 
              listStyleType: 'disc', 
              paddingLeft: '24px', 
              marginBottom: 'var(--spacing-2x)' 
            }}>
              <li style={{ marginBottom: '8px' }}>Name and contact information (email address, phone number)</li>
              <li style={{ marginBottom: '8px' }}>Payment information and billing address</li>
              <li style={{ marginBottom: '8px' }}>Travel preferences and booking history</li>
              <li style={{ marginBottom: '8px' }}>Account credentials and profile information</li>
              <li style={{ marginBottom: '8px' }}>Communications with our customer support</li>
            </ul>

            <h3 style={{ 
              fontSize: '20px', 
              fontWeight: 600, 
              color: '#1a2b49', 
              marginBottom: 'var(--spacing-1x)',
              marginTop: 'var(--spacing-3x)'
            }}>
              Automatically Collected Information
            </h3>
            <p style={{ marginBottom: 'var(--spacing-2x)' }}>
              When you visit our website, we automatically collect certain information about your device, including:
            </p>
            <ul style={{ 
              listStyleType: 'disc', 
              paddingLeft: '24px', 
              marginBottom: 'var(--spacing-2x)' 
            }}>
              <li style={{ marginBottom: '8px' }}>Browser type and version</li>
              <li style={{ marginBottom: '8px' }}>IP address and location data</li>
              <li style={{ marginBottom: '8px' }}>Pages visited and time spent on pages</li>
              <li style={{ marginBottom: '8px' }}>Referring website and search terms</li>
              <li style={{ marginBottom: '8px' }}>Device type and operating system</li>
            </ul>
          </section>

          <section style={{ marginBottom: 'var(--spacing-5x)' }}>
            <h2 style={{ 
              fontSize: '28px', 
              fontWeight: 700, 
              color: '#1a2b49', 
              marginBottom: 'var(--spacing-2x)' 
            }}>
              3. How We Use Your Information
            </h2>
            <p style={{ marginBottom: 'var(--spacing-2x)' }}>
              We use the information we collect to:
            </p>
            <ul style={{ 
              listStyleType: 'disc', 
              paddingLeft: '24px', 
              marginBottom: 'var(--spacing-2x)' 
            }}>
              <li style={{ marginBottom: '8px' }}>Process your bookings and provide travel services</li>
              <li style={{ marginBottom: '8px' }}>Communicate with you about your bookings and account</li>
              <li style={{ marginBottom: '8px' }}>Send you marketing communications (with your consent)</li>
              <li style={{ marginBottom: '8px' }}>Improve our website and services</li>
              <li style={{ marginBottom: '8px' }}>Prevent fraud and enhance security</li>
              <li style={{ marginBottom: '8px' }}>Comply with legal obligations</li>
              <li style={{ marginBottom: '8px' }}>Personalize your experience and provide recommendations</li>
            </ul>
          </section>

          <section style={{ marginBottom: 'var(--spacing-5x)' }}>
            <h2 style={{ 
              fontSize: '28px', 
              fontWeight: 700, 
              color: '#1a2b49', 
              marginBottom: 'var(--spacing-2x)' 
            }}>
              4. Sharing Your Information
            </h2>
            <p style={{ marginBottom: 'var(--spacing-2x)' }}>
              We may share your information with:
            </p>
            <ul style={{ 
              listStyleType: 'disc', 
              paddingLeft: '24px', 
              marginBottom: 'var(--spacing-2x)' 
            }}>
              <li style={{ marginBottom: '8px' }}>
                <strong>Service Providers:</strong> Tour operators, attraction partners, and other third parties 
                necessary to fulfill your bookings
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Payment Processors:</strong> Secure payment gateways to process transactions
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Business Partners:</strong> Companies that help us provide and improve our services
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Legal Requirements:</strong> When required by law or to protect our rights
              </li>
            </ul>
            <p style={{ marginBottom: 'var(--spacing-2x)' }}>
              We do not sell your personal information to third parties.
            </p>
          </section>

          <section style={{ marginBottom: 'var(--spacing-5x)' }}>
            <h2 style={{ 
              fontSize: '28px', 
              fontWeight: 700, 
              color: '#1a2b49', 
              marginBottom: 'var(--spacing-2x)' 
            }}>
              5. Cookies and Tracking Technologies
            </h2>
            <p style={{ marginBottom: 'var(--spacing-2x)' }}>
              We use cookies and similar tracking technologies to track activity on our website and store 
              certain information. Cookies help us provide a better user experience by remembering your 
              preferences and improving our services.
            </p>
            <p style={{ marginBottom: 'var(--spacing-2x)' }}>
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. 
              However, if you do not accept cookies, you may not be able to use some portions of our website.
            </p>
          </section>

          <section style={{ marginBottom: 'var(--spacing-5x)' }}>
            <h2 style={{ 
              fontSize: '28px', 
              fontWeight: 700, 
              color: '#1a2b49', 
              marginBottom: 'var(--spacing-2x)' 
            }}>
              6. Data Security
            </h2>
            <p style={{ marginBottom: 'var(--spacing-2x)' }}>
              We implement appropriate technical and organizational security measures to protect your personal 
              information against unauthorized access, alteration, disclosure, or destruction. This includes:
            </p>
            <ul style={{ 
              listStyleType: 'disc', 
              paddingLeft: '24px', 
              marginBottom: 'var(--spacing-2x)' 
            }}>
              <li style={{ marginBottom: '8px' }}>Encryption of sensitive data (SSL/TLS)</li>
              <li style={{ marginBottom: '8px' }}>Regular security assessments and updates</li>
              <li style={{ marginBottom: '8px' }}>Restricted access to personal information</li>
              <li style={{ marginBottom: '8px' }}>Secure payment processing systems</li>
            </ul>
          </section>

          <section style={{ marginBottom: 'var(--spacing-5x)' }}>
            <h2 style={{ 
              fontSize: '28px', 
              fontWeight: 700, 
              color: '#1a2b49', 
              marginBottom: 'var(--spacing-2x)' 
            }}>
              7. Your Rights
            </h2>
            <p style={{ marginBottom: 'var(--spacing-2x)' }}>
              Depending on your location, you may have certain rights regarding your personal information:
            </p>
            <ul style={{ 
              listStyleType: 'disc', 
              paddingLeft: '24px', 
              marginBottom: 'var(--spacing-2x)' 
            }}>
              <li style={{ marginBottom: '8px' }}>Right to access your personal information</li>
              <li style={{ marginBottom: '8px' }}>Right to rectify inaccurate information</li>
              <li style={{ marginBottom: '8px' }}>Right to request deletion of your information</li>
              <li style={{ marginBottom: '8px' }}>Right to restrict or object to processing</li>
              <li style={{ marginBottom: '8px' }}>Right to data portability</li>
              <li style={{ marginBottom: '8px' }}>Right to withdraw consent</li>
            </ul>
          </section>

          <section style={{ marginBottom: 'var(--spacing-5x)' }}>
            <h2 style={{ 
              fontSize: '28px', 
              fontWeight: 700, 
              color: '#1a2b49', 
              marginBottom: 'var(--spacing-2x)' 
            }}>
              8. Data Retention
            </h2>
            <p style={{ marginBottom: 'var(--spacing-2x)' }}>
              We retain your personal information only for as long as necessary to fulfill the purposes 
              outlined in this privacy policy, comply with legal obligations, resolve disputes, and enforce 
              our agreements.
            </p>
          </section>

          <section style={{ marginBottom: 'var(--spacing-5x)' }}>
            <h2 style={{ 
              fontSize: '28px', 
              fontWeight: 700, 
              color: '#1a2b49', 
              marginBottom: 'var(--spacing-2x)' 
            }}>
              9. Children's Privacy
            </h2>
            <p style={{ marginBottom: 'var(--spacing-2x)' }}>
              Our services are not intended for children under the age of 18. We do not knowingly collect 
              personal information from children. If you become aware that a child has provided us with 
              personal information, please contact us.
            </p>
          </section>

          <section style={{ marginBottom: 'var(--spacing-5x)' }}>
            <h2 style={{ 
              fontSize: '28px', 
              fontWeight: 700, 
              color: '#1a2b49', 
              marginBottom: 'var(--spacing-2x)' 
            }}>
              10. International Data Transfers
            </h2>
            <p style={{ marginBottom: 'var(--spacing-2x)' }}>
              Your information may be transferred to and maintained on computers located outside of your 
              country where data protection laws may differ. We ensure appropriate safeguards are in place 
              for such transfers.
            </p>
          </section>

          <section style={{ marginBottom: 'var(--spacing-5x)' }}>
            <h2 style={{ 
              fontSize: '28px', 
              fontWeight: 700, 
              color: '#1a2b49', 
              marginBottom: 'var(--spacing-2x)' 
            }}>
              11. Changes to This Privacy Policy
            </h2>
            <p style={{ marginBottom: 'var(--spacing-2x)' }}>
              We may update our Privacy Policy from time to time. We will notify you of any changes by 
              posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 style={{ 
              fontSize: '28px', 
              fontWeight: 700, 
              color: '#1a2b49', 
              marginBottom: 'var(--spacing-2x)' 
            }}>
              12. Contact Us
            </h2>
            <p style={{ marginBottom: 'var(--spacing-2x)' }}>
              If you have questions or concerns about this Privacy Policy or our data practices, please contact us at:
            </p>
            <div style={{ 
              padding: '20px', 
              backgroundColor: '#f7f7f7', 
              borderRadius: '8px',
              border: '1px solid #e5e7eb'
            }}>
              <p style={{ marginBottom: '8px' }}>
                <strong>Email:</strong> privacy@getyourguide.com
              </p>
              <p style={{ marginBottom: '8px' }}>
                <strong>Address:</strong> 123 Travel Street, San Francisco, CA 94102, USA
              </p>
              <p>
                <strong>Phone:</strong> +1 (555) 123-4567
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}