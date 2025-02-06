// src/api/homepageService.js
import API from './config';

// src/api/homepageService.js
export const homepageService = {
   getContent: async () => {
        try {
            const [contentResponse, plansResponse] = await Promise.all([
                API.get('/homepage'),
                API.get('/subscriptions/plans') // Get plans data
            ]);
            
            return {
                success: true,
                data: {
                    ...contentResponse.data.data,
                    plans: plansResponse.data.data // Include plans in the response
                }
            };
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Admin methods remain the same with admin prefix
    updateContent: async (content) => {
        try {
            const response = await API.put('/admin/homepage', content);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    updateSection: async (section, content) => {
        try {
            const response = await API.patch(`/admin/homepage/${section}`, content);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};