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
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <div className="flex items-center mb-8">
              <img src="/assets/spiral-icon.png" alt="Spiral icon" className="w-12 h-12 mr-4" />
              <h2 className="text-3xl md:text-4xl font-bold text-primary">
                Frequently
                <br />
                Asked
                <br />
                Questions
              </h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border rounded-lg p-4 cursor-pointer" onClick={() => toggleFAQ(index)}>
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
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </div>
                  {openIndex === index && <p className="mt-2 text-gray-600">{faq.question}</p>}
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-1/2 md:pl-12">
            <div className="border rounded-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-primary mr-4"></div>
                <h3 className="font-bold">Do you have more questions?</h3>
              </div>
              <p className="text-gray-600 mb-8">
                Contact us for personalized support and answers to all your questions.
              </p>
              <button className="w-full bg-secondary hover:bg-yellow-300 text-black py-4 rounded">
                Shoot a Direct Mail
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;