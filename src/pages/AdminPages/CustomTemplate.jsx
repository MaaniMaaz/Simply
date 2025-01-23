// src/pages/AdminPages/AdminTemplateBuilder.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus,
  Type,
  List,
  X,
  Save,
  ChevronLeft,
  MessageSquare,
  Check,
  AlertTriangle,
} from 'lucide-react';
import { adminTemplateService } from '../../api/adminTemplate';

// Field type definition
const fieldTypes = [
  { id: 'free-text', name: 'Free Text', icon: Type },
  { id: 'dropdown', name: 'Dropdown', icon: List }
];

const InputField = ({ field, onDelete, onUpdate }) => {
  const [options, setOptions] = useState(field.options || []);
  const [newOption, setNewOption] = useState('');

  const handleAddOption = () => {
    if (newOption.trim()) {
      const updatedOptions = [...options, newOption.trim()];
      setOptions(updatedOptions);
      onUpdate({ ...field, options: updatedOptions });
      setNewOption('');
    }
  };
  

  const handleDeleteOption = (index) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
    onUpdate({ ...field, options: updatedOptions });
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-[#FF5341] bg-opacity-10 p-2 rounded-lg">
            {field.type === 'dropdown' ? <List className="w-5 h-5 text-[#FF5341]" /> : 
             <Type className="w-5 h-5 text-[#FF5341]" />}
          </div>
          <div className="flex-1">
            <input
              type="text"
              value={field.question}
              onChange={(e) => onUpdate({ ...field, question: e.target.value })}
              className="font-medium text-gray-900 p-1 w-full border-b border-transparent hover:border-gray-300 focus:border-[#FF5341] focus:outline-none"
              placeholder="Enter your question"
            />
          </div>
        </div>
        <button 
          onClick={() => onDelete(field.id)}
          className="p-1 hover:bg-gray-100 rounded-lg text-gray-500"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {field.type === 'dropdown' && (
        <div className="mt-4 space-y-3">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
              className="flex-1 p-2 border rounded-lg text-sm"
              placeholder="Add option..."
            />
            <button
              onClick={handleAddOption}
              className="p-2 bg-[#FF5341] text-white rounded-lg hover:bg-[#FF5341]/90"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-2">
            {options.map((option, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                <span className="text-sm text-gray-600">{option}</span>
                <button
                  onClick={() => handleDeleteOption(index)}
                  className="p-1 hover:bg-gray-200 rounded-lg text-gray-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const AdminTemplateBuilder = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [fields, setFields] = useState([]);
  const [isFieldTypeModalOpen, setIsFieldTypeModalOpen] = useState(false);
  const [aiInstructions, setAiInstructions] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [newCategory, setNewCategory] = useState('');
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
        try {
            setIsLoading(true);
            const response = await adminTemplateService.getCategories();
            if (response && Array.isArray(response.data)) {
                setCategories(response.data);
            } else {
                console.error('Unexpected response format:', response);
                setCategories([]);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
            setCategories([]);
        } finally {
            setIsLoading(false);
        }
    };

    fetchCategories();
}, []);

  const handleAddCategory = async () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      try {
        await adminTemplateService.createTemplate({
          name: 'Category Placeholder',
          description: 'Temporary template for new category',
          category: newCategory.trim(),
          ai_instructions: '',
          fields: []
        });

        const response = await adminTemplateService.getCategories();
        setCategories(response);

        setSelectedCategory(newCategory.trim());
        setNewCategory('');
        setIsAddingCategory(false);
        showToastMessage('Category added successfully');
      } catch (error) {
        showToastMessage('Error adding category', 'error');
      }
    }
  };

  const showToastMessage = (message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSave = async () => {
    try {
      if (!name || !selectedCategory || !description) {
        showToastMessage('Please fill in all required fields', 'error');
        return;
      }

      setIsSubmitting(true);
      setError(null);

      const templateData = {
        name,
        description,
        category: selectedCategory,
        ai_instructions: aiInstructions,
        fields
      };

      await adminTemplateService.createTemplate(templateData);
      showToastMessage('Template saved successfully');

      setTimeout(() => {
        navigate('/admin/templates');
      }, 2000);

    } catch (error) {
      setError(error.message || 'Error saving template');
      showToastMessage(error.message || 'Error saving template', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddField = (type) => {
    const newField = {
        id: Date.now().toString(),
        type,
        question: '',
        options: type === 'dropdown' ? [] : undefined,
    };
    setFields((prevFields) => [...prevFields, newField]);
    setIsFieldTypeModalOpen(false);
};

const handleDeleteField = (fieldId) => {
    setFields((prevFields) => prevFields.filter(field => field.id !== fieldId));
};

const handleUpdateField = (updatedField) => {
    setFields((prevFields) =>
        prevFields.map(field => (field.id === updatedField.id ? updatedField : field))
    );
};
  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Template</h1>
          <p className="text-gray-600">Build a new template that will be available to all users</p>
        </div>
        <button 
          onClick={() => navigate('/admin/templates')}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Templates
        </button>
      </div>

      <div className="space-y-6">
        {/* Basic Info Card */}
        <div className="bg-[#FFFAF3] rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
          <div className="space-y-4">
            {/* Template Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Template Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded-lg focus:ring-[#FF5341] focus:border-[#FF5341]"
                placeholder="Enter template name"
              />
            </div>

            {/* Category Selection */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
               
              </div>
              {isAddingCategory ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="flex-1 p-2 border rounded-lg focus:ring-[#FF5341] focus:border-[#FF5341]"
                    placeholder="Enter new category name"
                  />
                  <button
                    onClick={handleAddCategory}
                    className="px-4 py-2 bg-[#FF5341] text-white rounded-lg hover:bg-[#FF5341]/90"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => {
                      setIsAddingCategory(false);
                      setNewCategory('');
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:ring-[#FF5341] focus:border-[#FF5341] bg-white"
                  disabled={isLoading}
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              )}
              {isLoading && (
                <p className="mt-1 text-sm text-gray-500">Loading categories...</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded-lg focus:ring-[#FF5341] focus:border-[#FF5341]"
                rows={3}
                placeholder="Describe your template..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                AI Instructions
                <span className="text-gray-500 text-xs ml-1">
                  (Guide the AI on how to handle this template)
                </span>
              </label>
              <textarea
                value={aiInstructions}
                onChange={(e) => setAiInstructions(e.target.value)}
                className="w-full p-2 border rounded-lg focus:ring-[#FF5341] focus:border-[#FF5341]"
                rows={4}
                placeholder="Example: This template is for creating LinkedIn posts. Keep the tone professional and focus on business insights..."
              />
              <p className="mt-1 text-xs text-gray-500">
                These instructions will guide the AI to better understand the context and purpose of this template
              </p>
            </div>
          </div>
        </div>

        {/* Fields Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Input Fields</h2>
            <button
              onClick={() => setIsFieldTypeModalOpen(true)}
              className="bg-[#FF5341] text-white px-4 py-2 rounded-lg hover:bg-[#FF5341]/90 transition-colors flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Field
            </button>
          </div>

          {/* Fields List */}
          <div className="space-y-4">
            {fields.map(field => (
              <InputField
                key={field.id}
                field={field}
                onDelete={handleDeleteField}
                onUpdate={handleUpdateField}
              />
            ))}
            {fields.length === 0 && (
              <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-xl">
                <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No fields added yet. Click "Add Field" to start building your template.</p>
              </div>
            )}
          </div>
        </div>

        {/* Warning Note */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <div className="flex">
            <AlertTriangle className="h-5 w-5 text-yellow-400 mr-3" />
            <p className="text-sm text-yellow-700">
              This template will be available to all users on the platform. Make sure all fields and instructions are clear and well-defined.
            </p>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={isSubmitting}
            className={`bg-[#FF5341] text-white px-6 py-2 rounded-lg hover:bg-[#FF5341]/90 transition-colors flex items-center ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <Save className="w-4 h-4 mr-2" />
            {isSubmitting ? 'Saving...' : 'Save Template'}
          </button>
        </div>
      </div>

      {/* Field Type Modal */}
      {isFieldTypeModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Choose Field Type</h3>
              <button 
                onClick={() => setIsFieldTypeModalOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2">
              {fieldTypes.map(type => (
                <button
                  key={type.id}
                  onClick={() => handleAddField(type.id)}
                  className="w-full p-4 rounded-lg border hover:border-[#FF5341] hover:bg-[#FF5341]/5 transition-colors flex items-center space-x-3"
                >
                  <type.icon className="w-5 h-5 text-[#FF5341]" />
                  <span>{type.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
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

export default AdminTemplateBuilder;