import API, {getFullURL} from './config';

const profileUpdateListeners = new Set();


export const userService = {

    getProfileImageUrl: (imagePath) => {
        if (!imagePath) {
            return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23CBD5E0'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E";
        }
        return getFullURL(imagePath);
    },

    getProfile: async () => {
        try {
            const response = await API.get('/users/me');
            if (response.data.success) {
                localStorage.setItem('user', JSON.stringify(response.data.data.user));
            }
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    updateProfile: async (userData) => {
        try {
            const response = await API.put('/users/update-profile', userData);
            // Update stored user data
            if (response.data.success) {
                localStorage.setItem('user', JSON.stringify(response.data.data.user));
            }
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    updateProfileImage: async (imageFile) => {
        try {
            const formData = new FormData();
            formData.append('profile_image', imageFile);

            const response = await API.put('/users/profile-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            // Notify listeners if update was successful
            if (response.data.success) {
                profileUpdateListeners.forEach(listener => {
                    listener(response.data.data.profile_image);
                });
            }

            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    changePassword: async (passwordData) => {
        try {
            const response = await API.put('/users/change-password', passwordData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    subscribeToProfileUpdates: (callback) => {
        profileUpdateListeners.add(callback);
        return () => profileUpdateListeners.delete(callback);
    }
};