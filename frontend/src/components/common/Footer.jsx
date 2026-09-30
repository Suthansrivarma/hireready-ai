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
              Zara <span className="text-indigo-400">Resume Checker</span>
            </span>
          </Link>
          <p className="text-xs text-slate-400 leading-relaxed">
            The free AI-powered ATS resume checker and resume score matcher built for students, fresh graduates, and tech job seekers.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-indigo-300 bg-indigo-950/60 border border-indigo-800/40 p-2.5 rounded-lg">
            <ShieldCheck className="w-4 h-4 shrink-0 text-indigo-400" />
            <span>Privacy First: Resumes are analyzed securely in-memory and never shared.</span>
          </div>
        </div>

        {/* Targeted SEO Search Tools */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-3">Popular ATS Tools</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/analyzer" className="hover:text-indigo-400 transition-colors">Free ATS Resume Checker</Link></li>
            <li><Link to="/analyzer" className="hover:text-indigo-400 transition-colors">Calculate Resume ATS Score</Link></li>
            <li><Link to="/analyzer" className="hover:text-indigo-400 transition-colors">Resume Score Checker</Link></li>
            <li><Link to="/analyzer" className="hover:text-indigo-400 transition-colors">Resume Job Description Matcher</Link></li>
            <li><Link to="/analyzer" className="hover:text-indigo-400 transition-colors">Free AI Resume Optimizer</Link></li>
          </ul>
        </div>

        {/* Product Navigation */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-3">Zara Features</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/pricing" className="hover:text-indigo-400 transition-colors">100% Free Access</Link></li>
            <li><Link to="/analyzer" className="hover:text-indigo-400 transition-colors">AI Bullet Rewriter</Link></li>
            <li><Link to="/analyzer" className="hover:text-indigo-400 transition-colors">Tailored Cover Letter</Link></li>
            <li><Link to="/tracker" className="hover:text-indigo-400 transition-colors">Job Application Tracker</Link></li>
            <li><Link to="/analyzer" className="hover:text-indigo-400 transition-colors">1-Click ATS PDF Export</Link></li>
          </ul>
        </div>

        {/* SEO & Ethics */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-3">Ethical AI Guarantee</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Zara Resume Checker reinforces your real experience with strong action verbs and impact metrics. We never fabricate fake credentials or job titles.
          </p>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>© {new Date().getFullYear()} Zara Resume Checker. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="/robots.txt" className="hover:text-slate-400">Robots.txt</a>
          <a href="/sitemap.xml" className="hover:text-slate-400">Sitemap</a>
        </div>
      </div>
    </footer>
  );
}
