import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Bot, 
  Wrench, 
  FileCheck2, 
  FileText, 
  Languages,
  HelpCircle,
  MenuIcon,
  MessageSquare
} from 'lucide-react';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../api/auth';
import { userService } from '../../api/user';

const defaultProfileImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23CBD5E0'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E";

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    image: null
  });

  const getProfileImageUrl = (imagePath) => {
    if (!imagePath) return defaultProfileImage;
    return `http://localhost:5000/${imagePath}`;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // First try to get from local storage
        const localUser = authService.getUser();
        if (localUser) {
          setUserData({
            name: localUser.name,
            email: localUser.email,
            image: localUser.profile_image ? getProfileImageUrl(localUser.profile_image) : defaultProfileImage
          });
        }

        // Then fetch latest data from API
        const response = await userService.getProfile();
        const user = response.data.user;
        setUserData({
          name: user.name,
          email: user.email,
          image: user.profile_image ? getProfileImageUrl(user.profile_image) : defaultProfileImage
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const mainMenuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', link: '/dashboard' },
    { icon: <Bot size={20} />, label: 'AI Writer', link: '/ai-writer' },
    { icon: <Wrench size={20} />, label: 'SEO Writer', link: '/seo-writer' },
    { icon: <FileCheck2 size={20} />, label: 'Compliance AI', link: '/compliance' },
    { icon: <FileText size={20} />, label: 'Doc Management', link: '/documents' },
    { icon: <Languages size={20} />, label: 'Translation', link: '/translation' },
  ];

  const otherMenuItems = [
    { icon: <MessageSquare size={20} />, label: 'Support', link: '/support' },
    { icon: <HelpCircle size={20} />, label: 'Help Center', link: '/help' },
  ];

  return (
    <div className={`h-screen bg-[#FFFAF3] border-r border-[#D3D3D3] transition-all duration-300 ${
      isCollapsed ? 'w-20' : 'w-64'
    }`}>
      <div className="flex items-center justify-between px-4 py-5">
        <button onClick={() => navigate('/')}>
          <img src={logo} alt="Simply Logo" className={`h-6 ${isCollapsed ? 'hidden' : 'block'}`} />
        </button>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)} 
          className="p-1.5 mr-2 rounded-lg hover:bg-gray-100"
        >
          <MenuIcon size={20} className="text-gray-600" />
        </button>
      </div>

      {/* Main Menu Section */}
      <div className="px-4 py-2">
        <p className={`text-xs font-medium text-gray-500 mb-4 ${isCollapsed ? 'hidden' : 'block'}`}>
          Main Menu
        </p>
        <nav className="space-y-1">
          {mainMenuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.link)}
              className={`flex items-center w-full px-3 py-2 text-sm rounded-lg ${
                window.location.pathname === item.link 
                  ? 'bg-[#FF5341] text-white hover:bg-[#FF5341]/90' 
                  : 'text-gray-800 hover:bg-gray-200'
              }`}
            >
              {item.icon}
              <span className={`ml-3 ${isCollapsed ? 'hidden' : 'block'}`}>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Divider */}
      <div className="my-4 border-t border-[#D3D3D3]" />

      {/* Other Section */}
      <div className="px-4 py-2">
        <p className={`text-xs font-medium text-gray-500 mb-4 ${isCollapsed ? 'hidden' : 'block'}`}>
          Other
        </p>
        <nav className="space-y-1">
          {otherMenuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.link)}
              className={`flex items-center w-full px-3 py-2 text-sm rounded-lg ${
                window.location.pathname === item.link 
                  ? 'bg-[#FF5341] text-white hover:bg-[#FF5341]/90' 
                  : 'text-gray-800 hover:bg-gray-200'
              }`}
            >
              {item.icon}
              <span className={`ml-3 ${isCollapsed ? 'hidden' : 'block'}`}>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

     {/* User Profile Section */}
  <div className="absolute bottom-0 w-full p-4">
    <button 
      onClick={() => navigate('/profile')}
      className="w-full flex items-center hover:bg-gray-200 p-2 rounded-lg transition-colors"
    >
      <img
        src={userData.image}
        alt="User Avatar"
        className="w-8 h-8 rounded-full bg-gray-100"
      />
      <div className={`ml-3 text-left ${isCollapsed ? 'hidden' : 'block'}`}>
        <p className="text-sm font-medium text-gray-700">{userData.name}</p>
        <p className="text-xs text-gray-500">{userData.email}</p>
      </div>
    </button>
  </div>
</div>
);
};

export default Sidebar;