import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../api/auth';

const GoogleSignInButton = ({ onError }) => {
    const navigate = useNavigate();

    const handleSuccess = async (tokenResponse) => {
        try {
            const response = await authService.googleLogin(tokenResponse);
            if (response.success) {
                // Reload page after successful login to ensure profile image is updated
                navigate('/dashboard');
                window.location.reload();
            }
        } catch (error) {
            console.error('Google sign-in error:', error);
            if (onError) {
                onError(error.message || 'Error signing in with Google');
            }
        }
    };

    return (
        <div className="w-full flex justify-center my-4">
            <GoogleLogin
                onSuccess={handleSuccess}
                onError={() => onError('Google sign-in was unsuccessful')}
                useOneTap={false}
                theme="outline"
                size="large"
                width="100%"
                cookiePolicy={'single_host_origin'}
                prompt="select_account"
                ux_mode="popup"
                context="signin"
                flow="auth-code"
                shape="rectangular"
                itp_support={true}
            />
        </div>
    );
};

export default GoogleSignInButton;