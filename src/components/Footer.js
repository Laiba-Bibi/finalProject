import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info Column */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2"
              >
                <path
                  d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-bold text-xl">TechTrack Advisor</span>
            </div>
            <p className="text-sm text-gray-300">
              TechTrack Advisor was created to guide aspiring tech professionals to success through personalized career roadmaps.
            </p>
          </div>

          {/* Product Column */}
          <div className="md:col-span-1">
            <h4 className="font-bold text-lg mb-4">Product</h4>
            <ul className="space-y-3">
              <li><a href="/" className="text-gray-300 hover:text-white hover:underline transition-colors">Overview</a></li>
              <li><a href="/features" className="text-gray-300 hover:text-white hover:underline transition-colors">Features</a></li>
              <li><a href="/pricing" className="text-gray-300 hover:text-white hover:underline transition-colors">Pricing</a></li>
              <li><a href="/roadmaps" className="text-gray-300 hover:text-white hover:underline transition-colors">Roadmaps</a></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="md:col-span-1">
            <h4 className="font-bold text-lg mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>Blog</li>
              <li><a href="/guides" className="text-gray-300 hover:text-white hover:underline transition-colors">Guides</a></li>
              <li><a href="/FAQ" className="text-gray-300 hover:text-white hover:underline transition-colors">FAQ</a></li>
              <li><a href="/webinars" className="text-gray-300 hover:text-white hover:underline transition-colors">Webinars</a></li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="md:col-span-1">
            <h4 className="font-bold text-lg mb-4">Company</h4>
            <ul className="space-y-3">
              <li><a href="/about" className="text-gray-300 hover:text-white hover:underline transition-colors">About Us</a></li>
              <li><a href="/careers" className="text-gray-300 hover:text-white hover:underline transition-colors">Careers</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-white hover:underline transition-colors">Contact</a></li>
              <li><a href="/about " className="text-gray-300 hover:text-white hover:underline transition-colors">Experts</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-300 mb-4 md:mb-0">
              © {new Date().getFullYear()} TechTrack Advisor. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="/terms" className="text-gray-300 hover:text-white transition-colors text-sm hover:underline">Terms</a>
              <a href="/privacy" className="text-gray-300 hover:text-white transition-colors text-sm hover:underline">Privacy</a>
              <a href="/cookies" className="text-gray-300 hover:text-white transition-colors text-sm hover:underline">Cookies</a>
              <a href="/security" className="text-gray-300 hover:text-white transition-colors text-sm hover:underline">Security</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;