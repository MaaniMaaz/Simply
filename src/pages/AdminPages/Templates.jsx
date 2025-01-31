import React, { useState, useEffect } from 'react';
import { 
    Search, 
    Plus, 
    X, 
    Check,
    ChevronDown,
    Pencil
} from 'lucide-react';
import { templateDisplayService } from '../../api/templateDisplayService';

// Category Button Component
const CategoryButton = ({ category, isSelected, onSelect, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(category);
    const [showEditIcon, setShowEditIcon] = useState(false);

    const handleSubmit = async () => {
        try {
            const response = await templateDisplayService.updateCategory(category, editValue);
            if (response.success) {
                onUpdate(category, editValue);
                setIsEditing(false);
            }
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    const handleCancel = () => {
        setEditValue(category);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className="flex items-center gap-2">
                <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5341] focus:border-transparent"
                    autoFocus
                />
                <button
                    onClick={handleSubmit}
                    className="p-1 hover:bg-green-100 rounded-full"
                >
                    <Check className="w-4 h-4 text-green-600" />
                </button>
                <button
                    onClick={handleCancel}
                    className="p-1 hover:bg-red-100 rounded-full"
                >
                    <X className="w-4 h-4 text-red-600" />
                </button>
            </div>
        );
    }

    return (
        <div
            className="relative"
            onMouseEnter={() => setShowEditIcon(true)}
            onMouseLeave={() => setShowEditIcon(false)}
        >
            <button
                onClick={() => onSelect(category)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                    isSelected
                        ? 'bg-[#FF5341] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
                {category}
            </button>
            {showEditIcon && category !== 'All' && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsEditing(true);
                    }}
                    className="absolute -right-6 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full"
                >
                    <Pencil className="w-4 h-4 text-gray-600" />
                </button>
            )}
        </div>
    );
};

// Template Card Component
const TemplateCard = ({ template }) => (
    <div className="bg-[#FF5341] rounded-xl p-4 text-white">
        <div className="mb-3 pb-3 border-b border-white/20">
            <h3 className="text-base md:text-lg font-medium">{template.name}</h3>
        </div>
        <p className="text-xs md:text-sm text-white/90">{template.description}</p>
    </div>
);

// Create Category Modal Component
const CreateCategoryModal = ({ isOpen, onClose, onAdd, availableTemplates }) => {
    const [categoryName, setCategoryName] = useState('');
    const [selectedTemplates, setSelectedTemplates] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleSubmit = () => {
        if (categoryName.trim() && selectedTemplates.length > 0) {
            onAdd({
                categoryName: categoryName.trim(),
                templateIds: selectedTemplates.map(template => template._id)
            });
            setCategoryName('');
            setSelectedTemplates([]);
        }
    };

    const toggleTemplate = (template) => {
        setSelectedTemplates(prev =>
            prev.find(t => t._id === template._id)
                ? prev.filter(t => t._id !== template._id)
                : [...prev, template]
        );
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Create New Category</h3>
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
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
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
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="w-full p-2 border rounded-lg flex justify-between items-center bg-white"
                        >
                            <span className="text-sm text-gray-600">
                                {selectedTemplates.length 
                                    ? `${selectedTemplates.length} templates selected`
                                    : 'Select templates'}
                            </span>
                            <ChevronDown className={`w-5 h-5 transition-transform ${
                                isDropdownOpen ? 'transform rotate-180' : ''
                            }`} />
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                {availableTemplates.map((template) => (
                                    <label
                                        key={template._id}
                                        className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedTemplates.some(t => t._id === template._id)}
                                            onChange={() => toggleTemplate(template)}
                                            className="mr-3 rounded text-[#FF5341] focus:ring-[#FF5341]"
                                        />
                                        <span className="text-sm">{template.name}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {selectedTemplates.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                            {selectedTemplates.map((template) => (
                                <span
                                    key={template._id}
                                    className="inline-flex items-center px-2 py-1 rounded-full bg-[#FF5341] bg-opacity-10 text-[#FF5341] text-sm"
                                >
                                    {template.name}
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
                        onClick={onClose}
                        className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={!categoryName.trim() || selectedTemplates.length === 0}
                        className={`px-4 py-2 bg-[#FF5341] text-white rounded-lg transition-colors ${
                            !categoryName.trim() || selectedTemplates.length === 0
                                ? 'opacity-50 cursor-not-allowed'
                                : 'hover:bg-[#FF5341]/90'
                        }`}
                    >
                        Create Category
                    </button>
                </div>
            </div>
        </div>
    );
};

// Main Component
const TemplateDisplay = () => {
    const [templates, setTemplates] = useState([]);
    const [categories, setCategories] = useState(['All']);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [availableTemplates, setAvailableTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    useEffect(() => {
        fetchInitialData();
    }, []);

    useEffect(() => {
        fetchTemplates();
    }, [selectedCategory, searchQuery]);

    const fetchInitialData = async () => {
        try {
            setLoading(true);
            const [categoriesResponse, templatesForDropdown] = await Promise.all([
                templateDisplayService.getCategories(),
                templateDisplayService.getAllTemplates()
            ]);

            if (categoriesResponse.success) {
                setCategories(categoriesResponse.data);
            }

            if (templatesForDropdown.success) {
                setAvailableTemplates(templatesForDropdown.data);
            }
            await fetchTemplates();
        } catch (error) {
            setError(error.message);
            showToastMessage('Error fetching initial data');
        } finally {
            setLoading(false);
        }
    };

    const fetchTemplates = async () => {
        try {
            const response = await templateDisplayService.getTemplates(selectedCategory, searchQuery);
            if (response.success) {
                setTemplates(response.data);
            }
        } catch (error) {
            showToastMessage('Error fetching templates');
        }
    };

    const handleCreateCategory = async ({ categoryName, templateIds }) => {
        try {
            const response = await templateDisplayService.createCategory(categoryName, templateIds);
            if (response.success) {
                await fetchInitialData();
                setIsCreateModalOpen(false);
                showToastMessage('Category created successfully');
            }
        } catch (error) {
            showToastMessage('Error creating category');
        }
    };

    const handleCategoryUpdate = async (oldCategory, newCategory) => {
        setCategories(prev => 
            prev.map(cat => cat === oldCategory ? newCategory : cat)
        );
        if (selectedCategory === oldCategory) {
            setSelectedCategory(newCategory);
        }
        await fetchTemplates();
        showToastMessage('Category updated successfully');
    };

    const showToastMessage = (message) => {
        setToastMessage(message);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF5341]"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-8 text-red-600">
                Error: {error}
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Templates</h1>
                    <p className="text-gray-600">Browse and manage templates by category</p>
                </div>
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="px-4 py-2 bg-[#FF5341] text-white rounded-lg hover:bg-[#FF5341]/90 flex items-center"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Category
                </button>
            </div>

            {/* Search Bar */}
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

            {/* Category Filters */}
            <div className="flex flex-wrap gap-6">
                {categories.map((category) => (
                    <CategoryButton
                        key={category}
                        category={category}
                        isSelected={selectedCategory === category}
                        onSelect={setSelectedCategory}
                        onUpdate={handleCategoryUpdate}
                    />
                ))}
            </div>

            {/* Templates Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {templates.map((template) => (
                    <TemplateCard key={template._id} template={template} />
                ))}
                {templates.length === 0 && (
                    <div className="col-span-full text-center py-8 text-gray-500">
                        {searchQuery 
                            ? 'No templates found matching your search'
                            : `No templates found in ${selectedCategory} category`}
                    </div>
                )}
            </div>

            {/* Create Category Modal */}
            <CreateCategoryModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onAdd={handleCreateCategory}
                availableTemplates={availableTemplates}
            />

            {/* Toast Notification */}
            {showToast && (
                <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 animate-fade-in-up z-50">
                    <Check className="w-4 h-4" />
                    <span>{toastMessage}</span>
                </div>
            )}
        </div>
    );
};

export default TemplateDisplay;