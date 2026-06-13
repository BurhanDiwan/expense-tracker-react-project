import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Plus, X, AlertCircle } from 'lucide-react';
import { addExpense } from '../redux/expenseSlice';

export default function AddExpense() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'food',
    type: 'expense',
    date: new Date().toISOString().split('T')[0],
  });

  const categories = ['food', 'transport', 'entertainment', 'utilities', 'healthcare', 'shopping', 'education', 'salary', 'other'];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    if (new Date(formData.date) > new Date()) {
      newErrors.date = 'Date cannot be in the future';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) || '' : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newExpense = {
      id: Date.now().toString(),
      ...formData,
      amount: parseFloat(formData.amount),
    };

    dispatch(addExpense(newExpense));

    navigate('/transactions');
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="w-full">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Add Transaction</h1>
            <p className="text-sm font-medium text-slate-500 mt-1.5">Enter the details of your new income or expense.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Transaction Type (Segmented Control) */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Transaction Type
              </label>
              <div className="flex p-1 bg-slate-100/80 rounded-xl border border-slate-200/50">
                {['expense', 'income'].map((t) => (
                  <label key={t} className="flex-1 cursor-pointer relative">
                    <input
                      type="radio"
                      name="type"
                      value={t}
                      checked={formData.type === t}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className={`w-full text-center py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                      formData.type === t 
                        ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200/50' 
                        : 'text-slate-500 hover:text-slate-700'
                    }`}>
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-slate-700 mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Groceries, Salary, Utilities"
                className={`w-full px-4 py-3 bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 transition-all duration-200 text-slate-900 placeholder:text-slate-400 font-medium ${
                  errors.title 
                    ? 'border-rose-300 focus:ring-rose-500/20 focus:border-rose-500' 
                    : 'border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500'
                }`}
              />
              {errors.title && (
                <p className="flex items-center gap-1.5 text-rose-500 text-sm font-medium mt-2">
                  <AlertCircle className="w-4 h-4" />
                  {errors.title}
                </p>
              )}
            </div>

            {/* Amount */}
            <div>
              <label htmlFor="amount" className="block text-sm font-semibold text-slate-700 mb-2">
                Amount (₹)
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                className={`w-full px-4 py-3 bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 transition-all duration-200 text-slate-900 placeholder:text-slate-400 font-medium ${
                  errors.amount 
                    ? 'border-rose-300 focus:ring-rose-500/20 focus:border-rose-500' 
                    : 'border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500'
                }`}
              />
              {errors.amount && (
                <p className="flex items-center gap-1.5 text-rose-500 text-sm font-medium mt-2">
                  <AlertCircle className="w-4 h-4" />
                  {errors.amount}
                </p>
              )}
            </div>

            {/* Category & Date Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-semibold text-slate-700 mb-2">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 text-slate-900 font-medium appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: `right 0.5rem center`,
                    backgroundRepeat: `no-repeat`,
                    backgroundSize: `1.5em 1.5em`
                  }}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div>
                <label htmlFor="date" className="block text-sm font-semibold text-slate-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 transition-all duration-200 text-slate-900 font-medium ${
                    errors.date 
                      ? 'border-rose-300 focus:ring-rose-500/20 focus:border-rose-500' 
                      : 'border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500'
                  }`}
                />
                {errors.date && (
                  <p className="flex items-center gap-1.5 text-rose-500 text-sm font-medium mt-2">
                    <AlertCircle className="w-4 h-4" />
                    {errors.date}
                  </p>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 mt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={handleCancel}
                className="flex items-center justify-center gap-2 flex-1 bg-white border border-slate-200 text-slate-700 py-3 px-4 rounded-xl hover:bg-slate-50 hover:text-slate-900 transition-all duration-200 font-semibold text-sm sm:text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-200 focus:ring-offset-1 active:scale-[0.98]"
              >
                <X className="w-5 h-5" />
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 flex-1 bg-indigo-600 text-white py-3 px-4 rounded-xl hover:bg-indigo-700 transition-all duration-200 font-semibold text-sm sm:text-base shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 active:scale-[0.98] sm:order-last order-first"
              >
                <Plus className="w-5 h-5" />
                Save Transaction
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}