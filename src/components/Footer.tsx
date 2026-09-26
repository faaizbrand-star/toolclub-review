import React from 'react';
import { Lock } from 'lucide-react';

interface FooterProps {
  onNavigateHome: () => void;
  onNavigateAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateHome, onNavigateAdmin }) => {
  return (
    <footer className="w-full border-t border-slate-850 bg-slate-950 text-slate-500 py-8">
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

        <div className="flex items-center gap-3 text-slate-500 text-xs">
          <p>
            © {new Date().getFullYear()} Toolclubpk. Official Customer Delivery &amp; Proofs Showcase.
          </p>

          {/* Discreet admin lock button - subtle and placed down where regular customers won't notice */}
          {onNavigateAdmin && (
            <button
              onClick={onNavigateAdmin}
              className="text-slate-600 hover:text-slate-400 transition-colors p-1.5 rounded focus:outline-none cursor-pointer inline-flex items-center opacity-70 hover:opacity-100"
              title="Portal"
              aria-label="Portal Access"
            >
              <Lock className="w-3 h-3 text-slate-600 hover:text-slate-400 transition-colors" />
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};
