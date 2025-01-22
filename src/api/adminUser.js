// src/api/adminUser.js
import API from './config';

export const adminUserService = {
    getAllUsers: async (search = '', status = '', subscription = '', page = 1, limit = 10) => {
        try {
            const params = new URLSearchParams({
                ...(search && { search }),
                ...(status && { status }),
                ...(subscription && { subscription }),
                page,
                limit
            });

            const response = await API.get(`/admin/users?${params}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    getUserDetails: async (userId) => {
        try {
            const response = await API.get(`/admin/users/${userId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    createUser: async (userData) => {
        try {
            const response = await API.post('/admin/users', userData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    updateUser: async (userId, userData) => {
        try {
            const response = await API.put(`/admin/users/${userId}`, userData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    deleteUser: async (userId) => {
        try {
            const response = await API.delete(`/admin/users/${userId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Added new method for fetching plans
    getAllPlans: async () => {
        try {
            const response = await API.get('/admin/plans');
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    }
};