// src/components/AdminComponents/AdminProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { adminService } from '../../api/admin';

const AdminProtectedRoute = ({ children }) => {
    const location = useLocation();
    const isAdminAuthenticated = adminService.isAdminAuthenticated();

    if (!isAdminAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default AdminProtectedRoute;