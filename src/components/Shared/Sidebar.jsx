import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Bot, 
  Wrench, 
  FileCheck2, 
  FileText, 
  Languages,
  HelpCircle,
  MenuIcon
} from 'lucide-react';
import logo from '../../assets/logo.png';
import profile from '../../assets/profile.png';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const mainMenuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', link: '/dashboard' },
    { icon: <Bot size={20} />, label: 'AI Writer', link: '/ai-writer' },
    { icon: <Wrench size={20} />, label: 'SEO Writer', link: '/seo-writer' },
    { icon: <FileCheck2 size={20} />, label: 'Compliance AI', link: '/compliance' },
    { icon: <FileText size={20} />, label: 'Doc Management', link: '/documents' },
    { icon: <Languages size={20} />, label: 'Translation', link: '/translation' },
  ];

  const otherMenuItems = [
    { icon: <HelpCircle size={20} />, label: 'Help Center', link: '/help' },
  ];

  return (
    <div className={`h-screen bg-[#FFFAF3] border-r border-[#D3D3D3] transition-all duration-300 ${
      isCollapsed ? 'w-20' : 'w-64'
    }`}>
      {/* Header with Logo and Toggle */}
      <div className="flex items-center justify-between px-4 py-5">
        <img src={logo} alt="Simply Logo" className={`h-6 ${isCollapsed ? 'hidden' : 'block'}`} />
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)} 
          className="p-1.5 rounded-lg hover:bg-gray-100"
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
            <a
              key={index}
              href={item.link}
              className={`flex items-center px-3 py-2 text-sm rounded-lg ${
                index === 0 
                  ? 'bg-[#FF5341] text-white hover:bg-[#FF5341]/90' 
                  : 'text-gray-800 hover:bg-gray-200'
              }`}
            >
              {item.icon}
              <span className={`ml-3 ${isCollapsed ? 'hidden' : 'block'}`}>{item.label}</span>
            </a>
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
            <a
              key={index}
              href={item.link}
              className="flex items-center px-3 py-2 text-sm text-gray-800 rounded-lg hover:bg-gray-100"
            >
              {item.icon}
              <span className={`ml-3 ${isCollapsed ? 'hidden' : 'block'}`}>{item.label}</span>
            </a>
          ))}
        </nav>
      </div>

      <div className="my-4 border-t border-[#D3D3D3]" />

      {/* User Profile Section */}
      <div className="absolute bottom-0 w-full p-4">
        <div className="flex items-center">
          <img
            src={profile}
            alt="User Avatar"
            className="w-8 h-8 rounded-full"
          />
          <div className={`ml-3 ${isCollapsed ? 'hidden' : 'block'}`}>
            <p className="text-sm font-medium text-gray-700">Zay Yang</p>
            <p className="text-xs text-gray-500">zay.yang@email.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;