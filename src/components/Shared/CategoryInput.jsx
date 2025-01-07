// src/components/Shared/CategoryInput.jsx
import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

const CategoryInput = ({ 
  categories, 
  selectedCategory, 
  onSelectCategory, 
  onAddCategory, 
  onDeleteCategory,
  isAdmin = false 
}) => {
  const [newCategory, setNewCategory] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      onAddCategory(newCategory.trim());
      setNewCategory('');
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        {isAdmin && (
          <button
            type="button"
            onClick={() => setIsAdding(!isAdding)}
            className="text-sm text-[#FF5341] hover:text-[#FF5341]/90 flex items-center"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add New Category
          </button>
        )}
      </div>

      {isAdding ? (
        <div className="flex items-center gap-2">
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
            onClick={() => setIsAdding(false)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <select
          value={selectedCategory}
          onChange={(e) => onSelectCategory(e.target.value)}
          className="w-full p-2 border rounded-lg focus:ring-[#FF5341] focus:border-[#FF5341] bg-white"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default CategoryInput;