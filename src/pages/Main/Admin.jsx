// src/pages/Main/Admin.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../../components/AdminComponents/AdminLayout';
import AdminProtectedRoute from '../../components/AdminComponents/AdminProtectedRoute';

// Import admin pages
import Users from '../AdminPages/Users';
import Templates from '../AdminPages/Templates';
import CustomTemplate from '../AdminPages/CustomTemplate';
import Subscription from '../AdminPages/Subscription';
import Analytics from '../AdminPages/Analytics';
import Frontend from '../AdminPages/Frontend';
import Notifications from '../AdminPages/Notifications';
import AdminSupport from '../AdminPages/Support';

const Admin = () => {
  return (
    <AdminProtectedRoute>
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
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/support" element={<AdminSupport />} />
        </Routes>
      </AdminLayout>
    </AdminProtectedRoute>
  );
};

export default Admin;