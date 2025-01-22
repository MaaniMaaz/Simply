// src/api/adminAnalytics.js
import API from './config';

export const adminAnalyticsService = {
    // Get main analytics dashboard data
    getDashboardAnalytics: async () => {
        try {
            const response = await API.get('/admin/analytics/dashboard');
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Get general analytics data
    getAnalytics: async () => {
        try {
            const response = await API.get('/admin/analytics');
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Get revenue growth data
    getRevenueGrowth: async (range) => {
        try {
            const response = await API.get('/admin/analytics/revenue-growth', {
                params: { range }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    }
};