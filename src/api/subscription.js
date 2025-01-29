import API from './config';


const dummyTransactions = [
    {
        plan: "Enterprise Plan",
        amount: "$490.00",
        date: "2024-01-30",
        status: "completed"
    },
    {
        plan: "Enterprise Plan",
        amount: "$490.00",
        date: "2023-12-30",
        status: "completed"
    },
    {
        plan: "Professional Plan",
        amount: "$39.00",
        date: "2023-11-30",
        status: "completed"
    },
    {
        plan: "Professional Plan",
        amount: "$39.00",
        date: "2023-10-30",
        status: "completed"
    },
    {
        plan: "Professional Plan",
        amount: "$39.00",
        date: "2023-09-30",
        status: "completed"
    }
];

export const subscriptionService = {
    getStatus: async () => {
        try {
            const response = await API.get('/subscriptions/status');
            return {
                success: true,  // Ensure this matches expected structure
                data: {
                    current_plan: response.data.data?.current_plan || null,
                    stats: response.data.data?.stats || {
                        total_words_generated: 0,
                        credits_left: 0,
                        total_documents_saved: 0
                    },
                    billing_history: dummyTransactions  // Add dummy transactions
                }
            };
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