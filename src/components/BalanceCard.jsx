import { useSelector } from 'react-redux';
import { Wallet } from 'lucide-react';

export default function BalanceCard() {
  const expenses = useSelector((state) => state.expenses.expenses);

  const calculateTotals = () => {
    const totals = expenses.reduce(
      (acc, expense) => {
        if (expense.type === 'income') {
          acc.income += expense.amount;
        } else {
          acc.expense += expense.amount;
        }
        return acc;
      },
      { income: 0, expense: 0 }
    );

    return {
      income: totals.income,
      expense: totals.expense,
      balance: totals.income - totals.expense,
    };
  };

  const { balance } = calculateTotals();

  return (
    <div className="group bg-slate-900 rounded-2xl p-6 md:p-8 shadow-xl shadow-slate-900/5 border border-slate-800 transition-all duration-300 hover:shadow-slate-900/10 hover:-translate-y-0.5">
      <div className="flex items-start justify-between mb-8">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Total Balance</h3>
        <Wallet className="w-11 h-11 p-2.5 bg-slate-800/80 text-indigo-400 rounded-xl border border-slate-700/50 shadow-inner" />
      </div>

      <div>
        <p className="text-sm font-medium text-slate-400 mb-1.5">Current Balance</p>
        <p className="text-4xl md:text-5xl font-bold tracking-tight text-white tabular-nums">
          ₹{balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
        </p>
      </div>

      <div className="mt-8 pt-5 border-t border-slate-800/80">
        <p className="text-xs font-medium text-slate-500 tracking-wide">
          Last updated: {new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
        </p>
      </div>
    </div>
  );
}