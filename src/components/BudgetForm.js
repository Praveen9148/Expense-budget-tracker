import React, { useState } from 'react';

const BudgetForm = ({ budget, onSetBudget }) => {
  const [newBudget, setNewBudget] = useState(budget);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSetBudget(parseFloat(newBudget));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Set Monthly Budget</h2>
      <form onSubmit={handleSubmit} className="flex items-end gap-4">
        <div className="flex-grow">
          <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Budget (₹)</label>
          <input
            type="number"
            value={newBudget}
            onChange={(e) => setNewBudget(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            min="0"
            step="10"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Update Budget
        </button>
      </form>
    </div>
  );
};

export default BudgetForm;