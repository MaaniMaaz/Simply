import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';

const PricingSection = ({ plans = [] }) => {
  const navigate = useNavigate();

  return (
    <section id="pricing" className="bg-[#FFFAF3] py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-left mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8">
            Choose the{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-white px-3 py-0.5">
                right plan
              </span>
              <span 
                className="absolute inset-0 bg-[#FF5341] transform -rotate-2"
                style={{ borderRadius: '4px' }}
              ></span>
            </span>
            {' '}for you
          </h2>
        </div>

        {/* Pricing Cards Grid */}
        <div className={`grid grid-cols-1 ${
          plans.length === 2 ? 'md:grid-cols-2' : 
          plans.length === 3 ? 'md:grid-cols-3' : 
          plans.length >= 4 ? 'md:grid-cols-4' : ''
        } gap-6`}>
          {plans.map((plan, index) => (
            <div 
              key={plan._id || index}
              className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-black"
            >
              <h3 className="text-lg font-medium mb-2">{plan.name}</h3>
              <div className="text-4xl font-bold mb-8">${plan.price} / Month</div>
              
              <button 
                onClick={() => navigate('/signup')}
                className="w-full bg-[#FF5341] text-white py-3 rounded-lg mb-8 hover:bg-opacity-90"
              >
                {plan.price === 49 ? 'Contact Sales' : 'Select Plan'}
              </button>
              
              <div className="space-y-6">
                <div className="text-gray-600">Everything in {plan.name}</div>
                
                <div className="space-y-4">
                  <div>
                    <div className="font-medium mb-2">Content Creation</div>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Check className="w-5 h-5 text-emerald-500 mr-3" />
                        <span className="text-gray-600">{plan.credits_per_month.toLocaleString()} Credits</span>
                      </div>
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center">
                          <Check className="w-5 h-5 text-emerald-500 mr-3" />
                          <span className="text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;