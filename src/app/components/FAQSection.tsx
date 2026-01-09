// Reusable FAQ Section Component
// This component is used in both HomePage and ContactPage to maintain consistency

export function FAQSection() {
  const faqs = [
    {
      question: 'How do I book an activity?',
      answer: 'Simply browse our activities, select your preferred date and number of travelers, then click "Book Now". You\'ll receive instant confirmation and your tickets via email.',
    },
    {
      question: 'Can I cancel or modify my booking?',
      answer: 'Most activities offer free cancellation up to 24 hours before the scheduled time. Check the specific cancellation policy on each activity page for details.',
    },
    {
      question: 'Are the prices shown final?',
      answer: 'Yes! All prices include taxes and fees. The price you see is exactly what you\'ll pay. No hidden charges or surprises at checkout.',
    },
    {
      question: 'Do I need to print my tickets?',
      answer: 'No need to print! Simply show your mobile ticket (available in your account or email confirmation) at the meeting point. It\'s eco-friendly and convenient.',
    },
    {
      question: 'What if I have special requirements?',
      answer: 'Contact us immediately after booking through your account dashboard or email. We\'ll work with the activity provider to accommodate accessibility needs, dietary restrictions, or other special requests.',
    },
    {
      question: 'How do I contact customer support?',
      answer: 'Our 24/7 customer support team is available via live chat, email at support@tourticket.com, or phone. Visit our Contact page for all available support options.',
    },
  ];

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <details key={index} className="bg-white rounded-lg border border-gray-200 group">
          <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--label-primary)' }}>
              {faq.question}
            </h3>
            <svg 
              className="w-5 h-5 transition-transform group-open:rotate-180" 
              style={{ color: 'var(--label-secondary)' }}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 pt-0" style={{ color: 'var(--label-secondary)', fontSize: '15px', lineHeight: '1.6' }}>
            {faq.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
