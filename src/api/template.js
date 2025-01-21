// src/api/template.js
import API from './config';

export const templateService = {
    createTemplate: async (templateData) => {
        try {
            const response = await API.post('/templates', templateData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getTemplates: async (type = 'all') => {
        try {
            const response = await API.get(`/templates?type=${type}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getTemplateById: async (id) => {
        try {
            const response = await API.get(`/templates/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    updateTemplate: async (id, templateData) => {
        try {
            const response = await API.put(`/templates/${id}`, templateData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    deleteTemplate: async (id) => {
        try {
            const response = await API.delete(`/templates/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    toggleFavorite: async (templateId) => {
        try {
            const response = await API.post(`/templates/${templateId}/favorite`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getFavorites: async () => {
        try {
            const response = await API.get('/templates/user/favorites');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }

};