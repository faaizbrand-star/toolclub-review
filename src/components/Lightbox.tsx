import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download } from 'lucide-react';

interface LightboxProps {
  images: string[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export const Lightbox: React.FC<LightboxProps> = ({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
  title,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    setCurrentIndex(initialIndex);
    setZoomLevel(1);
  }, [initialIndex, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length]);

  if (!isOpen || images.length === 0) return null;

  const handleNext = () => {
    setZoomLevel(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setZoomLevel(1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.3, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.3, 0.7));
  };

  const currentImage = images[currentIndex];

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950/95 backdrop-blur-md animate-in fade-in duration-200">
      {/* Lightbox Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 text-white select-none">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold text-xs border border-emerald-500/30">
            {currentIndex + 1}/{images.length}
          </div>
          <div>
            <h4 className="text-sm font-medium text-slate-200">
              {title || 'Delivery Proof Screenshot'}
            </h4>
            <p className="text-xs text-slate-400">Authentic proof image record</p>
          </div>
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleZoomOut}
            className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
          <span className="text-xs text-slate-400 w-12 text-center font-mono">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            onClick={handleZoomIn}
            className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
          <a
            href={currentImage}
            download={`proof-screenshot-${currentIndex + 1}.png`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors ml-1"
            title="Download Screenshot"
          >
            <Download className="w-5 h-5" />
          </a>
          <button
            onClick={onClose}
            className="p-2 text-slate-300 hover:text-white hover:bg-rose-500/20 hover:text-rose-400 rounded-lg transition-colors ml-2"
            title="Close (Esc)"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main View Area */}
      <div className="relative flex-1 flex items-center justify-center p-4 overflow-hidden">
        {images.length > 1 && (
          <button
            onClick={handlePrev}
            className="absolute left-6 z-10 p-3 bg-slate-900/80 hover:bg-slate-800 text-white rounded-full border border-slate-700 shadow-xl transition-all hover:scale-105 active:scale-95"
            aria-label="Previous screenshot"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        <div className="flex items-center justify-center max-w-full max-h-full overflow-auto p-4">
          <img
            src={currentImage}
            alt={`Delivery proof screenshot ${currentIndex + 1}`}
            style={{ transform: `scale(${zoomLevel})` }}
            className="max-h-[75vh] max-w-[85vw] object-contain rounded-lg shadow-2xl transition-transform duration-200 border border-slate-800 select-none bg-slate-900"
          />
        </div>

        {images.length > 1 && (
          <button
            onClick={handleNext}
            className="absolute right-6 z-10 p-3 bg-slate-900/80 hover:bg-slate-800 text-white rounded-full border border-slate-700 shadow-xl transition-all hover:scale-105 active:scale-95"
            aria-label="Next screenshot"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Thumbnails Strip */}
      {images.length > 1 && (
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-900/60 flex items-center justify-center gap-3 overflow-x-auto">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => {
                setZoomLevel(1);
                setCurrentIndex(idx);
              }}
              className={`relative rounded-md overflow-hidden border-2 transition-all w-16 h-12 flex-shrink-0 ${
                idx === currentIndex
                  ? 'border-emerald-500 ring-2 ring-emerald-500/30 scale-105'
                  : 'border-slate-700 opacity-60 hover:opacity-100'
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
