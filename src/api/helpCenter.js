// src/api/helpCenter.js
import API from './config';

export const helpCenterService = {
    // Get help center content (public)
    getContent: async () => {
        try {
            const response = await API.get('/help-center');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Admin methods
    initializeContent: async () => {
        try {
            const response = await API.post('/admin/help-center/initialize');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    updateCard: async (cardId, cardData) => {
        try {
            const response = await API.put(`/admin/help-center/cards/${cardId}`, cardData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    updatePage: async (cardId, pageId, pageData) => {
        try {
            const response = await API.put(
                `/admin/help-center/cards/${cardId}/pages/${pageId}`,
                pageData
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    addPage: async (cardId, pageData) => {
        try {
            const response = await API.post(
                `/admin/help-center/cards/${cardId}/pages`,
                pageData
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    deletePage: async (cardId, pageId) => {
        try {
            const response = await API.delete(
                `/admin/help-center/cards/${cardId}/pages/${pageId}`
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};