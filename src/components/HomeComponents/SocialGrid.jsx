import React from 'react';
import e1 from '../../assets/e1.png';
import e2 from '../../assets/e2.png';
import e3 from '../../assets/e3.png';
import e4 from '../../assets/e4.png';

const SocialGrid = () => {
  return (
    <section className="bg-black -py-0 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        {/* Grid of Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-32 md:mb-0">
        {/* Column 1 */}
      <div className="w-72 hidden md:block md:w-120">  {/* w-96 is 24rem */}
        <img src={e1} alt="Social Posts Column 1" className="w-72 rounded-2xl shadow-lg" />
      </div>
          
          {/* Column 2 */}
          <div className="w-full mt-16 md:mt-0">
            <img src={e2} alt="Social Posts Column 2" className="w-full rounded-2xl shadow-lg" />
          </div>
          
          {/* Column 3 */}
          <div className="w-full">
            <img src={e3} alt="Social Posts Column 3" className="w-full rounded-2xl shadow-lg" />
          </div>
          
          {/* Column 4 */}
          <div className="w-full -mt-36 md:-mt-0">
            <img src={e4} alt="Social Posts Column 4" className="w-full rounded-2xl shadow-lg" />
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-[#FF5341] rounded-2xl p-4  md:p-8 absolute left-4 right-4 -bottom-6 md:bottom-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center md:space-y-0">
            <div className="w-full md:w-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Faster outputs.
                <br />
                Better outcomes.
              </h2>
              <div className="block md:hidden">
                <p className="text-white opacity-90 text-sm mb-6">
                  Come see why leading businesses chose Simply
                  <br />
                  for better results using artificial intelligence.
                </p>
              </div>
            </div>
            
            <div className="w-full md:w-auto flex flex-col md:flex-row items-start md:items-center">
              {/* Desktop paragraph */}
              <div className="hidden md:block md:relative md:left-80 md:bottom-9">
                <p className="text-white opacity-90">
                  Come see why leading businesses chose Simply
                  <br />
                  for better results using artificial intelligence.
                </p>
              </div>
              
              {/* Buttons container */}
              <div className="w-full md:w-auto md:relative md:-bottom-9 md:-left-5">
                <div className="flex flex-col md:flex-row gap-4 w-full">
                  <button className="w-full md:w-auto bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-opacity-90">
                    Start Free Trial
                  </button>
                  <button className="w-full md:w-auto border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:bg-opacity-10">
                    Get A Demo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialGrid;