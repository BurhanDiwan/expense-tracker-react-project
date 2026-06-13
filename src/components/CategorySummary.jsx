import { useSelector } from 'react-redux';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function CategorySummary() {
  const expenses = useSelector((state) => state.expenses.expenses);

  const getCategorySummary = () => {
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

  const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899'];

  const data = getCategorySummary();

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100">
        <h3 className="text-base font-semibold text-slate-900 mb-6 tracking-tight">Expense by Category</h3>
        <div className="flex flex-col items-center justify-center h-64 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
          <p className="text-sm font-medium text-slate-500">No expense data available</p>
        </div>
      </div>
    );
  }

  const totalAmount = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100">
      <h3 className="text-base font-semibold text-slate-900 mb-6 tracking-tight">Expense by Category</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
        {/* Chart Section */}
        <div className="w-full h-56 lg:h-64 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            {/* Added generous margin to completely prevent SVG clipping */}
            <PieChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={70}  /* Drastically reduced to prevent cutoff */
                innerRadius={45}  /* Adjusted proportionally */
                fill="#8884d8"
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                    className="hover:opacity-80 transition-opacity duration-200 outline-none"
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) =>
                  `₹${value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`
                }
                contentStyle={{ 
                  borderRadius: '12px', 
                  border: '1px solid #f1f5f9',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                  fontWeight: 500
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend/List Section */}
        <div className="flex flex-col justify-center lg:border-l lg:border-slate-100 lg:pl-6">
          <div className="space-y-1.5">
            {data.map((item, index) => {
              const percentage = ((item.value / totalAmount) * 100).toFixed(1);
              return (
                <div 
                  key={item.name} 
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors duration-200 group"
                >
                  {/* Replaced min-w-0 with min-w-[80px] so words don't get chopped to 1 letter */}
                  <div className="flex items-center gap-3 flex-1 min-w-[80px]">
                    <div
                      className="w-3.5 h-3.5 rounded-full flex-shrink-0 shadow-sm ring-2 ring-white"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 truncate transition-colors pr-2">
                      {item.name}
                    </span>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-slate-800">
                      {percentage}%
                    </p>
                    <p className="text-xs font-medium text-slate-400 mt-0.5">
                      ₹{item.value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}