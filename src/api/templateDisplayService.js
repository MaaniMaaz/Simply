// src/api/templateDisplayService.js
import API from './config';

export const templateDisplayService = {
    getTemplates: async (category = null, search = '') => {
        try {
            const params = new URLSearchParams();
            if (category && category !== 'All') params.append('category', category);
            if (search) params.append('search', search);

            const response = await API.get(`/admin/templates/display/templates?${params}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getCategories: async () => {
        try {
            const response = await API.get('/admin/templates/display/categories');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getAllTemplates: async () => {
        try {
            const response = await API.get('/admin/templates/display/all-templates');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    createCategory: async (categoryName, templateIds) => {
        try {
            const response = await API.post('/admin/templates/display/category', {
                categoryName,
                templateIds
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    updateCategory: async (oldCategory, newCategory) => {
        try {
            const response = await API.put('/admin/templates/display/category', {
                oldCategory,
                newCategory
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};