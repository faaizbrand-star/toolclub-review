import React from 'react';

interface FooterProps {
  onNavigateHome: () => void;
  onNavigateAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateHome, onNavigateAdmin }) => {
  return (
    <footer className="w-full border-t border-slate-800 bg-slate-950 text-slate-500 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-2.5 text-slate-300 font-semibold focus:outline-none cursor-pointer"
        >
          <img
            src="/logo.png"
            alt="Toolclubpk Logo"
            className="w-8 h-8 rounded-full object-contain bg-black border border-slate-700 drop-shadow-sm"
          />
          <span className="font-bold text-slate-200">Toolclubpk</span>
        </button>

        <div className="flex items-center gap-4 text-slate-400">
          <p className="text-slate-500">
            © {new Date().getFullYear()} Toolclubpk. Official Customer Delivery &amp; Proofs Showcase.
          </p>
          {onNavigateAdmin && (
            <button
              onClick={onNavigateAdmin}
              className="text-slate-500 hover:text-[#4ADE80] transition-colors cursor-pointer"
            >
              Admin Access
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};
