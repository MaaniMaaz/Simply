// src/pages/UserPages/HelpCenter.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Shared/Sidebar';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, 
  MenuIcon, 
  Search,
  BookOpen,
  FileText,
  Code,
  Users,
  ChevronRight,
  PlayCircle,
  Bot,
  Lightbulb,
  ArrowRight,
  X
} from 'lucide-react';
import { helpCenterService } from '../../api/helpCenter';

// Quick start guide data (static as per requirements)
const quickStartGuides = [
  { icon: PlayCircle, title: 'Getting Started with Simply' },
  { icon: Bot, title: 'AI Writing Guide' },
  { icon: Lightbulb, title: 'Best Practices & Tips' }
];

const iconComponents = {
  BookOpen,
  FileText,
  Code,
  Users
};

const QuickStartCard = ({ icon: Icon, title }) => (
  <div className="bg-white rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer group">
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="bg-[#FF5341] bg-opacity-10 p-3 rounded-lg group-hover:bg-[#FF5341] group-hover:bg-opacity-100 transition-colors">
          <Icon className="w-6 h-6 text-[#FF5341] group-hover:text-white" />
        </div>
        <h3 className="ml-4 font-medium group-hover:text-[#FF5341]">{title}</h3>
      </div>
      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#FF5341] transform group-hover:translate-x-1 transition-transform" />
    </div>
  </div>
);

const HelpCard = ({ icon, title, description, pages, onPageClick }) => {
  const Icon = iconComponents[icon];
  
  return (
    <div className="bg-white rounded-xl p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start">
        <div className="bg-[#FF5341] bg-opacity-10 p-3 rounded-lg">
          <Icon className="w-6 h-6 text-[#FF5341]" />
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 text-sm mb-4">{description}</p>
          <div className="space-y-2">
            {pages.map((page, index) => (
              <button
                key={index}
                onClick={() => onPageClick(page)}
                className="flex items-center text-gray-600 hover:text-[#FF5341] text-sm group w-full text-left"
              >
                <ChevronRight className="w-4 h-4 mr-1 text-gray-400 group-hover:text-[#FF5341]" />
                {page.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const PageModal = ({ page, isOpen, onClose }) => {
  if (!isOpen || !page) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center overflow-y-auto py-8">
      <div className="bg-white rounded-xl w-full max-w-3xl mx-4 my-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-semibold">{page.title}</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          <div className="prose max-w-none">
            {page.description.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const HelpCenter = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPage, setSelectedPage] = useState(null);
  const navigate = useNavigate();

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

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const response = await helpCenterService.getContent();
      setContent(response.data);
    } catch (error) {
      setError('Error loading help center content');
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter help cards based on search query
  const filteredCards = content?.cards.filter(card => {
    const search = searchQuery.toLowerCase();
    if (!search) return true;

    return (
      card.title.toLowerCase().includes(search) ||
      card.description.toLowerCase().includes(search) ||
      card.pages.some(page => 
        page.title.toLowerCase().includes(search) ||
        page.description.toLowerCase().includes(search)
      )
    );
  });

  // Filter quick start guides based on search
  const filteredQuickStartGuides = quickStartGuides.filter(guide => {
    const search = searchQuery.toLowerCase();
    if (!search) return true;
    return guide.title.toLowerCase().includes(search);
  });

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Hidden on mobile */}
      <div className="hidden md:block md:fixed md:left-0 md:h-screen z-50">
        <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
      </div>

      {/* Main Content */}
      <div className={`flex-1 w-full ${isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64'} transition-all duration-300`}>
        {/* Navbar */}
        <div className="sticky top-0 w-full bg-[#FDF8F6] py-4 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex justify-between items-center">
              <button 
                className="md:hidden flex items-center p-2 rounded-lg hover:bg-gray-100"
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              >
                <MenuIcon className="h-6 w-6" />
              </button>
              <div className="relative ml-auto">
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

        {/* Mobile Sidebar */}
        {!isSidebarCollapsed && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setIsSidebarCollapsed(true)}>
            <div className="fixed inset-y-0 left-0 w-64 bg-white" onClick={e => e.stopPropagation()}>
              <Sidebar isCollapsed={false} setIsCollapsed={setIsSidebarCollapsed} />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          {/* Header & Search */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">How can we help you?</h1>
            <p className="text-gray-600 mb-4">
              Search our knowledge base or browse all help topics below
            </p>
            <div className="max-w-2xl mx-auto relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search help articles..."
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5341] focus:border-transparent"
              />
              <Search className="w-6 h-6 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="w-8 h-8 border-4 border-[#FF5341] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500">{error}</p>
              <button
                onClick={fetchContent}
                className="mt-4 px-4 py-2 bg-[#FF5341] text-white rounded-lg hover:bg-[#FF5341]/90"
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              {/* Quick Start Guides */}
              {(filteredQuickStartGuides.length > 0 || !searchQuery) && (
                <div className="mb-12">
                  <h2 className="text-xl font-semibold mb-6 ml-6">Quick Start Guides</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {filteredQuickStartGuides.map((guide, index) => (
                      <QuickStartCard 
                        key={index}
                        icon={guide.icon} 
                        title={guide.title} 
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Help Categories */}
              {(filteredCards?.length > 0 || !searchQuery) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredCards?.map((card) => (
                    <HelpCard
                      key={card._id}
                      icon={card.icon}
                      title={card.title}
                      description={card.description}
                      pages={card.pages}
                      onPageClick={(page) => setSelectedPage(page)}
                    />
                  ))}
                </div>
              )}

              {/* No Results Message */}
              {searchQuery && (!filteredCards?.length && !filteredQuickStartGuides.length) && (
                <div className="text-center py-12">
                  <FileQuestion className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No results found</h3>
                  <p className="text-gray-600">
                    Try adjusting your search. We suggest checking spelling or using more general terms.
                  </p>
                </div>
              )}
            </>
          )}

          {/* Live Support Banner */}
          <div className="mt-12 bg-black rounded-xl p-8 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Can't find what you're looking for?</h2>
                <p className="text-gray-300 mb-6 md:mb-0">
                  Our support team is here to help you with any questions or concerns
                </p>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => navigate('/support')}
                  className="bg-[#FF5341] px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors"
                >
                  Contact Support
                </button>
                <button
                  onClick={() => navigate('/support')}
                  className="bg-white text-black px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors"
                >
                  Live Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Page Content Modal */}
      <PageModal
        page={selectedPage}
        isOpen={!!selectedPage}
        onClose={() => setSelectedPage(null)}
      />
    </div>
  );
};

export default HelpCenter;