// src/api/compliance.js
import API from './config';

export const complianceService = {
    getUserDocuments: async () => {
        try {
            const response = await API.get('/compliance/documents');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    analyzeContent: async (data) => {
        try {
            const response = await API.post('/compliance/analyze', data);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    fixContent: async (data) => {
        try {
            const response = await API.post('/compliance/fix', data); 
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};