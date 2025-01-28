// src/pages/Auth/ForgotPassword.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import logo from '../../assets/logo.png';
import { authService } from '../../api/auth';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState('email'); // 'email', 'verification', 'newPassword'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSendCode = async () => {
    if (!email) {
      setError('Please enter your email');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await authService.sendPasswordResetCode(email);
      setStep('verification');
    } catch (error) {
      setError(error.message || 'Error sending reset code');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!verificationCode || !newPassword) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await authService.resetPassword({
        email,
        verificationCode,
        newPassword
      });
      navigate('/login');
    } catch (error) {
      setError(error.message || 'Error resetting password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFAF3] flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="flex justify-center">
          <img src={logo} alt="Simply Logo" className="h-8" />
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Reset Password</h2>
          <p className="mt-2 text-sm text-gray-600">
            {step === 'email' 
              ? 'Enter your email to receive a verification code'
              : step === 'verification'
              ? 'Enter the verification code sent to your email'
              : 'Enter your new password'}
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <div className="space-y-4">
          {step === 'email' && (
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-[#FF5341] focus:border-[#FF5341] sm:text-sm"
                placeholder="Enter your email"
              />
            </div>
          )}

          {step === 'verification' && (
            <div>
              <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700 mb-1">
                Verification Code
              </label>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-[#FF5341] focus:border-[#FF5341] sm:text-sm"
                placeholder="Enter verification code"
              />
            </div>
          )}

          {step === 'verification' && (
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-[#FF5341] focus:border-[#FF5341] sm:text-sm"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 
                    <EyeOff className="h-5 w-5 text-gray-400" /> : 
                    <Eye className="h-5 w-5 text-gray-400" />
                  }
                </button>
              </div>
            </div>
          )}

          <button
            onClick={step === 'email' ? handleSendCode : handleResetPassword}
            disabled={loading}
            className={`w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-[#FF5341] hover:bg-[#FF5341]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5341] ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading
              ? 'Processing...'
              : step === 'email'
              ? 'Send Verification Code'
              : 'Reset Password'
            }
          </button>
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate('/login')}
            className="text-sm text-[#FF5341] hover:text-[#FF5341]/80"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;