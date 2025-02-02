// src/api/adminAnalytics.js
import API from './config';

export const adminAnalyticsService = {
    getDashboardAnalytics: async () => {
        try {
            const response = await API.get('/admin/analytics/dashboard');
            return response.data;
        } catch (error) {
            console.error('Dashboard analytics error:', error);
            return {
                revenue: 0,
                revenueGrowth: 0,
                users: 0,
                userGrowth: 0,
                contentGenerated: 0,
                contentGrowth: 0,
                aiUsage: 0,
                aiGrowth: 0
            };
        }
    },

    getContentStats: async () => {
        try {
            const response = await API.get('/admin/analytics/content');
            return response.data;
        } catch (error) {
            console.error('Content stats error:', error);
            return { data: [] };
        }
    },

    getTemplateStats: async () => {
        try {
            const response = await API.get('/admin/analytics/templates');
            return response.data;
        } catch (error) {
            console.error('Template stats error:', error);
            return { data: [] };
        }
    },

    getUserActivity: async () => {
        try {
            const response = await API.get('/admin/analytics/user-activity');
            return response.data;
        } catch (error) {
            console.error('User activity error:', error);
            return { 
                data: [
                    { name: 'Active', value: 0 },
                    { name: 'Inactive', value: 0 }
                ]
            };
        }
    },

    getRevenueGrowth: async () => {
        try {
            const response = await API.get('/admin/analytics/revenue-growth');
            return response.data;
        } catch (error) {
            console.error('Revenue growth error:', error);
            return { data: [] };
        }
    }
};