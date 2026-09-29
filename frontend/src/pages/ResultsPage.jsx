import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { analysisAPI } from '../services/api';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import AdBanner from '../components/common/AdBanner';

import MatchOverview from '../components/results/MatchOverview';
import SkillsBreakdown from '../components/results/SkillsBreakdown';
import AtsIssuesList from '../components/results/AtsIssuesList';
import ResumeRewriter from '../components/results/ResumeRewriter';
import CoverLetterModal from '../components/results/CoverLetterModal';
import InterviewQuestions from '../components/results/InterviewQuestions';
import ExportPdfButton from '../components/results/ExportPdfButton';

import { Award, CheckCircle2, AlertTriangle, FileEdit, Mail, MessageSquare, ArrowLeft, RefreshCw } from 'lucide-react';

export default function ResultsPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [analysis, setAnalysis] = useState(location.state?.analysis || null);
  const [loading, setLoading] = useState(!location.state?.analysis);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!analysis && id) {
      fetchAnalysis();
    }
  }, [id]);

  const fetchAnalysis = async () => {
    try {
      const res = await analysisAPI.getById(id);
      if (res.data.success) {
        setAnalysis(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load analysis:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
        <Navbar />
        <div className="flex-grow flex items-center justify-center py-20 text-slate-400 text-sm">
          Loading AI analysis results...
        </div>
        <Footer />
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center py-20 space-y-4">
          <p className="text-slate-400 text-sm">Analysis results not found or access expired.</p>
          <Link to="/analyzer" className="text-xs bg-indigo-600 text-white px-4 py-2 rounded-xl font-semibold">
            Run New Free Analysis
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Match Overview', icon: Award },
    { id: 'skills', label: 'Skills & Keywords', icon: CheckCircle2 },
    { id: 'ats', label: 'ATS & Gaps', icon: AlertTriangle },
    { id: 'rewriter', label: 'Resume Rewriter', icon: FileEdit },
    { id: 'cover', label: 'Cover Letter', icon: Mail },
    { id: 'interview', label: 'Interview Qs', icon: MessageSquare }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Top Ad Unit */}
        <AdBanner slot="results-top-slot" />

        {/* Top Action Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <button
              onClick={() => navigate('/dashboard')}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 mb-2 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
            </button>
            <h1 className="text-2xl font-extrabold text-white">
              {analysis.jobTitle || 'Software Role'} Match Report
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Target Company: <span className="text-slate-200 font-semibold">{analysis.companyName || 'Target Employer'}</span> • File: <span className="font-mono text-indigo-300">{analysis.resumeName}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/analyzer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-xs bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Re-Analyze
            </Link>
            <ExportPdfButton analysis={analysis} />
          </div>
        </div>

        {/* Match Overview Header Gauge */}
        <MatchOverview analysis={analysis} />

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-800 overflow-x-auto pb-1 no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 font-bold text-xs whitespace-nowrap transition-colors ${
                  isActive
                    ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content Areas */}
        <div className="pt-2 space-y-8">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <SkillsBreakdown analysis={analysis} />
              <AdBanner slot="results-middle-slot" />
              <AtsIssuesList analysis={analysis} />
            </div>
          )}

          {activeTab === 'skills' && <SkillsBreakdown analysis={analysis} />}
          {activeTab === 'ats' && <AtsIssuesList analysis={analysis} />}
          {activeTab === 'rewriter' && <ResumeRewriter analysis={analysis} />}
          {activeTab === 'cover' && (
            <CoverLetterModal
              coverLetter={analysis.coverLetter}
              jobTitle={analysis.jobTitle}
              companyName={analysis.companyName}
            />
          )}
          {activeTab === 'interview' && (
            <InterviewQuestions questions={analysis.interviewQuestions} />
          )}
        </div>

        {/* Bottom Ad Unit */}
        <AdBanner slot="results-bottom-slot" className="mt-12" />

      </main>

      <Footer />
    </div>
  );
}
