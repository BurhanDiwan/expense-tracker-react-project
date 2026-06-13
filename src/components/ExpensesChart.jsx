import { useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ExpenseChart() {
  const expenses = useSelector((state) => state.expenses.expenses);

  const getMonthlySummary = () => {
    const monthlyData = {};

    expenses.forEach((expense) => {
      const date = new Date(expense.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const monthLabel = date.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });

      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = {
          month: monthLabel,
          income: 0,
          expense: 0,
        };
      }

      if (expense.type === 'income') {
        monthlyData[monthKey].income += expense.amount;
      } else {
        monthlyData[monthKey].expense += expense.amount;
      }
    });

    return Object.values(monthlyData)
      .sort((a, b) => {
        const dateA = new Date(a.month);
        const dateB = new Date(b.month);
        return dateA - dateB;
      })
      .slice(-6);
  };

  const data = getMonthlySummary();

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100">
        <h3 className="text-base font-semibold text-slate-900 mb-6 tracking-tight">Monthly Spending</h3>
        <div className="flex flex-col items-center justify-center h-64 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
          <p className="text-sm font-medium text-slate-500">No data available to display chart</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100">
      <h3 className="text-base font-semibold text-slate-900 mb-6 md:mb-8 tracking-tight">Monthly Spending</h3>

      <div className="w-full h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }} barSize={32}>
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
                color: '#0f172a'
              }}
              itemStyle={{ fontWeight: 600 }}
              cursor={{ fill: '#f8fafc' }}
              formatter={(value) =>
                `₹${value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`
              }
            />
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="circle"
              iconSize={8}
            />
            <Bar dataKey="income" fill="#10b981" name="Income" radius={[6, 6, 0, 0]} />
            <Bar dataKey="expense" fill="#f43f5e" name="Expense" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}