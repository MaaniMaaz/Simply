// src/api/homepageService.js
import API from './config';

// src/api/homepageService.js
export const homepageService = {
    getContent: async () => {
        try {
            // Remove the admin prefix from the URL for public access
            const response = await API.get('/homepage');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Admin methods remain the same with admin prefix
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