import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';

const PricingSection = () => {
 
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

          {/* Plan Toggle */}
          <div className="">
            
           
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Starter Plan */}
          <div className="bg-white rounded-3xl p-8 border border-black">
            <h3 className="text-lg font-medium mb-2">Starter Plan</h3>
            <div className="text-4xl font-bold mb-8">Free</div>
            <button 
            onClick={() => navigate('/signup')}
            className="w-full border border-black text-gray-900 py-3 rounded-lg mb-8 hover:bg-gray-50">
              Get Started
            </button>
            
            <div className="space-y-4">
              <div className="font-medium">Features</div>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-emerald-500 mr-3" />
                  <span className="text-gray-600">5,000 Credits</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-emerald-500 mr-3" />
                  <span className="text-gray-600">Up to 3 Collaborative Content Projects</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-emerald-500 mr-3" />
                  <span className="text-gray-600">Basic SEO Optimization</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-emerald-500 mr-3" />
                  <span className="text-gray-600">Save & Organize Documents</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-emerald-500 mr-3" />
                  <span className="text-gray-600">Standard Compliance Checks</span>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Plan */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-black">
            <h3 className="text-lg font-medium mb-2">Professional Plan</h3>
            <div className="text-4xl font-bold mb-8">$19 / Month</div>
            <button 
            onClick={() => navigate('/signup')}
            className="w-full bg-[#FF5341] text-white py-3 rounded-lg mb-8 hover:bg-opacity-90">
              Select Plan
            </button>
            
            <div className="space-y-6">
              <div className="text-gray-600">Everything in Professional Plus</div>
              
              <div className="space-y-4">
                <div>
                  <div className="font-medium mb-2">Content Creation</div>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-emerald-500 mr-3" />
                      <span className="text-gray-600">25,000 Credits</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-emerald-500 mr-3" />
                      <span className="text-gray-600">Custom Template & Editor</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-emerald-500 mr-3" />
                      <span className="text-gray-600">Keyword Optimisation for SEO</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="font-medium mb-2">Collaboration</div>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-emerald-500 mr-3" />
                      <span className="text-gray-600">Team Collaboration tools</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-emerald-500 mr-3" />
                      <span className="text-gray-600">Real-Time Document Editing</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="font-medium mb-2">Admin</div>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-emerald-500 mr-3" />
                      <span className="text-gray-600">Version History</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-emerald-500 mr-3" />
                      <span className="text-gray-600">Shared & Private Content Libraries</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-black">
            <h3 className="text-lg font-medium mb-2">Enterprise Plan</h3>
            <div className="text-4xl font-bold mb-8">$49 / Month</div>
            <button 
            onClick={() => navigate('/signup')}
            className="w-full bg-[#FF5341] text-white py-3 rounded-lg mb-8 hover:bg-opacity-90">
              Contact Sales
            </button>
            
            <div className="space-y-6">
              <div className="text-gray-600">Everything in Professional Plus</div>
              
              <div className="space-y-4">
                <div>
                  <div className="font-medium mb-2">Content Management</div>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-emerald-500 mr-3" />
                      <span className="text-gray-600">50,000 Credits</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-emerald-500 mr-3" />
                      <span className="text-gray-600">Multilingual Content Translation</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-emerald-500 mr-3" />
                      <span className="text-gray-600">Keyword Optimisation for SEO</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="font-medium mb-2">Advanced Features</div>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-emerald-500 mr-3" />
                      <span className="text-gray-600">Automated Brand Voice Validation</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-emerald-500 mr-3" />
                      <span className="text-gray-600">Integrated With Third-Party Tools</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="font-medium mb-2">Admin</div>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-emerald-500 mr-3" />
                      <span className="text-gray-600">Dedicated Account Manager</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-emerald-500 mr-3" />
                      <span className="text-gray-600">Analytics & Reporting Dashboard</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-emerald-500 mr-3" />
                      <span className="text-gray-600">Advanced User Permissions</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;