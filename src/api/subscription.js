import API from './config';

export const subscriptionService = {
    getStatus: async () => {
        try {
            const response = await API.get('/subscriptions/status');
            return {
                success: true,
                data: {
                    current_plan: response.data.data?.current_plan || null,
                    stats: response.data.data?.stats || {
                        total_words_generated: 0,
                        credits_left: 0,
                        total_documents_saved: 0
                    },
                    billing_history: response.data.data?.billing_history || []
                }
            };
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getPlans: async () => {
        try {
            const response = await API.get('/subscriptions/plans');
            console.log('Plans response:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching plans:', error);
            throw error.response?.data || error;
        }
    },

    upgradePlan: async (planId, paymentMethodId) => {
        try {
            console.log('Upgrade plan request:', { planId, paymentMethodId });
            const response = await API.post('/subscriptions/upgrade', {
                plan_id: planId,
                payment_method_id: paymentMethodId
            });
            console.log('Upgrade plan response:', response.data);
            return response;
        } catch (error) {
            console.error('Upgrade plan error:', error.response?.data || error);
            throw error.response?.data || error;
        }
    },
    
      cancelSubscription: async () => {
        try {
          const response = await API.post('/subscriptions/cancel');
          return response.data;
        } catch (error) {
          console.error('Cancel subscription error:', error);
          throw error.response?.data || error.message;
        }
      },

    getSubscriptionDetails: async () => {
        try {
            const response = await API.get('/subscriptions/details');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    updatePaymentMethod: async (paymentMethodId) => {
        try {
            const response = await API.post('/subscriptions/update-payment', {
                payment_method_id: paymentMethodId
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};