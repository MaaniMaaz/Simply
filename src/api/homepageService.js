// src/api/homepageService.js
import API from './config';

export const homepageService = {
    getContent: async () => {
        try {
            const response = await API.get('/admin/homepage');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};