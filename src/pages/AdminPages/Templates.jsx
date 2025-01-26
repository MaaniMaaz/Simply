import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Edit2, 
  X, 
  Check
} from 'lucide-react';
import { templateService } from '../../api/templateService';

const TemplateCard = ({ template }) => (
  <div className="bg-[#FF5341] rounded-xl p-4 text-white">
    <div className="mb-3 pb-3 border-b border-white/20">
      <h3 className="text-base md:text-lg font-medium">{template.name}</h3>
    </div>
    <p className="text-xs md:text-sm text-white/90">{template.description}</p>
  </div>
);

const CategorySection = ({ category, templates, onEditCategory }) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-semibold">{category}</h2>
      <button
        onClick={() => onEditCategory(category)}
        className="p-2 hover:bg-gray-100 rounded-lg"
      >
        <Edit2 className="w-5 h-5 text-gray-600" />
      </button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {templates.map((template) => (
        <TemplateCard key={template._id} template={template} />
      ))}
    </div>
  </div>
);

const EditModal = ({ isOpen, onClose, category, onSave }) => {
  const [newName, setNewName] = useState(category || '');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold mb-4">Edit Category Name</h3>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="w-full p-2 border rounded-lg mb-4"
          placeholder="Enter category name"
        />
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(category, newName)}
            className="px-4 py-2 bg-[#FF5341] text-white rounded-lg hover:bg-[#FF5341]/90"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

const Templates = () => {
  const [templates, setTemplates] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await templateService.getTemplatesWithCategories();
      setTemplates(response.data);
    } catch (error) {
      showToastMessage('Error fetching templates');
    }
  };

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  const handleUpdateCategory = async (oldCategory, newCategory) => {
    try {
      await templateService.updateCategory(oldCategory, newCategory);
      showToastMessage('Category updated successfully');
      setIsEditModalOpen(false);
      fetchTemplates();
    } catch (error) {
      showToastMessage('Error updating category');
    }
  };

  const filteredTemplates = {};
  Object.entries(templates).forEach(([category, categoryTemplates]) => {
    const filtered = categoryTemplates.filter(template => 
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filtered.length > 0) {
      filteredTemplates[category] = filtered;
    }
  });

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Templates</h1>
        <p className="text-gray-600">Manage template categories and assignments</p>
      </div>

      <div className="relative w-full md:w-96">
        <input
          type="text"
          placeholder="Search templates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg"
        />
        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
      </div>

      <div className="space-y-8">
        {Object.entries(filteredTemplates).map(([category, categoryTemplates]) => (
          <CategorySection 
            key={category}
            category={category}
            templates={categoryTemplates}
            onEditCategory={handleEditCategory}
          />
        ))}
      </div>

      <EditModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        category={selectedCategory}
        onSave={handleUpdateCategory}
      />

      {showToast && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 animate-fade-in-up z-50">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default Templates;