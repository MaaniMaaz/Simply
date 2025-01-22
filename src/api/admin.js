// src/api/admin.js
import API from './config';

// Update Config.js axios interceptor to handle admin token
const updateAxiosConfig = () => {
    const token = localStorage.getItem('admin_token');
    if (token) {
        API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
};

export const adminService = {
    login: async (credentials) => {
        try {
            // Clear any existing tokens
            localStorage.removeItem('admin_token');
            localStorage.removeItem('admin');
            
            const response = await API.post('/admin/login', credentials);
            
            if (response.data.success) {
                localStorage.setItem('admin_token', response.data.data.token);
                localStorage.setItem('admin', JSON.stringify(response.data.data.admin));
                updateAxiosConfig();  // Update axios config with new token
            }
            return response.data;
        } catch (error) {
            console.error('Admin login error:', error.response?.data || error);
            throw error.response?.data || error;
        }
    },

    logout: async () => {
        try {
            await API.post('/admin/logout');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('admin_token');
            localStorage.removeItem('admin');
            delete API.defaults.headers.common['Authorization'];
        }
    },

    isAdminAuthenticated: () => {
        const token = localStorage.getItem('admin_token');
        const admin = localStorage.getItem('admin');
        return !!(token && admin);
    },

    getAdmin: () => {
        const admin = localStorage.getItem('admin');
        return admin ? JSON.parse(admin) : null;
    }
};