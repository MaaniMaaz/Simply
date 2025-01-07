import React, { useState, useEffect } from 'react';
import AdminSidebar from '../Shared/AdminSidebar';
import { Bell, MenuIcon } from 'lucide-react';

const AdminLayout = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

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
        <AdminSidebar 
          isCollapsed={isSidebarCollapsed} 
          setIsCollapsed={setIsSidebarCollapsed} 
        />
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

        {/* Mobile Sidebar Overlay */}
        {!isSidebarCollapsed && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" 
            onClick={() => setIsSidebarCollapsed(true)}
          >
            <div 
              className="fixed inset-y-0 left-0 w-64 bg-white" 
              onClick={e => e.stopPropagation()}
            >
              <AdminSidebar 
                isCollapsed={false} 
                setIsCollapsed={setIsSidebarCollapsed} 
              />
            </div>
          </div>
        )}

        {/* Page Content */}
        <div className="px-4 sm:px-6 py-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;