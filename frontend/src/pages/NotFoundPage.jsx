import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { FileQuestion } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center text-center p-6 space-y-4">
        <FileQuestion className="w-16 h-16 text-indigo-500 animate-bounce" />
        <h1 className="text-4xl font-extrabold text-white">404 - Page Not Found</h1>
        <p className="text-sm text-slate-400 max-w-md">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="px-6 py-3 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg"
        >
          Return Home
        </Link>
      </main>
      <Footer />
    </div>
  );
}
