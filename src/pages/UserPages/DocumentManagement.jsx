// src/pages/UserPages/DocumentManagement.jsx
import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Shared/Sidebar';
import { 
  Bell, 
  MenuIcon, 
  Search,
  Upload,
  Download,
  Trash2,
  Eye,
  MoreVertical,
  FileText,
  Check,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { documentService } from '../../api/document';

const DocumentCard = ({ document, onView, onDownload, onDelete }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition-all">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className="bg-[#FF5341] bg-opacity-10 p-2 rounded-lg">
            <FileText className="w-5 h-5 text-[#FF5341]" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-1">{document.name}</h3>
            <p className="text-sm text-gray-500">
              {new Date(document.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="relative">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-1 hover:bg-gray-100 rounded-lg"
          >
            <MoreVertical className="w-5 h-5 text-gray-500" />
          </button>
          
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-10">
              <button
                onClick={() => {
                  onView(document);
                  setIsMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
              >
                <Eye className="w-4 h-4 mr-2" />
                View
              </button>
              <button
                onClick={() => {
                  onDownload(document);
                  setIsMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </button>
              <button
                onClick={() => {
                  onDelete(document);
                  setIsMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 flex items-center"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-4">
        <span className="text-xs text-gray-500">
          {(document.size / 1024).toFixed(2)} KB
        </span>
        <span className={`px-2 py-1 rounded-full text-xs ${
          document.type === 'Uploaded' ? 'bg-blue-100 text-blue-700' :
          document.type === 'SEO Writer' ? 'bg-purple-100 text-purple-700' :
          document.type === 'AI Writer' ? 'bg-green-100 text-green-700' :
          'bg-gray-100 text-gray-700'
        }`}>
          {document.type}
        </span>
      </div>
    </div>
  );
};


const DocumentModal = ({ document, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
              <div className="flex items-start justify-between p-6 border-b">
                  <div>
                      <h3 className="text-xl font-semibold text-gray-900">{document.name}</h3>
                      <p className="text-sm text-gray-500">{document.type}</p>
                  </div>
                  <button 
                      onClick={onClose}
                      className="text-gray-400 hover:text-gray-500"
                  >
                      <X className="w-6 h-6" />
                  </button>
              </div>
              <div className="p-6 flex-1 overflow-y-auto">
                  <div className="prose max-w-none"> {/* Changed this div */}
                      <div 
                          dangerouslySetInnerHTML={{ __html: document.content }}
                          className="document-content"
                      />
                  </div>
              </div>
          </div>
      </div>
  );
};

const DocumentManagement = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const navigate = useNavigate();
  const fileInputRef = React.useRef(null);

  const documentTypes = ['All', 'Uploaded', 'SEO Writer', 'AI Writer', 'Compliance AI'];

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
    fetchDocuments();
  }, [selectedType]);

  const fetchDocuments = async () => {
    try {
      const response = await documentService.getDocuments(selectedType);
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

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        await documentService.uploadDocument(file);
        showToastMessage('Document uploaded successfully');
        fetchDocuments();
      } catch (error) {
        showToastMessage(error.message || 'Error uploading document', 'error');
      }
    }
  };

  const handleDownload = async (document) => {
    try {
      await documentService.downloadDocument(document._id);
      showToastMessage('Document downloaded successfully');
    } catch (error) {
      showToastMessage(error.message || 'Error downloading document', 'error');
    }
  };

  const handleDelete = async (document) => {
    try {
      await documentService.deleteDocument(document._id);
      showToastMessage('Document deleted successfully');
      fetchDocuments();
    } catch (error) {
      showToastMessage(error.message || 'Error deleting document', 'error');
    }
  };

  const handleView = (document) => {
    setSelectedDocument(document);
    setIsModalOpen(true);
  };

  const filteredDocuments = documents.filter(doc => 
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Document Management</h1>
              <p className="text-gray-600">Manage your documents in one place</p>
            </div>
            <div>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
                accept=".txt,.doc,.docx,.pdf"
              />
              <button
                onClick={handleUpload}
                className="bg-[#FF5341] text-white px-4 py-2 rounded-lg hover:bg-[#FF5341]/90 transition-colors flex items-center"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Document
              </button>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="mb-6 space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="w-full md:w-96 relative">
                <input
                  type="text"
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#FF5341]"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {documentTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    selectedType === type
                      ? 'bg-[#FF5341] text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Documents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDocuments.map((document) => (
              <DocumentCard
                key={document._id}
                document={document}
                onView={handleView}
                onDownload={handleDownload}
                onDelete={handleDelete}
              />
            ))}
          </div>

          {/* Document View Modal */}
          <DocumentModal 
            document={selectedDocument}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />

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
      </div>
    </div>
  );
};

export default DocumentManagement;