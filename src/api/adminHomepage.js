// src/api/adminHomepage.js
import API from './config';

export const adminHomepageService = {
    getContent: async () => {
        try {
            const response = await API.get('/admin/homepage');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    updateContent: async (content) => {
        try {
            const response = await API.put('/admin/homepage', content);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    updateSection: async (section, content) => {
        try {
            const response = await API.patch(`/admin/homepage/${section}`, content);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

