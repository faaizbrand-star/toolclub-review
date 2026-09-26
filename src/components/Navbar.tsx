import React from 'react';

interface NavbarProps {
  onNavigateHome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigateHome }) => {
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

        {/* Live Status Badge */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[#4ADE80] font-semibold text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse"></span>
            Live Updates
          </span>
        </div>
      </div>
    </header>
  );
};
