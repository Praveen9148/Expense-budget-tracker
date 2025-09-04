import React from 'react';

const BudgetSummary = ({ budget, expenses }) => {
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  const remainingBudget = budget - totalExpenses;
  const spendingPercentage = budget > 0 ? (totalExpenses / budget) * 100 : 0;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Budget Summary</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-blue-800">Total Budget</h3>
          <p className="text-2xl font-bold text-blue-600">₹{budget.toFixed(2)}</p>
        </div>
        
        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-red-800">Total Spent</h3>
          <p className="text-2xl font-bold text-red-600">₹{totalExpenses.toFixed(2)}</p>
        </div>
        
        <div className={`p-4 rounded-lg ${remainingBudget >= 0 ? 'bg-green-50' : 'bg-yellow-50'}`}>
          <h3 className={`text-sm font-medium ${remainingBudget >= 0 ? 'text-green-800' : 'text-yellow-800'}`}>
            Remaining
          </h3>
          <p className={`text-2xl font-bold ${remainingBudget >= 0 ? 'text-green-600' : 'text-yellow-600'}`}>
            ₹{remainingBudget.toFixed(2)}
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Spending Progress</h3>
        <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
          <div 
            className={`h-4 rounded-full ${
              spendingPercentage > 100 ? 'bg-yellow-500' : 'bg-blue-500'
            }`}
            style={{ width: `${Math.min(spendingPercentage, 100)}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600">
          {spendingPercentage.toFixed(1)}% of budget used
          {spendingPercentage > 100 && ' - Over budget!'}
        </p>
      </div>
    </div>
  );
};

export default BudgetSummary;