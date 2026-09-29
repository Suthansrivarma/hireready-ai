import React, { useState } from 'react';
import { Download, Sparkles, Printer } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function ExportPdfButton({ analysis }) {
  const [generating, setGenerating] = useState(false);

  const handleExportPdf = async () => {
    setGenerating(true);
    try {
      // Create hidden clean printable ATS template element dynamically
      const pdfContainer = document.createElement('div');
      pdfContainer.style.position = 'absolute';
      pdfContainer.style.left = '-9999px';
      pdfContainer.style.top = '-9999px';
      pdfContainer.style.width = '800px';
      pdfContainer.style.padding = '40px';
      pdfContainer.style.backgroundColor = '#ffffff';
      pdfContainer.style.color = '#111827';
      pdfContainer.style.fontFamily = 'Arial, sans-serif';

      const jobTitle = analysis.jobTitle || 'Software Engineer';
      const summary = analysis.improvedSummary || '';
      const matchedSkills = analysis.matchedSkills || [];
      const rewrites = analysis.bulletPointRewrites || [];

      pdfContainer.innerHTML = `
        <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #111827;">
          <h1 style="font-size: 24px; font-weight: bold; margin-bottom: 4px; text-transform: uppercase; color: #1e3a8a;">CANDIDATE RESUME</h1>
          <h2 style="font-size: 14px; font-weight: bold; color: #4b5563; margin-top: 0; margin-bottom: 20px; border-bottom: 2px solid #1e3a8a; padding-bottom: 6px;">
            TARGET ROLE: ${jobTitle.toUpperCase()}
          </h2>

          <!-- PROFESSIONAL SUMMARY -->
          <div style="margin-bottom: 20px;">
            <h3 style="font-size: 14px; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #d1d5db; padding-bottom: 4px; color: #1e3a8a;">
              PROFESSIONAL SUMMARY
            </h3>
            <p style="font-size: 11px; color: #374151; margin-top: 8px;">${summary}</p>
          </div>

          <!-- CORE TECHNICAL SKILLS -->
          <div style="margin-bottom: 20px;">
            <h3 style="font-size: 14px; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #d1d5db; padding-bottom: 4px; color: #1e3a8a;">
              CORE TECHNICAL SKILLS
            </h3>
            <p style="font-size: 11px; color: #374151; margin-top: 8px;">
              ${matchedSkills.join(' • ')}
            </p>
          </div>

          <!-- REWRITTEN HIGH IMPACT ACHIEVEMENTS -->
          <div style="margin-bottom: 20px;">
            <h3 style="font-size: 14px; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #d1d5db; padding-bottom: 4px; color: #1e3a8a;">
              WORK EXPERIENCE & KEY ACHIEVEMENTS
            </h3>
            <ul style="font-size: 11px; color: #374151; margin-top: 8px; padding-left: 18px;">
              ${rewrites.map(item => `<li style="margin-bottom: 8px;">${item.rewritten}</li>`).join('')}
            </ul>
          </div>
        </div>
      `;

      document.body.appendChild(pdfContainer);

      const canvas = await html2canvas(pdfContainer, {
        scale: 2,
        useCORS: true,
        logging: false
      });

      document.body.removeChild(pdfContainer);

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`Optimized_ATS_Resume_${jobTitle.replace(/\s+/g, '_')}.pdf`);
    } catch (err) {
      console.error('PDF Generation Error:', err);
      alert('Failed to generate PDF. You can also use Print to PDF as a fallback.');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <button
      onClick={handleExportPdf}
      disabled={generating}
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25 transition-all hover:shadow-indigo-600/40"
    >
      <Download className="w-4 h-4" />
      {generating ? 'Exporting ATS PDF...' : 'Export ATS PDF'}
    </button>
  );
}
