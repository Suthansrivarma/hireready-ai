import React from 'react';
import { CheckCircle2, XCircle, Tag, Search } from 'lucide-react';

export default function SkillsBreakdown({ analysis }) {
  const matchedSkills = analysis.matchedSkills || [];
  const missingSkills = analysis.missingSkills || [];
  const matchedKw = analysis.keywords?.matched || [];
  const missingKw = analysis.keywords?.missing || [];

  return (
    <div className="space-y-6">
      
      {/* Skills Matrix Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Matched Skills */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Matched Skills & Qualifications ({matchedSkills.length})
            </h3>
          </div>

          {matchedSkills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {matchedSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic">No exact tech skill matches found.</p>
          )}
        </div>

        {/* Missing Skills */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
            <XCircle className="w-5 h-5 text-rose-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Missing Critical Skills Gaps ({missingSkills.length})
            </h3>
          </div>

          {missingSkills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {missingSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold flex items-center gap-1.5"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-emerald-400 font-semibold">Great job! No major skill gaps detected.</p>
          )}
        </div>

      </div>

      {/* Keywords Comparison */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
          <Search className="w-5 h-5 text-indigo-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            ATS Keyword Search Terms
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div>
            <span className="text-slate-400 font-semibold block mb-2">Matched In Job Description:</span>
            <div className="flex flex-wrap gap-1.5">
              {matchedKw.map((kw, i) => (
                <span key={i} className="px-2.5 py-1 bg-slate-950 border border-slate-800 text-slate-300 rounded font-mono">
                  {kw}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="text-slate-400 font-semibold block mb-2">Recommended To Add (If Qualified):</span>
            <div className="flex flex-wrap gap-1.5">
              {missingKw.map((kw, i) => (
                <span key={i} className="px-2.5 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-300 rounded font-mono">
                  + {kw}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
