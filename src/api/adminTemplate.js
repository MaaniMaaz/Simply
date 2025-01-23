// src/api/adminTemplate.js
import API from './config';

export const adminTemplateService = {
    // Add this new method
    getCategories: async () => {
        try {
            const response = await API.get('/admin/templates/categories');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    createTemplate: async (templateData) => {
        try {
            const response = await API.post('/admin/templates', templateData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getTemplates: async () => {
        try {
            const response = await API.get('/admin/templates');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getTemplateById: async (id) => {
        try {
            const response = await API.get(`/admin/templates/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    updateTemplate: async (id, templateData) => {
        try {
            const response = await API.put(`/admin/templates/${id}`, templateData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    deleteTemplate: async (id) => {
        try {
            const response = await API.delete(`/admin/templates/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};