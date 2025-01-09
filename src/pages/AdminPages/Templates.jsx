import React, { useState, useEffect } from 'react';
import { Search, Edit2, Trash2, Plus, X, Check, ChevronDown } from 'lucide-react';

// Template data with categories
const templateData = [
  { 
    title: 'Content Writing', 
    description: 'Generate Compelling And Innovative Content Tailored To Your Needs With AI',
    categories: ['All', 'Blog', 'Article']
  },
  { 
    title: 'LinkedIn Post', 
    description: 'Generate Compelling And Innovative Content Tailored To Your Needs With AI',
    categories: ['All', 'Blog', 'Website']
  },
  { 
    title: 'Web Developer', 
    description: 'Generate Compelling And Innovative Content Tailored To Your Needs With AI',
    categories: ['All', 'Website']
  },
  { 
    title: 'Blog Writing', 
    description: 'Generate Compelling And Innovative Content Tailored To Your Needs With AI',
    categories: ['All', 'Blog', 'Article']
  },
  { 
    title: 'Market Writing', 
    description: 'Generate Compelling And Innovative Content Tailored To Your Needs With AI',
    categories: ['All', 'Article', 'Ecommerce']
  }
];

const TemplateCard = ({ title, description }) => (
  <div className="bg-[#FF5341] rounded-xl p-4 text-white cursor-pointer">
    <div className="mb-3 pb-3 border-b border-white/20">
      <h3 className="text-base md:text-lg font-medium">{title}</h3>
    </div>
    <p className="text-xs md:text-sm text-white/90">{description}</p>
  </div>
);

const EditCategoryModal = ({ isOpen, onClose, category, onSave }) => {
  const [editedName, setEditedName] = useState(category);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold mb-4">Edit Category</h3>
        <input
          type="text"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
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
            onClick={() => onSave(editedName)}
            className="px-4 py-2 bg-[#FF5341] text-white rounded-lg hover:bg-[#FF5341]/90"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

const DeleteCategoryModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold mb-2">Delete Category</h3>
        <p className="text-gray-600 mb-4">
          Are you sure you want to delete this category? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const AddCategoryModal = ({ isOpen, onClose, onAdd, availableTemplates }) => {
  const [newCategory, setNewCategory] = useState('');
  const [selectedTemplates, setSelectedTemplates] = useState([]);
  const [isTemplateDropdownOpen, setIsTemplateDropdownOpen] = useState(false);

  const handleSubmit = () => {
    if (newCategory.trim() && selectedTemplates.length > 0) {
      onAdd({
        name: newCategory.trim(),
        templates: selectedTemplates
      });
      setNewCategory('');
      setSelectedTemplates([]);
      setIsTemplateDropdownOpen(false);
    }
  };

  const toggleTemplate = (template) => {
    setSelectedTemplates(prev => 
      prev.includes(template) 
        ? prev.filter(t => t !== template)
        : [...prev, template]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Add New Category</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category Name
          </label>
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="Enter category name"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Assign Templates
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsTemplateDropdownOpen(!isTemplateDropdownOpen)}
              className="w-full p-2 border rounded-lg flex justify-between items-center bg-white"
            >
              <span className="text-sm text-gray-600">
                {selectedTemplates.length 
                  ? `${selectedTemplates.length} templates selected`
                  : 'Select templates'}
              </span>
              <ChevronDown className={`w-5 h-5 transition-transform ${
                isTemplateDropdownOpen ? 'transform rotate-180' : ''
              }`} />
            </button>

            {isTemplateDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {availableTemplates.map((template, index) => (
                  <label
                    key={index}
                    className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedTemplates.includes(template)}
                      onChange={() => toggleTemplate(template)}
                      className="mr-3 rounded text-[#FF5341] focus:ring-[#FF5341]"
                    />
                    <span className="text-sm">{template}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {selectedTemplates.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {selectedTemplates.map((template, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full bg-[#FF5341] bg-opacity-10 text-[#FF5341] text-sm"
                >
                  {template}
                  <button
                    onClick={() => toggleTemplate(template)}
                    className="ml-1 hover:text-[#FF5341]/70"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={() => {
              onClose();
              setNewCategory('');
              setSelectedTemplates([]);
            }}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!newCategory.trim() || selectedTemplates.length === 0}
            className={`px-4 py-2 bg-[#FF5341] text-white rounded-lg transition-colors ${
              !newCategory.trim() || selectedTemplates.length === 0
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-[#FF5341]/90'
            }`}
          >
            Add Category
          </button>
        </div>
      </div>
    </div>
  );
};

const Templates = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([
    'All', 'Email', 'Website', 'Blog', 'Article', 'Ecommerce', 'Video', 'Ads'
  ]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCategoryForAction, setSelectedCategoryForAction] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const availableTemplates = [
    'Content Writing',
    'LinkedIn Post',
    'Web Developer',
    'Blog Writing',
    'Market Writing',
    'Email Template',
    'Social Media Post',
    'Product Description',
    'SEO Article',
    'Press Release'
  ];

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleEditCategory = (category) => {
    if (category === 'All') return;
    setSelectedCategoryForAction(category);
    setIsEditModalOpen(true);
  };

  const handleDeleteCategory = (category) => {
    if (category === 'All') return;
    setSelectedCategoryForAction(category);
    setIsDeleteModalOpen(true);
  };

  const handleUpdateCategory = (newName) => {
    if (newName.trim() && !categories.includes(newName.trim())) {
      setCategories(categories.map(cat => 
        cat === selectedCategoryForAction ? newName.trim() : cat
      ));
      setIsEditModalOpen(false);
      showToastMessage('Category updated successfully');
    }
  };

  const handleConfirmDelete = () => {
    setCategories(categories.filter(cat => cat !== selectedCategoryForAction));
    setIsDeleteModalOpen(false);
    showToastMessage('Category deleted successfully');
  };

  const handleAddCategory = ({ name, templates }) => {
    if (!categories.includes(name)) {
      setCategories([...categories, name]);
      // Here you would typically update your backend with the new category
      // and its associated templates
      console.log('New category:', name, 'with templates:', templates);
      setIsAddModalOpen(false);
      showToastMessage('Category added successfully');
    }
  };

  // Filter templates based on search query and selected category
  const filteredTemplates = templateData.filter(template => {
    const matchesSearch = 
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === 'All' || 
      template.categories.includes(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl md:text-2xl font-semibold mb-2">Templates</h2>
        <p className="text-gray-600">View and manage all templates</p>
      </div>

      {/* Search and Category Management */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#FF5341]"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>

          {/* Add Category Button */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#FF5341] text-white px-4 py-2 rounded-lg hover:bg-[#FF5341]/90 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Category
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <div key={category} className="group relative">
              <button
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-[#FF5341] text-white'
                    : 'bg-white border hover:bg-gray-50'
                } ${category === 'All' ? '' : 'pr-16'}`}
              >
                {category}
              </button>
              {category !== 'All' && (
                <div className="hidden group-hover:flex absolute right-2 top-1/2 -translate-y-1/2 space-x-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditCategory(category);
                    }}
                    className="p-1 hover:bg-gray-100 rounded-lg"
                  >
                    <Edit2 className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCategory(category);
                    }}
                    className="p-1 hover:bg-gray-100 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((template, index) => (
          <TemplateCard 
            key={index} 
            title={template.title} 
            description={template.description} 
          />
        ))}
      </div>

      {/* Modals */}
      <EditCategoryModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        category={selectedCategoryForAction}
        onSave={handleUpdateCategory}
      />

      <DeleteCategoryModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />

      <AddCategoryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddCategory}
        availableTemplates={availableTemplates}
      />

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 animate-fade-in-up">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default Templates;