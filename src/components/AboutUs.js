import React from 'react';
import AboutImage from '../assets/Aboutus.png';

const AboutUs = () => {
  return (
    <section className="py-16 bg-white" id="about">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-y-8 md:gap-y-0">
          
          {/* Image Section */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-start">
            <img
              src={AboutImage}
              alt="About Us"
              className="w-80 h-80 md:w-96 md:h-96 object-cover rounded-full"
            />
          </div>

          {/* Text Section */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">About Us</h2>
            <h3 className="text-2xl font-bold mb-6">Light, Fast & Powerful</h3>
            <p className="text-[#22479b] mb-4">
              TechQuest Mentor is a dedicated platform that connects aspiring tech professionals
              with experienced industry experts who guide them through each career step.
              Together, they work to build rewarding, future-ready careers in the tech world.
            </p>
            <p className="text-[#22479b] mb-8">
              Our platform offers personalized roadmaps, skill assessments, and community support to help you succeed.
            </p>
            <button className="bg-gradient-to-r from-[#3b8be0] to-[#22479b] hover:bg-gradient-to-l text-white px-6 py-3 rounded transition duration-300">
              View More
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutUs;
