import React, { useState } from 'react';
import { Mail, Copy, Check, Download } from 'lucide-react';

export default function CoverLetterModal({ coverLetter, jobTitle, companyName }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(coverLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    const element = document.createElement("a");
    const file = new Blob([coverLetter], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `Cover_Letter_${jobTitle.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-white uppercase tracking-wider">
              Tailored Cover Letter
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Customized for {jobTitle || 'Target Role'} at {companyName || 'Target Employer'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs text-indigo-300 bg-indigo-950/80 hover:bg-indigo-900 px-3 py-2 rounded-xl border border-indigo-800/60 font-semibold transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied to Clipboard' : 'Copy Text'}
          </button>
          <button
            onClick={handleDownloadTxt}
            className="flex items-center gap-1.5 text-xs text-slate-200 bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-xl border border-slate-700 font-semibold transition-colors"
          >
            <Download className="w-4 h-4" />
            Download .TXT
          </button>
        </div>
      </div>

      <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 text-xs text-slate-200 leading-relaxed font-mono whitespace-pre-wrap">
        {coverLetter || 'No cover letter content generated.'}
      </div>

    </div>
  );
}
