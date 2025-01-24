// src/api/config.js
import axios from 'axios';
const API = axios.create({
    baseURL: 'https://simply-backend-yl91.onrender.com/api',
    headers: {
        'Content-Type': 'application/json'
    }
});
// Add a request interceptor
API.interceptors.request.use(
    (config) => {
        // Check if it's an admin route
        if (config.url.startsWith('/admin')) {
            const adminToken = localStorage.getItem('admin_token');
            if (adminToken) {
                config.headers.Authorization = `Bearer ${adminToken}`;
            }
        } else {
            // For non-admin routes, use user token
            const userToken = localStorage.getItem('token');
            if (userToken) {
                config.headers.Authorization = `Bearer ${userToken}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
// Add a response interceptor to handle errors
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Check which type of token to remove based on the request URL
            if (error.config.url.startsWith('/admin')) {
                localStorage.removeItem('admin_token');
                localStorage.removeItem('admin');
            } else {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
        }
        return Promise.reject(error);
    }
);
export default API;