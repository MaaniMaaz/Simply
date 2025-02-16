// src/api/seo.js
import API from './config';

export const seoService = {
    getKeywordSuggestions: async (contentDescription, language, model = 'gpt') => {
        try {
            const response = await API.get('/seo/keywords', {
                params: {
                    contentDescription,
                    language: JSON.stringify(language),
                    model: model.toLowerCase() // Ensure lowercase
                }
            });
            console.log('Sending keyword request with model:', model); // Debug log
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    generateContent: async (data) => {
        try {
            // Destructure and ensure model is included
            const { 
                rankFor, 
                selectedKeywords, 
                focusIdeas, 
                wordCount, 
                language,
                model = 'gpt'  // Default to GPT if not specified
            } = data;
            
            console.log('Sending content generation request with model:', model); // Debug log
            
            const response = await API.post('/seo/generate', {
                rankFor,
                selectedKeywords,
                focusIdeas,
                wordCount,
                language,
                model: model.toLowerCase() // Ensure lowercase
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },



    regenerateContent: async (data) => {
        try {
            const response = await API.post('/seo/regenerate', data);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }

};