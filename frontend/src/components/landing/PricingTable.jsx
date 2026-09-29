import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Sparkles, Gift, HeartHandshake } from 'lucide-react';

export default function PricingTable() {
  const freeFeatures = [
    'Unlimited Resume Analyses',
    'Overall ATS Match Score & Breakdown',
    'Matched vs Missing Tech Skills & Keywords',
    'Critical & Warning ATS Formatting Fixes',
    'Non-Fabricated Executive Summary Generator',
    'Action-Oriented Bullet Point Rewriter',
    'Tailored Cover Letter Generator',
    '10 Job-Specific Interview Questions & Answers',
    '1-Click Clean ATS PDF Exporter',
    'Job Application Kanban Tracker Board'
  ];

  return (
    <section id="pricing" className="py-20 bg-slate-900/50 border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-bold mb-4">
            <Gift className="w-4 h-4 text-emerald-400" />
            <span>No Subscriptions. No Credit Cards. 100% Free Forever.</span>
          </div>

          <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
            Why Is HireReady AI Completely Free?
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            We believe candidates shouldn't have to pay expensive monthly subscriptions just to optimize their resumes for job applications. HireReady AI is supported by non-intrusive advertisements so you get <strong>unlimited access to all premium AI features for free</strong> while we cover server and AI API costs through ads.
          </p>
        </div>

        <div className="mt-12 bg-slate-950 border-2 border-indigo-500 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-4 py-1.5 rounded-bl-2xl uppercase tracking-wider">
            All Features Included
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div>
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                Free Forever Membership <Sparkles className="w-5 h-5 text-indigo-400" />
              </h3>
              <p className="text-xs text-slate-400 mt-1">Unlimited analyses for all students, fresh grads, and IT professionals.</p>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-4xl font-extrabold text-emerald-400">$0</span>
              <span className="text-xs text-slate-400 block">No hidden fees</span>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {freeFeatures.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs text-slate-200">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="font-medium">{feat}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800 text-center">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-base bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-600/30 transition-all hover:-translate-y-0.5"
            >
              <HeartHandshake className="w-5 h-5" /> Start Free Analysis Now
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
