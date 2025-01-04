// src/pages/Home.jsx
import React from 'react';
import Navbar from '../components/Shared/Navbar';
import Footer from '../components/Shared/Footer';
import image1 from '../assets/1.svg';
import image2 from '../assets/2.svg';
import image3 from '../assets/3.svg';
import image4 from '../assets/4.svg';
import image5 from '../assets/5.svg';
import image6 from '../assets/i1.png';
import image7 from '../assets/i2.png';
import image8 from '../assets/i3.png';
import complianceCheck from '../assets/h1.svg';  // Add your actual SVG filename
import secureContent from '../assets/h2.svg';  
import PricingSection from '../components/HomeComponents/PricingSection';
import FAQSection from '../components/HomeComponents/FAQSection';
import SocialGrid from '../components/HomeComponents/SocialGrid';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFAF3]">
      <Navbar />
      
     {/* Hero Section */}
     <main className="flex-grow mt-16 md:mt-32 pb-12 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Left floating illustrations - Hidden on mobile */}
          <div className="hidden md:block absolute left-4 top-4">
            <img src={image4} alt="Floating Person" className="w-48 h-auto mb-4" />
          </div>
          <img src={image5} alt="Floating Person" className="hidden md:block absolute left-56 top-32 w-60 h-auto" />

          {/* Right floating illustration - Hidden on mobile */}
          <div className="hidden md:block absolute right-20 -top-16">
            <img src={image3} alt="Person with Trophy" className="w-52 h-auto" />
          </div>

         {/* Main Content */}
         <div className="text-center relative z-10 mb-8 md:mb-16">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight px-4 md:px-0">
              Elevate Your Content Creation
              <br />
              With{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-white px-3 py-0.5">
                  AI-Powered
                </span>
                <span 
                  className="absolute top-0.5 inset-0 bg-[#FF5341] transform -rotate-2"
                  style={{ borderRadius: '4px' }}
                ></span>
              </span>
              {' '}Precision
            </h1>
          </div>

          {/* Bottom illustrations - Modified for mobile */}
          <div className="flex justify-center">
    {/* Growth chart */}
    <div className="flex items-center">
      <img src={image2} alt="Growth Chart" className="w-32 h-auto md:w-52 md:relative md:left-44 md:-top-8" />
    </div>

    {/* AI brain */}
    <div className="flex items-center">
      <img src={image1} alt="AI Brain" className="w-40 h-auto md:w-64 md:relative md:left-72 md:-top-6" />
    </div>
  </div>
        </div>
      </main>

      {/* Black Features Section */}
      <section id="features" className="bg-black py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 md:gap-0 mb-8 md:mb-16">
            <h2 className="text-white text-3xl md:text-4xl font-bold max-w-md">
              Learn what Simply Can do foundation
            </h2>
            <div className="max-w-sm">
              <p className="text-white opacity-80 mb-4">
                All the features you need to take a secure, controlled & impactful approach to AI.
              </p>
              <button className="bg-[#FF5341] text-white px-6 py-2 rounded-sm flex items-center group hover:bg-opacity-90 border border-white w-full md:w-auto justify-center md:justify-start">
                Learn More
                <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="bg-[#FFFAF3] rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
              {/* Card 1 */}
              <div className="p-6 md:p-8">
              <div className="p-8">
                <div className="mb-6">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="4" y="4" width="16" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                    <line x1="8" y1="14" x2="16" y2="14" stroke="currentColor" strokeWidth="1.5"/>
                    <line x1="8" y1="18" x2="16" y2="18" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  Work with the latest Content Writing
                  <svg className="w-4 h-4 ml-1 transform -rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M5 19l14-14m0 0h-14m14 0v14" strokeWidth="1.5"/>
                  </svg>
                </h3>
                <p className="text-sm text-gray-500">
                  Content Writing with latest Models with Simply's multi-model AI Engine
                </p>
              </div>
              </div>

              {/* Card 2 */}
              <div className="p-6 md:p-8">
              <div className="p-8">
                <div className="mb-6">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="4" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M8 16h8" stroke="currentColor" strokeWidth="1.5"/>
                    <circle cx="18" cy="8" r="2" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  Text and images, all in one place
                  <svg className="w-4 h-4 ml-1 transform -rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M5 19l14-14m0 0h-14m14 0v14" strokeWidth="1.5"/>
                  </svg>
                </h3>
                <p className="text-sm text-gray-500">
                  Creativity requires text & strategy – Simply's has all
                </p>
              </div>
              </div>

              {/* Card 3 */}
              <div className="p-6 md:p-8">
              <div className="p-8">
                <div className="mb-6">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="5" y="11" width="14" height="8" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M8 11V7a4 4 0 118 0v4" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  Security & privacy of the highest degree
                  <svg className="w-4 h-4 ml-1 transform -rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M5 19l14-14m0 0h-14m14 0v14" strokeWidth="1.5"/>
                  </svg>
                </h3>
                <p className="text-sm text-gray-500">
                  We don't allow models to train on your data – period
                </p>
              </div>
              </div>

              {/* Card 4 */}
              <div className="p-6 md:p-8">
              <div className="p-8">
                <div className="mb-6">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 3L4 10h5v7l9-7h-5V3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  Dedicated Simply resources
                  <svg className="w-4 h-4 ml-1 transform -rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M5 19l14-14m0 0h-14m14 0v14" strokeWidth="1.5"/>
                  </svg>
                </h3>
                <p className="text-sm text-gray-500">
                  You get access to a team of AI experts who have your back
                </p>
              </div>
            </div>
            </div>

          </div>
        </div>
      </section>

       {/* Solutions Section */}
       <section id="usecase" className="bg-white py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 md:gap-0 mb-8 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Solutions for All
            </h2>
            <div className="max-w-sm">
              <p className="text-gray-600 mb-4">
                A library of Solutions for all you needs. Custom Solutions on demand
              </p>
              <button className="border border-gray-300 px-5 py-2 rounded-sm text-gray-900 hover:bg-gray-50 border border-black w-full md:w-auto">
                Explore the Blog
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6">
                <img src={image6} alt="Product Marketing" className="w-full h-48 object-cover rounded-lg mb-6" />
                <h3 className="text-xl font-semibold mb-3">Solution for Product Marketers</h3>
                <p className="text-gray-600 mb-4">
                  Uplevel product launches, messaging and enablement, all while empowering your team to achieve 10x results
                </p>
                <button className="text-gray-900 font-medium flex items-center hover:opacity-80">
                  Learn More
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M5 19l14-14m0 0h-14m14 0v14" strokeWidth="1.5"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6">
                <img src={image7} alt="Product Marketing" className="w-full h-48 object-cover rounded-lg mb-6" />
                <h3 className="text-xl font-semibold mb-3">Solution for Product Marketers</h3>
                <p className="text-gray-600 mb-4">
                  Uplevel product launches, messaging and enablement, all while empowering your team to achieve 10x results
                </p>
                <button className="text-gray-900 font-medium flex items-center hover:opacity-80">
                  Get the Template
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M5 19l14-14m0 0h-14m14 0v14" strokeWidth="1.5"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6">
                <img src={image8} alt="AI Pilot" className="w-full h-48 object-cover rounded-lg mb-6" />
                <h3 className="text-xl font-semibold mb-3">How to Pilot AI at your company</h3>
                <p className="text-gray-600 mb-9">
                  Generative AI content program at your company.
                </p>
                <button className="text-gray-900 font-medium flex items-center hover:opacity-80">
                  Get the eBook
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M5 19l14-14m0 0h-14m14 0v14" strokeWidth="1.5"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

    {/* Compliance Section */}
    <section className="bg-black py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 md:gap-0 mb-8 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white max-w-sm">
              Stay Compliant,
              <br />
              Every Time
            </h2>
            <p className="text-gray-400 max-w-sm">
              Automatically Ensure Every Piece Of AI-Generated Content Adheres to Your Brand Voice And Regulatory Guidelines
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-3xl p-8">
              <div className="mb-4">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  Automated Compliance Checks
                </h3>
                <p className="text-gray-600 mb-9">
                  Validate content against uploaded brand guidelines and compliance policies.
                </p>
                <button className="border border-gray-300 px-5 py-2 rounded-sm text-gray-900 hover:bg-gray-50 border border-black">
                  Explore Features
                </button>
              </div>
              <div className="mt-8">
                <img src={complianceCheck} alt="Compliance Check Illustration" className="w-64 h-auto mx-auto" />
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-3xl p-8">
              <div className="mb-4">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  Secure Your Content
                </h3>
                <p className="text-gray-600 mb-4 ">
                  Ensure sensitive or restricted terms are flagged before publishing. Maintain compliance with industry-specific policies (e.g., legal, finance).
                </p>
                <button className="border border-gray-300 px-5 py-2 rounded-sm text-gray-900 hover:bg-gray-50 border border-black">
                  Get Started
                </button>
              </div>
              <div className="mt-8">
                <img src={secureContent} alt="Secure Content Illustration" className="w-64 h-auto mx-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <PricingSection />
         {/* FAQ Section */}
         <FAQSection />
         <SocialGrid />
      <Footer />
    </div>
  );
};

export default Home;