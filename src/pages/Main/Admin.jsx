// In Admin.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../../components/AdminComponents/AdminLayout';

// Import admin pages
import Users from '../AdminPages/Users';
import Templates from '../AdminPages/Templates';
import CustomTemplate from '../AdminPages/CustomTemplate';
import Subscription from '../AdminPages/Subscription';
import Analytics from '../AdminPages/Analytics';
import Frontend from '../AdminPages/Frontend';
// Add this import for Notifications (we'll create this file next)
import Notifications from '../AdminPages/Notifications';

const Help = () => <div>Help Page</div>;

const Admin = () => {
  return (
    <AdminLayout>
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
        <Route path="/notifications" element={<Notifications />} /> {/* Add this new route */}
        <Route path="/help" element={<Help />} />
      </Routes>
    </AdminLayout>
  );
};

export default Admin;