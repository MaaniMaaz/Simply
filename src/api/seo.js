import API from './config';

export const seoService = {
    getKeywordSuggestions: async (searchTerm, language) => {
        try {
            const response = await API.get(`/seo/keywords?searchTerm=${searchTerm}&language=${JSON.stringify(language)}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    generateContent: async (data) => {
        try {
            const response = await API.post('/seo/generate', data);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};