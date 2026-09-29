import React, { useState } from 'react';
import { Sparkles, Copy, Check, ArrowRight, ShieldCheck } from 'lucide-react';

export default function ResumeRewriter({ analysis }) {
  const summary = analysis.improvedSummary || '';
  const rewrites = analysis.bulletPointRewrites || [];
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const copyToClipboard = (text, type, idx = null) => {
    navigator.clipboard.writeText(text);
    if (type === 'summary') {
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2000);
    } else {
      setCopiedIndex(idx);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Zero Fabrication Ethical Banner */}
      <div className="flex items-center gap-2 bg-indigo-950/40 border border-indigo-800/40 p-3 rounded-xl text-xs text-indigo-300">
        <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
        <span>
          <strong>Ethical AI Guarantee:</strong> Rewritten bullet points strengthen your actual responsibilities with action verbs and impact metric placeholders ([X%], [N users]). We never invent fake companies or titles.
        </span>
      </div>

      {/* Improved Professional Summary */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Tailored Professional Summary
            </h3>
          </div>
          <button
            onClick={() => copyToClipboard(summary, 'summary')}
            className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 bg-indigo-950/80 px-3 py-1.5 rounded-lg border border-indigo-800/60 transition-colors"
          >
            {copiedSummary ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedSummary ? 'Copied!' : 'Copy Summary'}
          </button>
        </div>

        <p className="text-sm text-slate-200 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800 font-sans">
          {summary || 'No summary generated.'}
        </p>
      </div>

      {/* Bullet Point Rewrites */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 pb-3 border-b border-slate-800">
          High-Impact Bullet Point Rewrites ({rewrites.length})
        </h3>

        <div className="space-y-4">
          {rewrites.map((item, idx) => (
            <div key={idx} className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              
              {/* Original */}
              <div className="text-xs">
                <span className="text-slate-500 font-semibold uppercase tracking-wider block mb-1">
                  Original Weak Bullet Point:
                </span>
                <p className="text-slate-400 line-through pl-3 border-l-2 border-slate-800">
                  {item.original}
                </p>
              </div>

              {/* Arrow */}
              <div className="flex items-center gap-2 text-xs text-indigo-400 font-semibold">
                <ArrowRight className="w-4 h-4" />
                <span>AI Action-Oriented Optimization:</span>
              </div>

              {/* Rewritten */}
              <div className="text-xs">
                <div className="flex items-start justify-between bg-indigo-950/30 p-3 rounded-lg border border-indigo-900/40 text-slate-100">
                  <p className="leading-relaxed font-medium">
                    {item.rewritten}
                  </p>
                  <button
                    onClick={() => copyToClipboard(item.rewritten, 'bullet', idx)}
                    className="ml-3 p-1.5 text-slate-400 hover:text-indigo-300 transition-colors shrink-0"
                    title="Copy Bullet"
                  >
                    {copiedIndex === idx ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                {item.impactHighlight && (
                  <span className="text-[11px] text-indigo-300/80 mt-1 block italic">
                    💡 {item.impactHighlight}
                  </span>
                )}
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
