import API from './config';

export const subscriptionService = {
    getStatus: async () => {
        try {
            const response = await API.get('/subscriptions/status');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getPlans: async () => {
        try {
            const response = await API.get('/subscriptions/plans');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    upgradePlan: async (planId) => {
        try {
            const response = await API.post('/subscriptions/upgrade', { plan_id: planId });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    cancelPlan: async () => {
        try {
            const response = await API.post('/subscriptions/cancel');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};