import React from 'react';
import { 
  Users,
  FileText,
  Layout,
  BarChart2,
  Settings,
  FileEdit,
  MenuIcon,
  HelpCircle
} from 'lucide-react';
import logo from '../../assets/logo.png';
import profile from '../../assets/profile.png';
import { useNavigate } from 'react-router-dom';

const AdminSidebar = ({ isCollapsed, setIsCollapsed }) => {
  const navigate = useNavigate();

  const mainMenuItems = [
    { icon: <Users size={20} />, label: 'Users', link: '/admin/users' },
    { icon: <FileText size={20} />, label: 'Templates', link: '/admin/templates' },
    { icon: <FileEdit size={20} />, label: 'Custom Template', link: '/admin/custom-template' },
    { icon: <Settings size={20} />, label: 'Subscription', link: '/admin/subscription' },
    { icon: <BarChart2 size={20} />, label: 'Analytics', link: '/admin/analytics' },
    { icon: <Layout size={20} />, label: 'Frontend', link: '/admin/frontend' },
  ];

  const otherMenuItems = [
    { icon: <HelpCircle size={20} />, label: 'Help Center', link: '/admin/help' },
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
              className="flex items-center w-full px-3 py-2 text-sm text-gray-800 rounded-lg hover:bg-gray-200"
            >
              {item.icon}
              <span className={`ml-3 ${isCollapsed ? 'hidden' : 'block'}`}>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="my-4 border-t border-[#D3D3D3]" />

      {/* Admin Profile Section */}
      <div className="absolute bottom-0 w-full p-4">
        <button 
          onClick={() => navigate('/admin/profile')}
          className="w-full flex items-center hover:bg-gray-200 p-2 rounded-lg transition-colors"
        >
          <img
            src={profile}
            alt="Admin Avatar"
            className="w-8 h-8 rounded-full"
          />
          <div className={`ml-3 text-left ${isCollapsed ? 'hidden' : 'block'}`}>
            <p className="text-sm font-medium text-gray-700">Admin User</p>
            <p className="text-xs text-gray-500">admin@simply.com</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;