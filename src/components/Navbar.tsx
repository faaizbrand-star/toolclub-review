import React from 'react';

interface NavbarProps {
  onNavigateHome: () => void;
  onNavigateAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigateHome, onNavigateAdmin }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none cursor-pointer py-1"
          aria-label="Toolclubpk - Proofs & Activations"
        >
          <img
            src="/logo.png"
            alt="Toolclubpk Logo"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-contain drop-shadow-[0_0_12px_rgba(255,255,255,0.25)] group-hover:scale-105 transition-transform duration-300"
          />
          <div className="flex flex-col text-left">
            <span className="font-display font-black text-lg sm:text-xl tracking-tight text-white leading-tight flex items-center">
              TOOLCLUB<span className="text-red-500">PK</span>
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 -mt-0.5 tracking-wider uppercase">
              Proofs &amp; Activations
            </span>
          </div>
        </button>

        {/* Right Action / Admin Navigation */}
        <div className="flex items-center gap-3">
          {onNavigateAdmin && (
            <button
              onClick={onNavigateAdmin}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700/80 hover:border-[#4ADE80] text-slate-300 hover:text-[#4ADE80] text-xs font-bold transition-all cursor-pointer shadow-sm"
              title="Admin Upload & Management Portal"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Admin Panel</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
