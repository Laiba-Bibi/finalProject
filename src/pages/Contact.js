import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import banner from '../assets/Banner.png'; // Reusing the banner from About.js

const Contact = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission (placeholder for future API integration)
  const handleSubmit = () => {
    // In a real application, this would send formData to a backend API
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section with Banner Image */}
      <section className="w-full h-[400px] md:h-[500px] relative">
        <img
          src={banner}
          alt="TechQuest Mentor Contact Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg md:text-xl max-w-3xl">
            Have questions or need assistance? Reach out to the TechQuest Mentor team, and let's shape your tech career together!
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Get in Touch</h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto text-center mb-8">
            Whether you're a student seeking career guidance or an expert interested in providing feedback, we're here to help. Fill out the form below, and our team will respond promptly.
          </p>
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Your Message"
                  rows="5"
                  required
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  onClick={handleSubmit}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Our Contact Details</h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto text-center mb-8">
            Reach out to us directly for immediate assistance or inquiries about joining our platform as an expert or user.
          </p>
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Email</h3>
                <p className="text-gray-600">support@techquestmentor.com</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Phone</h3>
                <p className="text-gray-600">+1 (800) 123-4567</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Address</h3>
                <p className="text-gray-600">123 Tech Lane, Innovation City, TX 75001</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Contact;