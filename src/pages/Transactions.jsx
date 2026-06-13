import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Edit2, Trash2, Filter, X, Search } from 'lucide-react';
import { deleteExpense, updateExpense } from '../redux/expenseSlice';

export default function Transactions() {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.expenses);
  const [filters, setFilters] = useState({
    type: '',
    category: '',
    searchTitle: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState(null);

  const categories = ['food', 'transport', 'entertainment', 'utilities', 'healthcare', 'shopping', 'education', 'salary', 'other'];

  const filteredExpenses = expenses.filter((expense) => {
    if (filters.type && expense.type !== filters.type) return false;
    if (filters.category && expense.category !== filters.category) return false;
    if (filters.searchTitle && !expense.title.toLowerCase().includes(filters.searchTitle.toLowerCase())) {
      return false;
    }
    return true;
  });

  const sortedExpenses = [...filteredExpenses].sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      dispatch(deleteExpense(id));
    }
  };

  const handleEdit = (expense) => {
    setEditingId(expense.id);
    setEditData({ ...expense });
  };

  const handleSaveEdit = () => {
    if (!editData.title.trim()) {
      alert('Title is required');
      return;
    }
    if (editData.amount <= 0) {
      alert('Amount must be greater than 0');
      return;
    }

    dispatch(updateExpense(editData));

    setEditingId(null);
    setEditData(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditData(null);
  };

  const handleEditDataChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) || '' : value,
    }));
  };

  const getCategoryColor = (category) => {
    const colors = {
      food: 'bg-orange-50 text-orange-700 ring-1 ring-inset ring-orange-600/20',
      transport: 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-700/10',
      entertainment: 'bg-purple-50 text-purple-700 ring-1 ring-inset ring-purple-700/10',
      utilities: 'bg-yellow-50 text-yellow-800 ring-1 ring-inset ring-yellow-600/20',
      healthcare: 'bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-700/10',
      shopping: 'bg-pink-50 text-pink-700 ring-1 ring-inset ring-pink-700/10',
      education: 'bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-700/10',
      salary: 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20',
      other: 'bg-slate-50 text-slate-700 ring-1 ring-inset ring-slate-500/20',
    };
    return colors[category] || colors.other;
  };

  const clearFilters = () => {
    setFilters({
      type: '',
      category: '',
      searchTitle: '',
    });
  };

  const hasActiveFilters = filters.type || filters.category || filters.searchTitle;

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 md:mb-10">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Transactions</h1>
          <p className="text-sm md:text-base font-medium text-slate-500 mt-1.5">Manage and filter all your transactions</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 md:p-6 mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <Filter className="w-4 h-4 text-indigo-600" />
              </div>
              <h3 className="text-base font-semibold text-slate-900">Filters</h3>
            </div>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-3 py-1.5 rounded-lg transition-colors font-semibold flex items-center gap-1.5"
              >
                <X className="w-4 h-4" />
                Clear Filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Title */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                name="searchTitle"
                placeholder="Search by title..."
                value={filters.searchTitle}
                onChange={handleFilterChange}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm font-medium text-slate-900 placeholder:text-slate-400"
              />
            </div>

            {/* Type Filter */}
            <select
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm font-medium text-slate-900 appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: `right 0.5rem center`,
                backgroundRepeat: `no-repeat`,
                backgroundSize: `1.5em 1.5em`
              }}
            >
              <option value="">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>

            {/* Category Filter */}
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm font-medium text-slate-900 appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: `right 0.5rem center`,
                backgroundRepeat: `no-repeat`,
                backgroundSize: `1.5em 1.5em`
              }}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
             <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
               Showing {sortedExpenses.length} of {expenses.length}
             </span>
          </div>
        </div>

        {/* Transactions List */}
        {sortedExpenses.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 mb-4">
              <Search className="w-8 h-8 text-slate-300" />
            </div>
            <p className="text-slate-900 font-semibold text-lg mb-1">No transactions found</p>
            <p className="text-slate-500 text-sm">Try adjusting your filters or search term.</p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-100">
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {sortedExpenses.map((expense) =>
                      editingId === expense.id ? (
                        <tr key={expense.id} className="bg-indigo-50/30">
                          <td className="px-6 py-4">
                            <input
                              type="text"
                              name="title"
                              value={editData.title}
                              onChange={handleEditDataChange}
                              className="w-full px-3 py-2 text-sm font-medium bg-white border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 outline-none"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <select
                              name="category"
                              value={editData.category}
                              onChange={handleEditDataChange}
                              className="w-full px-3 py-2 text-sm font-medium bg-white border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 outline-none"
                            >
                              {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                  {cat}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="px-6 py-4">
                            <select
                              name="type"
                              value={editData.type}
                              onChange={handleEditDataChange}
                              className="w-full px-3 py-2 text-sm font-medium bg-white border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 outline-none"
                            >
                              <option value="expense">Expense</option>
                              <option value="income">Income</option>
                            </select>
                          </td>
                          <td className="px-6 py-4">
                            <input
                              type="number"
                              name="amount"
                              value={editData.amount}
                              onChange={handleEditDataChange}
                              step="0.01"
                              className="w-full px-3 py-2 text-sm font-medium bg-white border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 outline-none"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <input
                              type="date"
                              name="date"
                              value={editData.date}
                              onChange={handleEditDataChange}
                              className="w-full px-3 py-2 text-sm font-medium bg-white border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 outline-none"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={handleSaveEdit}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-xs font-bold transition-colors shadow-sm"
                              >
                                Save
                              </button>
                              <button
                                onClick={handleCancelEdit}
                                className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 text-xs font-bold transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        <tr key={expense.id} className="hover:bg-slate-50/80 transition-colors duration-200 group">
                          <td className="px-6 py-4 text-sm font-semibold text-slate-900">{expense.title}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-block px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full ${getCategoryColor(
                                expense.category
                              )}`}
                            >
                              {expense.category}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full ${
                                expense.type === 'income'
                                  ? 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20'
                                  : 'bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-700/10'
                              }`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${expense.type === 'income' ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                              {expense.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm font-bold tabular-nums">
                            <span className={expense.type === 'income' ? 'text-emerald-600' : 'text-slate-900'}>
                              {expense.type === 'income' ? '+' : '-'}₹{expense.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-slate-500">
                            {new Date(expense.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              <button
                                onClick={() => handleEdit(expense)}
                                className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                title="Edit"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(expense.id)}
                                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {sortedExpenses.map((expense) =>
                editingId === expense.id ? (
                  <div key={expense.id} className="bg-indigo-50/50 rounded-2xl p-5 space-y-4 border border-indigo-100 shadow-sm">
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Title</label>
                      <input
                        type="text"
                        name="title"
                        value={editData.title}
                        onChange={handleEditDataChange}
                        placeholder="Title"
                        className="w-full px-3 py-2.5 text-sm font-medium bg-white border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Category</label>
                        <select
                          name="category"
                          value={editData.category}
                          onChange={handleEditDataChange}
                          className="w-full px-3 py-2.5 text-sm font-medium bg-white border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none"
                        >
                          {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Type</label>
                        <select
                          name="type"
                          value={editData.type}
                          onChange={handleEditDataChange}
                          className="w-full px-3 py-2.5 text-sm font-medium bg-white border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none"
                        >
                          <option value="expense">Expense</option>
                          <option value="income">Income</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                         <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Amount</label>
                        <input
                          type="number"
                          name="amount"
                          value={editData.amount}
                          onChange={handleEditDataChange}
                          placeholder="Amount"
                          step="0.01"
                          className="w-full px-3 py-2.5 text-sm font-medium bg-white border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Date</label>
                        <input
                          type="date"
                          name="date"
                          value={editData.date}
                          onChange={handleEditDataChange}
                          className="w-full px-3 py-2.5 text-sm font-medium bg-white border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none"
                        />
                      </div>
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={handleCancelEdit}
                        className="flex-1 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 text-sm font-bold shadow-sm"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveEdit}
                        className="flex-1 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 text-sm font-bold shadow-sm"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    key={expense.id}
                    className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 group relative overflow-hidden"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1 min-w-0 pr-4">
                        <p className="text-base font-bold text-slate-900 truncate mb-1.5">{expense.title}</p>
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`inline-block px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full ${getCategoryColor(
                              expense.category
                            )}`}
                          >
                            {expense.category}
                          </span>
                          <span className="text-xs font-medium text-slate-400">
                            {new Date(expense.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                         <p
                          className={`text-lg font-bold tabular-nums tracking-tight ${
                            expense.type === 'income' ? 'text-emerald-600' : 'text-slate-900'
                          }`}
                        >
                          {expense.type === 'income' ? '+' : '-'}₹{expense.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </p>
                        <span
                          className={`inline-block mt-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full ${
                            expense.type === 'income'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-rose-50 text-rose-700'
                          }`}
                        >
                          {expense.type}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-4 border-t border-slate-50">
                      <button
                        onClick={() => handleEdit(expense)}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-slate-50 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl text-sm font-semibold transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(expense.id)}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-slate-50 text-slate-600 hover:bg-rose-50 hover:text-rose-600 rounded-xl text-sm font-semibold transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}