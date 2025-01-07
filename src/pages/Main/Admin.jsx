import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../../components/AdminComponents/AdminLayout';

// Import admin pages
import Users from '../AdminPages/Users';
import Templates from '../AdminPages/Templates';
import CustomTemplate from '../AdminPages/CustomTemplate';

// Placeholder components for other admin pages
const Subscription = () => <div>Subscription Page</div>;
const Analytics = () => <div>Analytics Page</div>;
const Frontend = () => <div>Frontend Page</div>;
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
        <Route path="/help" element={<Help />} />
      </Routes>
    </AdminLayout>
  );
};

export default Admin;