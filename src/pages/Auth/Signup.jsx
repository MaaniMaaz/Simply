// src/pages/Auth/Signup.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Check, X } from 'lucide-react';
import logo from '../../assets/logo.png';
import signupSvg1 from '../../assets/s2.svg';
import signupSvg2 from '../../assets/s10.svg';
import signupSvg3 from '../../assets/s5.svg';
import { authService } from '../../api/auth';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    password: '',
    verificationCode: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const navigate = useNavigate();

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const showToastMessage = (message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

// In your Signup component
const handleSendVerification = async () => {

  if (!termsAccepted) {
    showToastMessage('You must agree to the Terms of Service and Privacy Policy.', 'error');
    return;
  }

  if (!formData.email || !formData.name) {
    showToastMessage('Please provide both name and email', 'error');
    return;
  }

  setLoading(true);
  setError('');

  try {
    console.log('Sending verification for:', {  // Debug log
      email: formData.email,
      name: formData.name
    });
    
    await authService.sendVerificationCode({
      email: formData.email,
      name: formData.name
    });
    
    setVerificationSent(true);
    showToastMessage('Verification code sent to your email');
  } catch (error) {
    showToastMessage(error.message || 'Error sending verification code', 'error');
  } finally {
    setLoading(false);
  }
};

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!termsAccepted) {
      showToastMessage('You must agree to the Terms of Service and Privacy Policy.', 'error');
      return;
    }

    if (!formData.verificationCode) {
      showToastMessage('Please enter verification code', 'error');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await authService.register(formData);
      if (response.success) {
        showToastMessage('Registration successful! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      showToastMessage(error.message || 'Registration failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFAF3] flex flex-col">
      {/* Decorative SVGs - Hidden on mobile */}
      <div className="hidden md:block">
        <img 
          src={signupSvg1} 
          className="absolute top-10 left-20 w-52 h-52"
          alt="Decorative" 
        />
        <img 
          src={signupSvg2} 
          className="absolute top-40 right-20 w-56 h-56"
          alt="Decorative" 
        />
        <img 
          src={signupSvg3} 
          className="absolute bottom-10 left-28 w-52 h-52"
          alt="Decorative" 
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          {/* Logo */}
          <div className="flex justify-center">
            <img src={logo} alt="Simply Logo" className="h-8" />
          </div>

          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Join Simply to streamline your content creation
            </p>
          </div>

          {/* Form */}
          <form className="mt-8 space-y-6" onSubmit={handleSignup}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-[#FF5341] focus:border-[#FF5341] sm:text-sm"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-[#FF5341] focus:border-[#FF5341] sm:text-sm"
                  placeholder="Enter your email"
                />
              </div>

              {verificationSent && (
                <div>
                  <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700 mb-1">
                    Verification Code
                  </label>
                  <input
                    id="verificationCode"
                    name="verificationCode"
                    type="text"
                    required
                    value={formData.verificationCode}
                    onChange={handleChange}
                    className="appearance-none relative block w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-[#FF5341] focus:border-[#FF5341] sm:text-sm"
                    placeholder="Enter verification code"
                  />
                </div>
              )}

              {verificationSent && (
                <>
                  <div>
                    <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      id="phone_number"
                      name="phone_number"
                      type="tel"
                      required
                      value={formData.phone_number}
                      onChange={handleChange}
                      className="appearance-none relative block w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-[#FF5341] focus:border-[#FF5341] sm:text-sm"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="appearance-none relative block w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-[#FF5341] focus:border-[#FF5341] sm:text-sm"
                        placeholder="••••••••"
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
                </>
              )}
            </div>

            <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="h-4 w-4 text-[#FF5341] focus:ring-[#FF5341] border-gray-300 rounded cursor-pointer"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900 cursor-pointer select-none">
              I agree to the{' '}
              <a href="#" className="text-[#FF5341] hover:text-[#FF5341]/80 font-medium">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-[#FF5341] hover:text-[#FF5341]/80 font-medium">Privacy Policy</a>
            </label>
          </div>

            <button
              type={verificationSent ? "submit" : "button"}
              onClick={!verificationSent ? handleSendVerification : undefined}
              disabled={loading}
              className={`group relative w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-[#FF5341] hover:bg-[#FF5341]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5341] ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                verificationSent ? 'Creating Account...' : 'Sending Code...'
              ) : (
                verificationSent ? 'Create Account' : 'Send Verification Code'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <button 
                onClick={() => navigate('/login')}
                className="font-medium text-[#FF5341] hover:text-[#FF5341]/80"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className={`fixed bottom-4 right-4 ${
          toastType === 'success' ? 'bg-gray-800' : 'bg-red-500'
        } text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 animate-fade-in-up z-50`}>
          {toastType === 'success' ? (
            <Check className="w-4 h-4" />
          ) : (
            <X className="w-4 h-4" />
          )}
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default Signup;