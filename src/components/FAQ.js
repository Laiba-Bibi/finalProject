import React, { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is TechQuest Mentor?",
      answer: "TechQuest Mentor is a comprehensive platform designed to guide individuals through their tech career journey. It provides personalized roadmaps and resources tailored to your specific goals. Our system helps you navigate the complex tech industry with expert recommendations.",
    },
    {
      question: "How does it work?",
      answer: "You start by answering a few questions about your skills and goals. The system then generates a customized roadmap with recommended learning paths. You can track your progress and adjust your plan as needed throughout your journey.",
    },
    {
      question: "Is it free?",
      answer: "Yes, the basic version of TechQuest Mentor is completely free to use. We offer premium features for those who want additional guidance and resources. The free version still provides substantial value for your career development.",
    },
    {
      question: "How can I sign up?",
      answer: "Signing up is quick and easy through our website or mobile app. Just provide basic information and your career interests to get started. You'll have immediate access to your personalized dashboard after registration.",
    },
    {
      question: "Can I customize my roadmap?",
      answer: "Absolutely! Your roadmap is fully customizable to match your preferences. You can add, remove, or modify any steps in your plan. The system adapts to your changes while still keeping you on track.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-white flex items-center justify-center">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center">
          {/* FAQ Section */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">FAQ</h1>
            <p className="text-lg text-gray-600">
              Find answers to frequently asked questions about TechTrack Advisor and its services.
            </p>
          </div>
          <div className="space-y-4 w-full md:w-2/3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg">{faq.question}</h3>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 transform transition-transform ${openIndex === index ? 'rotate-45' : ''}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </div>
                {openIndex === index && (
                  <p className="mt-3 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;