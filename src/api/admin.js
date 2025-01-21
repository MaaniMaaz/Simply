// src/api/admin.js
import API from './config';

export const adminService = {
    login: async (credentials) => {
        try {
            const response = await API.post('/admin/login', credentials);
            if (response.data.success) {
                localStorage.setItem('admin_token', response.data.data.token);
                localStorage.setItem('admin', JSON.stringify(response.data.data.admin));
            }
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    logout: async () => {
        try {
            await API.post('/admin/logout');
            localStorage.removeItem('admin_token');
            localStorage.removeItem('admin');
        } catch (error) {
            console.error('Logout error:', error);
            localStorage.removeItem('admin_token');
            localStorage.removeItem('admin');
        }
    },

    isAdminAuthenticated: () => {
        return !!localStorage.getItem('admin_token');
    },

    getAdmin: () => {
        const admin = localStorage.getItem('admin');
        return admin ? JSON.parse(admin) : null;
    }
};