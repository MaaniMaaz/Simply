import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Shared/Sidebar';
import { Search, Bell, ArrowRight } from 'lucide-react';

const TemplateCard = ({ title, description }) => {
  const navigate = useNavigate();

  const handleTemplateClick = () => {
    const templateUrl = title.toLowerCase().replace(/\s+/g, '-');
    navigate(`/ai-writer/template/${templateUrl}`);
  };

  return (
    <div 
      className="bg-[#FF5341] rounded-xl p-4 text-white cursor-pointer hover:bg-[#FF5341]/90 transition-colors"
      onClick={handleTemplateClick}
    >
      <div className="flex justify-between items-center mb-3 pb-3 border-b border-white/20">
        <h3 className="text-base md:text-lg font-medium">{title}</h3>
        <button className="text-white">
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
      <p className="text-xs md:text-sm text-white/90">{description}</p>
    </div>
  );
};

// Template data with categories
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

const AIWriter = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTemplates, setFilteredTemplates] = useState(templateData);
  const navigate = useNavigate();
  
  const categories = ['All', 'Email', 'Website', 'Blog', 'Article', 'Ecommerce', 'Video', 'Ads'];

  // Handle window resize for sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarCollapsed(false);
      } else {
        setIsSidebarCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    <div className="flex min-h-screen">
      {/* Fixed Sidebar */}
      <div className="fixed left-0 h-screen">
        <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
      </div>

      {/* Main Content with dynamic margin based on sidebar state */}
      <div className={`flex-1 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'} transition-all duration-300`}>
        {/* Navbar */}
        <div className="sticky top-0 w-full bg-[#FDF8F6] py-4 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex justify-between items-center">
              <div className="relative w-full md:w-96">
                <input
                  type="text"
                  placeholder="Search Template"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#FF5341]"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
              <div className="relative">
                              <button 
                              onClick={() => navigate('/notifications')}
                              className="hover:bg-gray-100 p-2 rounded-lg transition-colors"
                              >
                              <Bell className="w-6 h-6 text-gray-600" />
                              <span className="absolute top-1 right-2 w-2 h-2 bg-[#FF5341] rounded-full"></span>
                              </button>
                              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">Templates</h2>
          
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-6 md:mb-8 overflow-x-auto pb-2">
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
      </div>
    </div>
  );
};

export default AIWriter;