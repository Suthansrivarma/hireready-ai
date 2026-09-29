import React from 'react';
import { Briefcase, Building, Sparkles } from 'lucide-react';

export default function JobDescriptionInput({
  jobTitle,
  setJobTitle,
  companyName,
  setCompanyName,
  jobDescription,
  setJobDescription
}) {
  const sampleJobs = [
    {
      title: 'Full Stack Developer',
      company: 'TechCorp',
      desc: 'We are seeking a Full Stack Developer proficient in React, Node.js, Express, MongoDB, REST APIs, Git, and Docker. Candidates should have experience building scalable web applications, optimizing component rendering, and writing clean, maintainable code in an Agile team.'
    },
    {
      title: 'Frontend Engineer',
      company: 'SaaS Labs',
      desc: 'Looking for a Frontend Engineer with expert knowledge in JavaScript (ES6+), React 18, Tailwind CSS, TypeScript, state management, and web performance optimization. Experience with unit testing (Jest/RTL) and responsive design principles is highly desired.'
    },
    {
      title: 'Software Engineer - Early Career',
      company: 'InnovateX',
      desc: 'Join our engineering team as an early-career Software Engineer. Requirements include a degree in Computer Science or equivalent hands-on experience, proficiency in Python or JavaScript, understanding of REST APIs, database queries (SQL/NoSQL), and version control with Git.'
    }
  ];

  const applySample = (sample) => {
    setJobTitle(sample.title);
    setCompanyName(sample.company);
    setJobDescription(sample.desc);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
        <label className="text-sm font-semibold text-white">2. Target Job Description</label>
        <span className="text-xs text-slate-400">Required for AI matching</span>
      </div>

      {/* Title & Company Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-indigo-400" /> Job Title
          </label>
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="e.g. Software Engineer / Frontend Developer"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5 text-indigo-400" /> Target Company (Optional)
          </label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="e.g. Google, Microsoft, Startup"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Description Textarea */}
      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1">
          Full Job Description Content
        </label>
        <textarea
          rows={8}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the full job posting text here (responsibilities, required skills, tools, qualifications)..."
          className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
        <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
          <span>{jobDescription.trim().split(/\s+/).filter(Boolean).length} words</span>
          <span>Min recommended: 50 words</span>
        </div>
      </div>

      {/* Quick Sample Presets */}
      <div className="mt-4 pt-4 border-t border-slate-800/80">
        <span className="text-xs font-semibold text-slate-400 block mb-2 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-indigo-400" /> Try a sample job description:
        </span>
        <div className="flex flex-wrap gap-2">
          {sampleJobs.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => applySample(sample)}
              className="text-xs bg-slate-950 hover:bg-slate-800 border border-slate-800 text-indigo-300 hover:text-indigo-200 px-3 py-1.5 rounded-lg transition-colors"
            >
              + {sample.title}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
