import React from 'react';
import { Target, Search, FileEdit, Mail, MessageSquare, Download, ShieldCheck, Zap } from 'lucide-react';

export default function Features() {
  const featureList = [
    {
      icon: Target,
      title: 'Overall Match Score & Breakdown',
      desc: 'View your cumulative ATS match percentage broken down by technical skills, experience alignment, education, and formatting compliance.'
    },
    {
      icon: Search,
      title: 'Skill Gap & Keyword Detection',
      desc: 'Discover critical technical keywords present in the job description that are missing from your resume before HR parsers filter you out.'
    },
    {
      icon: FileEdit,
      title: 'Ethical Bullet Rewriter',
      desc: 'Upgrade weak action descriptions into high-impact bullet points with measurable result placeholders without fabricating fake experience.'
    },
    {
      icon: Mail,
      title: 'Tailored Cover Letter Generator',
      desc: 'Generate customized professional cover letters referencing specific requirements of the employer in seconds.'
    },
    {
      icon: MessageSquare,
      title: '10 Job-Specific Interview Questions',
      desc: 'Prepare for technical and behavioral questions tailored directly to your candidate background and the job requirements.'
    },
    {
      icon: Download,
      title: 'ATS-Friendly Clean PDF Export',
      desc: 'Download your optimized resume layout formatted specifically to bypass complex ATS text parsing filters.'
    }
  ];

  return (
    <section id="features" className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Built for Results</h2>
          <p className="mt-2 text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
            Everything You Need to Win Software & IT Interviews
          </p>
          <p className="mt-4 text-base text-slate-400">
            Comprehensive tools engineered specifically for early-career developers, software engineers, and IT specialists.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureList.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 hover:border-indigo-500/30 transition-all hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
