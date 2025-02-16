// src/api/template.js
import API from './config';

export const templateService = {


    getCategories: async () => {
        try {
            const response = await API.get('/templates/categories');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },


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
    },

    runTemplate: async (templateId, data) => {
        try {
            // Log the data being sent to verify the model parameter
            console.log('Running template with data:', data);

            const response = await API.post(`/templates/${templateId}/run`, {
                fields: data.fields,
                wordCount: data.wordCount,
                language: data.language,
                model: data.model // Ensure model is included in the request
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    
    getTemplateFields: async (templateId) => {
        try {
            const response = await this.getTemplateById(templateId);
            return response.data.fields || [];
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    regenerateTemplate: async (templateId, data) => {
        try {
            const response = await API.post(`/templates/${templateId}/regenerate`, data);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};