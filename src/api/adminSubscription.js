// src/api/adminSubscription.js
import API from './config';

export const adminSubscriptionService = {
    getDashboardStats: async () => {
        try {
            const response = await API.get('/admin/dashboard-stats');
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    getAllPlans: async () => {
        try {
            const response = await API.get('/admin/plans');
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    getPlanDetails: async (planId) => {
        try {
            const response = await API.get(`/admin/plans/${planId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    updatePlan: async (planId, planData) => {
        try {
            const response = await API.put(`/admin/plans/${planId}`, planData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    createPlan: async (planData) => {
        try {
            const response = await API.post('/admin/plans', planData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    }
};