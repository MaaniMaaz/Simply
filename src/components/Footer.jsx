import React from 'react';
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Logo */}
          <div className="flex items-center">
            <img src={logo} alt="Simply Logo" className="h-6" />
          </div>

          {/* Footer Links */}
          <div className="flex items-center flex-wrap justify-center md:justify-end space-x-4 md:space-x-8">
            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm py-1">Privacy</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm py-1">Terms</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm py-1">Support</a>
            <span className="text-gray-600 text-sm py-1">© 2024 Simply</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;