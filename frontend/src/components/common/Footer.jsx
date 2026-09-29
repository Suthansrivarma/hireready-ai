import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 text-sm py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Column */}
        <div className="space-y-4 md:col-span-1">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">
              HireReady<span className="text-indigo-400">.AI</span>
            </span>
          </Link>
          <p className="text-xs text-slate-400 leading-relaxed">
            The AI-powered resume optimizer and ATS match engine designed for students, fresh graduates, and tech professionals.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-indigo-300 bg-indigo-950/60 border border-indigo-800/40 p-2.5 rounded-lg">
            <ShieldCheck className="w-4 h-4 shrink-0 text-indigo-400" />
            <span>Privacy First: Resumes are never stored permanently unless saved to your dashboard.</span>
          </div>
        </div>

        {/* SEO Tools */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-3">Popular ATS Tools</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/analyzer" className="hover:text-indigo-400 transition-colors">AI Resume Builder</Link></li>
            <li><Link to="/analyzer" className="hover:text-indigo-400 transition-colors">ATS Resume Checker</Link></li>
            <li><Link to="/analyzer" className="hover:text-indigo-400 transition-colors">Free ATS Checker</Link></li>
            <li><Link to="/analyzer" className="hover:text-indigo-400 transition-colors">Resume Job Description Matcher</Link></li>
            <li><Link to="/analyzer" className="hover:text-indigo-400 transition-colors">AI Resume Optimizer</Link></li>
          </ul>
        </div>

        {/* Product Navigation */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-3">Product & Pricing</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/pricing" className="hover:text-indigo-400 transition-colors">Free Tier</Link></li>
            <li><Link to="/pricing" className="hover:text-indigo-400 transition-colors">Premium Plan</Link></li>
            <li><Link to="/pricing" className="hover:text-indigo-400 transition-colors">Pro Plan</Link></li>
            <li><Link to="/tracker" className="hover:text-indigo-400 transition-colors">Job Application Tracker</Link></li>
          </ul>
        </div>

        {/* Legal & Compliance */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-3">Ethics & Transparency</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            HireReady AI is built on honest optimization principles. We never fabricate work experience, fake credentials, or promise unsupported claims like "100% ATS Guaranteed".
          </p>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>© {new Date().getFullYear()} HireReady AI. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="/robots.txt" className="hover:text-slate-400">Robots.txt</a>
          <a href="/sitemap.xml" className="hover:text-slate-400">Sitemap</a>
        </div>
      </div>
    </footer>
  );
}
