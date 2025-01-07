import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

// Template data with categories (same as AIWriter)
const templateData = [
  { 
    title: 'Content Writing', 
    description: 'Generate Compelling And Innovative Content Tailored To Your Needs With AI',
    categories: ['All', 'Blog', 'Article']
  },
  { 
    title: 'LinkedIn Post', 
    description: 'Generate Compelling And Innovative Content Tailored To Your Needs With AI',
    categories: ['All', 'Blog', 'Website']
  },
  { 
    title: 'Web Developer', 
    description: 'Generate Compelling And Innovative Content Tailored To Your Needs With AI',
    categories: ['All', 'Website']
  },
  { 
    title: 'Blog Writing', 
    description: 'Generate Compelling And Innovative Content Tailored To Your Needs With AI',
    categories: ['All', 'Blog', 'Article']
  },
  { 
    title: 'Market Writing', 
    description: 'Generate Compelling And Innovative Content Tailored To Your Needs With AI',
    categories: ['All', 'Article', 'Ecommerce']
  },
  { 
    title: 'Insta Post', 
    description: 'Generate Compelling And Innovative Content Tailored To Your Needs With AI',
    categories: ['All', 'Blog', 'Website']
  },
  { 
    title: 'Email Template', 
    description: 'Generate Compelling And Innovative Content Tailored To Your Needs With AI',
    categories: ['All', 'Email']
  },
  { 
    title: 'Copy Writing', 
    description: 'Generate Compelling And Innovative Content Tailored To Your Needs With AI',
    categories: ['All', 'Article']
  },
  { 
    title: 'Video Script', 
    description: 'Generate Compelling And Innovative Content Tailored To Your Needs With AI',
    categories: ['All', 'Video']
  },
  {
    title: 'Ad Copy', 
    description: 'Generate Compelling And Innovative Content Tailored To Your Needs With AI',
    categories: ['All', 'Ads']
  }
];

const TemplateCard = ({ title, description }) => (
  <div className="bg-[#FF5341] rounded-xl p-4 text-white cursor-default">
    <div className="mb-3 pb-3 border-b border-white/20">
      <h3 className="text-base md:text-lg font-medium">{title}</h3>
    </div>
    <p className="text-xs md:text-sm text-white/90">{description}</p>
  </div>
);

const Templates = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTemplates, setFilteredTemplates] = useState(templateData);
  
  const categories = ['All', 'Email', 'Website', 'Blog', 'Article', 'Ecommerce', 'Video', 'Ads'];

  // Filter templates based on search query and selected category
  useEffect(() => {
    const filtered = templateData.filter(template => {
      const matchesSearch = 
        template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = 
        selectedCategory === 'All' || 
        template.categories.includes(selectedCategory);

      return matchesSearch && matchesCategory;
    });

    setFilteredTemplates(filtered);
  }, [searchQuery, selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl md:text-2xl font-semibold mb-2">Templates</h2>
        <p className="text-gray-600">View and manage all templates</p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#FF5341]"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-[#FF5341] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredTemplates.length > 0 ? (
          filteredTemplates.map((template, index) => (
            <TemplateCard 
              key={index} 
              title={template.title} 
              description={template.description} 
            />
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500">
            No templates found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
};

export default Templates;