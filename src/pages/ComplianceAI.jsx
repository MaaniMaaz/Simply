// src/pages/ComplianceAI.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Shared/Sidebar';
import { 
  Bell, 
  Zap, 
  Upload,
  Download,
  Play,
  MenuIcon,
  Check
} from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


const ComplianceAI = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [analysisType, setAnalysisType] = useState('compliance');
  const [file, setFile] = useState(null);
  const [content, setContent] = useState('');
  const [score, setScore] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isFixing, setIsFixing] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [messageText, setMessageText] = useState('');
  const resultsRef = React.useRef(null);
  const [identifiedIssues, setIdentifiedIssues] = useState([]);
  const [recommendations, setRecommendations] = useState([]);


  const analysisResults = {
    low: {
      score: 45,
      issues: [
        {
          title: "1. Critical Compliance Violations:",
          issues: [
            "Multiple instances of misleading claims found",
            "Missing essential legal disclaimers",
            "Non-compliant marketing language detected"
          ]
        },
        {
          title: "2. Data Privacy Concerns:",
          issues: [
            "Inadequate data handling disclosures",
            "Missing privacy policy references"
          ]
        }
      ],
      recommendations: [
        "Immediately revise all marketing claims",
        "Add required legal disclaimers",
        "Include data privacy statements",
        "Review and update all compliance policies"
      ]
    },
    medium: {
      score: 75,
      issues: [
        {
          title: "1. Minor Compliance Issues:",
          issues: [
            "Some promotional statements need revision",
            "Partial legal disclaimers present"
          ]
        },
        {
          title: "2. Documentation Gaps:",
          issues: [
            "Additional context needed for certain claims",
            "Some policy references missing"
          ]
        }
      ],
      recommendations: [
        "Refine promotional language",
        "Complete all legal disclaimers",
        "Add missing policy references",
        "Update documentation"
      ]
    },
    high: {
      score: 95,
      issues: [
        {
          title: "Content Successfully Verified:",
          issues: [
            "All major compliance requirements met",
            "Legal disclaimers properly implemented",
            "Appropriate language and claims used"
          ]
        }
      ],
      recommendations: [
        "Continue monitoring for compliance updates",
        "Regular review of content policies",
        "Maintain documentation standards"
      ]
    }
  };

  const handleRunAnalysis = () => {
    if (!content.trim()) {
      setMessageText('Please enter some content to analyze');
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate analysis
    setTimeout(() => {
      // Randomly select a score category for demo purposes
      const categories = ['low', 'medium', 'high'];
      const result = analysisResults[categories[Math.floor(Math.random() * categories.length)]];
      
      setScore(result.score);
      setIdentifiedIssues(result.issues);
      setRecommendations(result.recommendations);
      
      setIsAnalyzing(false);
      setMessageText('Analysis completed successfully!');
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    }, 2000);
  };

  
  const handleFixContent = () => {
    if (identifiedIssues.length === 0) {
      setMessageText('Please run analysis first');
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
      return;
    }

    setIsFixing(true);
    
    // Simulate fixing process
    setTimeout(() => {
      const result = analysisResults.high;
      setIdentifiedIssues(result.issues);
      setRecommendations(result.recommendations);
      setScore(result.score);
      
      setIsFixing(false);
      setMessageText('Content fixed successfully!');
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    }, 2000);
  };

  const handleDownload = async () => {
    if (!resultsRef.current) return;

    try {
      setMessageText('Generating PDF...');
      setShowMessage(true);

      const canvas = await html2canvas(resultsRef.current);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('compliance-report.pdf');

      setMessageText('PDF downloaded successfully!');
    } catch (error) {
      setMessageText('Failed to generate PDF');
    } finally {
      setTimeout(() => setShowMessage(false), 3000);
    }
  };

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
  {/* Analysis Type Dropdown */}
  <div className="mb-4">
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

  {/* Heading */}
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

  {/* Upload Document */}
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

  <button 
                onClick={handleRunAnalysis}
                disabled={isAnalyzing}
                className={`mt-6 w-full bg-[#FF5341] text-white py-3 rounded-lg hover:bg-[#FF5341]/90 transition-colors flex items-center justify-center ${
                  isAnalyzing ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isAnalyzing ? (
                  <>
                    Analyzing...
                    <svg className="animate-spin ml-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </>
                ) : (
                  <>
                    Run Analysis
                    <Play className="w-4 h-4 ml-2 fill-current" />
                  </>
                )}
              </button>
</div>

       {/* Right Card */}
       <div className="col-span-1 md:col-span-8 bg-[#FFFAF3] rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  {analysisType === 'compliance' ? 'Compliance Check Result' : 'Brand Voice Check Result'}
                </h2>
                <button 
                  onClick={handleDownload}
                  className="p-2 rounded-lg bg-[#FF5341] bg-opacity-10 hover:bg-opacity-20 transition-colors"
                >
                  <Download className="w-5 h-5 text-[#FF5341]" />
                </button>
              </div>

            {/* Results Section */}
            <div ref={resultsRef}>
                {/* Score Section */}
                <div className="mb-8">
                  <div className="flex flex-col md:flex-row items-start justify-between">
                    <div>
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
                            strokeDasharray={`${score * 5.02} 502`}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-5xl font-bold">{score}</span>
                        </div>
                      </div>
                    </div>

                    <div className="md:w-1/2 mt-4 md:mt-0">
                      <button 
                        onClick={handleFixContent}
                        disabled={isFixing}
                        className={`bg-[#FF5341] text-white px-6 py-2.5 rounded-lg hover:bg-[#FF5341]/90 transition-colors flex items-center ${
                          isFixing ? 'opacity-75 cursor-not-allowed' : ''
                        }`}
                      >
                        {isFixing ? (
                          <>
                            Fixing Content...
                            <svg className="animate-spin ml-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          </>
                        ) : (
                          <>
                            Fix Content
                            <Play className="w-4 h-4 ml-2 fill-current" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Issues Section */}
                {identifiedIssues.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-[#FF5341] font-medium mb-4">Identified Issues:</h3>
                    <ul className="space-y-4">
                      {identifiedIssues.map((issue, index) => (
                        <li key={index}>
                          <p className="font-medium mb-1">{issue.title}</p>
                          <ul className="list-disc list-inside pl-4 space-y-1 text-sm text-gray-600">
                            {issue.issues.map((subIssue, subIndex) => (
                              <li key={subIndex}>{subIssue}</li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Recommendations Section */}
                {recommendations.length > 0 && (
                  <div>
                    <h3 className="text-[#FF5341] font-medium mb-4">Recommended Actions:</h3>
                    <ul className="list-disc list-inside pl-4 space-y-2 text-sm text-gray-600">
                      {recommendations.map((recommendation, index) => (
                        <li key={index}>{recommendation}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Message */}
      {showMessage && (
        <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-lg flex items-center transition-all duration-500 z-50">
          <Check className="w-4 h-4 mr-2" />
          {messageText}
        </div>
      )}
    </div>
  );
};

export default ComplianceAI;