import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const ChartComponent = ({ expenses }) => {
  if (expenses.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Spending Analytics</h2>
        <p className="text-gray-500 text-center py-8">Add expenses to see charts</p>
      </div>
    );
  }

  // Prepare data for charts
  const categoryData = {};
  const monthlyData = {};
  
  expenses.forEach(expense => {
    // Category data
    categoryData[expense.category] = (categoryData[expense.category] || 0) + expense.amount;
    
    // Monthly data (extract year-month from date)
    const date = new Date(expense.date);
    const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
    monthlyData[monthYear] = (monthlyData[monthYear] || 0) + expense.amount;
  });

  // Category chart data
  const categoryChartData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        data: Object.values(categoryData),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
          '#9966FF', '#FF9F40', '#FF6384', '#C9CBCF'
        ],
        hoverBackgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
          '#9966FF', '#FF9F40', '#FF6384', '#C9CBCF'
        ],
        borderWidth: 2,
        borderColor: '#fff'
      },
    ],
  };

  // Monthly chart data
  const monthlyChartData = {
    labels: Object.keys(monthlyData),
    datasets: [
      {
        label: 'Monthly Spending',
        data: Object.values(monthlyData),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Spending Analytics</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart - Categories */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-center">Spending by Category</h3>
          <div className="h-64">
            <Doughnut data={categoryChartData} options={chartOptions} />
          </div>
        </div>
        
        {/* Bar Chart - Monthly */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-center">Monthly Spending</h3>
          <div className="h-64">
            <Bar data={monthlyChartData} options={chartOptions} />
          </div>
        </div>
      </div>
      
      {/* Summary Statistics */}
      <div className="mt-6 pt-6 border-t">
        <h3 className="text-lg font-semibold mb-3">Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{expenses.length}</div>
            <div className="text-sm text-blue-800">Total Expenses</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              ₹{expenses.reduce((total, exp) => total + exp.amount, 0).toFixed(2)}
            </div>
            <div className="text-sm text-green-800">Total Spent</div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              ₹{(expenses.reduce((total, exp) => total + exp.amount, 0) / expenses.length || 0).toFixed(2)}
            </div>
            <div className="text-sm text-purple-800">Average Expense</div>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">
              {Object.keys(categoryData).length}
            </div>
            <div className="text-sm text-yellow-800">Categories Used</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartComponent;