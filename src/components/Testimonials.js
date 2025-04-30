import React from 'react';
import img1 from '../assets/testimonial-1.jpg';
import img2 from '../assets/testimonial-2.jpg';
import img3 from '../assets/testimonial-3.jpg';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Jessie Owner",
      position: "Founder, XYZ Company",
      image: img1,
      quote:
        "TechQuest Mentor transformed my career path with personalized guidance and expert support.",
      rating: 5,
    },
    {
      id: 2,
      name: "Alex Carter",
      position: "Tech Lead, ABC Corp",
      image: img2,
      quote:
        "The skill assessments and roadmaps were game-changers for my professional growth.",
      rating: 5,
    },
    {
      id: 3,
      name: "Sara Lee",
      position: "Developer, DEF Inc",
      image: img3,
      quote:
        "Joining the TechQuest community opened doors to new opportunities and connections.",
      rating: 5,
    },
  ];

  const renderStars = (rating) => {
    return Array(rating)
      .fill(0)
      .map((_, i) => (
        <span key={i} className="text-yellow-400 text-lg">★</span>
      ));
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-12 text-center">
          See What Our Trusted Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-[#22479b] p-6 rounded-lg shadow-md flex flex-col items-center text-center h-full transition-all duration-300 hover:bg-white"
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-24 h-24 object-cover object-center rounded-full mb-4 border-4 border-white"
              />
              <p className="text-white italic mb-4 flex-grow hover:text-black transition-colors duration-300">
                "{testimonial.quote}"
              </p>
              <p className="font-bold text-white text-lg mb-2">
                {testimonial.name}
              </p>
              <p className="text-sm text-black bg-white px-3 py-1 rounded mb-3">
                {testimonial.position}
              </p>
              <div>{renderStars(testimonial.rating)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
