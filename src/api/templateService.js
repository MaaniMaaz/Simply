// src/api/templateService.js
import API from './config';

export const templateService = {
    getCategories: async () => {
        try {
            const response = await API.get('/admin/templates/categories');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getTemplates: async (category = 'All') => {
        try {
            const url = category === 'All' 
                ? '/admin/templates/all'
                : `/admin/templates/all?category=${encodeURIComponent(category)}`;
            const response = await API.get(url);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    updateCategory: async (oldCategory, newCategory) => {
        try {
            const response = await API.put('/admin/templates/categories', {
                oldCategory,
                newCategory
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    getTemplatesWithCategories: async () => {
        try {
            const response = await API.get('/admin/templates/grouped');
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },
    updateTemplate: async (templateId, templateData) => {
        try {
            const response = await API.put(`/admin/templates/${templateId}`, templateData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};