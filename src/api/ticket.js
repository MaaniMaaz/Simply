// src/api/ticket.js
import API from './config';

export const ticketService = {
    // Create a new ticket
    createTicket: async (subject, message) => {
        try {
            const response = await API.post('/tickets', { subject, message });
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Get user's tickets
    getUserTickets: async () => {
        try {
            const response = await API.get('/tickets/my-tickets');
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Send message in ticket
    sendMessage: async (ticketId, message) => {
        try {
            const response = await API.post(`/tickets/${ticketId}/messages`, { message });
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Mark ticket messages as read
    markAsRead: async (ticketId) => {
        try {
            const response = await API.put(`/tickets/${ticketId}/read`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    }
};