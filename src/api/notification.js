// src/api/notification.js
import API from './config';

export const notificationService = {
    // Get all notifications
    getNotifications: async () => {
        try {
            const response = await API.get('/notifications');
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Mark notification as read
    markAsRead: async (notificationId) => {
        try {
            const response = await API.put(`/notifications/${notificationId}/read`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    }
};