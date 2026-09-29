import React, { useState } from 'react';
import { Upload, FileText, CheckCircle2, AlertCircle, Trash2 } from 'lucide-react';

export default function ResumeUploader({ file, setFile, pasteText, setPasteText, mode, setMode }) {
  const [dragActive, setDragActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleFile = (selectedFile) => {
    setErrorMsg('');
    if (!selectedFile) return;

    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'text/plain'
    ];
    const ext = selectedFile.name.toLowerCase().slice(selectedFile.name.lastIndexOf('.'));

    if (!allowedTypes.includes(selectedFile.mimetype) && !['.pdf', '.docx', '.doc', '.txt'].includes(ext)) {
      setErrorMsg('Invalid file format. Only PDF and DOCX files are allowed.');
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setErrorMsg('File size exceeds 5MB limit.');
      return;
    }

    setFile(selectedFile);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      
      {/* Mode Switcher */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
        <label className="text-sm font-semibold text-white">1. Upload Resume</label>
        <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-medium">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-3 py-1 rounded-md transition-colors ${
              mode === 'upload' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Upload File
          </button>
          <button
            type="button"
            onClick={() => setMode('text')}
            className={`px-3 py-1 rounded-md transition-colors ${
              mode === 'text' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Paste Text
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="mb-4 flex items-center gap-2 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {mode === 'upload' ? (
        file ? (
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{file.name}</p>
                <p className="text-xs text-slate-400">{(file.size / 1024).toFixed(1)} KB • Ready for AI analysis</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setFile(null)}
              className="p-2 text-slate-400 hover:text-rose-400 transition-colors"
              title="Remove File"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            className={`relative flex flex-col items-center justify-center p-8 rounded-xl border-2 border-dashed transition-all cursor-pointer ${
              dragActive
                ? 'border-indigo-500 bg-indigo-500/10'
                : 'border-slate-800 hover:border-slate-700 bg-slate-950/50'
            }`}
          >
            <input
              type="file"
              accept=".pdf,.docx,.doc,.txt"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />

            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-indigo-400 mb-3">
              <Upload className="w-6 h-6" />
            </div>

            <p className="text-sm font-semibold text-white text-center">
              Drag & Drop your PDF or DOCX resume here
            </p>
            <p className="text-xs text-slate-400 mt-1">Maximum file size: 5MB</p>
          </div>
        )
      ) : (
        <div>
          <textarea
            rows={8}
            value={pasteText}
            onChange={(e) => setPasteText(e.target.value)}
            placeholder="Paste your plain text resume content here..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
          />
          <div className="mt-2 text-right text-xs text-slate-500">
            {pasteText.length} characters
          </div>
        </div>
      )}
    </div>
  );
}
