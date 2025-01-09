// src/pages/AdminPages/Subscription.jsx
import React, { useState } from 'react';
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
  AlertTriangle
} from 'lucide-react';

// Dummy data for subscription plans
const initialPlans = {
  professional: {
    name: "Professional",
    price: 19,
    billingPeriod: "monthly",
    features: [
      "25,000 Credits",
      "Team Collaboration",
      "Advanced SEO",
      "Custom Templates",
      "Analytics Dashboard",
      "Priority Support"
    ],
    active: 342
  },
  enterprise: {
    name: "Enterprise",
    price: 49,
    billingPeriod: "monthly",
    features: [
      "50,000 Credits",
      "Advanced Team Management",
      "Custom Integrations",
      "Dedicated Account Manager",
      "API Access",
      "24/7 Premium Support"
    ],
    active: 156
  }
};

// Dummy subscription data
const subscriptionData = [
  {
    id: 1,
    user: "John Doe",
    email: "john@example.com",
    plan: "Professional",
    status: "Active",
    startDate: "2024-01-15",
    nextBilling: "2024-02-15",
    amount: "$19.00"
  },
  {
    id: 2,
    user: "Jane Smith",
    email: "jane@example.com",
    plan: "Enterprise",
    status: "Active",
    startDate: "2024-01-10",
    nextBilling: "2024-02-10",
    amount: "$49.00"
  },
  // Add more dummy data as needed
];

const PlanEditor = ({ plan, onSave, onCancel }) => {
  const [editedPlan, setEditedPlan] = useState({ ...plan });

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

  return (
    <div className=" bg-white rounded-xl p-6 space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{editedPlan.name} Plan Settings</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => onSave(editedPlan)}
            className="bg-[#FF5341] text-white px-4 py-2 rounded-lg hover:bg-[#FF5341]/90 flex items-center"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
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
            value={editedPlan.billingPeriod}
            onChange={(e) => setEditedPlan({ ...editedPlan, billingPeriod: e.target.value })}
            className="w-full p-2 border rounded-lg focus:ring-[#FF5341] focus:border-[#FF5341]"
          >
            <option value="monthly">Monthly</option>
            <option value="annually">Annually</option>
          </select>
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

const SubscriptionStats = ({ stats }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    <div className="bg-white rounded-xl p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">Total Revenue</p>
          <p className="text-2xl font-semibold">$9,482</p>
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
          <p className="text-2xl font-semibold">498</p>
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
          <p className="text-2xl font-semibold">342</p>
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
          <p className="text-2xl font-semibold">156</p>
        </div>
        <div className="bg-[#FF5341] bg-opacity-10 p-3 rounded-lg">
          <Settings className="w-6 h-6 text-[#FF5341]" />
        </div>
      </div>
    </div>
  </div>
);

const PlanCard = ({ plan, onEdit }) => (
  <div className="bg-white rounded-xl p-6">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-xl font-semibold">{plan.name}</h3>
        <p className="text-sm text-gray-600">{plan.active} active users</p>
      </div>
      <button
        onClick={onEdit}
        className="p-2 hover:bg-gray-100 rounded-lg"
      >
        <Edit2 className="w-5 h-5 text-gray-600" />
      </button>
    </div>

    <div className="mb-6">
      <p className="text-3xl font-bold">${plan.price}</p>
      <p className="text-sm text-gray-600">per user/{plan.billingPeriod}</p>
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
            <tr key={subscription.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <div className="font-medium text-gray-900">{subscription.user}</div>
                  <div className="text-sm text-gray-500">{subscription.email}</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  subscription.plan === 'Professional' 
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-purple-100 text-purple-800'
                }`}>
                  {subscription.plan}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {subscription.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {subscription.startDate}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {subscription.nextBilling}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {subscription.amount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const Subscription = () => {
  const [plans, setPlans] = useState(initialPlans);
  const [editingPlan, setEditingPlan] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSavePlan = (updatedPlan) => {
    setPlans({
      ...plans,
      [editingPlan.toLowerCase()]: updatedPlan
    });
    setEditingPlan(null);
  };

  const filteredSubscriptions = subscriptionData.filter(sub =>
    sub.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sub.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Subscription Management</h1>
        <p className="text-gray-600">Manage subscription plans and monitor active subscriptions</p>
      </div>

      {/* Stats Cards */}
      <SubscriptionStats />

      {/* Plans Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Subscription Plans</h2>
        {editingPlan ? (
          <PlanEditor
            plan={plans[editingPlan.toLowerCase()]}
            onSave={handleSavePlan}
            onCancel={() => setEditingPlan(null)}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(plans).map(([key, plan]) => (
              <PlanCard
                key={key}
                plan={plan}
                onEdit={() => setEditingPlan(plan.name)}
              />
            ))}
          </div>
        )}

        {/* Subscriptions List Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Active Subscriptions</h2>
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Search subscriptions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#FF5341]"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>

          <SubscriptionList subscriptions={filteredSubscriptions} />
        </div>

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