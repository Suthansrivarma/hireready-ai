import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import PricingTable from '../components/landing/PricingTable';
import FAQ from '../components/landing/FAQ';

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />
      <main className="flex-grow pt-8">
        <PricingTable />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
