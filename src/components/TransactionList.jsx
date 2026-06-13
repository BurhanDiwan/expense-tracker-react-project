import { useSelector } from 'react-redux';
import { ArrowUpRight, ArrowDownLeft, Inbox } from 'lucide-react';

export default function TransactionList() {
  const expenses = useSelector((state) => state.expenses.expenses);

  const recentTransactions = [...expenses]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 10);

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

  if (recentTransactions.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100">
        <div className="flex flex-col items-center justify-center text-center p-8 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
          <div className="p-4 bg-white rounded-full shadow-sm mb-4 ring-1 ring-slate-100">
            <Inbox className="w-8 h-8 text-slate-300" />
          </div>
          <h3 className="text-base font-semibold text-slate-900 mb-1 tracking-tight">No Transactions</h3>
          <p className="text-sm font-medium text-slate-500">Start by adding your first income or expense</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-100 bg-white">
        <h3 className="text-base font-semibold text-slate-900 tracking-tight">Recent Transactions</h3>
      </div>

      <div className="divide-y divide-slate-100">
        {recentTransactions.map((transaction) => (
          <div key={transaction.id} className="px-6 py-4 hover:bg-slate-50/80 transition-colors duration-200 group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div
                  className={`p-2.5 rounded-xl shadow-sm border transition-colors duration-300 flex-shrink-0 ${
                    transaction.type === 'income' 
                      ? 'bg-emerald-50 border-emerald-100 group-hover:bg-emerald-100/80' 
                      : 'bg-rose-50 border-rose-100 group-hover:bg-rose-100/80'
                  }`}
                >
                  {transaction.type === 'income' ? (
                    <ArrowDownLeft className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <ArrowUpRight className="w-5 h-5 text-rose-600" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 truncate mb-1">
                    {transaction.title}
                  </p>
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-block px-2.5 py-0.5 text-[11px] font-semibold rounded-full uppercase tracking-wider ${getCategoryColor(
                        transaction.category
                      )}`}
                    >
                      {transaction.category}
                    </span>
                    <span className="text-[11px] font-medium text-slate-400">
                      {new Date(transaction.date).toLocaleDateString('en-IN', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right pl-4">
                <p
                  className={`text-sm md:text-base font-bold tabular-nums tracking-tight ${
                    transaction.type === 'income' ? 'text-emerald-600' : 'text-slate-900'
                  }`}
                >
                  {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}