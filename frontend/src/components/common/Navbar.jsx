import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FileText, Sparkles, LayoutDashboard, LogOut, Briefcase, Menu, X, Gift } from 'lucide-react';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
              HireReady<span className="text-indigo-400 font-extrabold">.AI</span>
            </span>
            <span className="hidden sm:inline-block text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full uppercase tracking-wider">
              100% Free
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                    isActive('/dashboard') ? 'text-indigo-400' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>

                <Link
                  to="/analyzer"
                  className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                    isActive('/analyzer') ? 'text-indigo-400' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  Analyze Resume
                </Link>

                <Link
                  to="/tracker"
                  className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                    isActive('/tracker') ? 'text-indigo-400' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Briefcase className="w-4 h-4" />
                  Job Tracker
                </Link>

                {/* Profile & Logout */}
                <div className="flex items-center gap-3 pl-4 border-l border-slate-800">
                  <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Unlimited Access
                  </span>

                  <Link
                    to="/profile"
                    className="flex items-center gap-2 text-sm text-slate-300 hover:text-white"
                    title="Profile Settings"
                  >
                    <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-semibold text-indigo-400">
                      {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="p-2 text-slate-400 hover:text-rose-400 transition-colors"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/#how-it-works" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                  How It Works
                </Link>
                <Link to="/#features" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                  Features
                </Link>
                <Link to="/pricing" className="text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1 font-bold">
                  <Gift className="w-4 h-4" /> Why 100% Free?
                </Link>

                <div className="flex items-center gap-3 pl-4 border-l border-slate-800">
                  <Link
                    to="/login"
                    className="text-sm font-medium text-slate-200 hover:text-white px-3 py-2 transition-colors"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    className="text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-xl shadow-lg shadow-indigo-600/25 transition-all hover:shadow-indigo-600/40 hover:-translate-y-0.5"
                  >
                    Start Free Analysis
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-3">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800"
              >
                Dashboard
              </Link>
              <Link
                to="/analyzer"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800"
              >
                Analyze Resume
              </Link>
              <Link
                to="/tracker"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800"
              >
                Job Tracker
              </Link>
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800"
              >
                Profile Settings
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-base font-medium text-rose-400 hover:bg-slate-800"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium text-emerald-400 font-bold hover:bg-slate-800"
              >
                Why 100% Free?
              </Link>
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800"
              >
                Log In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center px-3 py-2.5 rounded-xl text-base font-semibold bg-indigo-600 text-white"
              >
                Start Free Analysis
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
