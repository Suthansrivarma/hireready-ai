import React from 'react';
import { AlertOctagon, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';

export default function AtsIssuesList({ analysis }) {
  const issues = analysis.atsIssues || [];
  const recs = analysis.recommendations || [];

  const getBadge = (severity) => {
    switch (severity) {
      case 'critical':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1">
            <AlertOctagon className="w-3 h-3" /> Critical Fix
          </span>
        );
      case 'warning':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" /> Warning
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
            <Info className="w-3 h-3" /> Recommendation
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      
      {/* ATS Structural Issues */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 pb-3 border-b border-slate-800">
          ATS Parsing & Formatting Check
        </h3>

        {issues.length > 0 ? (
          <div className="space-y-4">
            {issues.map((item, idx) => (
              <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400 font-semibold">{item.category}</span>
                  {getBadge(item.severity)}
                </div>

                <p className="text-sm font-semibold text-white">{item.issue}</p>

                <div className="text-xs bg-indigo-950/40 border border-indigo-900/50 text-indigo-200 p-2.5 rounded-lg flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-indigo-300">How to fix: </span>
                    {item.solution}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400">No formatting or parsing issues found.</p>
        )}
      </div>

      {/* Actionable General Recommendations */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 pb-3 border-b border-slate-800">
          Actionable Improvement Recommendations
        </h3>

        <ul className="space-y-3">
          {recs.map((rec, i) => (
            <li key={i} className="flex items-start gap-3 text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="w-5 h-5 rounded-full bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span className="leading-relaxed">{rec}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}
