import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  ExternalLink,
  Users,
  Clock,
  Sparkles,
  Award,
  ArrowRight,
  Mail,
  MessageCircle,
} from 'lucide-react';
import { SEO } from '../components/SEO';

interface AboutPageProps {
  onNavigateHome: () => void;
  onNavigateContact: () => void;
  onNavigateProducts: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigateHome,
  onNavigateContact,
  onNavigateProducts,
}) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-red-600 selection:text-white">
      <SEO
        title="About Us - ToolClubPK Official Digital Subscriptions & Activation Verification"
        description="Learn about ToolClubPK: Pakistan's trusted digital subscriptions, tools activation, and verified customer delivery showcase platform."
        canonicalPath="/about"
      />

      {/* Hero Header */}
      <section className="relative pt-16 pb-12 sm:pt-20 sm:pb-16 border-b border-slate-850 bg-slate-900/40 backdrop-blur-xl overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-emerald-500/10 via-emerald-950/5 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-[#4ADE80] text-xs font-bold tracking-wider mb-4">
            <ShieldCheck className="w-4 h-4 text-[#4ADE80]" />
            <span>TRANSPARENT DIGITAL EXCELLENCE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-[#4ADE80]">ToolClubPK</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
            Providing authentic digital tool subscriptions, reliable activations, and a 100% transparent fulfillment verification system for students, freelancers, and businesses.
          </p>
        </div>
      </section>

      {/* Main Content Body */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        {/* Core Mission */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2.5">
            <Award className="w-6 h-6 text-[#4ADE80]" />
            What is ToolClubPK?
          </h2>
          <div className="text-slate-300 space-y-4 text-sm sm:text-base leading-relaxed">
            <p>
              <strong>ToolClubPK</strong> is an independent digital services and subscription fulfillment provider established to bridge the gap between expensive international subscriptions and local digital creators, software developers, video editors, and students.
            </p>
            <p>
              We specialize in offering managed subscription access, team workspace seats, and direct upgrades for leading global productivity platforms — including <strong>Claude AI, ChatGPT Plus, CapCut Pro, Surfshark VPN, NordVPN, Adobe Creative Cloud, and YouTube Premium</strong>.
            </p>
            <p>
              Unlike conventional online sellers who operate without accountability, ToolClubPK maintains this dedicated public verification portal (<code>toolclubpk.shop</code>) where every single completed customer order is permanently archived with timestamped fulfillment screenshots and cryptographic verification hashes.
            </p>
          </div>
        </section>

        {/* What We Provide */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-[#4ADE80] mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Essential Productivity Tools</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              We provide cost-effective access to state-of-the-art AI engines, cloud creative suites, ad-free streaming, and cybersecurity VPN protocols tailored for freelance and team productivity.
            </p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Verified Proof Protocol</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Every customer receives an Order ID (e.g. TC-4185). A real-time fulfillment screenshot is uploaded to our portal, giving you proof of genuine activation and a reference for warranty claims.
            </p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Rapid Digital Delivery</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Most orders are fulfilled within 15 to 45 minutes during business hours. Credentials and instructions are dispatched via WhatsApp and Email for immediate workflow continuity.
            </p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Full Duration Warranty</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              We stand behind our services with an active replacement warranty. If a managed profile encounters access resets during your plan period, our support team resolves it within 12–24 hours.
            </p>
          </div>
        </section>

        {/* What Users Can Expect */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
            Our Commitments to Customers
          </h2>
          <ul className="space-y-3 text-sm sm:text-base text-slate-300">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#4ADE80] shrink-0 mt-0.5" />
              <span><strong>Honest Product Descriptions:</strong> We clearly specify whether a plan is a shared seat, personal email invite, or dedicated profile so you know exactly what you are purchasing.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#4ADE80] shrink-0 mt-0.5" />
              <span><strong>Transparent Replacement Terms:</strong> If an account suffers a platform-wide reset, we troubleshoot or issue a replacement seat promptly under our warranty guidelines.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#4ADE80] shrink-0 mt-0.5" />
              <span><strong>Zero Intrusive Software:</strong> We do not ask customers to install third-party cracks, keygens, or unauthorized patches. All tools run on official apps and web portals.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#4ADE80] shrink-0 mt-0.5" />
              <span><strong>Privacy Protection:</strong> Customer names are kept confidential, and personal order data is safeguarded according to our Privacy Policy.</span>
            </li>
          </ul>
        </section>

        {/* How to Contact Support */}
        <section className="bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Need Assistance or Have Questions?</h3>
            <p className="text-sm text-slate-400 max-w-xl">
              Our support desk is active daily from 10:00 AM to 11:00 PM PKT. Reach out via email or direct WhatsApp support for order inquiries, activations, and warranties.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onNavigateContact}
              className="px-5 py-2.5 rounded-xl bg-[#4ADE80] hover:bg-white text-slate-950 font-bold text-xs sm:text-sm transition-colors cursor-pointer flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Support</span>
            </button>
            <button
              onClick={onNavigateProducts}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm border border-slate-700 transition-colors cursor-pointer flex items-center gap-2"
            >
              <span>Explore Tools</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};
