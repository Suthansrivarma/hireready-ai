import React from 'react';
import ScoreGauge from '../common/ScoreGauge';
import { Award, CheckCircle2, AlertTriangle, ShieldAlert } from 'lucide-react';

export default function MatchOverview({ analysis }) {
  const { matchScore = {} } = analysis;

  const scoreCategories = [
    { label: 'Technical Skills Alignment', score: matchScore.skillsScore || 0, color: 'bg-emerald-500' },
    { label: 'Experience & Project Relevance', score: matchScore.experienceScore || 0, color: 'bg-indigo-500' },
    { label: 'Education & Qualifications', score: matchScore.educationScore || 0, color: 'bg-purple-500' },
    { label: 'ATS Formatting & Structure', score: matchScore.atsScore || 0, color: 'bg-amber-500' }
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        
        {/* Score Gauge */}
        <div className="md:col-span-1 border-b md:border-b-0 md:border-r border-slate-800 pb-6 md:pb-0 md:pr-6 flex flex-col items-center">
          <ScoreGauge score={matchScore.overall || 0} size={170} />
          <p className="text-xs text-slate-400 mt-4 text-center">
            Overall ATS Match Index calculated against target job description.
          </p>
        </div>

        {/* Breakdown Bars */}
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
            <Award className="w-4 h-4 text-indigo-400" /> Match Score Breakdown
          </h3>

          {scoreCategories.map((cat, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-300">{cat.label}</span>
                <span className="text-white">{cat.score}%</span>
              </div>
              <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                <div
                  className={`h-full ${cat.color} transition-all duration-1000 ease-out`}
                  style={{ width: `${cat.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
