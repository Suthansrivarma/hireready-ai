import React, { useState, useEffect } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { trackerAPI } from '../services/api';
import { Briefcase, Plus, Trash2, Building, MapPin, DollarSign, Calendar, AlertCircle } from 'lucide-react';

export default function JobTrackerPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('Remote');
  const [salary, setSalary] = useState('');
  const [status, setStatus] = useState('Wishlist');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await trackerAPI.getJobs();
      if (res.data.success) {
        setJobs(res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch tracked jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateJob = async (e) => {
    e.preventDefault();
    if (!jobTitle || !company) return;

    try {
      const res = await trackerAPI.createJob({
        jobTitle,
        company,
        location,
        salary,
        status,
        notes
      });
      if (res.data.success) {
        setJobs(prev => [res.data.data, ...prev]);
        setShowAddModal(false);
        setJobTitle('');
        setCompany('');
        setNotes('');
      }
    } catch (err) {
      alert('Failed to add job application');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await trackerAPI.updateJob(id, { status: newStatus });
      setJobs(prev => prev.map(j => (j._id === id || j.id === id) ? { ...j, status: newStatus } : j));
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleDeleteJob = async (id) => {
    if (!window.confirm('Remove this application entry?')) return;
    try {
      await trackerAPI.deleteJob(id);
      setJobs(prev => prev.filter(j => j._id !== id && j.id !== id));
    } catch (err) {
      alert('Failed to remove application');
    }
  };

  const columns = ['Wishlist', 'Applied', 'Interviewing', 'Offer', 'Rejected'];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-indigo-400" /> Job Application Tracker
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Organize target software companies, application statuses, and interview schedules.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg"
          >
            <Plus className="w-4 h-4" /> Add Application
          </button>
        </div>

        {/* Add Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white">Track New Job Application</h3>

              <form onSubmit={handleCreateJob} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Job Title *</label>
                  <input
                    type="text"
                    required
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g. Frontend Engineer"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Stripe, Acme Corp"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Location</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Remote / San Francisco"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Status</label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                    >
                      {columns.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Notes</label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Recruiter contact, interview dates, preparation notes..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-xl text-slate-400 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-bold"
                  >
                    Save Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Kanban Board Columns */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-6">
          {columns.map(col => {
            const colJobs = jobs.filter(j => j.status === col);
            return (
              <div key={col} className="bg-slate-900 border border-slate-800/80 rounded-2xl p-4 min-w-[220px]">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">{col}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-indigo-400 font-semibold">
                    {colJobs.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {colJobs.map(job => {
                    const id = job._id || job.id;
                    return (
                      <div key={id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                        <div className="flex items-start justify-between">
                          <span className="font-bold text-white block">{job.jobTitle}</span>
                          <button
                            onClick={() => handleDeleteJob(id)}
                            className="text-slate-600 hover:text-rose-400 p-0.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-indigo-400 font-semibold">{job.company}</p>

                        <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                          <MapPin className="w-3 h-3 text-slate-500" /> {job.location || 'Remote'}
                        </div>

                        {job.notes && (
                          <p className="text-[11px] text-slate-500 bg-slate-900 p-2 rounded border border-slate-800/60 line-clamp-2">
                            {job.notes}
                          </p>
                        )}

                        {/* Move column quick selector */}
                        <div className="pt-2 border-t border-slate-900">
                          <select
                            value={job.status}
                            onChange={(e) => handleStatusChange(id, e.target.value)}
                            className="w-full bg-slate-900 text-slate-400 border border-slate-800 rounded px-2 py-1 text-[11px] focus:outline-none"
                          >
                            {columns.map(c => <option key={c} value={c}>Move to {c}</option>)}
                          </select>
                        </div>
                      </div>
                    );
                  })}
                  {colJobs.length === 0 && (
                    <div className="py-6 text-center text-[11px] text-slate-600 italic">Empty column</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </main>

      <Footer />
    </div>
  );
}
