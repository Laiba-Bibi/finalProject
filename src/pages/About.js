import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import banner from '../assets/Banner.png'; // Ensure the image path is correct
import member1 from '../assets/member1.jpeg';
import member2 from '../assets/member2.png';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section with Banner Image */}
      <section className="w-full h-[400px] md:h-[500px] relative">
        <img
          src={banner}
          alt="TechQuest Mentor Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About TechQuest Mentor</h1>
          <p className="text-lg md:text-xl max-w-3xl">
            Empowering aspiring tech professionals with personalized career guidance, skill assessments, and expert mentorship.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Our Mission</h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto text-center">
            TechQuest Mentor is a cutting-edge platform designed to guide students and professionals through the dynamic tech landscape. By offering tailored learning paths, skill assessments, and expert feedback, we aim to transform how individuals navigate their tech careers, making career planning engaging and effective.
          </p>
        </div>
      </section>

      {/* Vision Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Our Vision</h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto text-center">
            We envision a world where every aspiring tech professional has access to personalized guidance and resources to achieve their full potential. TechQuest Mentor strives to bridge the gap between ambition and success by fostering a community of continuous learning and expert support.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Team Member 1 */}
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <img
                src={member1}
                alt="Laiba Bibi"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-800">Laiba Bibi</h3>
              <p className="text-gray-600">Developer & Co-Creator</p>
              <p className="text-gray-500 mt-2">
                Laiba is a passionate computer science student dedicated to building user-centric solutions for career growth.
              </p>
            </div>
            {/* Team Member 2 */}
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <img
                src={member2}
                alt="Noor Fatima"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-800">Noor Fatima</h3>
              <p className="text-gray-600">Developer & Co-Creator</p>
              <p className="text-gray-500 mt-2">
                Noor brings creativity and technical expertise to craft engaging and personalized career guidance tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experts Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Our Experts</h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto text-center mb-8">
            Our team of industry experts at TechQuest Mentor is dedicated to empowering users by reviewing profiles, providing personalized feedback, and guiding career development. Log in to our expert dashboard to assess user progress and offer tailored advice to shape the future of tech professionals.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/expert-login"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              Expert Login
            </Link>
            <Link
              to="/expert-signup"
              className="bg-transparent border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition duration-300"
            >
              Join as an Expert
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;
