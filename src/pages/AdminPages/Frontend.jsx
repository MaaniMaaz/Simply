import React, { useState, useEffect } from 'react';
import { 
  PenTool, 
  FileText, 
  Target,
  HelpCircle,
  Edit2,
  X,
  Save,
  AlertTriangle,
  ShieldCheck
} from 'lucide-react';
import { adminHomepageService } from '../../api/adminHomepage';

const SectionCard = ({ title, description, icon: Icon, onClick }) => (
  <div 
    onClick={onClick}
    className="bg-white rounded-xl p-6 cursor-pointer hover:shadow-md transition-all"
  >
    <div className="flex items-start justify-between">
      <div className="flex items-start space-x-4">
        <div className="bg-[#FF5341] bg-opacity-10 p-3 rounded-lg">
          <Icon className="w-6 h-6 text-[#FF5341]" />
        </div>
        <div>
          <h3 className="font-medium text-lg mb-1">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
      <Edit2 className="w-5 h-5 text-gray-400" />
    </div>
  </div>
);

const EditModal = ({ section, content, isOpen, onClose, onSave }) => {
  const [editedContent, setEditedContent] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (content && isOpen) {
      setEditedContent(content);
    }
    return () => setEditedContent(null);
  }, [content, section, isOpen]);

  const handleClose = () => {
    setEditedContent(null);
    onClose();
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await onSave(section, editedContent);
      handleClose();
    } catch (error) {
      console.error('Save error:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen || !editedContent) return null;

  const safeArray = (arr) => Array.isArray(arr) ? arr : [];

  const renderEditableContent = () => {
    if (!editedContent) return null;
    
    switch (section) {
      case 'hero':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title <span className="text-xs text-gray-500">(Use [highlight]text[/highlight] for orange background)</span>
              </label>
              <textarea
                value={editedContent.title || ''}
                onChange={(e) => setEditedContent({ ...editedContent, title: e.target.value })}
                className="w-full p-2 border rounded-lg min-h-[100px] resize-y"
                placeholder="e.g., Elevate Your Content Creation&#10;With [highlight]AI-Powered[/highlight] Precision"
              />
            </div>
          </div>
        );

      case 'whatWeOffer':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section Title
              </label>
              <input
                type="text"
                value={editedContent.title || ''}
                onChange={(e) => setEditedContent({ ...editedContent, title: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section Subtitle
              </label>
              <input
                type="text"
                value={editedContent.subtitle || ''}
                onChange={(e) => setEditedContent({ ...editedContent, subtitle: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Button Text
              </label>
              <input
                type="text"
                value={editedContent.buttonText || ''}
                onChange={(e) => setEditedContent({ ...editedContent, buttonText: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Feature Cards
              </label>
              <div className="space-y-4">
                {safeArray(editedContent.cards).map((card, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <input
                      type="text"
                      value={card.title || ''}
                      onChange={(e) => {
                        const newCards = [...safeArray(editedContent.cards)];
                        newCards[index] = { ...card, title: e.target.value };
                        setEditedContent({ ...editedContent, cards: newCards });
                      }}
                      className="w-full p-2 border rounded-lg mb-2"
                      placeholder="Card Title"
                    />
                    <textarea
                      value={card.description || ''}
                      onChange={(e) => {
                        const newCards = [...safeArray(editedContent.cards)];
                        newCards[index] = { ...card, description: e.target.value };
                        setEditedContent({ ...editedContent, cards: newCards });
                      }}
                      className="w-full p-2 border rounded-lg"
                      rows={2}
                      placeholder="Card Description"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'useCase':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section Title
              </label>
              <input
                type="text"
                value={editedContent.title || ''}
                onChange={(e) => setEditedContent({ ...editedContent, title: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section Subtitle
              </label>
              <input
                type="text"
                value={editedContent.subtitle || ''}
                onChange={(e) => setEditedContent({ ...editedContent, subtitle: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Button Text
              </label>
              <input
                type="text"
                value={editedContent.buttonText || ''}
                onChange={(e) => setEditedContent({ ...editedContent, buttonText: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Use Case Cards
              </label>
              <div className="space-y-4">
                {safeArray(editedContent.cards).map((card, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <input
                      type="text"
                      value={card.title || ''}
                      onChange={(e) => {
                        const newCards = [...safeArray(editedContent.cards)];
                        newCards[index] = { ...card, title: e.target.value };
                        setEditedContent({ ...editedContent, cards: newCards });
                      }}
                      className="w-full p-2 border rounded-lg mb-2"
                      placeholder="Card Title"
                    />
                    <textarea
                      value={card.description || ''}
                      onChange={(e) => {
                        const newCards = [...safeArray(editedContent.cards)];
                        newCards[index] = { ...card, description: e.target.value };
                        setEditedContent({ ...editedContent, cards: newCards });
                      }}
                      className="w-full p-2 border rounded-lg"
                      rows={2}
                      placeholder="Card Description"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'stayCompliant':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section Title
              </label>
              <input
                type="text"
                value={editedContent.title || ''}
                onChange={(e) => setEditedContent({ ...editedContent, title: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section Subtitle
              </label>
              <input
                type="text"
                value={editedContent.subtitle || ''}
                onChange={(e) => setEditedContent({ ...editedContent, subtitle: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Compliance Cards
              </label>
              <div className="space-y-4">
                {safeArray(editedContent.cards).map((card, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <input
                      type="text"
                      value={card.title || ''}
                      onChange={(e) => {
                        const newCards = [...safeArray(editedContent.cards)];
                        newCards[index] = { ...card, title: e.target.value };
                        setEditedContent({ ...editedContent, cards: newCards });
                      }}
                      className="w-full p-2 border rounded-lg mb-2"
                      placeholder="Card Title"
                    />
                    <textarea
                      value={card.description || ''}
                      onChange={(e) => {
                        const newCards = [...safeArray(editedContent.cards)];
                        newCards[index] = { ...card, description: e.target.value };
                        setEditedContent({ ...editedContent, cards: newCards });
                      }}
                      className="w-full p-2 border rounded-lg"
                      rows={2}
                      placeholder="Card Description"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'faq':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section Title
              </label>
              <input
                type="text"
                value={editedContent.title || ''}
                onChange={(e) => setEditedContent({ ...editedContent, title: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                FAQ Items
              </label>
              <div className="space-y-4">
                {safeArray(editedContent.questions).map((item, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <input
                      type="text"
                      value={item.question || ''}
                      onChange={(e) => {
                        const newQuestions = [...safeArray(editedContent.questions)];
                        newQuestions[index] = { ...item, question: e.target.value };
                        setEditedContent({ ...editedContent, questions: newQuestions });
                      }}
                      className="w-full p-2 border rounded-lg mb-2"
                      placeholder="Question"
                    />
                    <textarea
                      value={item.answer || ''}
                      onChange={(e) => {
                        const newQuestions = [...safeArray(editedContent.questions)];
                        newQuestions[index] = { ...item, answer: e.target.value };
                        setEditedContent({ ...editedContent, questions: newQuestions });
                      }}
                      className="w-full p-2 border rounded-lg"
                      rows={2}
                      placeholder="Answer"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center overflow-y-auto py-8">
      <div className="bg-white rounded-xl w-full max-w-3xl mx-4 my-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-semibold">
            Edit {section.charAt(0).toUpperCase() + section.slice(1)} Section
          </h3>
          <button 
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          {renderEditableContent()}

          {/* Warning Message */}
          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-yellow-400 mr-3" />
              <div>
                <h4 className="text-sm font-medium text-yellow-800">
                  Important Note
                </h4>
                <p className="mt-1 text-sm text-yellow-700">
                  Changes made here will be reflected on the home page. Please review carefully before saving.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={handleClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              disabled={isSaving}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-[#FF5341] text-white px-6 py-2 rounded-lg hover:bg-[#FF5341]/90 transition-colors flex items-center"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Frontend = () => {
  const [content, setContent] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const response = await adminHomepageService.getContent();
      setContent(response.data);
    } catch (error) {
      setError('Error fetching content. Please try again.');
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenSection = (section) => {
    setIsModalOpen(false);
    setSelectedSection(null);
    
    setTimeout(() => {
      setSelectedSection(section);
      setIsModalOpen(true);
    }, 100);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedSection(null);
    }, 100);
  };

  const handleSave = async (section, newContent) => {
    try {
      const response = await adminHomepageService.updateSection(section, newContent);
      setContent(prevContent => ({
        ...prevContent,
        [section]: newContent
      }));
      return response;
    } catch (error) {
      console.error('Save error:', error);
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="p-4 md:p-8 flex items-center justify-center min-h-[200px]">
        <div className="text-gray-500">Loading content...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 md:p-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Frontend Management</h1>
        <p className="text-gray-600">Manage and update your website's content sections</p>
      </div>

      {/* Section Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SectionCard
          title="Hero Section"
          description="Edit main headline and hero content"
          icon={PenTool}
          onClick={() => handleOpenSection('hero')}
        />

        <SectionCard
          title="What We Offer"
          description="Update features and capabilities section"
          icon={FileText}
          onClick={() => handleOpenSection('whatWeOffer')}
        />

        <SectionCard
          title="Use Case"
          description="Manage use case examples and solutions"
          icon={Target}
          onClick={() => handleOpenSection('useCase')}
        />

        <SectionCard
          title="Stay Compliant"
          description="Manage compliance and security content"
          icon={ShieldCheck}
          onClick={() => handleOpenSection('stayCompliant')}
        />

        <SectionCard
          title="FAQ Section"
          description="Manage frequently asked questions"
          icon={HelpCircle}
          onClick={() => handleOpenSection('faq')}
        />
      </div>

      {/* Edit Modal */}
      {selectedSection && content && (
        <EditModal
          section={selectedSection}
          content={content[selectedSection]}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Frontend;