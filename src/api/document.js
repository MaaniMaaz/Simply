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

   // src/api/document.js - Update the downloadDocument function
    downloadDocument: async (documentId) => {
        try {
            const response = await API.get(`/documents/${documentId}/download`, {
                responseType: 'blob'  // Important for file download
            });
        
        // Create blob link to download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'document.txt'); // You can set a custom filename here
        
        // Append to html page
        document.body.appendChild(link);
        
        // Start download
        link.click();
        
        // Clean up and remove the link
        link.parentNode.removeChild(link);
        return { success: true };
     } catch (error) {
        throw error.response?.data || error.message;
     }
    }
};