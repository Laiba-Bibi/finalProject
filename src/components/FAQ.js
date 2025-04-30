import React, { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is TechQuest Mentor?",
      answer: "A platform to guide aspiring tech professionals with mentorship and resources.",
    },
    {
      question: "How do I get started?",
      answer: "Sign up and set your career goals to receive a personalized roadmap.",
    },
    {
      question: "What kind of support is offered?",
      answer: "We provide skill assessments, expert reviews, and community support.",
    },
    {
      question: "Is there a cost to join?",
      answer: "Basic features are free, with premium options for advanced support.",
    },
    {
      question: "Can I connect with mentors?",
      answer: "Yes, our platform connects you with industry experts for guidance.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-8 items-stretch">
          {/* FAQ Section */}
          <div className="md:w-1/2 flex flex-col h-full">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-primary leading-tight">
                Frequently
                <br />
                Asked
                <br />
                Questions
              </h2>
            </div>
            <div className="space-y-4 flex-1">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 cursor-pointer"
                  onClick={() => toggleFAQ(index)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">{faq.question}</h3>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
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
                    <p className="mt-2 text-gray-600">{faq.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Question Card Section */}
          <div className="md:w-1/2 flex">
            <div className="border rounded-lg p-8 flex flex-col justify-between w-full h-full">
              <div className="flex flex-col items-center text-center mb-8">
                <div className="w-10 h-10 bg-primary mb-4"></div>
                <h3 className="font-bold text-lg">Do you have more questions?</h3>
                <p className="text-gray-600 mt-4">
                  Contact us for personalized support and answers to all your questions.
                </p>
              </div>
              <div className="flex justify-center">
                <button className="bg-[#4F9CF9] hover:bg-blue-500 text-white py-3 px-6 rounded w-48">
                  Shoot a Direct Mail
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
