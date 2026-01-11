// Reusable FAQ Section Component with Accordion Functionality
// This component is used in both HomePage and ContactPage to maintain consistency

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-3">
      {faqs.map((faq, index) => (
        <div 
          key={index} 
          className="bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-200 hover:border-gray-300"
        >
          <button
            onClick={() => handleToggle(index)}
            className="w-full flex items-center justify-between p-6 cursor-pointer text-left transition-colors duration-200 hover:bg-gray-50"
          >
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--label-primary)' }}>
              {faq.question}
            </h3>
            <ChevronDown 
              className="flex-shrink-0 ml-4 transition-transform duration-300" 
              style={{ 
                color: 'var(--label-secondary)',
                transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                width: '20px',
                height: '20px'
              }}
            />
          </button>
          
          <div 
            className="overflow-hidden transition-all duration-300 ease-in-out"
            style={{ 
              maxHeight: openIndex === index ? '500px' : '0px',
              opacity: openIndex === index ? 1 : 0,
            }}
          >
            <div 
              className="px-6 pb-6 pt-0" 
              style={{ 
                color: 'var(--label-secondary)', 
                fontSize: '15px', 
                lineHeight: '1.6' 
              }}
            >
              {faq.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
