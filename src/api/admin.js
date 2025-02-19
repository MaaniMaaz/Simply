// src/api/admin.js
import API from './config';

// Update Config.js axios interceptor to handle admin token
const updateAxiosConfig = () => {
    const token = localStorage.getItem('admin_token');
    if (token) {
        API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
};

export const adminService = {
    login: async (credentials) => {
        try {
            // Clear any existing tokens
            localStorage.removeItem('admin_token');
            localStorage.removeItem('admin');
            
            const response = await API.post('/admin/login', credentials);
            
            if (response.data.success) {
                localStorage.setItem('admin_token', response.data.data.token);
                localStorage.setItem('admin', JSON.stringify(response.data.data.admin));
                updateAxiosConfig();  // Update axios config with new token
            }
            return response.data;
        } catch (error) {
            console.error('Admin login error:', error.response?.data || error);
            throw error.response?.data || error;
        }
    },


        logout: async () => {
            try {
                await API.post('/admin/logout');
                
                // Clear admin tokens and user data from local storage
                localStorage.removeItem('admin_token');
                localStorage.removeItem('admin');
                
                // Remove authorization header
                delete API.defaults.headers.common['Authorization'];

                return { success: true };
            } catch (error) {
                console.error('Logout error:', error);
                throw error.response?.data || error.message;
            }
        },

    isAdminAuthenticated: () => {
        const token = localStorage.getItem('admin_token');
        const admin = localStorage.getItem('admin');
        return !!(token && admin);
    },

    getAdmin: () => {
        const admin = localStorage.getItem('admin');
        return admin ? JSON.parse(admin) : null;
    }

};

adminService.getAllTickets = async () => {
    try {
        const response = await API.get('/admin/tickets');
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

adminService.sendTicketMessage = async (ticketId, message) => {
    try {
        const response = await API.post(`/admin/tickets/${ticketId}/messages`, { message });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

adminService.updateTicketStatus = async (ticketId, status) => {
    try {
        const response = await API.put(`/admin/tickets/${ticketId}/status`, { status });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

adminService.markTicketAsRead = async (ticketId) => {
    try {
        const response = await API.put(`/admin/tickets/${ticketId}/read`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

