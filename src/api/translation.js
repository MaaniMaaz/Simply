// src/api/translation.js
import API from './config';

export const translationService = {
    translate: async (data) => {
        try {
            const response = await API.post('/translation/translate', data);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getHistory: async () => {
        try {
            const response = await API.get('/translation/history');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};