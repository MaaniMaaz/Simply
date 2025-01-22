import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  Users, 
  Settings,
  Search,
  Clock,
  CreditCard,
  FileText,
  ChevronRight,
  CheckCircle2,
  Edit2,
  Save,
  X,
  AlertTriangle,
  Plus,
  Filter
} from 'lucide-react';
import { adminSubscriptionService } from '../../api/adminSubscription';

const PlanCard = ({ plan, onEdit }) => (
  <div className="bg-white rounded-xl p-6">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-xl font-semibold">{plan.name}</h3>
        <p className="text-sm text-gray-600">{plan.active_users || 0} active users</p>
      </div>
      <button
        onClick={() => onEdit(plan)}
        className="p-2 hover:bg-gray-100 rounded-lg"
      >
        <Edit2 className="w-5 h-5 text-gray-600" />
      </button>
    </div>

    <div className="mb-6">
      <p className="text-3xl font-bold">${plan.price}</p>
      <p className="text-sm text-gray-600">per user/{plan.billing_period}</p>
    </div>

    <div className="space-y-3">
      {plan.features.map((feature, index) => (
        <div key={index} className="flex items-center">
          <CheckCircle2 className="w-5 h-5 text-[#FF5341] mr-2" />
          <span className="text-sm">{feature}</span>
        </div>
      ))}
    </div>
  </div>
);

const PlanEditor = ({ plan, onSave, onCancel }) => {
  const [editedPlan, setEditedPlan] = useState({ ...plan });
  const [isSaving, setIsSaving] = useState(false);

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...editedPlan.features];
    newFeatures[index] = value;
    setEditedPlan({ ...editedPlan, features: newFeatures });
  };

  const handleAddFeature = () => {
    setEditedPlan({
      ...editedPlan,
      features: [...editedPlan.features, ""]
    });
  };

  const handleRemoveFeature = (index) => {
    const newFeatures = editedPlan.features.filter((_, i) => i !== index);
    setEditedPlan({ ...editedPlan, features: newFeatures });
  };

  const handleSubmit = async () => {
    try {
      setIsSaving(true);
      await onSave(editedPlan);
    } catch (error) {
      console.error('Error saving plan:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{editedPlan.name} Plan Settings</h3>
        <div className="flex space-x-2">
          <button
            onClick={handleSubmit}
            disabled={isSaving}
            className="bg-[#FF5341] text-white px-4 py-2 rounded-lg hover:bg-[#FF5341]/90 flex items-center disabled:opacity-50"
          >
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            onClick={onCancel}
            className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            value={editedPlan.name}
            onChange={(e) => setEditedPlan({ ...editedPlan, name: e.target.value })}
            className="w-full p-2 border rounded-lg focus:ring-[#FF5341] focus:border-[#FF5341]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price (USD)
          </label>
          <input
            type="number"
            value={editedPlan.price}
            onChange={(e) => setEditedPlan({ ...editedPlan, price: Number(e.target.value) })}
            className="w-full p-2 border rounded-lg focus:ring-[#FF5341] focus:border-[#FF5341]"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Billing Period
          </label>
          <select
            value={editedPlan.billing_period}
            onChange={(e) => setEditedPlan({ ...editedPlan, billing_period: e.target.value })}
            className="w-full p-2 border rounded-lg focus:ring-[#FF5341] focus:border-[#FF5341]"
          >
            <option value="monthly">Monthly</option>
            <option value="annually">Annually</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Credits per Month
          </label>
          <input
            type="number"
            value={editedPlan.credits_per_month}
            onChange={(e) => setEditedPlan({ ...editedPlan, credits_per_month: Number(e.target.value) })}
            className="w-full p-2 border rounded-lg focus:ring-[#FF5341] focus:border-[#FF5341]"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Features
        </label>
        <div className="space-y-2">
          {editedPlan.features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                className="flex-1 p-2 border rounded-lg focus:ring-[#FF5341] focus:border-[#FF5341]"
              />
              <button
                onClick={() => handleRemoveFeature(index)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button
            onClick={handleAddFeature}
            className="text-[#FF5341] text-sm hover:text-[#FF5341]/90 flex items-center"
          >
            + Add Feature
          </button>
        </div>
      </div>
    </div>
  );
};

const SubscriptionList = ({ subscriptions }) => (
  <div className="bg-white rounded-xl overflow-hidden">
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              User
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Plan
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Start Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Next Billing
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {subscriptions.map((subscription) => (
            <tr key={subscription._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <div className="font-medium text-gray-900">{subscription.user_name}</div>
                  <div className="text-sm text-gray-500">{subscription.user_email}</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  subscription.plan_name === 'Professional' 
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-purple-100 text-purple-800'
                }`}>
                  {subscription.plan_name}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  subscription.status === 'active' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {subscription.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(subscription.start_date).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(subscription.next_billing_date).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                ${subscription.amount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const SubscriptionStats = ({ stats }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    <div className="bg-white rounded-xl p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">Total Revenue</p>
          <p className="text-2xl font-semibold">${stats.totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-[#FF5341] bg-opacity-10 p-3 rounded-lg">
          <DollarSign className="w-6 h-6 text-[#FF5341]" />
        </div>
      </div>
    </div>

    <div className="bg-white rounded-xl p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">Active Users</p>
          <p className="text-2xl font-semibold">{stats.activeUsers}</p>
        </div>
        <div className="bg-[#FF5341] bg-opacity-10 p-3 rounded-lg">
          <Users className="w-6 h-6 text-[#FF5341]" />
        </div>
      </div>
    </div>

    <div className="bg-white rounded-xl p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">Professional Plan</p>
          <p className="text-2xl font-semibold">{stats.planStats?.Professional || 0}</p>
        </div>
        <div className="bg-[#FF5341] bg-opacity-10 p-3 rounded-lg">
          <FileText className="w-6 h-6 text-[#FF5341]" />
        </div>
      </div>
    </div>

    <div className="bg-white rounded-xl p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">Enterprise Plan</p>
          <p className="text-2xl font-semibold">{stats.planStats?.Enterprise || 0}</p>
        </div>
        <div className="bg-[#FF5341] bg-opacity-10 p-3 rounded-lg">
          <Settings className="w-6 h-6 text-[#FF5341]" />
        </div>
      </div>
    </div>
  </div>
);

const CreatePlanModal = ({ isOpen, onClose, onSubmit }) => {
  const [newPlan, setNewPlan] = useState({
    name: '',
    price: 0,
    billing_period: 'monthly',
    credits_per_month: 0,
    features: []
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
        <h3 className="text-lg font-semibold mb-4">Create New Plan</h3>
        {/* Plan creation form */}
        <PlanEditor 
          plan={newPlan}
          onSave={onSubmit}
          onCancel={onClose}
        />
      </div>
    </div>
  );
};

const Subscription = () => {
  const [plans, setPlans] = useState([]);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [editingPlan, setEditingPlan] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [subscriptions, setSubscriptions] = useState([]);
  const [subscriptionLoading, setSubscriptionLoading] = useState(true);

  // Fetch initial data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [plansResponse, statsResponse] = await Promise.all([
        adminSubscriptionService.getAllPlans(),
        adminSubscriptionService.getDashboardStats()
      ]);

      setPlans(plansResponse.data);
      setDashboardStats(statsResponse.data);
      
      // Mock subscription data (replace with actual API call)
      setSubscriptions([
        {
          _id: 1,
          user_name: "John Doe",
          user_email: "john@example.com",
          plan_name: "Professional",
          status: "active",
          start_date: "2024-01-15",
          next_billing_date: "2024-02-15",
          amount: "19.00"
        },
        {
          _id: 2,
          user_name: "Jane Smith",
          user_email: "jane@example.com",
          plan_name: "Enterprise",
          status: "active",
          start_date: "2024-01-10",
          next_billing_date: "2024-02-10",
          amount: "49.00"
        }
      ]);
      setSubscriptionLoading(false);
    } catch (error) {
      setError(error.message || 'Error fetching subscription data');
      showToastMessage('Error fetching subscription data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSavePlan = async (updatedPlan) => {
    try {
      const response = await adminSubscriptionService.updatePlan(updatedPlan._id, updatedPlan);
      
      // Update plans state with the new data
      setPlans(prevPlans => 
        prevPlans.map(plan => 
          plan._id === updatedPlan._id ? response.data : plan
        )
      );

      setEditingPlan(null);
      showToastMessage('Plan updated successfully');
      await fetchData(); // Refresh data
    } catch (error) {
      showToastMessage(error.message || 'Error updating plan', 'error');
    }
  };

  const handleCreatePlan = async (newPlan) => {
    try {
      const response = await adminSubscriptionService.createPlan(newPlan);
      setPlans(prevPlans => [...prevPlans, response.data]);
      setIsCreateModalOpen(false);
      showToastMessage('Plan created successfully');
      await fetchData(); // Refresh data
    } catch (error) {
      showToastMessage(error.message || 'Error creating plan', 'error');
    }
  };

  const showToastMessage = (message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#FF5341] border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center">
        <div className="text-red-600 mb-4">{error}</div>
        <button 
          onClick={fetchData}
          className="bg-[#FF5341] text-white px-4 py-2 rounded-lg hover:bg-[#FF5341]/90"
        >
          Retry
        </button>
      </div>
    );
  }

  const filteredSubscriptions = subscriptions.filter(sub =>
    sub.user_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sub.user_email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Subscription Management</h1>
        <p className="text-gray-600">Manage subscription plans and monitor active subscriptions</p>
      </div>

      {/* Stats Cards */}
      {dashboardStats && <SubscriptionStats stats={dashboardStats} />}

      {/* Plans Section */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Subscription Plans</h2>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-[#FF5341] text-white px-4 py-2 rounded-lg hover:bg-[#FF5341]/90 flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Plan
          </button>
        </div>

        {editingPlan ? (
          <PlanEditor
            plan={editingPlan}
            onSave={handleSavePlan}
            onCancel={() => setEditingPlan(null)}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {plans.map(plan => (
              <PlanCard
                key={plan._id}
                plan={plan}
                onEdit={() => setEditingPlan(plan)}
              />
            ))}
          </div>
        )}

        {/* Create Plan Modal */}
        <CreatePlanModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreatePlan}
        />

        {/* Subscriptions List Section */}
       

        {/* Stripe Integration Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex items-start">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
            <div>
              <h3 className="text-yellow-800 font-medium mb-1">Stripe Integration Required</h3>
              <p className="text-yellow-700 text-sm">
                To manage real-time subscriptions and payments, please complete your Stripe integration. 
                This will enable automatic billing, subscription management, and payment processing.
              </p>
              <button className="mt-3 text-sm text-yellow-900 font-medium hover:text-yellow-800 flex items-center">
                Complete Integration <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;