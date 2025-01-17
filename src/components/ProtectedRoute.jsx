// src/components/ProtectedRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';
import { authService } from '../api/auth';

const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const isAuthenticated = authService.isAuthenticated();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;