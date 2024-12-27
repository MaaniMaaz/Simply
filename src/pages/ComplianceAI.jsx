// src/pages/ComplianceAI.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Shared/Sidebar';
import { 
  Bell, 
  Zap, 
  Upload,
  Download,
  Share2,
  Play,
  ThumbsUp,
  ThumbsDown,
  MenuIcon,
  Copy,
  ChevronDown,
  Repeat
} from 'lucide-react';


const ComplianceAI = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [analysisType, setAnalysisType] = useState('compliance');
  const [file, setFile] = useState(null);
  const [content, setContent] = useState('');

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

        {/* Content Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Left Card */}
            <div className="col-span-1 md:col-span-4 bg-[#FFFAF3] rounded-xl p-6">
              <h2 className="text-xl font-bold mb-2">
                {analysisType === 'compliance' ? 'Compliance AI Checker' : 'Brand Voice Checker'}
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Effortlessly Ensure Your Content Aligns With Compliance Standards And Brand Guidelines.
              </p>

              <div className="bg-[#FF5341] text-white rounded-lg p-3 mb-6 flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Your Balance Is 3000 Credits
              </div>

              {/* Upload Document - Updated Simple Style */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Compliance Document
                </label>
                <div className="flex">
                  <input
                    type="text"
                    className="flex-1 rounded-l-lg border border-r-0 p-2 bg-white"
                    placeholder="Upload Document"
                    value={file ? file.name : ''}
                    readOnly
                  />
                  <label className="px-3 py-2 bg-gray-100 border rounded-r-lg cursor-pointer hover:bg-gray-200 flex items-center">
                    <Upload className="w-5 h-5 text-gray-600" />
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </label>
                </div>
              </div>

              {/* Content Submission */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content Submission
                </label>
                <textarea
                  rows={6}
                  className="block w-full rounded-lg border shadow-sm focus:border-[#FF5341] focus:ring-[#FF5341] sm:text-sm"
                  placeholder="Input Your Content Here To Check For Compliance And Brand Alignment."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              {/* Analysis Type Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Analysis Type
                </label>
                <div className="relative">
                  <select
                    className="block w-full rounded-lg border py-2 pl-3 pr-10 text-base focus:border-[#FF5341] focus:outline-none focus:ring-[#FF5341] sm:text-sm"
                    value={analysisType}
                    onChange={(e) => setAnalysisType(e.target.value)}
                  >
                    <option value="compliance">Compliance Check</option>
                    <option value="brand-voice">Brand Voice Check</option>
                  </select>
                </div>
              </div>

              <button className="mt-6 w-full bg-[#FF5341] text-white py-3 rounded-lg hover:bg-[#FF5341]/90 transition-colors flex items-center justify-center">
                Run Analysis
                <Play className="w-4 h-4 ml-2 fill-current" />
              </button>
            </div>

            {/* Right Card */}
            <div className="col-span-1 md:col-span-8 bg-[#FFFAF3] rounded-xl p-6">
              {/* Header with Download/Share buttons */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  {analysisType === 'compliance' ? 'Compliance Check Result' : 'Brand Voice Check Result'}
                </h2>
                <div className="flex space-x-2">
                  <button className="p-2 rounded-lg bg-[#FF5341] bg-opacity-10">
                    <Download className="w-5 h-5 text-[#FF5341]" />
                  </button>
                  <button className="p-2 rounded-lg bg-[#FF5341] bg-opacity-10">
                    <Share2 className="w-5 h-5 text-[#FF5341]" />
                  </button>
                </div>
              </div>

              {/* Score Section - Updated Layout */}
              {/* Score Section - Updated Layout */}
<div className="mb-8">
  <div className="flex flex-col md:flex-row items-start justify-between">
    <div>
      {/* Score Title and Graph */}
      <h3 className="text-lg font-bold mb-4">
        {analysisType === 'compliance' ? 'Compliance Score' : 'Brand Voice Score'}
      </h3>
      <div className="relative w-56 h-56 border border-black rounded-lg p-4">
        <svg viewBox="0 0 200 200" className="transform -rotate-90 w-48 h-48">
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="#2A2A2A"
            strokeWidth="24"
            className="opacity-60"
          />
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="#FF5341"
            strokeWidth="24"
            strokeDasharray={`${85 * 5.02} 502`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl font-bold">85</span>
        </div>
      </div>
    </div>

    <div className="md:w-1/2 mt-4 md:mt-0 relative -left-4 flex flex-col items-start md:items-end">
      <p className="text-gray-600 text-lg mb-4">
        Your content meets most of the {analysisType === 'compliance' ? 'compliance' : 'brand voice'} standards but requires some adjustments.
      </p>
      <button className="bg-[#FF5341] ml-auto relative -left-36 text-white px-6 py-2.5 rounded-lg hover:bg-[#FF5341]/90 transition-colors flex items-center">
        Fix Content
        <Play className="w-4 h-4 ml-2 fill-current" />
      </button>
    </div>
  </div>
</div>


              {/* Issues Section */}
              <div className="mb-8">
                <h3 className="text-[#FF5341] font-medium mb-4">Identified Issues:</h3>
                <ul className="space-y-4">
                  <li>
                    <p className="font-medium mb-1">1. Usage Of Restricted Terms:</p>
                    <ul className="list-disc list-inside pl-4 space-y-1 text-sm text-gray-600">
                      <li>The Term "Guaranteed Results" Violates Compliance Guidelines.</li>
                      <li>Suggestion: Replace With "Achieve Likely Results" To Align With Standards.</li>
                    </ul>
                  </li>
                  <li>
                    <p className="font-medium mb-1">2. Missing Legal Disclaimers:</p>
                    <ul className="list-disc list-inside pl-4 space-y-1 text-sm text-gray-600">
                      <li>Your Content Lacks A Required Disclaimer For Liability.</li>
                      <li>Suggestion: Add A Disclaimer Such As "Results May Vary Depending On Individual Use."</li>
                    </ul>
                  </li>
                </ul>
              </div>

              {/* Recommendations Section */}
<div>
  <h3 className="text-[#FF5341] font-medium mb-4">Recommended Actions:</h3>
  <ul className="list-disc list-inside pl-4 space-y-2 text-sm text-gray-600">
    <li>Review And Update Restricted Terms To Align With Compliance Guidelines.</li>
    <li>Include All Required Legal Disclaimers At The End Of The Content.</li>
    <li>Cross-Check And Update All Referenced Policies For Consistency.</li>
  </ul>

 
</div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceAI;