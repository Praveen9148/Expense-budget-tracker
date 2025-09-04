import React from 'react';

const CategoryFilter = ({ expenses, selectedCategory, onCategoryChange }) => {
  // Get unique categories from expenses
  const categories = ['All', ...new Set(expenses.map(expense => expense.category))];
  
  // Count expenses by category
  const categoryCounts = {};
  expenses.forEach(expense => {
    categoryCounts[expense.category] = (categoryCounts[expense.category] || 0) + 1;
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Filter by Category</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => onCategoryChange(category === 'All' ? '' : category)}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              (selectedCategory === '' && category === 'All') || selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <div>{category}</div>
            {category !== 'All' && (
              <div className="text-xs opacity-75">
                {categoryCounts[category] || 0} {categoryCounts[category] === 1 ? 'item' : 'items'}
              </div>
            )}
          </button>
        ))}
      </div>
      
      {selectedCategory && (
        <div className="mt-4 pt-4 border-t">
          <button
            onClick={() => onCategoryChange('')}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            Clear Filter
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;