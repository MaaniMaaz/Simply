// src/components/Shared/Navbar.jsx
import React, { useState } from 'react';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="w-full bg-[#FDF8F6] py-4">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <nav className="bg-white rounded-full px-6 py-4 shadow-sm relative">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              <button onClick={() => navigate('/')}><img src={logo} alt="Simply Logo" className="h-6" /></button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden flex items-center"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 text-sm">What We Offer</a>
              <a href="#usecase" className="text-gray-600 hover:text-gray-900 text-sm">Use Case</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 text-sm">Pricing</a>
              <a href="#faq" className="text-gray-600 hover:text-gray-900 text-sm">FAQ's</a>
            </div>

            {/* Desktop Sign In Button */}
            <div className="hidden md:block">
              <button 
                onClick={() => navigate('/login')} 
                className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-800"
              >
                Sign In
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-white mt-4 rounded-2xl shadow-lg py-4 px-6 z-50">
              <div className="flex flex-col space-y-4">
                <a href="#features" className="text-gray-600 hover:text-gray-900 text-sm py-2">What We Offer</a>
                <a href="#usecase" className="text-gray-600 hover:text-gray-900 text-sm py-2">Use Case</a>
                <a href="#pricing" className="text-gray-600 hover:text-gray-900 text-sm py-2">Pricing</a>
                <a href="#faq" className="text-gray-600 hover:text-gray-900 text-sm py-2">FAQ's</a>
                <button 
                  onClick={() => navigate('/login')} 
                  className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-800 w-full"
                >
                  Sign In
                </button>
              </div>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;