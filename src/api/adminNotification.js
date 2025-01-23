// src/api/adminNotification.js
import API from './config';

export const adminNotificationService = {
    // Get all notification templates
    getTemplates: async () => {
        try {
            const response = await API.get('/admin/notifications/templates');
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Update notification template
    updateTemplate: async (templateData) => {
        try {
            const response = await API.put('/admin/notifications/templates', templateData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    }
};