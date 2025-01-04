import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Shared/Sidebar';
import { Search, Bell, Zap, WholeWord, FileText, Download, ArrowRight } from 'lucide-react';
import ai1 from '../assets/ai1.svg';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

<FontAwesomeIcon icon={faCalendarAlt} className="h-5 w-5 text-gray-500" />




const StatCard = ({ title, value, icon: Icon }) => (
  <div className="bg-[#FFFAF3] rounded-xl p-4">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm text-gray-600 mb-1">{title}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
      <div className="bg-[#FF5341] p-2 rounded-lg">
        <Icon className="w-5 h-5 text-white" />
      </div>
    </div>
  </div>
);

const wordGenerationData = [
  { date: '1 Dec', words: 2400 },
  { date: '5 Dec', words: 1398 },
  { date: '10 Dec', words: 3800 },
  { date: '15 Dec', words: 3908 },
  { date: '20 Dec', words: 4800 },
  { date: '25 Dec', words: 3800 },
  { date: '30 Dec', words: 4300 },
];

const ArticleCard = ({ title, date }) => (
  <div className="bg-[#FFFAF3] rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-400">
    <h3 className="font-medium mb-2 text-sm md:text-base">{title}</h3>
    <p className="text-xs md:text-sm text-gray-500">{date}</p>
  </div>
);

const Dashboard = () => {

    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const filteredData = wordGenerationData.filter(
      (data) => new Date(data.date).toLocaleDateString() === selectedDate.toLocaleDateString()
    );
    
  
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
  const navigate = useNavigate();



  return (
    <div className="flex min-h-screen">
      {/* Fixed Sidebar */}
      <div className="fixed left-0 h-screen">
        <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
      </div>

      {/* Main Content with dynamic margin based on sidebar state */}
      <div className={`flex-1 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'} transition-all duration-300`}>
        <div className="p-4 md:p-8">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
            <div>
              <h1 className="text-xl md:text-2xl font-semibold mb-1">
                Good Morning, Zay{' '}
                <span role="img" aria-label="wave">👋</span>
              </h1>
              <p className="text-sm md:text-base text-gray-600">Welcome To Simply Dashboard</p>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#FF5341]"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-[#FF5341] rounded-full"></span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
            <StatCard title="Total Credits Left" value="1400" icon={Zap} />
            <StatCard title="Total Words Generated" value="550" icon={WholeWord} />
            <StatCard title="Total Templates Run" value="30" icon={FileText} />
            <StatCard title="Total Documents Saved" value="13" icon={Download} />
          </div>

         {/* Feature Cards */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
            {/* Current Plan Card */}
            <div className="bg-[#FF5341] rounded-xl p-4 md:p-6 text-white">
              <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs md:text-sm mb-4">
                Current Plan
              </span>
              <h2 className="text-xl md:text-2xl font-semibold mb-2">Professional Plus</h2>
              <p className="text-sm md:text-base mb-4">You An Active Subscription</p>
              <div className="flex justify-between items-center">
                <button 
                onClick={() => navigate('/profile')}
                className="px-3 md:px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors text-sm md:text-base">
                  Manage Plans
                </button>
                <span className="text-xl md:text-2xl font-semibold">$19/Month</span>
              </div>
            </div>

            {/* Generate AI Content Card */}
            <div className="bg-[#FFFAF3] rounded-xl p-4 md:p-6">
              <div className="flex flex-col md:flex-row md:justify-between space-y-4 md:space-y-0">
                <div className="flex-1">
                  <h2 className="text-lg md:text-xl font-semibold mb-2">Create Template On One Click</h2>
                  <p className="text-xs md:text-sm text-gray-600 mb-4">
                    Effortlessly Create Precise, Engaging, And SEO-Optimized Template In Just One Go With Our Powerful AI Model!
                  </p>
                  <button className="flex items-center text-[#FF5341] font-medium hover:opacity-90 text-sm md:text-base">
                    Create Now <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
                <div className="w-full md:w-1/3">
                  <img src={ai1} alt="AI Generation" className="w-full" />
                </div>
              </div>
            </div>
          </div>

          {/* SEO Articles Section */}
          <div className="bg-[#FFFAF3] rounded-xl p-4 md:p-6 -mb-2">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0 mb-6">
              <div>
                <h2 className="text-base md:text-lg font-semibold">Most Recent Documents Generated</h2>
                <p className="text-xs md:text-sm text-gray-600">Manage Your Generated Articles here</p>
              </div>
              <button 
              onClick={() => navigate('/documents')}
              className="flex items-center text-gray-600 hover:opacity-90 text-sm md:text-base">
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {[...Array(6)].map((_, index) => (
                <ArticleCard
                  key={index}
                  title='"Top 5 AI SEO Writing & Compliance Checking Softwares in 2025"'
                  date="24th December, 2025"
                />
              ))}
            </div>
          </div>


{/* Words Generation Graph */}
<div className="bg-[#FFFAF3] rounded-xl p-4 md:p-6 mt-8">
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0 mb-6">
    <div>
      <h2 className="text-base md:text-lg font-semibold">Words Generated</h2>
      <p className="text-xs md:text-sm text-gray-600">Select a date to view statistics</p>
    </div>
    <div className="relative">
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        className="border rounded-lg px-2 py-1 pl-10" // Extra padding for the icon
      />
      {/* Calendar Icon */}
      <div className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500 pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    </div>
  </div>

  <div className="h-64">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={filteredData.length ? filteredData : wordGenerationData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 12, fill: '#6B7280' }}
          tickLine={false}
          axisLine={{ stroke: '#E5E7EB' }}
        />
        <YAxis
          tick={{ fontSize: 12, fill: '#6B7280' }}
          tickLine={false}
          axisLine={{ stroke: '#E5E7EB' }}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: '8px',
            padding: '8px',
          }}
          labelStyle={{ color: '#374151', fontWeight: 500 }}
          itemStyle={{ color: '#FF5341' }}
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



        </div>
        <div className="p-4 md:p-8">
     {/* Favourite Template Section */}
<div className="bg-[#FFFAF3] rounded-xl p-4 md:p-6 mb-8">
  <div className="flex justify-between items-center mb-6">
    <div>
      <h2 className="text-lg md:text-xl font-semibold mb-1">Favourite Template</h2>
      <p className="text-xs md:text-sm text-gray-600">Choose Your Favourite Template & Generate Accurate Content</p>
    </div>
    <button
      onClick={() => navigate('/ai-writer')}
      className="flex items-center text-gray-600 hover:opacity-90 text-sm md:text-base"
    >
      View All <ArrowRight className="w-4 h-4 ml-1" />
    </button>
  </div>
  
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4" >
    {[
      { title: 'Content Writing', desc: 'Generate Compelling And Innovative Content Tailored To Your Needs With AI' },
      { title: 'LinkedIn Post', desc: 'Generate Compelling And Innovative Content Tailored To Your Needs With AI' },
      { title: 'Web Developer', desc: 'Generate Compelling And Innovative Content Tailored To Your Needs With AI' },
      { title: 'Blog Writing', desc: 'Generate Compelling And Innovative Content Tailored To Your Needs With AI' },
    ].map((template, index) => (
      <div key={index} className="bg-[#FF5341] rounded-xl p-4 text-white">
        <div className="flex justify-between items-center mb-3 pb-3 border-b border-white/20">
          <h3 className="text-base md:text-lg font-medium">{template.title}</h3>
        </div>
        <p className="text-xs md:text-sm text-white/90">{template.desc}</p>
      </div>
    ))}
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
              className="flex items-center text-gray-600 hover:opacity-90 text-sm md:text-base">
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>

            <div className="space-y-4">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="text-sm md:text-base font-medium">March, 01, 2020</p>
                    <p className="text-xs md:text-sm text-gray-500">#MS-415646</p>
                  </div>
                  <div className="flex items-center text-[#FF5341]">
                    <FileText className="w-5 h-5 mr-2" />
                    <span className="text-sm">PDF</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Need Assistance Section */}
          <div className="bg-black rounded-xl p-6 md:p-8 text-white mb-8 w-full">
            <h2 className="text-xl md:text-2xl font-semibold mb-2">Need Assistance?</h2>
            <p className="text-sm md:text-base text-gray-300 mb-6 max-w-2xl">
              Have Questions? Simply Has You Covered! From AI-Powered Tools To Content Tips, We're Here To Make Content Creation Easy And Hassle-Free.
            </p>
            <button 
            onClick={() => navigate('/help')}
            className="bg-[#FF5341] text-white px-6 py-3 rounded-lg flex items-center text-sm md:text-base hover:bg-opacity-90 transition-colors border border-white">
              Get Help Now <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
      </div>
    </div>
    </div>
  );
};
export default Dashboard;