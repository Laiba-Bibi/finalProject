import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full">
      {/* Top Blue Bar */}
      <div className="bg-[#043873] w-full h-4"></div>

      {/* Main Navbar Section */}
      <nav className="bg-white py-4 shadow-md relative">
        <div className="flex justify-between items-center px-4 sm:px-6 md:px-8">
          {/* Logo with consistent padding */}
          <Link to="/" className="flex items-center pl-0">
            <img
              src={logo}
              alt="TechQuest Mentor"
              className="w-40 h-10 sm:w-48 sm:h-12 md:w-60 md:h-16 object-contain"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 text-[#22479b]">
            <Link to="/" className="hover:text-black">Home</Link>
            <Link to="/#about" className="hover:text-black">About</Link>
            <Link to="/#contact" className="hover:text-black">Contact</Link>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex space-x-4">
            <Link to="/register" className="bg-[#4F9CF9] hover:bg-[#3b8be0] text-white px-6 py-2 rounded">
              Signup
            </Link>
            <Link to="/login" className="bg-[#4F9CF9] hover:bg-[#3b8be0] text-white px-6 py-2 rounded">
              Login
            </Link>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-[#043873] text-2xl focus:outline-none">
              {isOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="md:hidden bg-white px-4 pb-4 space-y-4 shadow-lg">
            <Link to="/" onClick={toggleMenu} className="block text-[#22479b] hover:text-black">Home</Link>
            <Link to="/#about" onClick={toggleMenu} className="block text-[#22479b] hover:text-black">About</Link>
            <Link to="/#contact" onClick={toggleMenu} className="block text-[#22479b] hover:text-black">Contact</Link>
            <div className="flex flex-col space-y-2 pt-2">
              <Link to="/register" onClick={toggleMenu} className="bg-[#4F9CF9] hover:bg-[#3b8be0] text-white px-6 py-2 rounded text-center">
                Signup
              </Link>
              <Link to="/login" onClick={toggleMenu} className="bg-[#4F9CF9] hover:bg-[#3b8be0] text-white px-6 py-2 rounded text-center">
                Login
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
