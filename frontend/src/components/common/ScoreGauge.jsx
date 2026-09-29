import React from 'react';

export default function ScoreGauge({ score = 0, size = 160, strokeWidth = 12 }) {
  const normalizedScore = Math.min(100, Math.max(0, score));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (normalizedScore / 100) * circumference;

  let colorClass = 'text-rose-500';
  let bgGradient = 'from-rose-500/20 to-rose-600/10';
  let statusText = 'Needs Optimization';

  if (normalizedScore >= 80) {
    colorClass = 'text-emerald-400';
    bgGradient = 'from-emerald-500/20 to-emerald-600/10';
    statusText = 'Strong Match!';
  } else if (normalizedScore >= 65) {
    colorClass = 'text-amber-400';
    bgGradient = 'from-amber-500/20 to-amber-600/10';
    statusText = 'Moderate Alignment';
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`relative flex items-center justify-center rounded-full bg-gradient-to-br ${bgGradient} p-4`}
        style={{ width: size, height: size }}
      >
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-slate-800"
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={`${colorClass} transition-all duration-1000 ease-out`}
            fill="transparent"
          />
        </svg>

        {/* Center label */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-4xl font-extrabold tracking-tight text-white">
            {normalizedScore}<span className="text-xl font-normal text-slate-400">%</span>
          </span>
          <span className="text-xs font-semibold text-slate-300 mt-0.5">Match</span>
        </div>
      </div>

      <span className={`mt-3 text-xs font-bold uppercase tracking-wider ${colorClass}`}>
        {statusText}
      </span>
    </div>
  );
}
