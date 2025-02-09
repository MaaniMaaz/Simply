// src/pages/UserPages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Shared/Sidebar';
import { 
  Users,
  FileText,
  Layout,
  BarChart2,
  Settings,
  FileEdit,
  MenuIcon,
  Bell,
  Zap,
  Download,
  ArrowRight,
  Play,
  FileCheck2,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ai1 from '../../assets/ai1.svg';
import { dashboardService } from '../../api/dashboard';
import { getTimeBasedGreeting } from '../../utils/helpers';

const formatDateToYYYYMMDD = (date) => {
  return date.toISOString().split('T')[0];
};


const getDefaultDateRange = () => {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - 6); 
  
  return {
      startDate: formatDateToYYYYMMDD(start),
      endDate: formatDateToYYYYMMDD(end)
  };
};

const StatCard = ({ title, value, icon: Icon, change, changeType }) => (
  <div className="bg-[#FFFAF3] rounded-xl p-4">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm text-gray-600 mb-1">{title}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
      <div className="bg-[#FF5341] bg-opacity-10 p-3 rounded-lg">
        <Icon className="w-5 h-5 text-[#FF5341]" />
      </div>
    </div>
  </div>
);

const ArticleCard = ({ title, date }) => (
  <div className="bg-[#FFFAF3] rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-400">
    <h3 className="font-medium mb-2 text-sm md:text-base">{title}</h3>
    <p className="text-xs md:text-sm text-gray-500">{date}</p>
  </div>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [recentDocuments, setRecentDocuments] = useState([]);
  const [favoriteTemplates, setFavoriteTemplates] = useState([]);
  const [documentHistory, setDocumentHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wordStats, setWordStats] = useState([]);
  const [dateRange, setDateRange] = useState(getDefaultDateRange());



  useEffect(() => {
    const handleResize = () => {
      setIsSidebarCollapsed(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchWordStats = async () => {
        try {
            const response = await dashboardService.getWordsGenerated(
                dateRange.startDate,
                dateRange.endDate
            );
            setWordStats(response.data);
        } catch (err) {
            console.error('Error fetching word stats:', err);
            // Handle error appropriately
        }
    };

    fetchWordStats();
}, [dateRange.startDate, dateRange.endDate]);


  // Main data fetching useEffect
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Get all data in parallel
        const [
          statsResponse,
          documentsResponse,
          templatesResponse,
          historyResponse
        ] = await Promise.all([
          dashboardService.getStats(),
          dashboardService.getRecentDocuments(),
          dashboardService.getFavoriteTemplates(),
          dashboardService.getDocumentHistory()
        ]);
  
        setDashboardData({
          name: statsResponse.data.name,
          credits_left: statsResponse.data.credits_left,
          total_words_generated: statsResponse.data.total_words_generated,
          total_templates_run: statsResponse.data.total_templates_run,
          total_documents_saved: statsResponse.data.total_documents_saved,
          current_plan: statsResponse.data.current_plan
        });
  
        setRecentDocuments(documentsResponse.data);
        setFavoriteTemplates(templatesResponse.data);
        setDocumentHistory(historyResponse.data);
  
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching dashboard data');
      } finally {
        setLoading(false);
      }
    };
  
    fetchDashboardData();
  }, []);

  const handleDateChange = (type, value) => {
    setDateRange(prev => ({
        ...prev,
        [type]: value
    }));
};


  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF5341]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden md:block md:fixed md:left-0 md:h-screen">
        <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
      </div>

      <div className={`flex-1 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'} transition-all duration-300`}>
        <div className="p-4 md:p-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
            <div>
              <h1 className="text-xl md:text-2xl font-semibold mb-1">
                {getTimeBasedGreeting()}, {dashboardData?.name}{' '}
                <span role="img" aria-label="wave">👋</span>
              </h1>
              <p className="text-sm md:text-base text-gray-600">Welcome To Simply Dashboard</p>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
              <div className="relative">
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

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
            <StatCard 
              title="Total Credits Left" 
              value={dashboardData?.credits_left} 
              icon={Zap}
              change="12.5"
              changeType="increase"
            />
            <StatCard 
              title="Total Words Generated" 
              value={dashboardData?.total_words_generated} 
              icon={FileText}
              change="15.2"
              changeType="increase"
            />
            <StatCard 
              title="Total Templates Run" 
              value={dashboardData?.total_templates_run} 
              icon={FileEdit}
              change="8.3"
              changeType="increase"
            />
            <StatCard 
              title="Total Documents Saved" 
              value={dashboardData?.total_documents_saved} 
              icon={Download}
              change="4.8"
              changeType="decrease"
            />
          </div>

          {/* Current Plan Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
            {dashboardData?.current_plan ? (
              <div className="bg-[#FF5341] rounded-xl p-4 md:p-6 text-white">
                <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs md:text-sm mb-4">
                  Current Plan
                </span>
                <h2 className="text-xl md:text-2xl font-semibold mb-2">
                  {dashboardData.current_plan.name}
                </h2>
                <p className="text-sm md:text-base mb-4">You have an active subscription</p>
                <div className="flex justify-between items-center">
                  <button 
                    onClick={() => navigate('/profile')} 
                    className="px-3 md:px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors text-sm md:text-base">
                    Manage Plans
                  </button>
                  <span className="text-xl md:text-2xl font-semibold">
                    ${dashboardData.current_plan.price}/Month
                  </span>
                </div>
              </div>
            ) : (
              <div className="bg-[#FF5341] rounded-xl p-4 md:p-6 text-white">
                <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs md:text-sm mb-4">
                  No Active Plan
                </span>
                <p className="text-sm md:text-base mb-4">Subscribe to a plan to get started</p>
                <button 
                  onClick={() => navigate('/profile')}
                  className="px-3 md:px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors text-sm md:text-base">
                  View Plans
                </button>
              </div>
            )}

            {/* Generate AI Content Card */}
            <div className="bg-[#FFFAF3] rounded-xl p-4 md:p-6">
              <div className="flex flex-col md:flex-row md:justify-between space-y-4 md:space-y-0">
                <div className="flex-1">
                  <h2 className="text-lg md:text-xl font-semibold mb-2">Create Template On One Click</h2>
                  <p className="text-xs md:text-sm text-gray-600 mb-4">
                    Effortlessly Create Precise, Engaging, And SEO-Optimized Template In Just One Go With Our Powerful AI Model!
                  </p>
                  <button 
                    onClick={() => navigate('/template-builder')}
                    className="flex items-center text-[#FF5341] font-medium hover:opacity-90 text-sm md:text-base"
                  >
                    Create Now <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
                <div className="w-full md:w-1/3">
                  <img src={ai1} alt="AI Generation" className="w-full" />
                </div>
              </div>
            </div>
          </div>

          

{/* Words Generation Graph */}
<div className="bg-[#FFFAF3] rounded-xl p-4 md:p-6 mb-8">
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 mb-6">
    <div>
      <h2 className="text-lg md:text-xl font-semibold">Words Generated</h2>
      <p className="text-xs md:text-sm text-gray-600">View statistics by date range</p>
    </div>
    <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
      <div className="flex gap-4">
        <input
          type="date"
          className="px-3 py-2 border rounded-lg text-sm"
          value={dateRange.startDate}
          max={dateRange.endDate}
          onChange={(e) => handleDateChange('startDate', e.target.value)}
        />
        <input
          type="date"
          className="px-3 py-2 border rounded-lg text-sm"
          value={dateRange.endDate}
          min={dateRange.startDate}
          max={formatDateToYYYYMMDD(new Date())}
          onChange={(e) => handleDateChange('endDate', e.target.value)}
        />
      </div>
    </div>
  </div>

  <div className="h-64">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={wordStats}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis 
  dataKey="date"
  tick={{ fontSize: 12, fill: '#6B7280' }}
  tickLine={false}
  axisLine={{ stroke: '#E5E7EB' }}
  tickFormatter={(value) => {
    if (!value) return '';

    const formattedDate = new Date(value);
    if (isNaN(formattedDate)) return '';

    // Get the difference in days between start and end date
    const start = new Date(dateRange.startDate);
    const end = new Date(dateRange.endDate);
    const timeDiff = end.getTime() - start.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    // If value includes a time (single-day view), format as time
    if (value.includes(':')) {
      return formattedDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      });
    }

    // Format the date based on the selected range
    if (daysDiff <= 1) {
      return formattedDate.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
    } else if (daysDiff <= 31) {
      return formattedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    } else if (daysDiff <= 365) {
      return formattedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    } else {
      return formattedDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    }
  }}
/>

        <YAxis
          tick={{ fontSize: 12, fill: '#6B7280' }}
          tickLine={false}
          axisLine={{ stroke: '#E5E7EB' }}
          tickFormatter={(value) => value.toLocaleString()}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: '8px',
            padding: '8px',
          }}
          labelStyle={{ color: '#374151', fontWeight: 500 }}
          labelFormatter={(value) => {
            if (!value) return '';
            return new Date(value).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: value.includes(':') ? 'numeric' : undefined
            });
          }}
          formatter={(value) => [`${value.toLocaleString()} words`]}
        />
        <Line
          type="monotone"
          dataKey="words"
          stroke="#FF5341"
          strokeWidth={2}
          dot={{ fill: '#FF5341', strokeWidth: 2 }}
          activeDot={{ r: 6, fill: '#FF5341' }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
</div>

          {/* SEO Articles Section */}
          <div className="bg-[#FFFAF3] rounded-xl p-4 md:p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg md:text-xl font-semibold mb-1">Most Recent Documents Generated</h2>
                <p className="text-xs md:text-sm text-gray-600">Manage Your Generated Articles here</p>
              </div>
              <button 
                onClick={() => navigate('/documents')}
                className="flex items-center text-gray-600 hover:opacity-90 text-sm md:text-base"
              >
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {recentDocuments.length > 0 ? (
                recentDocuments.map((doc) => (
                  <ArticleCard
                    key={doc._id}
                    title={doc.name}
                    date={formatDate(doc.created_at)}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-8 text-gray-500">
                  No documents generated yet
                </div>
              )}
            </div>
          </div>

          {/* Favourite Template Section */}
          <div className="bg-[#FFFAF3] rounded-xl p-4 md:p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg md:text-xl font-semibold mb-1">Favourite Templates</h2>
                <p className="text-xs md:text-sm text-gray-600">Choose Your Favourite Template & Generate Accurate Content</p>
              </div>
              <button
                onClick={() => navigate('/ai-writer')}
                className="flex items-center text-gray-600 hover:opacity-90 text-sm md:text-base"
              >
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
    {favoriteTemplates.length > 0 ? (
      favoriteTemplates
        // Sort templates by creation date (newest first)
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        // Take only first 4 items
        .slice(0, 4)
        .map((template) => (
                  <div key={template._id} className="bg-[#FF5341] rounded-xl p-4 text-white">
                    <div className="flex justify-between items-center mb-3 pb-3 border-b border-white/20">
                      <h3 className="text-base md:text-lg font-medium">{template.name}</h3>
                    </div>
                    <p className="text-xs md:text-sm text-white/90">{template.description}</p>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-8 text-gray-500">
                  No favorite templates yet
                </div>
              )}
            </div>
          </div>

          {/* Document History Section */}
          <div className="bg-[#FFFAF3] rounded-xl p-4 md:p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg md:text-xl font-semibold mb-1">Document History</h2>
                <p className="text-xs md:text-sm text-gray-600">View Your Recently Generated Documents</p>
              </div>
              <button 
                onClick={() => navigate('/documents')}
                className="flex items-center text-gray-600 hover:opacity-90 text-sm md:text-base"
              >
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>

            <div className="space-y-4">
              {documentHistory.length > 0 ? (
                documentHistory.map((doc) => (
                  <div key={doc._id} className="flex justify-between items-center">
                    <div>
                    <p className="text-sm md:text-base font-medium">{doc.name}</p>
                      <p className="text-xs md:text-sm text-gray-500 ">{formatDate(doc.created_at)}</p>
                    </div>
                    <div className="flex items-center text-[#FF5341]">
                      <FileText className="w-5 h-5 mr-2" />
                      <span className="text-sm">{doc.type}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No document history available
                </div>
              )}
            </div>
          </div>

          {/* Need Assistance Section */}
          <div className="bg-black rounded-xl p-6 md:p-8 text-white mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-2">Need Assistance?</h2>
            <p className="text-sm md:text-base text-gray-300 mb-6 max-w-2xl">
              Have Questions? Simply Has You Covered! From AI-Powered Tools To Content Tips, We're Here To Make Content Creation Easy And Hassle-Free.
            </p>
            <button 
              onClick={() => navigate('/help')}
              className="bg-[#FF5341] text-white px-6 py-3 rounded-lg flex items-center text-sm md:text-base hover:bg-opacity-90 transition-colors border border-white"
            >
              Get Help Now <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;