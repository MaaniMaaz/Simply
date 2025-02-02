// src/pages/AdminPages/Analytics.jsx
import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import { 
  DollarSign, Users, FileText, Bot, 
  ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { adminAnalyticsService } from '../../api/adminAnalytics';

const COLORS = ['#FF5341', '#FF8F85', '#FFB4AE'];
const COLORS_PIE = ['#FF5341', '#FFE5E2'];

const MetricCard = ({ title, value, change, icon: Icon, changeType }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm">
    <div className="flex items-start justify-between mb-4">
      <div>
        <p className="text-sm text-gray-600 mb-1">{title}</p>
        <h3 className="text-2xl font-semibold">{value}</h3>
      </div>
      <div className="bg-[#FF5341] bg-opacity-10 p-3 rounded-lg">
        <Icon className="w-6 h-6 text-[#FF5341]" />
      </div>
    </div>
    <div className={`flex items-center text-sm ${
      changeType === 'increase' ? 'text-green-600' : 'text-red-600'
    }`}>
      {changeType === 'increase' ? (
        <ArrowUpRight className="w-4 h-4 mr-1" />
      ) : (
        <ArrowDownRight className="w-4 h-4 mr-1" />
      )}
      <span>{Math.abs(change)}% from last month</span>
    </div>
  </div>
);

const AnalyticsCard = ({ title, subtitle, children }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm">
    <div className="flex justify-between items-start mb-6">
      <div>
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>
    </div>
    {children}
  </div>
);

const Analytics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [contentData, setContentData] = useState([]);
  const [templateData, setTemplateData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const [dashboard, content, templates, users, revenue] = await Promise.all([
                adminAnalyticsService.getDashboardAnalytics(),
                adminAnalyticsService.getContentStats(),
                adminAnalyticsService.getTemplateStats(),
                adminAnalyticsService.getUserActivity(),
                adminAnalyticsService.getRevenueGrowth()
            ]);

            setDashboardData(dashboard);
            setContentData(content.data || []);
            setTemplateData(templates.data || []);

            // Fix: Ensure user data is correctly formatted
            setUserData(users.data && users.data.length > 0 ? users.data : [
                { name: "Active", value: 0 },
                { name: "Inactive", value: 0 }
            ]);

            setRevenueData(revenue.data || []);

        } catch (err) {
            console.error("Error fetching analytics:", err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    fetchAnalyticsData();
}, []);


  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF5341]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error loading analytics</p>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600">Monitor your platform's performance and user engagement</p>
      </div>

      {/* Quick Stats */}
      {dashboardData && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Monthly Revenue"
            value={`$${dashboardData.revenue.toLocaleString()}`}
            change={dashboardData.revenueGrowth}
            icon={DollarSign}
            changeType={dashboardData.revenueGrowth >= 0 ? 'increase' : 'decrease'}
          />
          <MetricCard
            title="Total Users"
            value={dashboardData.users.toLocaleString()}
            change={dashboardData.userGrowth}
            icon={Users}
            changeType={dashboardData.userGrowth >= 0 ? 'increase' : 'decrease'}
          />
          <MetricCard
            title="Content Generated"
            value={dashboardData.contentGenerated.toLocaleString()}
            change={dashboardData.contentGrowth}
            icon={FileText}
            changeType={dashboardData.contentGrowth >= 0 ? 'increase' : 'decrease'}
          />
          <MetricCard
            title="AI Usage"
            value={dashboardData.aiUsage.toLocaleString()}
            change={dashboardData.aiGrowth}
            icon={Bot}
            changeType={dashboardData.aiGrowth >= 0 ? 'increase' : 'decrease'}
          />
        </div>
      )}

      {/* Revenue & User Growth */}
      <AnalyticsCard
        title="Revenue & User Growth"
        subtitle="Track monthly revenue and user growth trends"
      >
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }}
                tickLine={false}
              />
              <YAxis 
                yAxisId="left"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value/1000}k`}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="revenue"
                stroke="#FF5341"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Revenue"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="users"
                stroke="#FFB4AE"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Users"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </AnalyticsCard>

      {/* Content Generation Chart */}
      <AnalyticsCard
        title="Content Generation Trends"
        subtitle="Monitor content generation across different features"
      >
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={contentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                tickLine={false}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip />
              <Legend />
              <Bar dataKey="AI" fill="#FF5341" />
              <Bar dataKey="SEO" fill="#FF8F85" />
              <Bar dataKey="Compliance" fill="#FFB4AE" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </AnalyticsCard>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Activity */}
        <AnalyticsCard
          title="User Activity"
          subtitle="Active vs Inactive users distribution"
        >
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={userData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {userData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS_PIE[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </AnalyticsCard>

        {/* Template Usage */}
        <AnalyticsCard
          title="Popular Templates"
          subtitle="Most used templates by content generation"
        >
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={templateData}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis type="number" tickLine={false} />
                <YAxis 
                  dataKey="template" 
                  type="category" 
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  width={100}
                />
                <Tooltip />
                <Bar dataKey="usage" fill="#FF5341">
                  {templateData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </AnalyticsCard></div>

{/* Future sections can be added here */}
</div>
);
};

export default Analytics;