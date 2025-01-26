import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Shared/Navbar';
import Footer from '../../components/Shared/Footer';
import image1 from '../../assets/1.svg';
import image2 from '../../assets/2.svg';
import image3 from '../../assets/3.svg';
import image4 from '../../assets/4.svg';
import image5 from '../../assets/5.svg';
import image6 from '../../assets/i1.png';
import image7 from '../../assets/i2.png';
import image8 from '../../assets/i3.png';
import complianceCheck from '../../assets/h1.svg';
import secureContent from '../../assets/h2.svg';
import PricingSection from '../../components/UserComponents/HomeComponents/PricingSection';
import SocialGrid from '../../components/UserComponents/HomeComponents/SocialGrid';
import { homepageService } from '../../api/homepageService';

const Home = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const response = await homepageService.getContent();
      setContent(response.data);
    } catch (error) {
      console.error('Error fetching homepage content:', error);
      // Use default content on error
      setContent(null);
    } finally {
      setLoading(false);
    }
  };

  const renderHighlightedText = (text) => {
    if (!text) return '';

    // First split by newlines to handle line breaks
    const lines = text.split('\n');
    
    return lines.map((line, lineIndex) => {
      // For each line, handle the highlighting
      const parts = line.split(/\[highlight\](.*?)\[\/highlight\]/g);
      const processedLine = parts.map((part, index) => {
        if (index % 2 === 1) {
          // This is the highlighted part
          return (
            <span key={`highlight-${index}`} className="relative inline-block">
              <span className="relative z-10 text-white px-3 py-0.5">
                {part}
              </span>
              <span 
                className="absolute top-0.5 inset-0 bg-[#FF5341] transform -rotate-2"
                style={{ borderRadius: '4px' }}
              ></span>
            </span>
          );
        }
        return part;
      });

      // Return each line with a line break
      return (
        <React.Fragment key={`line-${lineIndex}`}>
          {processedLine}
          {lineIndex < lines.length - 1 && <br />}
        </React.Fragment>
      );
    });
  };

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
              {content ? renderHighlightedText(content.hero.title) : 
                "Elevate Your Content Creation With [highlight]AI-Powered[/highlight] Precision"}
            </h1>
          </div>

          {/* Bottom illustrations - Modified for mobile */}
          <div className="flex justify-center">
            <div className="flex items-center">
              <img src={image2} alt="Growth Chart" className="w-32 h-auto md:w-52 md:relative md:left-44 md:-top-8" />
            </div>
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
              {content?.whatWeOffer.title || "Learn what Simply Can do foundation"}
            </h2>
            <div className="max-w-sm">
              <p className="text-white opacity-80 mb-4">
                {content?.whatWeOffer.subtitle || "All the features you need to take a secure, controlled & impactful approach to AI."}
              </p>
              <button
                onClick={() => navigate('/signup')}
                className="bg-[#FF5341] text-white px-6 py-2 rounded-sm flex items-center group hover:bg-opacity-90 border border-white w-full md:w-auto justify-center md:justify-start"
              >
                {content?.whatWeOffer.buttonText || "Learn More"}
                <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="bg-[#FFFAF3] rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
              {(content?.whatWeOffer.cards || []).map((card, index) => (
                <div key={index} className="p-8">
                  <div className="mb-6">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="4" y="4" width="16" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                      <line x1="8" y1="14" x2="16" y2="14" stroke="currentColor" strokeWidth="1.5"/>
                      <line x1="8" y1="18" x2="16" y2="18" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    {card.title}
                    <svg className="w-4 h-4 ml-1 transform -rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M5 19l14-14m0 0h-14m14 0v14" strokeWidth="1.5"/>
                    </svg>
                  </h3>
                  <p className="text-sm text-gray-500">
                    {card.description}
                  </p>
                </div>
              ))}
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
              {content?.useCase.title || "Solutions for All"}
            </h2>
            <div className="max-w-sm">
              <p className="text-gray-600 mb-4">
                {content?.useCase.subtitle || "A library of Solutions for all you needs. Custom Solutions on demand"}
              </p>
              <button 
                onClick={() => navigate('/signup')}
                className="border border-gray-300 px-5 py-2 rounded-sm text-gray-900 hover:bg-gray-50 border border-black w-full md:w-auto"
              >
                {content?.useCase.buttonText || "Explore the Blog"}
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(content?.useCase.cards || []).map((card, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6">
                  <img 
                    src={index === 0 ? image6 : index === 1 ? image7 : image8} 
                    alt={card.title} 
                    className="w-full h-48 object-cover rounded-lg mb-6" 
                  />
                  <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
                  <p className="text-gray-600 mb-4">
                    {card.description}
                  </p>
                  <button 
                    onClick={() => navigate('/signup')}
                    className="text-gray-900 font-medium flex items-center hover:opacity-80"
                  >
                    {index === 1 ? "Get the Template" : index === 2 ? "Get the eBook" : "Learn More"}
                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M5 19l14-14m0 0h-14m14 0v14" strokeWidth="1.5"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="bg-black py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 md:gap-0 mb-8 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white max-w-sm">
              {content?.stayCompliant.title || "Stay Compliant, Every Time"}
            </h2>
            <p className="text-gray-400 max-w-sm">
              {content?.stayCompliant.subtitle || "Automatically Ensure Every Piece Of AI-Generated Content Adheres to Your Brand Voice And Regulatory Guidelines"}
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(content?.stayCompliant.cards || []).map((card, index) => (
              <div key={index} className="bg-white rounded-3xl p-8">
                <div className="mb-4">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 mb-9">
                    {card.description}
                  </p>
                  <button 
                    onClick={() => navigate('/signup')}
                    className="border border-gray-300 px-5 py-2 rounded-sm text-gray-900 hover:bg-gray-50 border border-black"
                  >
                    {index === 0 ? "Explore Features" : "Get Started"}
                  </button>
                </div>
                <div className="mt-8">
                  <img 
                    src={index === 0 ? complianceCheck : secureContent} 
                    alt={card.title} 
                    className="w-64 h-auto mx-auto" 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PricingSection />

      {/* FAQ Section */}
      <section id="faq" className="bg-white py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Left side - Illustration */}
            <div className="relative order-2 md:order-1 mt-8 md:mt-0">
              <img 
                src={image4} 
                alt="FAQ Illustration" 
                className="w-full max-w-[500px] mx-auto md:mx-0"
              />
            </div>

            {/* Right side - FAQs */}
            <div className="order-1 md:order-2">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
                {content?.faq.title || "Frequently Asked Questions"}
              </h2>
              
              <div className="space-y-2">
                {(content?.faq.questions || []).map((faq, index) => (
                  <div 
                    key={index} 
                    className="border-b border-gray-200 last:border-b-0"
                  >
                    <button
                      className="flex justify-between items-start w-full text-left py-4 hover:text-gray-600"
                      onClick={() => {
                        const newOpenIndex = openIndex === index ? null : index;
                        setOpenIndex(newOpenIndex);
                      }}
                    >
                      <span className="font-medium pr-8 text-sm md:text-base">{faq.question}</span>
                      <span className="text-xl md:text-2xl flex-shrink-0">
                        {openIndex === index ? '-' : '+'}
                      </span>
                    </button>
                    {openIndex === index && (
                      <div className="pb-4 text-gray-600 text-sm md:text-base">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <SocialGrid />
      <Footer />
    </div>
  );
};

export default Home;