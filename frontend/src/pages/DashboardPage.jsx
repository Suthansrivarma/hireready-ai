import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { analysisAPI } from '../services/api';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { FileText, Sparkles, Plus, Crown, Trash2, ArrowRight, Clock, Award, Briefcase } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [recentAnalyses, setRecentAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await analysisAPI.getRecent();
      if (res.data.success) {
        setRecentAnalyses(res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch recent analyses:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm('Delete this saved analysis?')) return;
    try {
      await analysisAPI.delete(id);
      setRecentAnalyses(prev => prev.filter(a => a._id !== id && a.id !== id));
    } catch (err) {
      alert('Failed to delete analysis');
    }
  };

  const analysisCount = (user?.usage && user.usage.analysisCount) || 0;
  const isFreePlan = user?.plan === 'FREE';
  const freeLimit = 1;

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Welcome Header & Start New Analysis CTA */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Dashboard Overview
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Welcome back, {user?.name || 'Developer'}! 👋
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Optimize your resume against target tech roles and track your application progress.
            </p>
          </div>

          <Link
            to="/analyzer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all hover:shadow-indigo-600/50 hover:-translate-y-0.5 shrink-0"
          >
            <Plus className="w-5 h-5" />
            Start New AI Analysis
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          
          {/* Usage Badge */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400">ANALYSIS USAGE</span>
              <Crown className="w-4 h-4 text-amber-400" />
            </div>

            <div className="text-2xl font-extrabold text-white mt-1">
              {isFreePlan ? `${analysisCount} / ${freeLimit}` : 'Unlimited'}
            </div>

            <p className="text-xs text-slate-400 mt-2">
              {isFreePlan ? (
                analysisCount >= freeLimit ? (
                  <span className="text-rose-400 font-semibold">Free limit reached. Upgrade to Premium for unlimited analyses.</span>
                ) : (
                  <span>1 free analysis remaining on Free Plan.</span>
                )
              ) : (
                <span className="text-emerald-400 font-semibold">Active {user?.plan} Membership</span>
              )}
            </p>

            {isFreePlan && analysisCount >= freeLimit && (
              <Link
                to="/pricing"
                className="mt-4 inline-block text-xs text-indigo-400 font-semibold hover:underline"
              >
                Upgrade Plan →
              </Link>
            )}
          </div>

          {/* Saved Analyses */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400 font-mono">TOTAL ANALYSES RUN</span>
              <FileText className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl font-extrabold text-white mt-1">
              {recentAnalyses.length}
            </div>
            <p className="text-xs text-slate-400 mt-2">Saved ATS match reports in history.</p>
          </div>

          {/* Quick Application Tracker Link */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-400 font-mono">JOB APPLICATION TRACKER</span>
                <Briefcase className="w-4 h-4 text-indigo-400" />
              </div>
              <p className="text-xs text-slate-300">Track target companies, interviews, and offers in Kanban format.</p>
            </div>
            <Link
              to="/tracker"
              className="mt-4 text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              Open Job Tracker Board <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

        {/* Recent Analyses History Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-lg font-bold text-white">Recent ATS Analyses</h2>
              <p className="text-xs text-slate-400">View past match scores, bullet rewrites, and cover letters</p>
            </div>
            <Link to="/analyzer" className="text-xs text-indigo-400 font-semibold hover:underline">
              + New Analysis
            </Link>
          </div>

          {loading ? (
            <div className="py-12 text-center text-xs text-slate-500">Loading history...</div>
          ) : recentAnalyses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recentAnalyses.map((item) => {
                const id = item._id || item.id;
                const score = item.matchScore?.overall || 0;
                let scoreColor = 'text-rose-400 bg-rose-500/10 border-rose-500/20';
                if (score >= 80) scoreColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
                else if (score >= 65) scoreColor = 'text-amber-400 bg-amber-500/10 border-amber-500/20';

                return (
                  <div
                    key={id}
                    onClick={() => navigate(`/results/${id}`)}
                    className="bg-slate-950 p-5 rounded-xl border border-slate-800 hover:border-indigo-500/40 transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                            {item.jobTitle || 'Software Role'}
                          </h3>
                          <p className="text-xs text-slate-400">{item.companyName || 'Target Employer'}</p>
                        </div>
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${scoreColor}`}>
                          {score}% Match
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-4">
                        <span className="flex items-center gap-1">
                          <FileText className="w-3 h-3" /> {item.resumeName || 'Resume.pdf'}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {new Date(item.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-900 flex items-center justify-between text-xs">
                      <span className="text-indigo-400 font-semibold group-hover:underline flex items-center gap-1">
                        View Full Results <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                      <button
                        onClick={(e) => handleDelete(e, id)}
                        className="p-1 text-slate-600 hover:text-rose-400 transition-colors"
                        title="Delete record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-12 text-center space-y-3">
              <FileText className="w-10 h-10 text-slate-600 mx-auto" />
              <p className="text-sm text-slate-400">No past resume analyses found.</p>
              <Link
                to="/analyzer"
                className="inline-block text-xs text-white bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-xl font-semibold transition-colors"
              >
                Run Your First Analysis Now
              </Link>
            </div>
          )}
        </div>

      </main>

      <Footer />
    </div>
  );
}
