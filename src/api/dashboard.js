// src/api/dashboard.js
import API from './config';

export const dashboardService = {
    getStats: async () => {
        try {
            const response = await API.get('/dashboard/stats');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getWordStats: async () => {
        try {
            const response = await API.get('/dashboard/word-stats');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getRecentDocuments: async () => {
        try {
            const response = await API.get('/dashboard/recent-documents');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getFavoriteTemplates: async () => {
        try {
            const response = await API.get('/dashboard/favorite-templates');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getDocumentHistory: async () => {
        try {
            const response = await API.get('/dashboard/document-history');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

export default dashboardService;