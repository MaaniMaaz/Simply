// src/pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Shared/Sidebar';
import { PlanCard, BillingHistory, CurrentPlan } from '../components/ProfileComponents/Plans'
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
  X
} from 'lucide-react';
import profile from '../assets/profile.png';
import { useNavigate } from 'react-router-dom';

const ProfileCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between">
      <div className="flex items-start">
        <div className="bg-[#FF5341] bg-opacity-10 p-3 rounded-lg">
          <Icon className="w-5 h-5 text-[#FF5341]" />
        </div>
        <div className="ml-4">
          <h3 className="font-medium mb-1">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
      <ExternalLink className="w-5 h-5 text-gray-400" />
    </div>
  </div>
);

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

const Profile = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Zay Yang',
    email: 'zay.yang@email.com',
    phone: '+1 (555) 123-4567',
    image: profile
  });
  const [previewImage, setPreviewImage] = useState(null);

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (previewImage) {
      setProfileData(prev => ({ ...prev, image: previewImage }));
    }
    setIsEditing(false);
  };

  const currentPlan = {
    name: 'Professional Plan',
    price: '$19/month',
    renewalDate: 'Apr 01, 2024',
    creditsUsed: 15000,
    totalCredits: 25000
  };

  const transactions = [
    { plan: 'Professional Plan', date: 'Mar 01, 2024', amount: '$19.00', status: 'Paid' },
    { plan: 'Professional Plan', date: 'Feb 01, 2024', amount: '$19.00', status: 'Paid' },
    { plan: 'Starter Plan', date: 'Jan 01, 2024', amount: '$0.00', status: 'Free' }
  ];

  const handleUpgrade = (plan) => {
    setSelectedPlan(plan);
    setIsUpgradeModalOpen(true);
  };

  const handleCancelPlan = () => {
    setIsCancelModalOpen(true);
  };

  const confirmCancellation = () => {
    // Handle plan cancellation
    setIsCancelModalOpen(false);
  };

  const confirmUpgrade = () => {
    // Handle plan upgrade
    setIsUpgradeModalOpen(false);
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
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-[#FF5341] rounded-full"></span>
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
                    <div className="w-24 h-24 rounded-full overflow-hidden">
                      <img 
                        src={previewImage || profileData.image} 
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
                  <p className="text-gray-600 text-sm">Professional Plan</p>
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

              {/* Account Security Card */}
              <div className="bg-black rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-medium">Account Security</h3>
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <p className="text-gray-400 text-sm mb-4">
                  Enhance your account security by enabling two-factor authentication
                </p>
                <button className="w-full bg-white text-black py-2 rounded-lg hover:bg-opacity-90 transition-colors">
                  Enable 2FA
                </button>
              </div>
            </div>

            {/* Right Column - Additional Settings */}
            <div className="md:col-span-2 space-y-6">


               {/* Current Plan Section */}
            <CurrentPlan
              plan={currentPlan}
              onManage={() => setIsUpgradeModalOpen(true)}
              onCancel={handleCancelPlan}
            />

              {/* Profile Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#FFFAF3] rounded-xl p-6">
                  <p className="text-gray-600 text-sm mb-1">Total Words</p>
                  <p className="text-2xl font-semibold">24,598</p>
                </div>
                <div className="bg-[#FFFAF3] rounded-xl p-6">
                  <p className="text-gray-600 text-sm mb-1">Credits Left</p>
                  <p className="text-2xl font-semibold">1,400</p>
                </div>
                <div className="bg-[#FFFAF3] rounded-xl p-6">
                  <p className="text-gray-600 text-sm mb-1">Documents</p>
                  <p className="text-2xl font-semibold">13</p>
                </div>
              </div>

              {/* Settings Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ProfileCard
                  icon={Key}
                  title="Password & Security"
                  description="Change password, enable 2FA, and manage security preferences"
                />
                <ProfileCard
                  icon={User}
                  title="Personal Information"
                  description="Update your personal details and preferences"
                />
                <ProfileCard
                  icon={Mail}
                  title="Email Notifications"
                  description="Manage your email preferences and notifications"
                />
                
              </div>

              {/* Billing History */}
            <BillingHistory transactions={transactions} />

              {/* Danger Zone */}
              <div className="bg-red-50 rounded-xl p-6 border border-red-100">
                <h3 className="text-red-600 font-medium mb-2">Danger Zone</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <div className="flex space-x-4">
                  <button className="px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                    Delete Account
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
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
            onClick={confirmCancellation}
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
        onClose={() => setIsUpgradeModalOpen(false)}
        title="Choose a Plan"
      >
        <div className="space-y-4">
          {['Starter', 'Professional', 'Enterprise'].map((plan) => (
            <PlanCard
              key={plan}
              plan={plan}
              isActive={currentPlan.name === `${plan} Plan`}
              onUpgrade={handleUpgrade}
            />
          ))}
        </div>
      </Modal>

      </div>
    </div>
  );
};

export default Profile;