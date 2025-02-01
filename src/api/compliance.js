import API from './config';

export const complianceService = {
    getUserDocuments: async () => {
        try {
            const response = await API.get('/compliance/documents');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    analyzeContent: async ({ content, document_id, analysis_type }) => {
        if (!content || !document_id || !analysis_type) {
            throw new Error('Missing required fields for analysis');
        }

        try {
            const response = await API.post('/compliance/analyze', {
                content,
                document_id,
                analysis_type
            });
            return response.data;
        } catch (error) {
            if (error.response?.data) {
                throw error.response.data;
            }
            throw new Error(error.message || 'Error analyzing content');
        }
    },


    fixContent: async (data) => {
        if (!data.compliance_id) {
            throw new Error('Compliance ID is required');
        }

        try {
            const response = await API.post('/compliance/fix', {
                compliance_id: data.compliance_id
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};