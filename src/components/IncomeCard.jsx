import { useSelector } from 'react-redux';
import { TrendingUp } from 'lucide-react';

export default function IncomeCard() {
  const expenses = useSelector((state) => state.expenses.expenses);

  const totalIncome = expenses
    .filter((expense) => expense.type === 'income')
    .reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-md hover:shadow-emerald-100/50 hover:-translate-y-0.5 group">
      <div className="flex items-start justify-between mb-6 md:mb-8">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Income</h3>
        <div className="p-2.5 bg-emerald-50 rounded-xl ring-1 ring-inset ring-emerald-100/50 group-hover:bg-emerald-100 transition-colors duration-300">
          <TrendingUp className="w-5 h-5 text-emerald-600" />
        </div>
      </div>

      <div>
        <p className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 tabular-nums">
          ₹{totalIncome.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
        </p>
        <p className="text-xs font-medium text-slate-400 mt-2 tracking-wide">All time income</p>
      </div>
    </div>
  );
}