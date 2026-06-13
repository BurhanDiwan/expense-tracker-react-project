import BalanceCard from '../components/BalanceCard';
import IncomeCard from '../components/IncomeCard';
import ExpenseCard from '../components/ExpenseCard';
import TransactionList from '../components/TransactionList';
import ExpenseChart from '../components/ExpensesChart';
import CategorySummary from '../components/CategorySummary';

export default function Dashboard() {
  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 md:mb-10">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
          <p className="text-sm md:text-base font-medium text-slate-500 mt-1.5">
            Welcome back! Here's your financial overview.
          </p>
        </div>

        {/* Balance and Income Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 md:mb-8">
          <div className="lg:col-span-2">
            <BalanceCard />
          </div>
          <div>
            <IncomeCard />
          </div>
        </div>

        {/* Expense Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 md:mb-8">
          <div>
            <ExpenseCard />
          </div>
          <div className="hidden lg:block lg:col-span-2" />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 md:mb-8">
          <ExpenseChart />
          <CategorySummary />
        </div>

        {/* Transaction List */}
        <div className="grid grid-cols-1 gap-6">
          <TransactionList />
        </div>
      </div>
    </div>
  );
}