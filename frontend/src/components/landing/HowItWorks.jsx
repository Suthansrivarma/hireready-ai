import React from 'react';
import { Upload, FileText, CheckCircle } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      step: '01',
      icon: Upload,
      title: 'Upload Your Resume',
      desc: 'Upload your PDF or DOCX resume. Zara Resume Checker securely extracts text in-memory without sharing your private file.'
    },
    {
      step: '02',
      icon: FileText,
      title: 'Paste Target Job Description',
      desc: 'Paste the job posting description you are applying for (Software Engineer, Full Stack, Data Analyst, IT Specialist).'
    },
    {
      step: '03',
      icon: CheckCircle,
      title: 'Calculate ATS Score & Export',
      desc: 'Get your instant resume ATS score, missing search keywords, bullet rewrites, tailored cover letter, and clean ATS PDF export.'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-slate-900/50 border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Simple 3-Step Process</h2>
          <p className="mt-2 text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
            How Zara Resume Checker Calculates Your ATS Score
          </p>
          <p className="mt-4 text-base text-slate-400">
            Free ATS resume checker and score optimizer designed to help tech job seekers pass automated ATS filters.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative bg-slate-950 p-8 rounded-2xl border border-slate-800 hover:border-indigo-500/40 transition-all group"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-extrabold text-slate-800 group-hover:text-indigo-950 transition-colors font-mono">
                    {item.step}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
