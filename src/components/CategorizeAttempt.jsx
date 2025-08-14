// src/components/CategorizeAttempt.jsx
import React, { useEffect, useState } from 'react';

export default function CategorizeAttempt({ data, onAnswer, initialAnswer }) {
  // data: { categories: ['cat1','cat2'], items: [{name, belongsTo}] }
  const categories = data?.categories || [];
  const allItems = data?.items || [];

  // state: a map categoryName => items array; "pool" for unassigned
  const [cols, setCols] = useState({});

  useEffect(() => {
    // Debug logging
    console.log("CategorizeAttempt received data:", data);
    console.log("Categories:", categories);
    console.log("Items:", allItems);

    // If there's no data or items, do nothing.
    if (!data || !allItems || allItems.length === 0) {
      console.log("No data or items found");
      return;
    }

    // Initialize the state based on the provided data
    const init = {};
    
    // Create the category columns first (all empty initially)
    categories.forEach(c => {
      init[c] = [];
    });

    // Add the "pool" column with ALL items initially unassigned
    init.pool = allItems.map(item => ({ ...item, belongsTo: '' }));

    console.log("Initialized columns - all items in pool:", init);

    // If an initial answer is provided, override the initial state
    if (initialAnswer) {
      setCols(initialAnswer);
    } else {
      setCols(init);
    }
  }, [data, initialAnswer, categories, allItems]);

  function onDragStart(e, item, fromCol) {
    e.dataTransfer.setData('text/plain', JSON.stringify({ item, fromCol }));
    e.dataTransfer.effectAllowed = 'move';
  }

  function onDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }

  function onDrop(e, toCol) {
    e.preventDefault();
    const payload = JSON.parse(e.dataTransfer.getData('text/plain'));
    const { item, fromCol } = payload;

    console.log(`Moving item "${item.name}" from "${fromCol}" to "${toCol}"`);

    setCols(prev => {
      const next = JSON.parse(JSON.stringify(prev)); // deep clone
      
      // remove from source column
      if (next[fromCol]) {
        next[fromCol] = next[fromCol].filter(i => i.name !== item.name);
      }
      
      // add to destination column
      if (!next[toCol]) {
        next[toCol] = [];
      }
      
      const updatedItem = { 
        ...item, 
        belongsTo: toCol === 'pool' ? '' : toCol 
      };
      next[toCol].push(updatedItem);
      
      console.log("Updated columns:", next);
      
      // bubble up the answer
      onAnswer(next);
      return next;
    });
  }

  // Handle case when no data is available
  if (!data || !categories || categories.length === 0 || !allItems || allItems.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        <h3 className="text-lg font-semibold mb-2">No categorize question data available</h3>
        <p>This question doesn't have the required categories or items.</p>
        <pre className="mt-4 text-left text-sm bg-gray-100 p-4 rounded">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    );
  }

  return (
    <div className="space-y-8 fade-in">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-3 text-gray-800">Categorize Question</h2>
        {data.description && (
          <p className="text-lg text-gray-600 mb-4 max-w-2xl mx-auto">{data.description}</p>
        )}
        <p className="text-sm text-pink-600 font-medium">
          ✨ Drag and drop items into the correct categories
        </p>
      </div>

      <div className="flex gap-8">
        {/* Pool - Unassigned Items */}
        <div 
          className="w-1/4 p-6 drag-zone min-h-[250px]" 
          onDragOver={onDragOver} 
          onDrop={(e) => onDrop(e, 'pool')}
        >
          <h4 className="font-semibold mb-4 text-center text-pink-700 text-lg">📦 Unassigned Items</h4>
          <div className="space-y-3">
            {cols.pool?.map((item, index) => (
              <div 
                key={`${item.name}-${index}`}
                draggable
                onDragStart={(e) => onDragStart(e, item, 'pool')}
                className="drag-item"
              >
                <span className="text-gray-800 font-medium">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="flex-1 grid grid-cols-2 gap-6">
          {categories.map(cat => (
            <div 
              key={cat} 
              className="p-6 drag-zone min-h-[250px]"
              onDragOver={onDragOver}
              onDrop={(e) => onDrop(e, cat)}
            >
              <h4 className="font-semibold mb-4 text-center text-pink-700 text-lg">🏷️ {cat}</h4>
              <div className="space-y-3">
                {cols[cat]?.map((item, index) => (
                  <div 
                    key={`${item.name}-${index}`}
                    draggable
                    onDragStart={(e) => onDragStart(e, item, cat)}
                    className="drag-item bg-gradient-to-r from-pink-50 to-white border-pink-300"
                  >
                    <span className="text-pink-800 font-medium">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="text-center text-sm text-gray-600 bg-white p-4 rounded-xl border border-pink-100">
        <p>💡 <strong>How to use:</strong> All items start unassigned. Drag and drop items from the left column to the appropriate category columns on the right.</p>
        <p className="mt-1 text-xs text-gray-500">This tests your knowledge of categorization - you need to figure out where each item belongs!</p>
      </div>
    </div>
  );
}