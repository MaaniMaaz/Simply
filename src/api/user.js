import API from './config';

export const userService = {
    getProfile: async () => {
        try {
            const response = await API.get('/users/me');
            // Update local storage with latest user data
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
    }
};