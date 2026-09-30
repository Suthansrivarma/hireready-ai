import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, FileSearch, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-16 pb-20 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-indigo-600/20 via-purple-600/10 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-6">
          <Zap className="w-3.5 h-3.5 text-indigo-400" />
          <span>100% Free ATS Resume Score Checker & Optimizer</span>
        </div>

        {/* Main SEO Heading */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
          Check Your <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-indigo-200 bg-clip-text text-transparent">Resume ATS Score</span> Free with <span className="text-white">Zara Resume Checker</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
          Instant <strong>free ATS resume checker</strong> and job description matcher. Calculate your resume score, discover missing skills, rewrite weak bullet points, and download clean ATS-friendly PDFs.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/analyzer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-base bg-indigo-600 text-white hover:bg-indigo-500 shadow-xl shadow-indigo-600/30 transition-all hover:shadow-indigo-600/50 hover:-translate-y-0.5"
          >
            <Sparkles className="w-5 h-5 text-indigo-200" />
            Check My Resume ATS Score Free
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/pricing"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-base bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700/80 transition-colors"
          >
            Why 100% Free?
          </Link>
        </div>

        {/* Trust badges */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Free ATS Score Checker
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-indigo-400" /> Zero Experience Fabrication
          </span>
          <span className="flex items-center gap-1.5">
            <FileSearch className="w-4 h-4 text-purple-400" /> Clean ATS-Proof PDF Export
          </span>
        </div>

        {/* Interactive Mockup Graphic */}
        <div className="mt-14 relative max-w-5xl mx-auto rounded-2xl border border-slate-800 bg-slate-900/90 p-4 sm:p-6 shadow-2xl shadow-indigo-950/50 backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-xs text-slate-500 font-mono">zara-resume-checker.vercel.app</span>
            </div>
            <span className="text-xs bg-emerald-500/10 text-emerald-400 font-semibold px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              Live Preview
            </span>
          </div>

          {/* Sample Card Mockup */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            
            <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-xs text-slate-400 font-semibold">RESUME ATS SCORE</span>
                <div className="mt-2 text-3xl font-extrabold text-emerald-400">88%</div>
                <div className="mt-2 w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-full w-[88%]" />
                </div>
              </div>
              <p className="mt-4 text-xs text-slate-400">Strong alignment with Software Engineer ATS keywords.</p>
            </div>

            <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 font-semibold">MISSING KEYWORDS DETECTED</span>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <span className="px-2 py-1 rounded bg-rose-500/10 text-rose-300 text-xs border border-rose-500/20 font-mono">+ Docker</span>
                <span className="px-2 py-1 rounded bg-rose-500/10 text-rose-300 text-xs border border-rose-500/20 font-mono">+ TypeScript</span>
                <span className="px-2 py-1 rounded bg-rose-500/10 text-rose-300 text-xs border border-rose-500/20 font-mono">+ CI/CD</span>
              </div>
              <p className="mt-3 text-xs text-slate-400">Identified as gaps without lying on candidate resume.</p>
            </div>

            <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 font-semibold">AI BULLET REWRITER</span>
              <p className="mt-2 text-xs text-slate-400 line-through">"Worked on react app features and bug fixes."</p>
              <p className="mt-2 text-xs text-indigo-300 font-medium">"Engineered responsive React components, optimizing state load times by [X%]."</p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
