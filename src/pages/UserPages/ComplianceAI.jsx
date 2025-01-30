// src/pages/UserPages/ComplianceAI.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Bell, 
    MenuIcon,
    Download,
    Play,
    Zap,
    Check,
    X,
    ChevronDown,
    AlignLeft,
    AlignCenter,
    AlignRight,
    List,
    ListOrdered,
    Link2
} from 'lucide-react';
import { complianceService } from '../../api/compliance';
import { authService } from '../../api/auth';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Sidebar from '../../components/Shared/Sidebar';
import { documentService } from '../../api/document';

// Editor imports
import StarterKit from '@tiptap/starter-kit';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { useEditor, EditorContent } from '@tiptap/react';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import Heading from '@tiptap/extension-heading';

const ContentEditor = ({ initialContent, onChange }) => {
    const editor = useEditor({
        extensions: [
            Document,
            StarterKit.configure({
                heading: false,
                document: false,
                paragraph: false
            }),
            Paragraph.configure({
                HTMLAttributes: {
                    class: 'text-base',
                },
            }),
            Text,
            Bold.configure(),
            Italic.configure(),
            Underline.configure(),
            // Update the Heading configuration to work with inline text
            Heading.configure({
              levels: [1, 2],
              HTMLAttributes: {
                h1: {
                  class: 'h1-style text-4xl font-bold leading-normal'
                },
                h2: {
                  class: 'h2-style text-2xl font-bold leading-normal'
                }
              }
            }),
            BulletList.configure({
                HTMLAttributes: {
                    class: 'list-disc ml-4'
                }
            }),
            OrderedList.configure({
                HTMLAttributes: {
                    class: 'list-decimal ml-4'
                }
            }),
            ListItem,
            TextAlign.configure({
                types: ['paragraph', 'heading'],
                alignments: ['left', 'center', 'right'],
                defaultAlignment: 'left',
            })
        ],
        editorProps: {
            attributes: {
                class: 'prose max-w-none focus:outline-none min-h-[300px]'
            }
        },
        onUpdate: ({ editor }) => {
            if (!editor) return;
            const content = editor.getHTML();
            onChange(content);
        }   
    });

    useEffect(() => {
        if (editor && initialContent) {
            // Only set content if it's different to avoid cursor reset
            if (editor.getHTML() !== initialContent) {
                editor.commands.setContent(initialContent);
            }
        }
    }, [editor, initialContent]);

    if (!editor) {
        return null;
    }

    return (
        <div className="bg-white rounded-lg border">
            <div className="border-b p-2">
                <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-2 border-r pr-2">
                         {/* H1 Button */}
<button
  onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
  className={`p-1.5 rounded hover:bg-gray-100 ${
    editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : ''
  }`}
>
  H1
</button>

{/* H2 Button */}
<button
  onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
  className={`p-1.5 rounded hover:bg-gray-100 ${
    editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''
  }`}
>
  H2
</button>

{/* Paragraph Button */}
<button
  onClick={() => editor.chain().focus().setParagraph().run()}
  className={`p-1.5 rounded hover:bg-gray-100 ${
    editor.isActive('paragraph') ? 'bg-gray-200' : ''
  }`}
>
  P
</button>
                    </div>

                    <div className="flex items-center gap-2 border-r pr-2">
                        <button
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            className={`p-1.5 rounded hover:bg-gray-100 ${
                                editor.isActive('bold') ? 'bg-gray-200' : ''
                            }`}
                        >
                            <strong>B</strong>
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                            className={`p-1.5 rounded hover:bg-gray-100 ${
                                editor.isActive('italic') ? 'bg-gray-200' : ''
                            }`}
                        >
                            <em>I</em>
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleUnderline().run()}
                            className={`p-1.5 rounded hover:bg-gray-100 ${
                                editor.isActive('underline') ? 'bg-gray-200' : ''
                            }`}
                        >
                            <u>U</u>
                        </button>
                    </div>

                    <div className="flex items-center gap-2 border-r pr-2">
                        <button
                            onClick={() => editor.chain().focus().setTextAlign('left').run()}
                            className={`p-1.5 rounded hover:bg-gray-100 ${
                                editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200' : ''
                            }`}
                        >
                            <AlignLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().setTextAlign('center').run()}
                            className={`p-1.5 rounded hover:bg-gray-100 ${
                                editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200' : ''
                            }`}
                        >
                            <AlignCenter className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().setTextAlign('right').run()}
                            className={`p-1.5 rounded hover:bg-gray-100 ${
                                editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200' : ''
                            }`}
                        >
                            <AlignRight className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex items-center gap-2 border-r pr-2">
                        <button
                            onClick={() => editor.chain().focus().toggleBulletList().run()}
                            className={`p-1.5 rounded hover:bg-gray-100 ${
                                editor.isActive('bulletList') ? 'bg-gray-200' : ''
                            }`}
                        >
                            <List className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleOrderedList().run()}
                            className={`p-1.5 rounded hover:bg-gray-100 ${
                                editor.isActive('orderedList') ? 'bg-gray-200' : ''
                            }`}
                        >
                            <ListOrdered className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
             <EditorContent 
                                  editor={editor} 
                                  className="prose prose-sm sm:prose-base lg:prose-lg max-w-none min-h-[300px] text-sm md:text-base" 
                              />
        </div>
    );
};

const AnalysisTypeDropdown = ({ selectedType, setSelectedType }) => {
    const [isOpen, setIsOpen] = useState(false);
    const types = ['compliance', 'brand_voice'];

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-2 border rounded-lg bg-white"
            >
                <span className="capitalize">
                    {selectedType === 'compliance' ? 'Compliance Check' : 'Brand Voice Check'}
                </span>
                <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
                    {types.map((type) => (
                        <button
                            key={type}
                            onClick={() => {
                                setSelectedType(type);
                                setIsOpen(false);
                            }}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 capitalize"
                        >
                            {type === 'compliance' ? 'Compliance Check' : 'Brand Voice Check'}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

const DocumentSelector = ({ documents, selectedDocument, setSelectedDocument }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredDocuments = documents.filter(doc =>
        doc.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-2 border rounded-lg bg-white"
            >
                <span>{selectedDocument ? selectedDocument.name : 'Select Document'}</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    <div className="p-2 border-b">
                        <input
                            type="text"
                            placeholder="Search documents..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full p-2 border rounded-lg text-sm"
                        />
                    </div>
                    {filteredDocuments.map((doc) => (
                        <button
                            key={doc._id}
                            onClick={() => {
                                setSelectedDocument(doc);
                                setIsOpen(false);
                            }}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center justify-between"
                        >
                            <span>{doc.name}</span>
                            <span className="text-xs text-gray-500">{doc.type}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};


const ResultsDisplay = ({ score, issues, recommendations, onFix, isFixing }) => (
  <div className="space-y-6">
      {/* Score Section */}
      <div className="mb-8">
          <div className="flex flex-col md:flex-row items-start justify-between">
              <div>
                  <h3 className="text-lg font-bold mb-4">
                      Compliance Score
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
                      onClick={onFix}
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
      {issues.length > 0 && (
          <div className="mb-8">
              <h3 className="text-[#FF5341] font-medium mb-4">Identified Issues:</h3>
              <ul className="space-y-4">
                  {issues.map((issue, index) => (
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
);

const ComplianceAI = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [analysisType, setAnalysisType] = useState('compliance');
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [content, setContent] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isFixing, setIsFixing] = useState(false);
  const [currentDocumentId, setCurrentDocumentId] = useState(null);
const [autoSaveTimeout, setAutoSaveTimeout] = useState(null);
  const [complianceId, setComplianceId] = useState(null);
  const [analysisResults, setAnalysisResults] = useState({
      score: 0,
      issues: [],
      recommendations: []
  });
  const [userCredits, setUserCredits] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const resultsRef = React.useRef(null);
  // New state for editor
  const [showEditor, setShowEditor] = useState(false);
  const [editorContent, setEditorContent] = useState('');

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

  useEffect(() => {
      fetchUserDocuments();
      const user = authService.getUser();
      if (user) {
          setUserCredits(user.credits_left || 0);
      }
  }, []);

  const fetchUserDocuments = async () => {
      try {
          const response = await complianceService.getUserDocuments();
          setDocuments(response.data);
      } catch (error) {
          showToastMessage(error.message || 'Error fetching documents', 'error');
      }
  };

  const showToastMessage = (message, type = 'success') => {
      setToastMessage(message);
      setToastType(type);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
  };

  const handleRunAnalysis = async () => {
      if (!content.trim() && !selectedDocument) {
          showToastMessage('Please provide content or select a document', 'error');
          return;
      }

      setIsAnalyzing(true);
      try {
          const response = await complianceService.analyzeContent({
              analysis_type: analysisType,
              content: content.trim(),
              document_id: selectedDocument?._id
          });

          setAnalysisResults(response.data);
          setComplianceId(response.data.compliance_id);
          setShowResults(true);
          showToastMessage('Analysis completed successfully');
      } catch (error) {
          showToastMessage(error.message || 'Error analyzing content', 'error');
      } finally {
          setIsAnalyzing(false);
      }
  };

  const saveInitialDocument = async (content) => {
    try {
        const response = await documentService.saveDocument({
            name: `Fixed ${analysisType} Content`,
            type: 'Compliance AI',
            content: content
        });

        if (response.success) {
            setCurrentDocumentId(response.data._id);
            showToastMessage('Document saved successfully');
        }
    } catch (error) {
        console.error('Save document error:', error);
        showToastMessage(error.message || 'Error saving document', 'error');
    }
};


const autoSaveChanges = async (content) => {
    if (!currentDocumentId) return;

    try {
        const response = await documentService.updateDocument(currentDocumentId, content);
        if (response.success) {
            console.log('Auto-saved successfully');
        }
    } catch (error) {
        console.error('Auto-save error:', error);
    }
};

const handleFixContent = async () => {
    if (!complianceId) {
        showToastMessage('Please run analysis first', 'error');
        return;
    }

    setIsFixing(true);
    try {
        const response = await complianceService.fixContent({
            compliance_id: complianceId
        });

        setEditorContent(response.data.fixed_content);
        setShowEditor(true);
        setShowResults(false);
        showToastMessage('Content fixed successfully');
        
        // Save initial document
        await saveInitialDocument(response.data.fixed_content);
    } catch (error) {
        showToastMessage(error.message || 'Error fixing content', 'error');
    } finally {
        setIsFixing(false);
    }
};

useEffect(() => {
    if (!editorContent || !showEditor) return;

    if (autoSaveTimeout) {
        clearTimeout(autoSaveTimeout);
    }

    const timeoutId = setTimeout(() => {
        autoSaveChanges(editorContent);
    }, 5000); // Auto-save after 5 seconds of no changes

    setAutoSaveTimeout(timeoutId);

    return () => {
        if (autoSaveTimeout) {
            clearTimeout(autoSaveTimeout);
        }
    };
}, [editorContent, showEditor]);


  const handleDownload = async () => {
      if (!resultsRef.current) return;

      try {
          const canvas = await html2canvas(resultsRef.current);
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF();
          
          const imgWidth = 210;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          
          pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
          pdf.save('compliance-analysis.pdf');
          
          showToastMessage('Report downloaded successfully');
      } catch (error) {
          showToastMessage('Error downloading report', 'error');
      }
  };

  const renderContentInput = () => {
    if (showEditor) {
        return (
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Edit Fixed Content
                </label>
                <ContentEditor 
    initialContent={editorContent}
    onChange={setEditorContent}
/>
            </div>
        );
    }

    return (
        <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Content Submission
            </label>
            <textarea
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="block w-full rounded-lg border shadow-sm focus:border-[#FF5341] focus:ring-[#FF5341] sm:text-sm"
                placeholder={`Input your content here to check for ${analysisType === 'compliance' ? 'compliance' : 'brand voice alignment'}.`}
            />
        </div>
    );
};

  return (
      <div className="flex min-h-screen">
          {/* Sidebar */}
          <div className="hidden md:block md:fixed md:left-0 md:h-screen z-50">
              <Sidebar 
                  isCollapsed={isSidebarCollapsed} 
                  setIsCollapsed={setIsSidebarCollapsed} 
              />
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
              </div>

              {/* Content Grid */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                      {/* Left Column */}
                      <div className="col-span-1 md:col-span-4 bg-[#FFFAF3] rounded-xl p-4 md:p-6">
                          {/* Analysis Type Dropdown */}
                          <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Analysis Type
                              </label>
                              <AnalysisTypeDropdown 
                                  selectedType={analysisType}
                                  setSelectedType={setAnalysisType}
                              />
                          </div>

                          <h2 className="text-lg md:text-xl font-semibold mb-2">
                              {analysisType === 'compliance' ? 'Compliance AI Checker' : 'Brand Voice Checker'}
                          </h2>
                          <p className="text-sm text-gray-600 mb-4">
                              Effortlessly Ensure Your Content Aligns With {analysisType === 'compliance' ? 'Compliance Standards' : 'Brand Guidelines'}.
                          </p>

                          <div className="bg-[#FF5341] text-white rounded-lg p-3 mb-6 flex items-center">
                              <Zap className="w-5 h-5 mr-2" />
                              Your Balance Is {userCredits} Credits
                          </div>

                          {/* Document Selection */}
                          <div className="mb-6">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Select Document
                              </label>
                              <DocumentSelector
                                  documents={documents}
                                  selectedDocument={selectedDocument}
                                  setSelectedDocument={setSelectedDocument}
                              />
                          </div>

                          {/* Content Input */}
                          <div className="mb-6">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Content Submission
                              </label>
                              <textarea
                                  rows={6}
                                  value={content}
                                  onChange={(e) => setContent(e.target.value)}
                                  className="block w-full rounded-lg border shadow-sm focus:border-[#FF5341] focus:ring-[#FF5341] sm:text-sm"
                                  placeholder={`Input your content here to check for ${analysisType === 'compliance' ? 'compliance' : 'brand voice alignment'}.`}
                              />
                          </div>

                          {/* Run Analysis Button */}
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
                                      <svg className="animate-spin ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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

                     {/* Right Column */}
                     <div className="col-span-1 md:col-span-8 space-y-4 md:space-y-6">
        {!showResults && !isAnalyzing && !showEditor && (
            <div className="bg-[#FFFAF3] rounded-xl p-8 text-center">
                <p className="text-gray-600 mb-4">
                    Click "Run Analysis" to check your content
                </p>
            </div>
        )}

        {isAnalyzing && (
            <div className="bg-[#FFFAF3] rounded-xl p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF5341] mx-auto mb-4"></div>
                <p className="text-gray-600">Analyzing content...</p>
            </div>
        )}

{showEditor && (
    <div className="bg-[#FFFAF3] rounded-xl p-4 md:p-6">
        <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Fixed Content Editor</h3>
            <button 
                onClick={() => {
                    setShowEditor(false);
                    setShowResults(true);
                }}
                className="text-sm text-gray-600 hover:text-gray-900"
            >
                Back to Analysis
            </button>
        </div>
        <ContentEditor 
            initialContent={editorContent}
            onChange={setEditorContent}  // Use setEditorContent consistently
        />
    </div>
)}

        {showResults && !isAnalyzing && !showEditor && (
                                <div className="bg-[#FFFAF3] rounded-xl p-4 md:p-6">
                                    {/* Card Header */}
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0 mb-4">
                                        <div className="flex items-center">
                                            <h3 className="font-medium text-sm md:text-base">Analysis Results</h3>
                                        </div>
                                        <div className="grid grid-cols-2 md:flex items-center gap-2">
                                            <button 
                                                onClick={handleDownload}
                                                className="p-1.5 rounded-lg text-sm bg-[#FF5341] text-white hover:bg-[#FF5341]/90"
                                            >
                                                <Download className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Results Content */}
                                    <div ref={resultsRef}>
                                        <ResultsDisplay 
                                            score={analysisResults.score}
                                            issues={analysisResults.issues}
                                            recommendations={analysisResults.recommendations}
                                            onFix={handleFixContent}
                                            isFixing={isFixing}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Toast Notification */}
            {showToast && (
                <div className={`fixed bottom-4 right-4 ${
                    toastType === 'success' ? 'bg-gray-800' : 'bg-red-500'
                } text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 animate-fade-in-up z-50`}>
                    {toastType === 'success' ? (
                        <Check className="w-4 h-4" />
                    ) : (
                        <X className="w-4 h-4" />
                    )}
                    <span>{toastMessage}</span>
                </div>
            )}
        </div>
    );
};

export default ComplianceAI;