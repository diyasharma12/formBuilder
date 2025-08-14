import React from 'react';
import { XMarkIcon, PlusIcon } from "@heroicons/react/24/outline";

/**
 * QuestionCard is now a controlled component.
 * It receives 'data' and an 'onChange' function from its parent.
 * All user interactions trigger the 'onChange' function to update the parent's state.
 */
export default function QuestionCard({ index, data, onChange, removeQuestion }) {
  // Destructure data from props
  const { description, categories, items } = data;

  // Function to create a new data object and send it to the parent
  const updateQuestionData = (updates) => {
    onChange({ ...data, ...updates });
  };

  const updateDescription = (value) => {
    updateQuestionData({ description: value });
  };

  const updateCategory = (catIndex, value) => {
    const updatedCategories = [...categories];
    updatedCategories[catIndex] = value;
    updateQuestionData({ categories: updatedCategories });
  };

  const addCategory = () => {
    updateQuestionData({ categories: [...categories, ""] });
  };

  const removeCategory = (catIndex) => {
    const updatedCategories = categories.filter((_, i) => i !== catIndex);
    updateQuestionData({ categories: updatedCategories });
  };

  const updateItem = (itemIndex, value) => {
    const updatedItems = [...items];
    updatedItems[itemIndex] = value;
    updateQuestionData({ items: updatedItems });
  };

  const addItem = () => {
    updateQuestionData({ items: [...items, ""] });
  };

  const removeItem = (itemIndex) => {
    const updatedItems = items.filter((_, i) => i !== itemIndex);
    updateQuestionData({ items: updatedItems });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 space-y-5">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-800">
          Question {index + 1}
        </h2>
        {index !== 0 && (
          <button
            onClick={() => removeQuestion(index)}
            className="text-gray-400 hover:text-red-500"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Description */}
      <input
        type="text"
        placeholder="Description (Optional)"
        value={description || ""}
        onChange={(e) => updateDescription(e.target.value)}
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
      />

      {/* Categories */}
      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-2">Categories</h3>
        {categories.map((cat, catIndex) => (
          <div key={catIndex} className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder={`Category ${catIndex + 1}`}
              value={cat}
              onChange={(e) => updateCategory(catIndex, e.target.value)}
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
            <button
              onClick={() => removeCategory(catIndex)}
              className="text-gray-400 hover:text-red-500"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        ))}
        <button
          onClick={addCategory}
          className="flex items-center text-pink-500 hover:underline text-sm"
        >
          <PlusIcon className="h-4 w-4 mr-1" /> Add Category
        </button>
      </div>

      {/* Items */}
      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-2">Items</h3>
        {items.map((item, itemIndex) => (
          <div key={itemIndex} className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder={`Item ${itemIndex + 1}`}
              value={item}
              onChange={(e) => updateItem(itemIndex, e.target.value)}
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
            <button
              onClick={() => removeItem(itemIndex)}
              className="text-gray-400 hover:text-red-500"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        ))}
        <button
          onClick={addItem}
          className="flex items-center text-pink-500 hover:underline text-sm"
        >
          <PlusIcon className="h-4 w-4 mr-1" /> Add Item
        </button>
      </div>
    </div>
  );
}