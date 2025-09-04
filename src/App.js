import React, { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import BudgetSummary from './components/BudgetSummary';
import BudgetForm from './components/BudgetForm';
import CategoryFilter from './components/CategoryFilter';
import ChartComponent from './components/ChartComponent';
import './App.css';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(1000);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Load data from localStorage
  useEffect(() => {
    const savedExpenses = localStorage.getItem('expenses');
    const savedBudget = localStorage.getItem('budget');
    
    if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
    if (savedBudget) setBudget(parseFloat(savedBudget));
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('budget', JSON.stringify(budget));
  }, [budget]);

  const handleAddExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]);
  };

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const handleSetBudget = (newBudget) => {
    setBudget(newBudget);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Filter expenses based on selected category
  const filteredExpenses = selectedCategory
    ? expenses.filter(expense => expense.category === selectedCategory)
    : expenses;

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Expense Budget Tracker</h1>
        
        {/* Top Section - Budget and Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <BudgetForm budget={budget} onSetBudget={handleSetBudget} />
          <BudgetSummary budget={budget} expenses={expenses} />
        </div>

        {/* Charts Section */}
        <div className="mb-8">
          <ChartComponent expenses={expenses} />
        </div>

        {/* Filter Section */}
        <div className="mb-8">
          <CategoryFilter 
            expenses={expenses} 
            selectedCategory={selectedCategory} 
            onCategoryChange={handleCategoryChange} 
          />
        </div>

        {/* Main Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ExpenseForm onAddExpense={handleAddExpense} />
          <ExpenseList expenses={filteredExpenses} onDeleteExpense={handleDeleteExpense} />
        </div>
      </div>
    </div>
  );
}

export default App;