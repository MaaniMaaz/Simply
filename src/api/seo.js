// src/api/seo.js
import API from './config';

export const seoService = {
    getKeywordSuggestions: async (contentDescription, language) => {
        try {
            const response = await API.get('/seo/keywords', {
                params: {
                    contentDescription,
                    language: JSON.stringify(language)
                }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    generateContent: async (data) => {
        try {
            // Ensure wordCount is passed instead of resultLength
            const { rankFor, selectedKeywords, focusIdeas, wordCount, language } = data;
            const response = await API.post('/seo/generate', {
                rankFor,
                selectedKeywords,
                focusIdeas,
                wordCount,
                language
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};