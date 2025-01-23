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
            const url = `/admin/templates${category !== 'All' ? `?category=${category}` : ''}`;
            console.log("Fetching templates from:", url);
            const response = await API.get(url);
            console.log("Template response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Template service error:", error);
            throw error.response?.data || error;
        }
    },
    getAllTemplates: async () => {
        try {
            const response = await API.get('/admin/templates');
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

    deleteCategory: async (category) => {
        try {
            const response = await API.delete(`/admin/templates/categories/${category}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};