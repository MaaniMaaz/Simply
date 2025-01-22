// src/api/config.js
import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add a request interceptor
API.interceptors.request.use(
    (config) => {
        // Check for admin token first
        const adminToken = localStorage.getItem('admin_token');
        if (adminToken) {
            config.headers.Authorization = `Bearer ${adminToken}`;
            return config;
        }

        // If no admin token, check for user token
        const userToken = localStorage.getItem('token');
        if (userToken) {
            config.headers.Authorization = `Bearer ${userToken}`;
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
            // Clear tokens on unauthorized
            localStorage.removeItem('admin_token');
            localStorage.removeItem('admin');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
        return Promise.reject(error);
    }
);

export default API;