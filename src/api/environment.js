// src/config/environment.js
export const API_URL = 'https://simply-backend-yl91.onrender.com/api';

// Then update config.js to use this:
import { API_URL } from '../config/environment';

const API = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});