import React, { useEffect, useState } from 'react';
import {
  ShieldCheck,
  Calendar,
  Layers,
  FileText,
  User,
  Hash,
  ExternalLink,
  Copy,
  Check,
  Printer,
  AlertTriangle,
  ZoomIn,
  ArrowLeft,
  Lock,
  Clock,
  Sparkles,
  Download,
  ShoppingCart,
} from 'lucide-react';
import { api } from '../services/api';
import { getProofByCustomerIdFromFirestore } from '../services/firestoreService';
import { PublicProofData } from '../types';
import { Lightbox } from '../components/Lightbox';

interface ProofPageProps {
  customerId: string;
  onNavigateHome: () => void;
}

export const ProofPage: React.FC<ProofPageProps> = ({ customerId, onNavigateHome }) => {
  const [loading, setLoading] = useState(true);
  const [proof, setProof] = useState<PublicProofData | null>(null);
  const [status, setStatus] = useState<'active' | 'inactive' | 'not_found'>('active');
  const [errorMsg, setErrorMsg] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const loadProof = async () => {
      setLoading(true);
      setErrorMsg('');
      try {
        // 1. First check Firestore directly
        const firestoreProof = await getProofByCustomerIdFromFirestore(customerId);
        if (firestoreProof && isMounted) {
          if (firestoreProof.status === 'inactive') {
            setStatus('inactive');
            setErrorMsg('This proof record is inactive or pending review.');
          } else {
            setStatus('active');
            setProof({
              id: firestoreProof.id,
              customerId: firestoreProof.customerId,
              customerName: firestoreProof.customerName,
              serviceName: firestoreProof.serviceName,
              deliveryDate: firestoreProof.deliveryDate,
              notes: firestoreProof.notes,
              screenshots: firestoreProof.screenshots || [],
              verifiedAt: firestoreProof.verifiedAt || firestoreProof.createdAt,
              verificationHash: firestoreProof.verificationHash,
            });
          }
          setLoading(false);
          return;
        }

        // 2. Check API fallback
        const res = await api.getPublicProof(customerId);
        if (!isMounted) return;

        if (!res.found) {
          setStatus('not_found');
          setErrorMsg(res.error || 'Delivery proof record not found.');
        } else if (res.status === 'inactive') {
          setStatus('inactive');
          setErrorMsg(res.message || 'This proof record is inactive or pending review.');
        } else if (res.proof) {
          setStatus('active');
          setProof(res.proof);
        }
      } catch (err: any) {
        if (!isMounted) return;
        setStatus('not_found');
        setErrorMsg(err.message || 'Failed to fetch proof record');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadProof();
    return () => {
      isMounted = false;
    };
  }, [customerId]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyId = (idToCopy: string) => {
    navigator.clipboard.writeText(idToCopy);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const openLightbox = (index: number) => {
    setActiveImageIndex(index);
    setLightboxOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-slate-900 text-white px-4">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 animate-pulse">
          <ShieldCheck className="w-8 h-8 animate-spin" />
        </div>
        <h2 className="text-xl font-bold text-slate-100">Verifying Delivery Record...</h2>
        <p className="text-sm text-slate-400 mt-1">Retrieving cryptographic proof for ID: {customerId}</p>
      </div>
    );
  }

  // Not Found State
  if (status === 'not_found' || !proof) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-slate-900 text-white px-4 py-16">
        <div className="max-w-md w-full p-8 rounded-2xl bg-slate-800/80 border border-slate-700 text-center shadow-xl">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-5">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Record Not Found</h2>
          <p className="text-slate-400 text-sm mb-6 leading-relaxed">
            {errorMsg || `No delivery proof could be found matching Customer ID "${customerId}".`}
          </p>
          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-700/60 text-xs text-slate-400 mb-6 font-mono">
            Searched ID: <span className="text-rose-400 font-bold">{customerId}</span>
          </div>
          <button
            onClick={onNavigateHome}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Verification Portal</span>
          </button>
        </div>
      </div>
    );
  }

  // Inactive State
  if (status === 'inactive') {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-slate-900 text-white px-4 py-16">
        <div className="max-w-md w-full p-8 rounded-2xl bg-slate-800/80 border border-amber-500/40 text-center shadow-xl">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-5">
            <Clock className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Proof Pending or Inactive</h2>
          <p className="text-slate-300 text-sm mb-4 leading-relaxed">
            {errorMsg ||
              'This delivery proof is currently undergoing verification or has been marked inactive by the fulfillment administrator.'}
          </p>
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-700 text-xs text-slate-400 mb-6 font-mono">
            Customer / Order ID: <span className="text-amber-300 font-bold">{customerId}</span>
          </div>
          <p className="text-xs text-slate-500 mb-6">
            If you believe this is an error, please reach out to customer support with your Order ID.
          </p>
          <button
            onClick={onNavigateHome}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portal</span>
          </button>
        </div>
      </div>
    );
  }

  // Active Proof Page View
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-10 selection:bg-emerald-500 selection:text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation & Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 print:hidden">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Portal Home</span>
          </button>

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <a
              href="https://toolclubpk.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 bg-[#4ADE80] hover:bg-white text-slate-950 text-xs sm:text-sm font-black rounded-lg shadow-[0_0_15px_rgba(74,222,128,0.4)] hover:shadow-[0_0_25px_#4ADE80] border border-[#4ADE80] transition-all hover:scale-105 active:scale-95"
            >
              <ShoppingCart className="w-4 h-4 text-slate-950" />
              <span>Purchase Now</span>
              <ExternalLink className="w-3 h-3 text-slate-800" />
            </a>

            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-medium rounded-lg border border-slate-700 transition-colors"
              title="Copy unique link to share or bookmark"
            >
              {copiedLink ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-400" />
                  <span>Share / Copy Link</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-medium rounded-lg border border-slate-700 transition-colors"
              title="Print or Save PDF Delivery Receipt"
            >
              <Printer className="w-4 h-4 text-slate-400" />
              <span>Print Proof</span>
            </button>
          </div>
        </div>

        {/* Verified Delivery Header Card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-slate-700/80 p-6 sm:p-8 shadow-2xl mb-8">
          <div className="absolute top-0 right-0 transform translate-x-10 -translate-y-10 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-700/70">
            <div className="flex items-start gap-4">
              <img
                src="/logo.png"
                alt="Toolclubpk Logo"
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-contain bg-slate-950 p-1 border-2 border-[#4ADE80]/40 shadow-xl shrink-0"
              />
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4" />
                    Verified Delivery
                  </span>
                  <span className="text-xs font-bold text-red-400 bg-red-950/60 px-2.5 py-0.5 rounded-full border border-red-800/80">
                    Toolclubpk
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                  {proof.serviceName}
                </h1>
                <p className="text-xs sm:text-sm text-slate-300">
                  Official Delivery &amp; Activation Proof Certificate
                </p>
              </div>
            </div>

            {/* Verification Seal Badge */}
            <div className="flex md:flex-col items-center md:items-end justify-between p-4 bg-slate-900/90 rounded-xl border border-emerald-500/30 shadow-inner">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider mb-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Zero Tamper Guarantee</span>
              </div>
              <div className="text-xs text-slate-400 text-right">
                Verified: {new Date(proof.verifiedAt).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </div>
            </div>
          </div>

          {/* Key Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
            {/* Customer / Order ID */}
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 uppercase tracking-wider">
                <Hash className="w-3.5 h-3.5 text-emerald-400" />
                <span>Customer / Order ID</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-bold text-white font-mono">
                  {proof.customerId}
                </span>
                <button
                  onClick={() => handleCopyId(proof.customerId)}
                  className="p-1 hover:bg-slate-700/60 rounded text-slate-400 hover:text-white transition-colors"
                  title="Copy Customer ID"
                >
                  {copiedId ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Service Title */}
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 uppercase tracking-wider">
                <Layers className="w-3.5 h-3.5 text-teal-400" />
                <span>Fulfillment Type</span>
              </div>
              <div className="text-base sm:text-lg font-semibold text-slate-100">
                {proof.serviceName}
              </div>
            </div>

            {/* Delivery Date */}
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 uppercase tracking-wider">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                <span>Delivery Date</span>
              </div>
              <div className="text-base sm:text-lg font-semibold text-slate-100">
                {proof.deliveryDate}
              </div>
            </div>

            {/* Customer Name (if provided) */}
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 uppercase tracking-wider">
                <User className="w-3.5 h-3.5 text-indigo-400" />
                <span>Customer Name</span>
              </div>
              <div className="text-base sm:text-lg font-semibold text-slate-100">
                {proof.customerName || 'Verified Recipient'}
              </div>
            </div>
          </div>

          {/* Delivery Notes / Handshake Log */}
          {proof.notes && (
            <div className="mt-6 pt-6 border-t border-slate-700/60">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                <FileText className="w-3.5 h-3.5 text-emerald-400" />
                <span>Fulfillment Confirmation &amp; Notes</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed bg-slate-900/60 rounded-xl p-4 border border-slate-700/60">
                {proof.notes}
              </p>
            </div>
          )}
        </div>

        {/* Screenshots Section */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>Proof Screenshots</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  {proof.screenshots.length} {proof.screenshots.length === 1 ? 'Image' : 'Images'}
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Click any screenshot to inspect in full-resolution lightbox with zoom.
              </p>
            </div>
          </div>

          {proof.screenshots.length === 0 ? (
            <div className="p-8 text-center bg-slate-800/40 rounded-2xl border border-slate-800 text-slate-400">
              No screenshot attachments recorded for this delivery.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {proof.screenshots.map((imgUrl, index) => (
                <div
                  key={index}
                  onClick={() => openLightbox(index)}
                  className="group relative rounded-2xl overflow-hidden bg-slate-800 border border-slate-700/80 shadow-lg cursor-pointer hover:border-emerald-500/50 hover:shadow-emerald-500/10 transition-all hover:-translate-y-1"
                >
                  <div className="aspect-[16/10] w-full overflow-hidden bg-slate-950 flex items-center justify-center relative">
                    <img
                      src={imgUrl}
                      alt={`Proof screenshot ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white">
                      <div className="p-2.5 rounded-full bg-emerald-500/90 text-slate-950 font-bold shadow-lg">
                        <ZoomIn className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-semibold">Inspect Screenshot</span>
                    </div>
                  </div>

                  {/* Thumbnail caption */}
                  <div className="p-3 bg-slate-800/90 flex items-center justify-between text-xs text-slate-300 border-t border-slate-700/60">
                    <span className="font-medium">Screenshot {index + 1}</span>
                    <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-mono">
                      <ShieldCheck className="w-3 h-3" />
                      Verified
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order / Purchase New Tools Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-purple-950/40 border border-[#4ADE80]/30 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3.5 text-left">
            <div className="w-12 h-12 rounded-xl bg-[#4ADE80]/15 border border-[#4ADE80]/40 flex items-center justify-center text-[#4ADE80] shrink-0">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                Looking to order or renew your tools?
              </h3>
              <p className="text-xs text-slate-400">
                Get instant access and activations directly on our official website.
              </p>
            </div>
          </div>
          <a
            href="https://toolclubpk.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#4ADE80] hover:bg-white text-slate-950 font-black text-sm shadow-[0_0_20px_rgba(74,222,128,0.4)] hover:shadow-[0_0_30px_#4ADE80] border border-[#4ADE80] transition-all hover:scale-105 active:scale-95 shrink-0"
          >
            <span>Purchase on toolclubpk.com</span>
            <ExternalLink className="w-4 h-4 text-slate-800" />
          </a>
        </div>

        {/* Security & Cryptographic Integrity Card */}
        <div className="rounded-2xl bg-slate-800/40 border border-slate-800 p-6 text-xs text-slate-400 space-y-3">
          <div className="flex items-center gap-2 text-slate-300 font-semibold">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span>Cryptographic Verification &amp; Privacy Notice</span>
          </div>
          <p className="leading-relaxed text-slate-400">
            This verification page is scoped exclusively to Customer ID <strong className="text-white font-mono">{proof.customerId}</strong>.
            All visual attachments and delivery timestamps have been recorded in immutable storage.
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80 font-mono text-[11px]">
            <span className="text-slate-500">SHA-256 Digest:</span>
            <span className="text-emerald-400/90 bg-slate-900/90 px-2 py-0.5 rounded border border-slate-800 break-all">
              {proof.verificationHash}
            </span>
          </div>
        </div>
      </div>

      {/* Lightbox Component */}
      <Lightbox
        images={proof.screenshots}
        initialIndex={activeImageIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        title={`${proof.serviceName} - Screenshot`}
      />
    </div>
  );
};
