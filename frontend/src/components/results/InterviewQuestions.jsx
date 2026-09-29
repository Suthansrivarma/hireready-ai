import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Lightbulb, MessageSquare } from 'lucide-react';

export default function InterviewQuestions({ questions = [] }) {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
      
      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-800">
        <MessageSquare className="w-5 h-5 text-indigo-400" />
        <div>
          <h3 className="text-base font-bold text-white uppercase tracking-wider">
            10 Tailored Interview Questions & Answer Hints
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Engineered based on your resume experience gaps and job description technical requirements.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {questions.map((item, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full flex items-start justify-between p-4 text-left focus:outline-none"
              >
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-600/20 text-indigo-400 font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div>
                    <span className="text-xs font-mono text-indigo-300 font-semibold uppercase block mb-1">
                      {item.category || 'Technical'}
                    </span>
                    <p className="text-sm font-semibold text-white leading-snug">
                      {item.question}
                    </p>
                  </div>
                </div>

                <ChevronDown className={`w-5 h-5 text-slate-500 shrink-0 transition-transform mt-1 ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-1 border-t border-slate-800/80">
                  <div className="bg-indigo-950/40 border border-indigo-900/50 p-3.5 rounded-lg text-xs text-indigo-200 flex items-start gap-2.5">
                    <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-amber-300 font-bold block mb-1">Sample Answer Strategy / Hint:</strong>
                      <span className="leading-relaxed text-slate-300">{item.sampleAnswerHint}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
