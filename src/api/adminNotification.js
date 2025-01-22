// src/api/adminNotification.js
import API from './config';

export const adminNotificationService = {
    // Send notification to all users
    sendNotification: async (message) => {
        try {
            const response = await API.post('/admin/notifications/send', { message });
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    }
};