import { useSelector } from 'react-redux';
import { BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, } from 'recharts';
import { TrendingUp, Calendar, Target } from 'lucide-react';

export default function Analytics() {
  const expenses = useSelector((state) => state.expenses.expenses);

  const getMonthlySummary = () => {
    const monthlyData = {};

    expenses.forEach((expense) => {
      const date = new Date(expense.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const monthLabel = date.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' });

      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = {
          month: monthLabel,
          income: 0,
          expense: 0,
          balance: 0,
        };
      }

      if (expense.type === 'income') {
        monthlyData[monthKey].income += expense.amount;
      } else {
        monthlyData[monthKey].expense += expense.amount;
      }
      monthlyData[monthKey].balance = monthlyData[monthKey].income - monthlyData[monthKey].expense;
    });

    return Object.values(monthlyData).sort((a, b) => {
      const dateA = new Date(a.month);
      const dateB = new Date(b.month);
      return dateA - dateB;
    });
  };

  const getCategoryBreakdown = () => {
    const categoryData = {};

    expenses
      .filter((expense) => expense.type === 'expense')
      .forEach((expense) => {
        if (!categoryData[expense.category]) {
          categoryData[expense.category] = 0;
        }
        categoryData[expense.category] += expense.amount;
      });

    return Object.entries(categoryData)
      .map(([name, value]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value: parseFloat(value.toFixed(2)),
      }))
      .sort((a, b) => b.value - a.value);
  };

  const getSpendingSummary = () => {
    const summary = {
      totalIncome: 0,
      totalExpense: 0,
      avgMonthlyIncome: 0,
      avgMonthlyExpense: 0,
      topCategory: { name: '', amount: 0 },
      transactionCount: expenses.length,
    };

    expenses.forEach((expense) => {
      if (expense.type === 'income') {
        summary.totalIncome += expense.amount;
      } else {
        summary.totalExpense += expense.amount;
      }
    });

    const monthlyData = getMonthlySummary();
    if (monthlyData.length > 0) {
      summary.avgMonthlyIncome = summary.totalIncome / monthlyData.length;
      summary.avgMonthlyExpense = summary.totalExpense / monthlyData.length;
    }

    const categoryData = getCategoryBreakdown();
    if (categoryData.length > 0) {
      summary.topCategory = categoryData[0];
    }

    return summary;
  };

  const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899'];

  const monthlySummary = getMonthlySummary();
  const categoryBreakdown = getCategoryBreakdown();
  const spending = getSpendingSummary();

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 md:mb-10">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Analytics</h1>
          <p className="text-sm md:text-base font-medium text-slate-500 mt-1.5">Detailed insights into your spending</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          
          {/* Total Income */}
          <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 group">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Income</h3>
              <div className="p-2 bg-emerald-50 rounded-xl ring-1 ring-inset ring-emerald-100/50 group-hover:bg-emerald-100 transition-colors duration-300">
                <TrendingUp className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              </div>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight tabular-nums">
              ₹{spending.totalIncome.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-xs font-medium text-slate-400 mt-1.5">All time</p>
          </div>

          {/* Total Expense */}
          <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 group">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Expense</h3>
              <div className="p-2 bg-rose-50 rounded-xl ring-1 ring-inset ring-rose-100/50 group-hover:bg-rose-100 transition-colors duration-300">
                <Target className="w-4 h-4 text-rose-600 flex-shrink-0" />
              </div>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight tabular-nums">
              ₹{spending.totalExpense.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-xs font-medium text-slate-400 mt-1.5">All time</p>
          </div>

          {/* Avg Monthly Income */}
          <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 group">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Avg Mo. Income</h3>
              <div className="p-2 bg-indigo-50 rounded-xl ring-1 ring-inset ring-indigo-100/50 group-hover:bg-indigo-100 transition-colors duration-300">
                <Calendar className="w-4 h-4 text-indigo-600 flex-shrink-0" />
              </div>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight tabular-nums">
              ₹{spending.avgMonthlyIncome.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-xs font-medium text-slate-400 mt-1.5">Per month</p>
          </div>

          {/* Avg Monthly Expense */}
          <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 group">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Avg Mo. Expense</h3>
              <div className="p-2 bg-orange-50 rounded-xl ring-1 ring-inset ring-orange-100/50 group-hover:bg-orange-100 transition-colors duration-300">
                <Calendar className="w-4 h-4 text-orange-600 flex-shrink-0" />
              </div>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight tabular-nums">
              ₹{spending.avgMonthlyExpense.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-xs font-medium text-slate-400 mt-1.5">Per month</p>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 md:mb-8">
          
          {/* Monthly Trend */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100">
            <h3 className="text-base font-semibold text-slate-900 mb-6 tracking-tight">Monthly Trend</h3>
            {monthlySummary.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                <p className="text-sm font-medium text-slate-500">No data available</p>
              </div>
            ) : (
              <div className="w-full h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlySummary} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }} 
                      tickLine={false}
                      axisLine={false}
                      dy={10}
                    />
                    <YAxis 
                      tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }}
                      tickLine={false}
                      axisLine={false}
                      dx={-10}
                      tickFormatter={(value) => `₹${value >= 1000 ? (value/1000).toFixed(0) + 'k' : value}`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #f1f5f9',
                        borderRadius: '12px',
                        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
                        fontWeight: 500,
                        color: '#0f172a',
                        fontSize: '13px'
                      }}
                      itemStyle={{ fontWeight: 600 }}
                      formatter={(value) => `₹${value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`}
                    />
                    <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '13px', fontWeight: 500 }} iconType="circle" iconSize={8} />
                    <Line
                      type="monotone"
                      dataKey="income"
                      name="Income"
                      stroke="#10b981"
                      strokeWidth={3}
                      dot={{ fill: '#10b981', r: 4, strokeWidth: 0 }}
                      activeDot={{ r: 6, strokeWidth: 0 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="expense"
                      name="Expense"
                      stroke="#f43f5e"
                      strokeWidth={3}
                      dot={{ fill: '#f43f5e', r: 4, strokeWidth: 0 }}
                      activeDot={{ r: 6, strokeWidth: 0 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="balance"
                      name="Balance"
                      stroke="#6366f1"
                      strokeWidth={3}
                      dot={{ fill: '#6366f1', r: 4, strokeWidth: 0 }}
                      activeDot={{ r: 6, strokeWidth: 0 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Category Breakdown */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100">
            <h3 className="text-base font-semibold text-slate-900 mb-6 tracking-tight">Expense by Category</h3>
            {categoryBreakdown.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                <p className="text-sm font-medium text-slate-500">No expense data available</p>
              </div>
            ) : (
              <div className="w-full h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                    <Pie
                      data={categoryBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={90}
                      innerRadius={60}
                      fill="#8884d8"
                      dataKey="value"
                      stroke="none"
                    >
                      {categoryBreakdown.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={COLORS[index % COLORS.length]} 
                          className="hover:opacity-80 transition-opacity duration-200 outline-none"
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #f1f5f9',
                        borderRadius: '12px',
                        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
                        fontWeight: 500,
                        color: '#0f172a',
                        fontSize: '13px'
                      }}
                      itemStyle={{ fontWeight: 600 }}
                      formatter={(value) => `₹${value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>

        {/* Detailed Category Table */}
        {categoryBreakdown.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-8">
            <div className="px-6 py-5 border-b border-slate-100 bg-white">
              <h3 className="text-base font-semibold text-slate-900 tracking-tight">Category Details</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50/50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Percentage</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Progress</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {categoryBreakdown.map((category, index) => {
                    const percentage = (
                      (category.value /
                        categoryBreakdown.reduce((sum, c) => sum + c.value, 0)) *
                      100
                    ).toFixed(1);
                    return (
                      <tr key={category.name} className="hover:bg-slate-50/80 transition-colors duration-200 group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-2.5 h-2.5 rounded-full flex-shrink-0 shadow-sm ring-2 ring-white"
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            />
                            <span className="text-sm font-semibold text-slate-900">{category.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-slate-900 tabular-nums">
                          ₹{category.value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-slate-500 tabular-nums">{percentage}%</td>
                        <td className="px-6 py-4">
                          <div className="w-full sm:w-48 bg-slate-100 rounded-full h-2 overflow-hidden shadow-inner">
                            <div
                              className="h-full rounded-full transition-all duration-500 ease-out"
                              style={{
                                width: `${percentage}%`,
                                backgroundColor: COLORS[index % COLORS.length],
                              }}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}