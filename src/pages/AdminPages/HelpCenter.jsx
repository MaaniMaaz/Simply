// src/pages/AdminPages/HelpCenter.jsx
import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  FileText, 
  Code, 
  Users,
  Edit2,
  X,
  Save,
  AlertTriangle,
  ChevronRight,
  Plus,
  Trash2,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { helpCenterService } from '../../api/helpCenter';

const iconComponents = {
  BookOpen,
  FileText,
  Code,
  Users
};

const SectionCard = ({ title, description, icon, pages, onEditCard, onEditPage, onAddPage, onDeletePage }) => {
  const Icon = iconComponents[icon];
  
  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-start space-x-4">
          <div className="bg-[#FF5341] bg-opacity-10 p-3 rounded-lg">
            <Icon className="w-6 h-6 text-[#FF5341]" />
          </div>
          <div>
            <h3 className="font-medium text-lg mb-1">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
        <button 
          onClick={onEditCard}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Edit2 className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      <div className="space-y-3">
        {pages.map((page, index) => (
          <div 
            key={index}
            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg group"
          >
            <div className="flex items-center space-x-2">
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">{page.title}</span>
            </div>
            <div className="opacity-0 group-hover:opacity-100 flex items-center space-x-2">
              <button
                onClick={() => onEditPage(page)}
                className="p-1.5 hover:bg-gray-200 rounded-lg transition-all"
                title="Edit page"
              >
                <Edit2 className="w-4 h-4 text-gray-400" />
              </button>
              <button
                onClick={() => onDeletePage(page)}
                className="p-1.5 hover:bg-red-100 rounded-lg transition-all"
                title="Delete page"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
            </div>
          </div>
        ))}
        
        {/* Add Page Button */}
        <button
          onClick={onAddPage}
          className="w-full flex items-center justify-center p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#FF5341] hover:text-[#FF5341] transition-colors group"
        >
          <Plus className="w-4 h-4 mr-2" />
          <span className="text-sm font-medium">Add New Page</span>
        </button>
      </div>
    </div>
  );
};

const EditCardModal = ({ card, isOpen, onClose, onSave }) => {
  const [editedCard, setEditedCard] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (card && isOpen) {
      setEditedCard({ ...card });
    }
  }, [card, isOpen]);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await onSave(editedCard);
      onClose();
    } catch (error) {
      console.error('Save error:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen || !editedCard) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center overflow-y-auto py-8">
      <div className="bg-white rounded-xl w-full max-w-2xl mx-4 my-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-semibold">Edit Card</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={editedCard.title}
                onChange={(e) => setEditedCard({ ...editedCard, title: e.target.value })}
                className="w-full p-2 border rounded-lg focus:ring-[#FF5341] focus:border-[#FF5341]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={editedCard.description}
                onChange={(e) => setEditedCard({ ...editedCard, description: e.target.value })}
                className="w-full p-2 border rounded-lg focus:ring-[#FF5341] focus:border-[#FF5341]"
                rows={3}
              />
            </div>
          </div>

          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-yellow-400 mr-3" />
              <div>
                <h4 className="text-sm font-medium text-yellow-800">
                  Important Note
                </h4>
                <p className="mt-1 text-sm text-yellow-700">
                  Changes made here will be reflected in the help center. Please review carefully before saving.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={onClose}
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

const AddPageModal = ({ cardId, isOpen, onClose, onSave }) => {
  const [newPage, setNewPage] = useState({ title: '', description: '' });
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await onSave(cardId, newPage);
      setNewPage({ title: '', description: '' });
      onClose();
    } catch (error) {
      console.error('Save error:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center overflow-y-auto py-8">
      <div className="bg-white rounded-xl w-full max-w-2xl mx-4 my-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-semibold">Add New Page</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={newPage.title}
                onChange={(e) => setNewPage({ ...newPage, title: e.target.value })}
                className="w-full p-2 border rounded-lg focus:ring-[#FF5341] focus:border-[#FF5341]"
                placeholder="Enter page title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={newPage.description}
                onChange={(e) => setNewPage({ ...newPage, description: e.target.value })}
                className="w-full p-2 border rounded-lg focus:ring-[#FF5341] focus:border-[#FF5341]"
                rows={6}
                placeholder="Enter page content"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              disabled={isSaving}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving || !newPage.title || !newPage.description}
              className="bg-[#FF5341] text-white px-6 py-2 rounded-lg hover:bg-[#FF5341]/90 transition-colors flex items-center disabled:opacity-50"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Adding...' : 'Add Page'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const EditPageModal = ({ page, cardId, isOpen, onClose, onSave }) => {
  const [editedPage, setEditedPage] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (page && isOpen) {
      setEditedPage({ ...page });
    }
  }, [page, isOpen]);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await onSave(cardId, page._id, editedPage);
      onClose();
    } catch (error) {
      console.error('Save error:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen || !editedPage) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center overflow-y-auto py-8">
      <div className="bg-white rounded-xl w-full max-w-2xl mx-4 my-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-semibold">Edit Page</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={editedPage.title}
                onChange={(e) => setEditedPage({ ...editedPage, title: e.target.value })}
                className="w-full p-2 border rounded-lg focus:ring-[#FF5341] focus:border-[#FF5341]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={editedPage.description}
                onChange={(e) => setEditedPage({ ...editedPage, description: e.target.value })}
                className="w-full p-2 border rounded-lg focus:ring-[#FF5341] focus:border-[#FF5341]"
                rows={6}
              />
            </div>
          </div>

          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-yellow-400 mr-3" />
              <div>
                <h4 className="text-sm font-medium text-yellow-800">
                  Important Note
                </h4>
                <p className="mt-1 text-sm text-yellow-700">
                  This content will be visible to all users. Please ensure accuracy and clarity.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={onClose}
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

const AdminHelpCenter = () => {
  const [content, setContent] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedPage, setSelectedPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddingPage, setIsAddingPage] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState('success');

  // Toast display helper
  const showToastMessage = (message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const response = await helpCenterService.getContent();
      setContent(response.data);
    } catch (error) {
      setError('Error fetching help center content. Please try again.');
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditCard = (card) => {
    setSelectedCard(card);
    setSelectedPage(null);
  };

  const handleEditPage = (page, cardId) => {
    setSelectedPage(page);
    setSelectedCard({ _id: cardId });
  };

  const handleAddPage = (cardId) => {
    const card = content.cards.find(c => c._id === cardId);
    if (card.pages.length >= 4) {
      showToastMessage('Maximum 4 pages allowed per card', 'error');
      return;
    }
    setSelectedCard({ _id: cardId });
    setIsAddingPage(true);
  };

  const handleSaveCard = async (cardData) => {
    try {
      const response = await helpCenterService.updateCard(cardData._id, {
        title: cardData.title,
        description: cardData.description
      });

      setContent(prevContent => ({
        ...prevContent,
        cards: prevContent.cards.map(card =>
          card._id === cardData._id ? { ...card, ...response.data } : card
        )
      }));

      showToastMessage('Card updated successfully');
      return response;
    } catch (error) {
      showToastMessage(error.message || 'Error updating card', 'error');
      throw error;
    }
  };

  const handleSavePage = async (cardId, pageId, pageData) => {
    try {
      const response = await helpCenterService.updatePage(cardId, pageId, {
        title: pageData.title,
        description: pageData.description
      });

      setContent(prevContent => ({
        ...prevContent,
        cards: prevContent.cards.map(card =>
          card._id === cardId ? {
            ...card,
            pages: card.pages.map(page =>
              page._id === pageId ? { ...page, ...response.data } : page
            )
          } : card
        )
      }));

      showToastMessage('Page updated successfully');
      return response;
    } catch (error) {
      showToastMessage(error.message || 'Error updating page', 'error');
      throw error;
    }
  };

  const handleSaveNewPage = async (cardId, pageData) => {
    try {
      const card = content.cards.find(c => c._id === cardId);
      if (card.pages.length >= 4) {
        throw new Error('Maximum 4 pages allowed per card');
      }

      const response = await helpCenterService.addPage(cardId, pageData);

      if (response.success) {
        setContent(prevContent => ({
          ...prevContent,
          cards: prevContent.cards.map(card =>
            card._id === cardId
              ? { ...card, pages: [...card.pages, response.data] }
              : card
          )
        }));
        showToastMessage('Page added successfully');
      }
      return response;
    } catch (error) {
      showToastMessage(error.message || 'Error adding page', 'error');
      throw error;
    }
  };

  const handleDeletePage = async (page, cardId) => {
    try {
      const card = content.cards.find(c => c._id === cardId);
      if (card.pages.length <= 1) {
        showToastMessage('Minimum 1 page required per card', 'error');
        return;
      }

      const response = await helpCenterService.deletePage(cardId, page._id);

      if (response.success) {
        setContent(prevContent => ({
          ...prevContent,
          cards: prevContent.cards.map(card =>
            card._id === cardId
              ? { ...card, pages: card.pages.filter(p => p._id !== page._id) }
              : card
          )
        }));
        showToastMessage('Page deleted successfully');
      }
    } catch (error) {
      showToastMessage(error.message || 'Error deleting page', 'error');
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
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Help Center Management</h1>
        <p className="text-gray-600">Manage and update help center content</p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {content?.cards.map((card) => (
          <SectionCard
            key={card._id}
            title={card.title}
            description={card.description}
            icon={card.icon}
            pages={card.pages}
            onEditCard={() => handleEditCard(card)}
            onEditPage={(page) => handleEditPage(page, card._id)}
            onAddPage={() => handleAddPage(card._id)}
            onDeletePage={(page) => handleDeletePage(page, card._id)}
          />
        ))}
      </div>

      {/* Edit Modals */}
      <EditCardModal
        card={selectedCard}
        isOpen={!!selectedCard && !selectedPage && !isAddingPage}
        onClose={() => setSelectedCard(null)}
        onSave={handleSaveCard}
      />

      <EditPageModal
        page={selectedPage}
        cardId={selectedCard?._id}
        isOpen={!!selectedPage}
        onClose={() => setSelectedPage(null)}
        onSave={handleSavePage}
      />

      <AddPageModal
        cardId={selectedCard?._id}
        isOpen={isAddingPage}
        onClose={() => {
          setIsAddingPage(false);
          setSelectedCard(null);
        }}
        onSave={handleSaveNewPage}
      />

      {/* Toast Notification */}
      {showToast && (
        <div
          className={`fixed bottom-4 right-4 ${
            toastType === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-fade-in-up z-50`}
        >
          {toastType === 'success' ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <XCircle className="w-5 h-5" />
          )}
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default AdminHelpCenter;