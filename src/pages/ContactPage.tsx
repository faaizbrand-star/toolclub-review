import React, { useState } from 'react';
import {
  Mail,
  MessageCircle,
  Clock,
  ShieldCheck,
  Send,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  HelpCircle,
} from 'lucide-react';
import { SEO } from '../components/SEO';

interface ContactPageProps {
  onNavigateHome: () => void;
  onNavigateFAQ: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigateHome, onNavigateFAQ }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [inquiryType, setInquiryType] = useState('Order Support');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in your name, email address, and message.');
      return;
    }
    setError('');
    setSubmitting(true);

    // Simulate reliable dispatch & prepare mailto fallback
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  const mailtoLink = `mailto:toolclubpk@gmail.com?subject=${encodeURIComponent(
    `[ToolClubPK Support] ${inquiryType} - ${name || 'Customer Inquiry'}`
  )}&body=${encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nCustomer ID: ${customerId || 'N/A'}\nInquiry Type: ${inquiryType}\n\nMessage:\n${message}`
  )}`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-red-600 selection:text-white">
      <SEO
        title="Contact Us - ToolClubPK Customer Support & Inquiries"
        description="Contact ToolClubPK support for subscription activations, order verification, warranty claims, and customer service."
        canonicalPath="/contact"
      />

      {/* Header */}
      <section className="relative pt-16 pb-12 sm:pt-20 sm:pb-16 border-b border-slate-850 bg-slate-900/40 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-[#4ADE80] text-xs font-bold tracking-wider mb-4">
            <MessageCircle className="w-4 h-4 text-[#4ADE80]" />
            <span>CUSTOMER SUPPORT &amp; ORDER DESK</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-[#4ADE80]">ToolClubPK</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Have a question about an existing order, need a delivery verification proof, or want to inquire about a subscription? We are here to assist.
          </p>
        </div>
      </section>

      {/* Contact Content Grid */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Direct Info & Guidelines */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-7 backdrop-blur-md">
              <h2 className="text-lg font-bold text-white mb-4">Official Support Channels</h2>
              
              <div className="space-y-4 text-sm">
                {/* Email Support */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-[#4ADE80] shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-medium block">Official Support Email</span>
                    <a
                      href="mailto:toolclubpk@gmail.com"
                      className="font-mono text-sm text-white hover:text-[#4ADE80] transition-colors font-semibold"
                    >
                      toolclubpk@gmail.com
                    </a>
                    <span className="text-[11px] text-slate-500 block mt-0.5">Primary channel for order tickets &amp; warranties</span>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-medium block">Operating Hours</span>
                    <span className="text-sm text-white font-semibold block">Daily: 10:00 AM – 11:00 PM PKT</span>
                    <span className="text-[11px] text-slate-500 block mt-0.5">Urgent tickets handled 7 days a week</span>
                  </div>
                </div>

                {/* Response Time */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-medium block">Expected Response SLA</span>
                    <span className="text-sm text-white font-semibold block">15 to 45 Minutes</span>
                    <span className="text-[11px] text-slate-500 block mt-0.5">During active working hours</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Tips Box */}
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 text-sm text-slate-300">
              <h3 className="font-bold text-white mb-2.5 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#4ADE80]" />
                Speed Up Your Request
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                If you are contacting us about an active subscription, always include your <strong>Customer ID (e.g. TC-4185)</strong> and a screenshot of the issue. This allows our verification desk to retrieve your file instantly.
              </p>
              <button
                onClick={onNavigateFAQ}
                className="text-xs font-semibold text-[#4ADE80] hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>Browse frequently asked questions</span>
                <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
              <h2 className="text-xl font-bold text-white mb-2">Send an Inquiry or Support Ticket</h2>
              <p className="text-xs sm:text-sm text-slate-400 mb-6">
                Fill out the form below. Your message will be routed directly to the ToolClubPK fulfillment desk.
              </p>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-[#4ADE80] mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Inquiry Ready for Dispatch!</h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{name}</strong>. You can click below to dispatch this directly via your email client to ensure instant tracking with our team.
                  </p>
                  <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={mailtoLink}
                      className="px-5 py-2.5 rounded-xl bg-[#4ADE80] hover:bg-white text-slate-950 font-bold text-xs sm:text-sm transition-colors inline-flex items-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Send via Email Client</span>
                    </a>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setName('');
                        setEmail('');
                        setCustomerId('');
                        setMessage('');
                      }}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3.5 rounded-xl bg-red-950/50 border border-red-500/40 text-red-200 text-xs flex items-center gap-2.5">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Your Full Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Muhammad Ali"
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm focus:outline-none focus:border-[#4ADE80] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Email Address <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="yourname@gmail.com"
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm focus:outline-none focus:border-[#4ADE80] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Customer ID / Order ID <span className="text-slate-500 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        value={customerId}
                        onChange={(e) => setCustomerId(e.target.value)}
                        placeholder="e.g. TC-4185"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm font-mono focus:outline-none focus:border-[#4ADE80] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Inquiry Category
                      </label>
                      <select
                        value={inquiryType}
                        onChange={(e) => setInquiryType(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm focus:outline-none focus:border-[#4ADE80] transition-colors"
                      >
                        <option value="Order Support">Order Support &amp; Activation</option>
                        <option value="Warranty Claim">Warranty / Replacement Claim</option>
                        <option value="Pre-Purchase Inquiry">Pre-Purchase Inquiry</option>
                        <option value="Technical Troubleshooting">Technical Troubleshooting</option>
                        <option value="General Feedback">General Feedback</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Message / Details <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please describe your query in detail. Include tool name, duration, or any error details."
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm focus:outline-none focus:border-[#4ADE80] transition-colors resize-none leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 rounded-xl bg-[#4ADE80] hover:bg-white text-slate-950 font-black text-sm tracking-wide shadow-lg shadow-[#4ADE80]/20 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <span>Preparing Submission...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-slate-950" />
                        <span>Submit Support Ticket</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
