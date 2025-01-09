//src/pages/Main/Admin.jsx
import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminSidebar from '../../components/Shared/AdminSidebar';

// Import admin pages
import Users from '../AdminPages/Users';
import Templates from '../AdminPages/Templates';
import CustomTemplate from '../AdminPages/CustomTemplate';
import Subscription from '../AdminPages/Subscription';
import Analytics from '../AdminPages/Analytics';
import Frontend from '../AdminPages/Frontend';
import Support from '../AdminPages/Support';
import Notifications from '../AdminPages/Notifications';

const Admin = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

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
      <div className={`flex-1 ${isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64'} transition-all duration-300`}>
        <Routes>
          {/* Redirect /admin to /admin/users */}
          <Route path="/" element={<Navigate to="/admin/users" replace />} />
          
          {/* Admin routes */}
          <Route path="/users" element={<Users />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/custom-template" element={<CustomTemplate />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/frontend" element={<Frontend />} />
          <Route path="/support" element={<Support />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;