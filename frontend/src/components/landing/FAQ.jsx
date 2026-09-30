import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: 'How does Zara Resume Checker calculate my resume ATS score?',
      a: 'Zara Resume Checker extracts text from your PDF/DOCX file and evaluates hard skills, missing tech keywords, section headings, and experience alignment against the target job description using AI models trained on tech hiring standards.'
    },
    {
      q: 'Is Zara Resume Checker completely free to use?',
      a: 'Yes! Zara Resume Checker is 100% free with unlimited access for all users. You get full ATS match scores, missing keyword reports, AI bullet rewrites, cover letters, interview prep, and PDF exports without any subscriptions or credit cards.'
    },
    {
      q: 'Does Zara Resume Checker invent or fake work experience?',
      a: 'Never. We strictly follow zero-hallucination rules. If a required skill or tool is missing from your resume, we flag it as an explicit gap rather than inventing fake job experience.'
    },
    {
      q: 'Will my uploaded resume be stored or shared publicly?',
      a: 'No. Uploaded resumes are processed in-memory for document text parsing and discarded. We never share your private resume files.'
    },
    {
      q: 'Can I export the improved resume as an ATS-friendly PDF?',
      a: 'Yes! You can export a clean, single-column ATS-friendly PDF version of your optimized resume directly from the results page.'
    }
  ];

  return (
    <section className="py-20 bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center">
          <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Frequently Asked Questions</h2>
          <p className="mt-2 text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
            Everything You Need to Know About Zara Resume Checker
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {faqs.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-white font-semibold text-base focus:outline-none"
                >
                  <span>{item.q}</span>
                  <ChevronDown className={`w-5 h-5 text-indigo-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
