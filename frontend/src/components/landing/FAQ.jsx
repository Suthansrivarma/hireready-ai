import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: 'How does HireReady AI analyze my resume against job descriptions?',
      a: 'We extract text from your PDF or DOCX file, analyze keyword density, hard skills, soft skills, section headings, and experience alignment using Google Gemini AI models trained on tech hiring standards.'
    },
    {
      q: 'Does HireReady AI invent or fake work experience?',
      a: 'Never. We strictly follow zero-hallucination rules. If a required skill or qualification is missing from your resume, we flag it as an explicit gap rather than inventing fake job roles or numbers.'
    },
    {
      q: 'Will my uploaded resume be stored permanently?',
      a: 'No. Uploaded resume files are processed in-memory for document text parsing and discarded. Resumes are only saved to your private account if you explicitly choose to save an analysis in your dashboard.'
    },
    {
      q: 'What is ATS and why do I need an ATS checker?',
      a: 'ATS (Applicant Tracking System) is software used by over 90% of companies to parse, filter, and score candidate resumes before a human recruiter views them. An ATS checker helps ensure your document contains standard section titles and relevant keywords.'
    },
    {
      q: 'Can I export the improved resume as a PDF?',
      a: 'Yes! Premium and Pro users can generate and download a clean, single-column ATS-friendly PDF version of their optimized resume directly from the results page.'
    }
  ];

  return (
    <section className="py-20 bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center">
          <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Got Questions?</h2>
          <p className="mt-2 text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
            Frequently Asked Questions
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
