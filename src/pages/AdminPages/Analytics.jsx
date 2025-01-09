// src/pages/AdminPages/Analytics.jsx
import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp,
  DollarSign,
  Users,
  FileText,
  Bot,
  ChevronDown,
  Download,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight
} from 'lucide-react';

// Dummy data for visualizations
const revenueData = [
  { month: 'Jan', revenue: 42000, users: 320 },
  { month: 'Feb', revenue: 48000, users: 380 },
  { month: 'Mar', revenue: 55000, users: 450 },
  { month: 'Apr', revenue: 52000, users: 420 },
  { month: 'May', revenue: 61000, users: 490 },
  { month: 'Jun', revenue: 68000, users: 520 }
];

const contentGenerationData = [
  { date: '2024-01', AI: 15000, SEO: 8000, Translation: 5000 },
  { date: '2024-02', AI: 18000, SEO: 9500, Translation: 6000 },
  { date: '2024-03', AI: 22000, SEO: 11000, Translation: 7500 },
  { date: '2024-04', AI: 25000, SEO: 12500, Translation: 8000 },
  { date: '2024-05', AI: 28000, SEO: 14000, Translation: 9500 },
  { date: '2024-06', AI: 32000, SEO: 16000, Translation: 11000 }
];

const userActivityData = [
  { name: 'Active', value: 65 },
  { name: 'Inactive', value: 35 }
];

const templateUsageData = [
  { template: 'Content Writing', usage: 2800 },
  { template: 'Blog Posts', usage: 2200 },
  { template: 'Social Media', usage: 1900 },
  { template: 'Email', usage: 1500 },
  { template: 'SEO', usage: 1200 }
];

const COLORS = ['#FF5341', '#FF8F85', '#FFB4AE', '#FFD9D6', '#FFF0EF'];
const COLORS_PIE = ['#FF5341', '#FFE5E2'];

const MetricCard = ({ title, value, change, icon: Icon, changeType }) => (
  <div className="bg-white rounded-xl p-6">
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
      <span>{change}% from last month</span>
    </div>
  </div>
);

const DateRangeSelector = ({ range, setRange }) => (
  <div className="flex items-center space-x-2">
    <button className="p-2 rounded-lg border flex items-center">
      <Calendar className="w-4 h-4 mr-2" />
      {range}
      <ChevronDown className="w-4 h-4 ml-2" />
    </button>
    <button className="p-2 rounded-lg border">
      <Download className="w-4 h-4" />
    </button>
  </div>
);

const AnalyticsCard = ({ title, subtitle, children }) => (
  <div className="bg-white rounded-xl p-6">
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
  const [dateRange, setDateRange] = useState('Last 6 months');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600">Monitor your platform's performance and user engagement</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Monthly Revenue"
          value="$68,000"
          change="12.5"
          icon={DollarSign}
          changeType="increase"
        />
        <MetricCard
          title="Total Users"
          value="520"
          change="8.3"
          icon={Users}
          changeType="increase"
        />
        <MetricCard
          title="Content Generated"
          value="59,000"
          change="15.2"
          icon={FileText}
          changeType="increase"
        />
        <MetricCard
          title="AI Usage"
          value="32,000"
          change="4.8"
          icon={Bot}
          changeType="decrease"
        />
      </div>

      {/* Revenue & Users Chart */}
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
            <BarChart data={contentGenerationData}>
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
              <Bar dataKey="Translation" fill="#FFB4AE" />
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
                  data={userActivityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {userActivityData.map((entry, index) => (
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
                data={templateUsageData}
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
                  {templateUsageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </AnalyticsCard>
      </div>

      {/* Credit Usage Section */}
      <AnalyticsCard
        title="Credit Usage Analytics"
        subtitle="Monitor credit consumption across features"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Content Writing</p>
              <div className="flex items-center text-sm text-gray-600">
                <span>32,000 credits</span>
                <span className="mx-2">•</span>
                <span className="text-green-600 flex items-center">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  15.2%
                </span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-[#FF5341] h-2.5 rounded-full" style={{ width: '70%' }}></div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">SEO Writing</p>
              <div className="flex items-center text-sm text-gray-600">
                <span>24,500 credits</span>
                <span className="mx-2">•</span>
                <span className="text-green-600 flex items-center">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  12.8%
                </span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-[#FF8F85] h-2.5 rounded-full" style={{ width: '55%' }}></div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Translation</p>
              <div className="flex items-center text-sm text-gray-600">
                <span>18,200 credits</span>
                <span className="mx-2">•</span>
                <span className="text-red-600 flex items-center">
                  <ArrowDownRight className="w-4 h-4 mr-1" />
                  8.4%
                </span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-[#FFB4AE] h-2.5 rounded-full" style={{ width: '40%' }}></div>
          </div>
        </div>
      </AnalyticsCard>
    </div>
  );
};

export default Analytics;