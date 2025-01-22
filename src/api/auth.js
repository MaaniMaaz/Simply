// src/api/auth.js
import API from './config';
export const authService = {
    login: async (credentials) => {
        try {
            // Clear any existing tokens before login
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('admin_token');
            localStorage.removeItem('admin');
            const response = await API.post('/users/login', credentials);
            if (response.data.success) {
                // Only set user tokens, never admin tokens
                localStorage.setItem('token', response.data.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.data.user));
            }
            return response.data;
        } catch (error) {
            // Clear any tokens on error
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            throw error.response?.data || error.message;
        }
    },
    register: async (userData) => {
        try {
            // Clear any existing tokens before registration
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('admin_token');
            localStorage.removeItem('admin');
            const response = await API.post('/users/register', userData);
            if (response.data.success) {
                // Only set user tokens
                localStorage.setItem('token', response.data.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.data.user));
            }
            return response.data;
        } catch (error) {
            // Clear any tokens on error
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            throw error.response?.data || error.message;
        }
    },
    logout: async () => {
        try {
            // Try to call logout API
            await API.post('/users/logout');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Always clear user tokens on logout, regardless of API success
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    },
    isAuthenticated: () => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        return !!(token && user); // Ensure both token and user exist
    },
    getUser: () => {
        try {
            const user = localStorage.getItem('user');
            return user ? JSON.parse(user) : null;
        } catch (error) {
            console.error('Error parsing user data:', error);
            localStorage.removeItem('user'); // Clear invalid user data
            return null;
        }
    }
};