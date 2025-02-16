// src/pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Shared/Sidebar';
import { PlanCard, BillingHistory, CurrentPlan } from '../../components/UserComponents/ProfileComponents/Plans';
import { 
  Bell, 
  MenuIcon, 
  Upload,
  Camera,
  Mail,
  User,
  Phone,
  Shield,
  Key,
  LogOut,
  ExternalLink,
  X,
  Check,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../../api/user';
import { subscriptionService } from '../../api/subscription';
import { authService } from '../../api/auth';
import PaymentForm from '../../components/Shared/PaymentForm';
import PaymentFormWrapper from '../../components/Shared/PaymentForm';


const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center overflow-y-auto py-8">
      <div className="relative bg-white rounded-xl p-6 max-w-lg w-full mx-4 my-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">{title}</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

const SubscriptionModal = ({ isOpen, onClose, plan, onSuccess }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const handleSuccess = () => {
    showToastMessage('Subscription updated successfully');
    onSuccess();
    onClose();
  };

  const handleError = (error) => {
    showToastMessage(error.message || 'Error processing payment', 'error');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Subscribe to ${plan?.name}`}
    >
      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Plan Details</h3>
          <div className="space-y-2 text-gray-600">
            <p>Price: ${plan?.price}/month</p>
            <p>Credits: {plan?.credits_per_month.toLocaleString()} per month</p>
          </div>
        </div>

        <PaymentForm 
          plan={plan}
          onSuccess={handleSuccess}
          onError={handleError}
        />
      </div>

      {/* Toast Message */}
      {showToast && (
        <div className={`fixed bottom-4 right-4 ${
          toastType === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white px-4 py-2 rounded-lg shadow-lg`}>
          {toastMessage}
        </div>
      )}
    </Modal>
  );
};


const ChangePasswordModal = ({ isOpen, onClose }) => {

  const [formData, setFormData] = useState({
      currentPassword: '',
      newPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleChange = (e) => {
      setFormData({
          ...formData,
          [e.target.name]: e.target.value
      });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
      setLoading(true);

      try {
          await userService.changePassword(formData);
          onClose();
          showToastMessage('Password updated successfully');
      } catch (error) {
          setError(error.message || 'Error changing password');
      } finally {
          setLoading(false);
      }
  };

  if (!isOpen) return null;


  return (
    
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Change Password</h3>
              
              {error && (
                  <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                      {error}
                  </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                          Current Password
                      </label>
                      <div className="relative">
                          <input
                              type={showCurrentPassword ? "text" : "password"}
                              name="currentPassword"
                              value={formData.currentPassword}
                              onChange={handleChange}
                              required
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#FF5341] focus:border-[#FF5341]"
                          />
                          <button
                              type="button"
                              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2"
                          >
                              {showCurrentPassword ? (
                                  <EyeOff className="w-5 h-5 text-gray-400" />
                              ) : (
                                  <Eye className="w-5 h-5 text-gray-400" />
                              )}
                          </button>
                      </div>
                  </div>

                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                          New Password
                      </label>
                      <div className="relative">
                          <input
                              type={showNewPassword ? "text" : "password"}
                              name="newPassword"
                              value={formData.newPassword}
                              onChange={handleChange}
                              required
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#FF5341] focus:border-[#FF5341]"
                          />
                          <button
                              type="button"
                              onClick={() => setShowNewPassword(!showNewPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2"
                          >
                              {showNewPassword ? (
                                  <EyeOff className="w-5 h-5 text-gray-400" />
                              ) : (
                                  <Eye className="w-5 h-5 text-gray-400" />
                              )}
                          </button>
                      </div>
                  </div>

                  <div className="flex justify-end space-x-3 mt-6">
                      <button
                          type="button"
                          onClick={onClose}
                          className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                      >
                          Cancel
                      </button>
                      <button
                          type="submit"
                          disabled={loading}
                          className={`px-4 py-2 bg-[#FF5341] text-white rounded-lg hover:bg-[#FF5341]/90 ${
                              loading ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                      >
                          {loading ? 'Updating...' : 'Update Password'}
                      </button>
                  </div>
              </form>
          </div>
      </div>
  );
};

const defaultProfileImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23CBD5E0'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E";

const Profile = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success'); // success or error
  const [availablePlans, setAvailablePlans] = useState([]);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    image: defaultProfileImage,
    googleId: null
  });

  const [subscriptionData, setSubscriptionData] = useState({
    currentPlan: null,
    transactions: [],
    stats: {
      total_words_generated: 0,
      credits_left: 0,
      total_documents_saved: 0
    }
  });

  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();

  const getProfileImageUrl = (imagePath) => {
    if (!imagePath) return defaultProfileImage;
    // Assuming your backend is running on localhost:5000
    return `http://localhost:5000/${imagePath}`;
  };



  useEffect(() => {
    fetchPlans();
}, []);


const fetchPlans = async () => {
    try {
        setIsLoading(true);
        const response = await subscriptionService.getPlans();
        setAvailablePlans(response.data);
    } catch (error) {
        console.error('Error fetching plans:', error);
        showToastMessage('Error loading plans', 'error');
    } finally {
        setIsLoading(false);
    }
};

const handleManagePlan = () => {
  setIsUpgradeModalOpen(true);
};


const fetchSubscriptionData = async () => {
  try {
      const subscriptionStatus = await subscriptionService.getStatus();
      setSubscriptionData({
          currentPlan: subscriptionStatus.data.current_plan,
          transactions: subscriptionStatus.data.billing_history,
          stats: subscriptionStatus.data.stats
      });
  } catch (error) {
      showToastMessage('Error refreshing subscription data', 'error');
  }
};




  // Fetch user profile and subscription data
  useEffect(() => {
    const fetchProfileData = async () => {
        try {
            const userData = await userService.getProfile();
            setProfileData({
              name: userData.data.user.name || '',  // Add fallbacks
              email: userData.data.user.email || '',
              phone: userData.data.user.phone_number || '',  // Changed to match backend
              image: userService.getProfileImageUrl(userData.data.user.profile_image),
              googleId: userData.data.user.googleId || null
          });

            const subscriptionStatus = await subscriptionService.getStatus();
            setSubscriptionData({
                currentPlan: subscriptionStatus.data.current_plan,
                transactions: subscriptionStatus.data.billing_history,
                stats: subscriptionStatus.data.stats
            });
        } catch (error) {
            showToastMessage('Error loading profile data', 'error');
        }
    };

    fetchProfileData();
}, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarCollapsed(false);
      } else {
        setIsSidebarCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const showToastMessage = (message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);

      try {
        const response = await userService.updateProfileImage(file);
        if (response.data && response.data.profile_image) {
          // Update the profile image with the new URL from the server
          setProfileData(prev => ({
            ...prev,
            image: getProfileImageUrl(response.data.profile_image)
          }));
        }
        showToastMessage('Profile image updated successfully');
      } catch (error) {
        showToastMessage('Error updating profile image', 'error');
        setPreviewImage(null); // Reset preview on error
      }
    }
  };

  const handleSave = async () => {
    try {
      await userService.updateProfile({
        name: profileData.name,
        email: profileData.email,
        phone_number: profileData.phone
      });

      setIsEditing(false);
      showToastMessage('Profile updated successfully');
    } catch (error) {
      showToastMessage('Error updating profile', 'error');
    }
  };

// In handleUpgrade function of Profile.jsx
// In Profile.jsx

// In Profile.jsx
const handleUpgrade = async (plan) => {
  try {
    console.log('Selected plan for upgrade:', plan);
    setSelectedPlan(plan);
    const response = await subscriptionService.upgradePlan(plan._id, paymentMethodId);
    
    // Refresh subscription data after upgrade
    const subscriptionStatus = await subscriptionService.getStatus();
    setSubscriptionData({
      currentPlan: subscriptionStatus.data.current_plan,
      transactions: subscriptionStatus.data.billing_history,
      stats: subscriptionStatus.data.stats
    });

    showToastMessage('Subscription upgraded successfully');
  } catch (error) {
    showToastMessage('Error upgrading subscription', 'error');
  }
};


const handleCancelPlan = async () => {
  try {
    await subscriptionService.cancelSubscription();
    setIsCancelModalOpen(false);
    showToastMessage('Subscription cancelled successfully');
    
    // Refresh subscription data
    const subscriptionStatus = await subscriptionService.getStatus();
    setSubscriptionData(prev => ({
      ...prev,
      currentPlan: subscriptionStatus.data.current_plan
    }));
  } catch (error) {
    showToastMessage('Error cancelling subscription', 'error');
  }
};

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate('/login');
    } catch (error) {
      showToastMessage('Error logging out', 'error');
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Hidden on mobile */}
      <div className="hidden md:block md:fixed md:left-0 md:h-screen z-50">
        <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
      </div>

      {/* Main Content */}
      <div className={`flex-1 w-full ${isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64'} transition-all duration-300`}>
        {/* Navbar */}
        <div className="sticky top-0 w-full bg-[#FDF8F6] py-4 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex justify-between items-center">
              <button 
                className="md:hidden flex items-center p-2 rounded-lg hover:bg-gray-100"
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              >
                <MenuIcon className="h-6 w-6" />
              </button>
              <div className="relative ml-auto">
                <button 
                  onClick={() => navigate('/notifications')}
                  className="hover:bg-gray-100 p-2 rounded-lg transition-colors"
                >
                  <Bell className="w-6 h-6 text-gray-600" />
                  <span className="absolute top-1 right-2 w-2 h-2 bg-[#FF5341] rounded-full"></span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Sidebar */}
        {!isSidebarCollapsed && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setIsSidebarCollapsed(true)}>
            <div className="fixed inset-y-0 left-0 w-64 bg-white" onClick={e => e.stopPropagation()}>
              <Sidebar isCollapsed={false} setIsCollapsed={setIsSidebarCollapsed} />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column - Profile Info */}
            <div className="md:col-span-1">
              <div className="bg-[#FFFAF3] rounded-xl p-6 mb-6">
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
                      <img 
                        src={previewImage || profileData.image || defaultProfileImage} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {isEditing && (
                      <label className="absolute bottom-0 right-0 cursor-pointer">
                        <div className="bg-[#FF5341] p-2 rounded-full">
                          <Camera className="w-4 h-4 text-white" />
                        </div>
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </label>
                    )}
                  </div>
                  <h2 className="text-xl font-semibold mb-1">{profileData.name}</h2>
                  <p className="text-gray-600 text-sm">
                    {subscriptionData.currentPlan ? subscriptionData.currentPlan.name : 'No Active Plan'}
                  </p>
                </div>

                <div className="mt-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      className={`w-full p-2 rounded-lg border ${isEditing ? 'bg-white' : 'bg-gray-50'}`}
                      value={profileData.name}
                      onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      className={`w-full p-2 rounded-lg border ${isEditing ? 'bg-white' : 'bg-gray-50'}`}
                      value={profileData.email}
                      onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      className={`w-full p-2 rounded-lg border ${isEditing ? 'bg-white' : 'bg-gray-50'}`}
                      value={profileData.phone}
                      onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                {isEditing ? (
                  <div className="flex space-x-4 mt-6">
                    <button
                      onClick={handleSave}
                      className="flex-1 bg-[#FF5341] text-white py-2 rounded-lg hover:bg-[#FF5341]/90 transition-colors"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setPreviewImage(null);
                      }}
                      className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full bg-[#FF5341] text-white py-2 rounded-lg hover:bg-[#FF5341]/90 transition-colors mt-6"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>

            {/* Right Column - Additional Settings */}
            <div className="md:col-span-2 space-y-6">
              {/* Current Plan Section */}
              {subscriptionData.currentPlan ? (
                <CurrentPlan
                  plan={{
                    name: subscriptionData.currentPlan.name,
                    price: `${subscriptionData.currentPlan.price}/month`,
                    renewalDate: new Date(subscriptionData.currentPlan.renewal_date).toLocaleDateString(),
                    creditsUsed: subscriptionData.stats.credits_used,
                    totalCredits: subscriptionData.currentPlan.credits_per_month
                  }}
                  onManage={() => setIsUpgradeModalOpen(true)}
                  onCancel={() => setIsCancelModalOpen(true)}
                />
              ) : (
                <div className="bg-[#FFFAF3] rounded-xl p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">No Active Plan</h3>
                      <p className="text-gray-600">Subscribe to a plan to get started with our premium features</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsUpgradeModalOpen(true)}
                    className="w-full bg-[#FF5341] text-white px-6 py-3 rounded-lg hover:bg-[#FF5341]/90 transition-colors flex items-center justify-center"
                  >
                    View Available Plans
                  </button>
                </div>
              )}

              {/* Profile Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#FFFAF3] rounded-xl p-6">
                  <p className="text-gray-600 text-sm mb-1">Total Words</p>
                  <p className="text-2xl font-semibold">{subscriptionData.stats.total_words_generated}</p>
                </div>
                <div className="bg-[#FFFAF3] rounded-xl p-6">
                  <p className="text-gray-600 text-sm mb-1">Credits Left</p>
                  <p className="text-2xl font-semibold">{subscriptionData.stats.credits_left}</p>
                </div>
                <div className="bg-[#FFFAF3] rounded-xl p-6">
                  <p className="text-gray-600 text-sm mb-1">Documents</p>
                  <p className="text-2xl font-semibold">{subscriptionData.stats.total_documents_saved}</p>
                </div>
              </div>

              {/* Password & Security Section */}
              {!profileData.googleId || profileData.googleId === "" ? (  // Only show if user doesn't have a googleId
                <div className="bg-[#FFFAF3] rounded-xl p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-4">Password & Security</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600">Change password for security purpose</p>
                    </div>
                    <button
                      onClick={() => setIsPasswordModalOpen(true)}
                      className="px-4 py-2 bg-[#FF5341] text-white rounded-lg hover:bg-[#FF5341]/90 flex items-center"
                    >
                      <Lock className="w-4 h-4 mr-2" />
                      Change Password
                    </button>
                  </div>
                </div>
              ):null }
                {/* Password Change Modal */}
                <ChangePasswordModal
                    isOpen={isPasswordModalOpen}
                    onClose={() => setIsPasswordModalOpen(false)}
                />


              {/* Billing History */}
              {subscriptionData.transactions && subscriptionData.transactions.length > 0 ? (
                <BillingHistory transactions={subscriptionData.transactions} />
              ) : (
                <div className="bg-[#FFFAF3] rounded-xl p-6">
                  <h3 className="font-semibold mb-4">Billing History</h3>
                  <div className="text-center py-8 text-gray-500">
                    <p>No payments made yet</p>
                  </div>
                </div>
              )}

              {/* Log out */}
              <div className="bg-red-50 rounded-xl p-6 border border-red-100">
                <h3 className="text-red-600 font-medium mb-2">Log out of your account</h3>
                <div className="flex space-x-4">
                  <button 
                    onClick={handleLogout}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <LogOut className="w-4 h-4 inline-block mr-2" />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cancel Plan Modal */}
        <Modal
          isOpen={isCancelModalOpen}
          onClose={() => setIsCancelModalOpen(false)}
          title="Cancel Subscription"
        >
          <div className="mb-6">
            <p className="text-gray-600 mb-4">
              Are you sure you want to cancel your subscription? You'll lose access to:
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                Premium features and templates
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                Increased credit allowance
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                Team collaboration tools
              </li>
            </ul>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleCancelPlan}
              className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Confirm Cancellation
            </button>
            <button
              onClick={() => setIsCancelModalOpen(false)}
              className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50"
            >
              Keep Subscription
            </button>
          </div>
        </Modal>

        {/* Upgrade Plan Modal */}
        
        <Modal
        isOpen={isUpgradeModalOpen}
        onClose={() => {
            setIsUpgradeModalOpen(false);
            setSelectedPlan(null);
        }}
        title="Choose a Plan"
    >
        <div className="p-6">
            {isLoading ? (
                <div className="flex items-center justify-center py-8">
                    <div className="w-8 h-8 border-4 border-[#FF5341] border-t-transparent rounded-full animate-spin"></div>
                    <span className="ml-2">Loading plans...</span>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {availablePlans.map((plan) => (
                        <div
                            key={plan._id}
                            className={`p-6 rounded-xl border ${
                                subscriptionData.currentPlan?._id === plan._id
                                    ? 'border-[#FF5341]'
                                    : 'border-gray-200'
                            } bg-white`}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold">{plan.name}</h3>
                                    <p className="text-gray-600">${plan.price}/month</p>
                                </div>
                                {subscriptionData.currentPlan?._id === plan._id && (
                                    <span className="bg-[#FF5341] bg-opacity-10 text-[#FF5341] px-3 py-1 rounded-full text-sm">
                                        Current Plan
                                    </span>
                                )}
                            </div>

                            <div className="space-y-3 mb-6">
                                {plan.features.map((feature, index) => (
                                    <div key={index} className="flex items-center">
                                        <Check className="w-4 h-4 text-[#FF5341] mr-2" />
                                        <span className="text-sm">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            {subscriptionData.currentPlan?._id !== plan._id && (
                                <button
                                    onClick={() => handleUpgrade(plan)}
                                    className="w-full bg-[#FF5341] text-white py-2 rounded-lg hover:bg-[#FF5341]/90 transition-colors"
                                >
                                    Upgrade to {plan.name}
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {selectedPlan && (
                <div className="mt-6">
                    <PaymentFormWrapper
                    plan={selectedPlan}
                    onSuccess={() => {
                        setIsUpgradeModalOpen(false);
                        showToastMessage('Subscription upgraded successfully');
                        fetchSubscriptionData(); // Now this function exists
                    }}
                    onError={(error) => {
                        showToastMessage(error.message || 'Error processing payment', 'error');
                    }}
                />
                </div>
            )}
        </div>
    </Modal>

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
    </div>
  );
};

export default Profile;