// src/pages/UserPages/Notifications.jsx
import React, { useState, useEffect } from 'react';
import { 
  Bell,
  Calendar,
  Clock,
  MenuIcon
} from 'lucide-react';
import Sidebar from '../../components/Shared/Sidebar';

const NotificationCard = ({ notification }) => (
  <div className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md transition-all">
    <div className="flex items-start space-x-4">
      <div className="bg-[#FF5341] bg-opacity-10 p-2 rounded-lg">
        <Bell className="w-5 h-5 text-[#FF5341]" />
      </div>
      <div className="flex-1">
        <p className="text-gray-800">{notification.message}</p>
        <div className="flex items-center space-x-4 mt-2">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-1" />
            {notification.date}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-1" />
            {notification.time}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Notifications = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Dummy notifications - will be replaced with actual data from backend
  const [notifications] = useState([
    {
      id: 1,
      message: 'Welcome to our new Notification System! Stay tuned for important updates.',
      date: '24 Jan 2025',
      time: '10:30 AM',
    },
    {
      id: 2,
      message: 'Weve released new AI templates! Check them out in the AI Writer section.',
      date: '23 Jan 2025',
      time: '3:45 PM',
    }
  ]);

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
              <div className="flex items-center space-x-2">
                <Bell className="w-6 h-6 text-[#FF5341]" />
                <span className="text-sm font-medium text-gray-600">Notifications</span>
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Notifications</h1>
            <p className="text-gray-600">Stay updated with the latest announcements and features</p>
          </div>

          {/* Notifications List */}
          <div className="space-y-4">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <NotificationCard key={notification.id} notification={notification} />
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications yet</h3>
                <p className="text-gray-600">
                  Check back later for updates and announcements
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;