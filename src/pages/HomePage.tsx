import React, { useEffect, useState, useMemo } from 'react';
import {
  ShieldCheck,
  Calendar,
  Layers,
  FileText,
  User,
  Hash,
  ZoomIn,
  Clock,
  Sparkles,
  Lock,
  ExternalLink,
  ChevronRight,
  RefreshCw,
  SlidersHorizontal,
  Flame,
  CheckCircle2,
  ShoppingCart,
} from 'lucide-react';
import { api } from '../services/api';
import {
  getActivePublicProofsFromFirestore,
  getCachedProofsInstant,
} from '../services/firestoreService';
import { PublicProofData } from '../types';
import { Lightbox } from '../components/Lightbox';
import { compareByDateDescending } from '../utils/dateSorter';

interface FlatScreenshot {
  url: string;
  proofId: string;
  customerId: string;
  customerName?: string;
  serviceName: string;
  deliveryDate: string;
  notes?: string;
  verificationHash: string;
  screenshotIndex: number;
  totalScreenshots: number;
  verifiedAt?: string;
}

interface HomePageProps {
  onNavigateToProof?: (customerId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = () => {
  const initialCache = getCachedProofsInstant();
  const [proofs, setProofs] = useState<PublicProofData[]>(() => initialCache);
  const [loading, setLoading] = useState<boolean>(() => initialCache.length === 0);

  // Lightbox state for inspecting screenshots
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxTitle, setLightboxTitle] = useState('');

  const loadProofs = async () => {
    try {
      // 1. Try directly reading from Google Cloud Firestore
      const firestoreProofs = await getActivePublicProofsFromFirestore();
      if (firestoreProofs && firestoreProofs.length > 0) {
        const cleanFirestore = firestoreProofs.filter(
          (p) => !p.id?.startsWith('proof-sample-') && !p.id?.includes('sample')
        );
        setProofs(cleanFirestore);
        return;
      }

      // 2. Fallback to API if Firestore is empty
      const data = await api.getPublicProofs();
      if (data && data.length > 0) {
        const clean = data.filter(
          (p) => !p.id?.startsWith('proof-sample-') && !p.id?.includes('sample')
        );
        setProofs(clean);
      }
    } catch (err) {
      console.error('Failed to load proofs from Firestore, trying API fallback:', err);
      try {
        const data = await api.getPublicProofs();
        if (data && data.length > 0) {
          const clean = data.filter(
            (p) => !p.id?.startsWith('proof-sample-') && !p.id?.includes('sample')
          );
          setProofs(clean);
        }
      } catch (fallbackErr) {
        console.error('All proof fetch strategies failed:', fallbackErr);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProofs();
  }, []);

  // Flatten and strictly sort ALL screenshots latest date first (Newest on top, Oldest on bottom)
  const allScreenshots: FlatScreenshot[] = useMemo(() => {
    const sortedProofs = [...proofs].sort(compareByDateDescending);
    const list: FlatScreenshot[] = [];
    sortedProofs.forEach((proof) => {
      proof.screenshots.forEach((url, idx) => {
        list.push({
          url,
          proofId: proof.customerId,
          customerId: proof.customerId,
          customerName: proof.customerName,
          serviceName: proof.serviceName,
          deliveryDate: proof.deliveryDate,
          notes: proof.notes,
          verificationHash: proof.verificationHash,
          screenshotIndex: idx,
          totalScreenshots: proof.screenshots.length,
          verifiedAt: proof.verifiedAt,
        });
      });
    });
    list.sort(compareByDateDescending);
    return list;
  }, [proofs]);

  const openScreenshotInLightbox = (index: number) => {
    const images = allScreenshots.map((item) => item.url);
    const current = allScreenshots[index];
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxTitle(`${current.serviceName} - Customer ${current.customerId}`);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-red-600 selection:text-white relative overflow-hidden">
      {/* Background Glass Orbs & Carbon Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[400px] bg-gradient-to-b from-red-600/15 via-red-900/5 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-96 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Hero Glassy Header */}
      <section className="relative pt-10 pb-8 sm:pt-14 sm:pb-12 border-b border-slate-800/80 bg-slate-900/40 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          
          {/* HD Glowing Glossy Badge of User's Exact Logo */}
          <div className="relative group cursor-pointer mb-6">
            <div className="absolute -inset-2 bg-gradient-to-r from-red-600 via-zinc-600 to-emerald-500 rounded-full blur-xl opacity-50 group-hover:opacity-80 transition duration-500 animate-pulse" />
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full shadow-2xl flex items-center justify-center overflow-hidden bg-black p-0.5 border-2 border-slate-700/80 hover:border-red-500 transition-colors">
              <img
                src="/logo.png"
                alt="Toolclubpk Official Logo"
                className="w-full h-full object-contain rounded-full hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute bottom-1 right-2 flex h-6 w-6">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-6 w-6 bg-emerald-500 border-2 border-slate-950 items-center justify-center text-xs text-black font-extrabold shadow-lg">✓</span>
              </span>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/60 border border-[#4ADE80]/30 text-[#4ADE80] text-xs font-bold tracking-wider mb-3 shadow-inner backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse"></span>
            <span>OFFICIAL PROOF &amp; ACTIVATION PORTAL</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-2">
            Toolclubpk <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-sky-400 to-[#4ADE80] drop-shadow-sm">
              Proofs &amp; Activations
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 font-medium max-w-2xl mx-auto mb-4">
            Unified Customer Delivery Screenshots &amp; Tool Activation Gallery
          </p>

          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-400 font-normal leading-relaxed">
            All authentic order fulfillments, activation screenshots, and digital credentials proofs are displayed below in one unified section. Click any screenshot for high-resolution inspection.
          </p>

          {/* Quick Stats Badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 backdrop-blur-md shadow-sm">
              <ShieldCheck className="w-4 h-4 text-[#4ADE80]" />
              <span>{allScreenshots.length} Verified Screenshots</span>
            </span>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 backdrop-blur-md shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-[#4ADE80]" />
              <span>{proofs.length} Fulfillments Completed</span>
            </span>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 backdrop-blur-md shadow-sm">
              <Lock className="w-4 h-4 text-[#4ADE80]" />
              <span>100% Genuine &amp; Tamper-Proof</span>
            </span>
          </div>

          {/* Direct Purchase Link to Official Store - ToolClubPK Style */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://toolclubpk.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-2xl bg-[#4ADE80] hover:bg-white text-slate-950 font-black text-sm sm:text-base shadow-[0_0_20px_rgba(74,222,128,0.5)] hover:shadow-[0_0_35px_#4ADE80] border-2 border-[#4ADE80] transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer"
            >
              <ShoppingCart className="w-5 h-5 text-slate-950 group-hover:scale-110 transition-transform" />
              <span className="tracking-wide">Purchase Now on toolclubpk.com</span>
              <ExternalLink className="w-4 h-4 text-slate-800 opacity-90 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* SINGLE UNIFIED PORTION FOR ALL SCREENSHOTS */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Gallery Control & Header Section */}
        <div className="mb-6 p-4 rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-xl shadow-xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#4ADE80]/15 border border-[#4ADE80]/40 flex items-center justify-center text-[#4ADE80] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Previous Customer Activations &amp; Order Delivery Proofs
              </h2>
              <p className="text-xs text-slate-400">
                Below are real screenshots showing previous customer tool activations and successful deliveries of orders
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-[#4ADE80]">
            <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse"></span>
            <span>{allScreenshots.length} Deliveries Live</span>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="py-28 flex flex-col items-center justify-center">
            <div className="w-14 h-14 rounded-2xl bg-[#4ADE80]/10 border border-[#4ADE80]/30 flex items-center justify-center text-[#4ADE80] mb-4 animate-pulse">
              <RefreshCw className="w-7 h-7 animate-spin" />
            </div>
            <p className="text-base font-semibold text-slate-300">Loading delivery proofs gallery...</p>
          </div>
        ) : allScreenshots.length === 0 ? (
          <div className="py-20 text-center bg-slate-900/40 rounded-2xl border border-slate-800/80 max-w-lg mx-auto p-8 backdrop-blur-md">
            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 mx-auto mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">No Delivery Screenshots Yet</h3>
            <p className="text-xs text-slate-400">
              Verified customer delivery screenshots and activation proofs will be displayed here.
            </p>
          </div>
        ) : (
          /* Glassy Unified Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {allScreenshots.map((item, idx) => (
              <div
                key={`${item.proofId}-${idx}`}
                onClick={() => openScreenshotInLightbox(idx)}
                className="group relative rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-[#4ADE80]/60 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-[#4ADE80]/10 flex flex-col backdrop-blur-md hover:-translate-y-1"
              >
                {/* Screenshot Frame - Preserves original mobile phone aspect ratio without cropping */}
                <div className="aspect-[9/16] w-full overflow-hidden bg-slate-950 flex items-center justify-center relative p-1">
                  <img
                    src={item.url}
                    alt={`${item.serviceName} proof #${idx + 1}`}
                    className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-300"
                    loading="lazy"
                  />

                  {/* Gradient Overlay & Zoom Pill on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#4ADE80] text-slate-950 text-xs font-black shadow-lg shadow-[#4ADE80]/40">
                      <ZoomIn className="w-3.5 h-3.5" />
                      <span>Click to Enlarge</span>
                    </div>
                  </div>

                  {/* Order ID Pill Tag on top-left of image */}
                  <div className="absolute top-2.5 left-2.5">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-slate-950/85 text-[#4ADE80] border border-slate-700/80 font-mono text-[11px] font-bold backdrop-blur-md shadow-sm">
                      <Hash className="w-3 h-3 text-[#4ADE80]" />
                      {item.customerId}
                    </span>
                  </div>

                  {/* Verified Badge on top-right */}
                  <div className="absolute top-2.5 right-2.5">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-950/85 text-[#4ADE80] border border-[#4ADE80]/40 text-[10px] font-bold backdrop-blur-md shadow-sm">
                      <ShieldCheck className="w-3 h-3 text-[#4ADE80]" />
                      Verified
                    </span>
                  </div>
                </div>

                {/* Card Details Body */}
                <div className="p-4 flex-1 flex flex-col justify-between bg-slate-900/80 border-t border-slate-800/60">
                  <div>
                    <h3 className="font-bold text-sm text-white tracking-tight line-clamp-1 group-hover:text-[#4ADE80] transition-colors">
                      {item.serviceName}
                    </h3>

                    {item.customerName && (
                      <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                        <User className="w-3 h-3 text-slate-500" />
                        <span className="text-slate-300">{item.customerName}</span>
                      </p>
                    )}

                    {item.notes && (
                      <p className="text-[11px] text-slate-400 mt-2 line-clamp-2 leading-relaxed bg-slate-950/40 p-2 rounded-lg border border-slate-800/60">
                        {item.notes}
                      </p>
                    )}
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="mt-3 pt-2.5 border-t border-slate-800/70 flex items-center justify-between text-[11px] text-slate-500">
                    <div className="flex items-center gap-1 text-slate-400">
                      <Calendar className="w-3 h-3 text-[#4ADE80]" />
                      <span>{item.deliveryDate}</span>
                    </div>

                    <span className="text-[10px] font-mono text-[#4ADE80] bg-emerald-950/50 px-2 py-0.5 rounded border border-[#4ADE80]/40">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Lightbox for full-size inspection */}
      <Lightbox
        images={lightboxImages}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        title={lightboxTitle}
      />
    </div>
  );
};
