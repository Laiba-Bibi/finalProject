import React from 'react';
import { Link } from 'react-router-dom';

import herosecimg from '../assets/herosecimg.png'; // Update your path if needed

const Hero = () => {
  return (
    <section className="py-16 bg-white flex justify-center" id="home">
      <div className="max-w-7xl w-full px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center md:items-stretch justify-between gap-8">

          {/* Left Section - Text */}
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-3xl md:text-5xl font-bold text-[#22479B] leading-tight mb-6 text-center md:text-left">
              Explore your career in <br className="hidden md:block" /> Tech Industry
            </h1>
            <p className="text-[#22479B] mb-4 leading-relaxed text-base md:text-lg text-center md:text-left">
              Discover TechQuest Mentor! Stay ahead with the latest industry trends, receive career roadmaps, and
              discover job opportunities tailored to your skills. TechQuest Mentor simplifies your journey into tech,
              making it engaging and hassle-free.
            </p>
            <p className="text-[#22479B] mb-8 leading-relaxed text-base md:text-lg text-center md:text-left">
              Join a community of like-minded professionals, gain insights from industry experts, and access exclusive
              resources to sharpen your skills. Take the next step toward success with TechQuest Mentor today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                to="/about"
                className="px-8 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-[#043873] to-[#4F9CF9] hover:opacity-90 transition text-center"
              >
                Learn more
              </Link>
              <Link
                to="/register"
                className="px-8 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-[#043873] to-[#4F9CF9] hover:opacity-90 transition text-center"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Right Section - Image */}
<div className="hidden md:flex flex-[1.2] justify-center items-center">
  {herosecimg && (
    <img
      src={herosecimg}
      alt="Tech professionals around a globe"
      className="w-full max-w-xl object-contain"
    />
  )}
</div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
