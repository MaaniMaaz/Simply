// src/api/document.js
import API from './config';

export const documentService = {
    saveDocument: async (documentData) => {
        try {
            // Parse the HTML content and save it properly
            const response = await API.post('/documents', {
                ...documentData,
                content: documentData.content,
                contentType: 'html'
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    updateDocument: async (documentId, content) => {
        try {
            const response = await API.put(`/documents/${documentId}`, { content });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getDocuments: async (type) => {
        try {
            const response = await API.get('/documents', {
                params: { type }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    uploadDocument: async (file) => {
        try {
            const formData = new FormData();
            formData.append('document', file);

            const response = await API.post('/documents/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    deleteDocument: async (documentId) => {
        try {
            const response = await API.delete(`/documents/${documentId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

   downloadDocument: async (documentId) => {
        try {
            const token = localStorage.getItem('token'); // Ensure token is included
            
            if (!token) {
                throw new Error('User is not authenticated');
            }

            const response = await API.get(`/documents/${documentId}/download`, {
                responseType: 'blob',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Authorization': `Bearer ${token}`
                }
            });

           

            // Extract filename from headers
            let filename = 'document.txt'; // Default filename
            if (response.headers['content-disposition']) {
                const contentDisposition = response.headers['content-disposition'];
                const filenameMatch = contentDisposition.match(/filename="(.+?)"/);
                if (filenameMatch && filenameMatch[1]) {
                    filename = decodeURIComponent(filenameMatch[1]);
                }
            }

            console.log("✅ Extracted Filename:", filename);

            // Create download link
            const url = window.URL.createObjectURL(response.data);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            return { success: true };
        } catch (error) {
            console.error('Download error:', error.message || error);
            throw error;
        }
    }
};