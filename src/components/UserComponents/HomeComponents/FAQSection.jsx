import React, { useState } from 'react';
import h4 from '../../../assets/h4.svg';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);  // First item open by default

  const faqs = [
    {
      question: "How can i join?",
      answer: "Nibh quisque suscipit fermentum netus nulla cras porttitor euismod nulla. Orci, dictumst nec aliquet id ullamcorper venenatis."
    },
    {
      question: "Can i create me own template?",
      answer: "Nibh quisque suscipit fermentum netus nulla cras porttitor euismod nulla."
    },
    {
      question: "Can i create SEO articles?",
      answer: "Nibh quisque suscipit fermentum netus nulla cras porttitor euismod nulla."
    },
    {
      question: "Are templates updated daily?",
      answer: "Nibh quisque suscipit fermentum netus nulla cras porttitor euismod nulla."
    },
    {
      question: "Can i share my templates with others?",
      answer: "Nibh quisque suscipit fermentum netus nulla cras porttitor euismod nulla."
    },
    {
      question: "Tortor nisl pellentesque sit quis orci dolor?",
      answer: "Nibh quisque suscipit fermentum netus nulla cras porttitor euismod nulla."
    },
    {
      question: "Vestibulum mauris mauris elementum proin amet auctor ipsum nibh sollicitudin?",
      answer: "Nibh quisque suscipit fermentum netus nulla cras porttitor euismod nulla."
    }
  ];

  return (
    <section id="faq" className="bg-white py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left side - Illustration */}
          <div className="relative order-2 md:order-1 mt-8 md:mt-0">
            <img 
              src={h4} 
              alt="FAQ Illustration" 
              className="w-full max-w-[500px] mx-auto md:mx-0"
            />
          </div>

          {/* Right side - FAQs */}
          <div className="order-1 md:order-2">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Frequently Asked Questions</h2>
            
            <div className="space-y-2">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className="border-b border-gray-200 last:border-b-0"
                >
                  <button
                    className="flex justify-between items-start w-full text-left py-4 hover:text-gray-600"
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  >
                    <span className="font-medium pr-8 text-sm md:text-base">{faq.question}</span>
                    <span className="text-xl md:text-2xl flex-shrink-0">
                      {openIndex === index ? '-' : '+'}
                    </span>
                  </button>
                  {openIndex === index && (
                    <div className="pb-4 text-gray-600 text-sm md:text-base">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;