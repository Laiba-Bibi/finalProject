import React from 'react';

const Services = () => {
  const services = [
    {
      number: "01",
      title: "Comprehensive Skill Assessment",
      description: "Evaluate your skills to identify strengths and areas for growth.",
    },
    {
      number: "02",
      title: "Clear and Structured Roadmaps",
      description: "Receive personalized career paths tailored to your goals.",
    },
    {
      number: "03",
      title: "Expert Review for Profile Enhancement",
      description: "Get feedback to optimize your professional profile.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">What We Offer</h2>
        <p className="text-gray-600 mb-12 max-w-3xl">
          Discover how TechQuest Mentor empowers your tech career with tailored tools and expert guidance.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col justify-between items-center text-center h-full p-6 border rounded-2xl shadow-md transition hover:shadow-lg"
            >
              <div>
                <h3 className="text-4xl font-bold mb-4 text-secondary">{service.number}</h3>
                <h4 className="text-xl font-semibold mb-3">{service.title}</h4>
                <p className="text-gray-600">{service.description}</p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-secondary mt-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
