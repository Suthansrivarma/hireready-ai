import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { analysisAPI } from '../services/api';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import ResumeUploader from '../components/analyzer/ResumeUploader';
import JobDescriptionInput from '../components/analyzer/JobDescriptionInput';
import AdBanner from '../components/common/AdBanner';
import { Sparkles, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';

export default function AnalyzerPage() {
  const { isAuthenticated, updateUser } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState('upload'); // 'upload' or 'text'
  const [file, setFile] = useState(null);
  const [pasteText, setPasteText] = useState('');

  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobDescription, setJobDescription] = useState('');

  const [loading, setLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (mode === 'upload' && !file) {
      setError('Please select a PDF or DOCX resume file to upload.');
      return;
    }

    if (mode === 'text' && (!pasteText || pasteText.trim().length < 30)) {
      setError('Please paste your plain text resume content.');
      return;
    }

    if (!jobDescription || jobDescription.trim().length < 20) {
      setError('Please provide a target job description.');
      return;
    }

    setLoading(true);
    setLoadingStage('Extracting document & checking ATS guidelines...');

    const timer1 = setTimeout(() => setLoadingStage('Matching hard skills & tech keywords...'), 1500);
    const timer2 = setTimeout(() => setLoadingStage('Evaluating experience & section formatting...'), 3000);
    const timer3 = setTimeout(() => setLoadingStage('Generating non-fabricated bullet rewrites & interview Qs...'), 4500);

    try {
      const formData = new FormData();
      if (mode === 'upload' && file) {
        formData.append('resume', file);
      } else {
        formData.append('resumeText', pasteText);
      }
      formData.append('jobTitle', jobTitle);
      formData.append('companyName', companyName);
      formData.append('jobDescription', jobDescription);

      const res = await analysisAPI.analyze(formData);

      if (res.data.success) {
        if (res.data.usage) {
          updateUser({ usage: res.data.usage });
        }
        const analysisId = res.data.data._id || res.data.data.id;
        navigate(`/results/${analysisId}`, { state: { analysis: res.data.data } });
      }
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err.response?.data?.message || 'Failed to analyze resume. Please try again.');
    } finally {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />

      <main className="flex-grow max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Top Ad Slot */}
        <AdBanner slot="analyzer-top-slot" className="mb-8" />

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> 100% Free & Unlimited AI Resume Matcher
          </div>
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl tracking-tight">
            Analyze & Score Your Resume
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Upload your resume and paste the target job description to receive instant ATS feedback and tailored improvements.
          </p>
        </div>

        {/* Error notification */}
        {error && (
          <div className="mb-6 flex items-center gap-2 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <ResumeUploader
            file={file}
            setFile={setFile}
            pasteText={pasteText}
            setPasteText={setPasteText}
            mode={mode}
            setMode={setMode}
          />

          <JobDescriptionInput
            jobTitle={jobTitle}
            setJobTitle={setJobTitle}
            companyName={companyName}
            setCompanyName={setCompanyName}
            jobDescription={jobDescription}
            setJobDescription={setJobDescription}
          />

          {/* Submit Button & Loader */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 rounded-2xl font-bold text-base bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>{loadingStage}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-indigo-200" />
                  <span>Analyze Resume Against Job Description</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>

        </form>

        {/* Bottom Ad Slot */}
        <AdBanner slot="analyzer-bottom-slot" className="mt-12" />

      </main>

      <Footer />
    </div>
  );
}
