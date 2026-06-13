import { Menu, X } from 'lucide-react';

export default function Navbar({ onMenuClick, sidebarOpen }) {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-20 transition-all duration-300">
      <div className="px-4 py-3 md:px-6 md:py-4 lg:px-8">
        <div className="flex items-center justify-between h-10">
          
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 active:scale-95"
            title={sidebarOpen ? 'Close menu' : 'Open menu'}
          >
            {sidebarOpen ? (
              <X className="w-5 h-5 transition-transform" />
            ) : (
              <Menu className="w-5 h-5 transition-transform" />
            )}
          </button>

          {/* Title area */}
          <div className="flex-1 text-center md:text-left md:flex-none ml-2 md:ml-0">
            <h1 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight">
              Expense Manager
            </h1>
          </div>

          {/* Right Area (Date/Status) */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center px-4 py-1.5 bg-slate-50 border border-slate-200 rounded-full shadow-sm hover:bg-slate-100 transition-colors duration-200">
              <span className="text-sm font-semibold text-slate-600 tracking-wide">
                {new Date().toLocaleDateString('en-IN', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>
          
        </div>
      </div>
    </nav>
  );
}