import axios from 'axios';

const API = axios.create({
    baseURL: process.env.NODE_ENV === 'development' 
        ? 'http://localhost:5000/api' 
        : 'https://simply-backend-yl91.onrender.com/api',
    headers: {
        'Content-Type': 'application/json',
    },
});


// Add a request interceptor to add auth token to requests
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default API;