import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Shared/Sidebar';
import { 
  Bell, 
  MenuIcon, 
  ChevronLeft,
  Plus,
  AlignLeft,
  ListPlus,
  GripVertical,
  Type,
  List,
  X,
  Check,
  Save
} from 'lucide-react';

// Field type definition
const fieldTypes = [
  { id: 'free-text', name: 'Free Text', icon: Type },
  { id: 'dropdown', name: 'Dropdown', icon: List }
];

const InputField = ({ field, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [options, setOptions] = useState(field.options || []);
  const [newOption, setNewOption] = useState('');
  const [aiInstructions, setAiInstructions] = useState('');

  const handleAddOption = () => {
    if (newOption.trim()) {
      setOptions([...options, newOption.trim()]);
      setNewOption('');
    }
  };

  const handleDeleteOption = (index) => {
    setOptions(options.filter((_, i) => i !== index));
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

const predefinedCategories = ['Email', 'Website', 'Blog', 'Article', 'Ecommerce', 'Video', 'Ads'];

const TemplateBuilder = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [fields, setFields] = useState([]);
  const [isFieldTypeModalOpen, setIsFieldTypeModalOpen] = useState(false);
  const [aiInstructions, setAiInstructions] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(''); 


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

  const handleAddField = (type) => {
    const newField = {
      id: Date.now(),
      type,
      question: '',
      options: type === 'dropdown' ? [] : undefined
    };
    setFields([...fields, newField]);
    setIsFieldTypeModalOpen(false);
  };

  const handleUpdateField = (updatedField) => {
    setFields(fields.map(field => 
      field.id === updatedField.id ? updatedField : field
    ));
  };

  const handleDeleteField = (fieldId) => {
    setFields(fields.filter(field => field.id !== fieldId));
  };

  const handleSave = () => {
    if (!name || !selectedCategory || !description) {
      // Add validation feedback here if needed
      return;
    }
  
    // Here you would typically save the template with category
    const templateData = {
      name,
      category: selectedCategory,
      description,
      aiInstructions,
      fields,
      // Add any other relevant data
    };
  
    // API call would go here when backend is integrated
    console.log('Saving template:', templateData);
  
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
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
              
              <button 
                onClick={() => navigate('/dashboard')}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                <span>Back to Dashboard</span>
              </button>
              <div className="relative">
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

        {/* Mobile Sidebar */}
        {!isSidebarCollapsed && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsSidebarCollapsed(true)}
          >
            <div 
              className="fixed inset-y-0 left-0 w-64 bg-white"
              onClick={e => e.stopPropagation()}
            >
              <Sidebar isCollapsed={false} setIsCollapsed={setIsSidebarCollapsed} />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Template</h1>
            <p className="text-gray-600">
              Build your custom template by adding input fields and customizing options
            </p>
          </div>

          {/* Template Form */}
          <div className="space-y-6">
           {/* Basic Info Card */}
<div className="bg-[#FFFAF3] rounded-xl p-6">
  <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
  <div className="space-y-4">
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

     {/* Add Category Selection */}
     <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Category
      </label>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="w-full p-2 border rounded-lg focus:ring-[#FF5341] focus:border-[#FF5341] bg-white"
      >
        <option value="">Select a category</option>
        {predefinedCategories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
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
        placeholder="Example: This template is for creating LinkedIn posts. Keep the tone professional and focus on business insights, career development, or industry trends..."
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
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                className="bg-[#FF5341] text-white px-6 py-2 rounded-lg hover:bg-[#FF5341]/90 transition-colors flex items-center"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Template
              </button>
            </div>
          </div>
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

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 animate-fade-in-up">
          <Check className="w-4 h-4" />
          <span>Template saved successfully!</span>
        </div>
      )}
    </div>
  );
};

export default TemplateBuilder;