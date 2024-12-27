// src/pages/HelpCenter.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Shared/Sidebar';
import { 
  Bell, 
  MenuIcon, 
  Search,
  BookOpen,
  Code,
  FileText,
  Settings,
  Users,
  MessageSquare,
  ChevronRight,
  PlayCircle,
  FileQuestion,
  Bot,
  Lightbulb,
  ArrowRight
} from 'lucide-react';

const HelpCard = ({ icon: Icon, title, description, items }) => (
  <div className="bg-white rounded-xl p-6 hover:shadow-md transition-shadow">
    <div className="flex items-start">
      <div className="bg-[#FF5341] bg-opacity-10 p-3 rounded-lg">
        <Icon className="w-6 h-6 text-[#FF5341]" />
      </div>
      <div className="ml-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <div className="space-y-2">
          {items.map((item, index) => (
            <a
              key={index}
              href="#"
              className="flex items-center text-gray-600 hover:text-[#FF5341] text-sm group"
            >
              <ChevronRight className="w-4 h-4 mr-1 text-gray-400 group-hover:text-[#FF5341]" />
              {item}
            </a>
          ))}
        </div>
      </div>
    </div>
  </div>
);

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

const HelpCenter = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-[#FF5341] rounded-full"></span>
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
            <p className="text-gray-600 mb-8">
              Search our knowledge base or browse all help topics below
            </p>
            <div className="max-w-2xl mx-auto relative">
              <input
                type="text"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF5341] focus:border-transparent"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Quick Start Guides */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-6">Quick Start Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <QuickStartCard 
                icon={PlayCircle} 
                title="Getting Started with Simply" 
              />
              <QuickStartCard 
                icon={Bot} 
                title="AI Writing Guide" 
              />
              <QuickStartCard 
                icon={Lightbulb} 
                title="Best Practices & Tips" 
              />
            </div>
          </div>

          {/* Help Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <HelpCard
              icon={BookOpen}
              title="Getting Started"
              description="Learn the basics and get up and running with Simply"
              items={[
                "Account Setup Guide",
                "Creating Your First Content",
                "Understanding Credits System",
                "Workspace Configuration"
              ]}
            />
            <HelpCard
              icon={FileText}
              title="Content Creation"
              description="Master content creation with our AI tools"
              items={[
                "Using AI Writer Templates",
                "SEO Optimization Tips",
                "Content Style Guidelines",
                "Editing and Formatting"
              ]}
            />
            <HelpCard
              icon={Code}
              title="Technical Guides"
              description="Technical documentation and API integration help"
              items={[
                "API Documentation",
                "Integration Guides",
                "Webhook Setup",
                "Developer Resources"
              ]}
            />
            <HelpCard
              icon={Users}
              title="Team Collaboration"
              description="Learn how to work effectively with your team"
              items={[
                "Team Roles & Permissions",
                "Sharing & Collaboration",
                "Project Management",
                "Team Analytics"
              ]}
            />
            <HelpCard
              icon={Settings}
              title="Account & Billing"
              description="Manage your account and subscription"
              items={[
                "Subscription Plans",
                "Payment Methods",
                "Credits Management",
                "Account Security"
              ]}
            />
            <HelpCard
              icon={MessageSquare}
              title="Support & Community"
              description="Get help from our team and community"
              items={[
                "Contact Support",
                "Community Forums",
                "Feature Requests",
                "FAQs"
              ]}
            />
          </div>

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
                <button className="bg-[#FF5341] px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors">
                  Contact Support
                </button>
                <button className="bg-white text-black px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors">
                  Live Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;