import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Plus, List, BarChart3, X } from 'lucide-react';

export default function Sidebar({ onClose }) {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/add', label: 'Add Expense', icon: Plus },
    { path: '/transactions', label: 'Transactions', icon: List },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 },
  ];

  const isActive = (path) => location.pathname === path;

  const handleNavClick = (path) => {
    if (location.pathname !== path) {
      onClose();
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 md:p-6 border-b border-slate-100 shrink-0">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Expense Tracker</h1>
        <button
          onClick={onClose}
          className="md:hidden p-2 -mr-2 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          title="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1.5 md:px-4 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => handleNavClick(item.path)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                active
                  ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-sm ring-1 ring-indigo-100/50'
                  : 'text-slate-500 font-medium hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Icon 
                className={`w-5 h-5 flex-shrink-0 transition-colors ${
                  active ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'
                }`} 
              />
              <span className="text-sm md:text-base">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 md:p-6 border-t border-slate-100 shrink-0">
        <p className="text-xs font-medium text-slate-400 tracking-wide">© 2024 Expense Tracker</p>
      </div>
    </div>
  );
}