import React from 'react';
import { CreditCard, Calendar, Check } from 'lucide-react';

const PlanCard = ({ plan, isActive, onUpgrade }) => {
  const features = {
    Professional: ['25,000 Credits', 'Team Collaboration', 'Advanced SEO'],
    Enterprise: ['50,000 Credits', 'Dedicated Support', 'Custom Features']
  };

  return (
    <div className={`p-6 rounded-xl border ${isActive ? 'border-[#FF5341]' : 'border-gray-200'} bg-white`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg">{plan}</h3>
          <p className="text-gray-600 text-sm">
            {plan === 'Starter' ? 'Free' : 
             plan === 'Professional' ? '$19/month' : 
             '$49/month'}
          </p>
        </div>
        {isActive && (
          <span className="bg-[#FF5341] bg-opacity-10 text-[#FF5341] px-3 py-1 rounded-full text-sm">
            Active
          </span>
        )}
      </div>
      
      <div className="space-y-3 mb-6">
        {features[plan].map((feature, index) => (
          <div key={index} className="flex items-center text-sm">
            <Check className="w-4 h-4 text-[#FF5341] mr-2" />
            <span>{feature}</span>
          </div>
        ))}
      </div>

      {!isActive && (
        <button
          onClick={() => onUpgrade(plan)}
          className="w-full bg-[#FF5341] text-white py-2 rounded-lg hover:bg-[#FF5341]/90 transition-colors"
        >
          Upgrade to {plan}
        </button>
      )}
    </div>
  );
};


const BillingHistory = ({ transactions }) => (
  <div className="bg-[#FFFAF3] rounded-xl p-6">
    <h3 className="font-semibold mb-4">Billing History</h3>
    <div className="space-y-4">
      {transactions.map((transaction, index) => (
        <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
          <div>
            <p className="font-medium">{transaction.plan}</p>
            <p className="text-sm text-gray-600">{transaction.date}</p>
          </div>
          <div className="text-right">
            <p className="font-medium">{transaction.amount}</p>
            <p className="text-sm text-green-600">{transaction.status}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);


const CurrentPlan = ({ plan, onManage, onCancel }) => (
  <div className="bg-[#FFFAF3] rounded-xl p-6">
    <div className="flex justify-between items-start mb-6">
      <div>
        <h3 className="font-semibold mb-1">Current Plan</h3>
        <p className="text-sm text-gray-600">
          Your subscription renews on {plan.renewalDate}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <CreditCard className="w-5 h-5 text-[#FF5341]" />
        <Calendar className="w-5 h-5 text-[#FF5341]" />
      </div>
    </div>

    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="font-medium">{plan.name}</span>
        <span className="font-medium">{plan.price}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-[#FF5341] h-2 rounded-full"
          style={{ width: `${(plan.creditsUsed / plan.totalCredits) * 100}%` }}
        />
      </div>
      <div className="flex justify-between mt-2 text-sm text-gray-600">
        <span>{plan.creditsUsed} credits used</span>
        <span>{plan.totalCredits} total credits</span>
      </div>
    </div>

    <div className="flex space-x-4">
      <button
        onClick={onManage}
        className="flex-1 bg-[#FF5341] text-white py-2 rounded-lg hover:bg-[#FF5341]/90 transition-colors"
      >
        Manage Plan
      </button>
      <button
        onClick={onCancel}
        className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition-colors"
      >
        Cancel Plan
      </button>
    </div>
  </div>
);

export { PlanCard, BillingHistory, CurrentPlan };