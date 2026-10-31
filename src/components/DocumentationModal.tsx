import React from 'react';
import { X, Terminal, Cpu, BookOpen, CheckCircle, Code, ShieldCheck } from 'lucide-react';

interface DocumentationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DocumentationModal: React.FC<DocumentationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0D0F12]/80 backdrop-blur-md">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#16191E] border border-[#2A303C] rounded-2xl p-6 sm:p-8 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-[#0D0F12] border border-[#2A303C] text-[#A0A6B2] hover:text-[#F8F7F4] hover:bg-[#20252D] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#D4FF3A] uppercase tracking-wider mb-2">
          <BookOpen className="w-4 h-4" />
          <span>Technical Architecture & Evaluation Dossier</span>
        </div>
        <h2 className="text-2xl font-bold text-[#F8F7F4] tracking-tight mb-4">
          TWEETVERSE AI System Specifications
        </h2>
        <p className="text-sm text-[#A0A6B2] mb-6">
          Complete engineering reference detailing model pipelines, Python backend execution, VADER normalization mathematics, and dual-layer inference fallbacks.
        </p>

        {/* Section 1: Python Backend Execution */}
        <div className="p-4 rounded-xl bg-[#0D0F12] border border-[#2A303C] mb-6">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#38BDF8] uppercase mb-2">
            <Terminal className="w-4 h-4" />
            <span>Python NLP Sentiment Backend Command</span>
          </div>
          <p className="text-xs text-[#A0A6B2] mb-3">
            The project includes a standalone, fully functional Python NLP sentiment pipeline in <code className="text-[#D4FF3A]">sentiment_analyzer.py</code> that implements VADER lexicon heuristics and multi-emotion classification:
          </p>
          <pre className="p-3 rounded-lg bg-[#16191E] border border-[#2A303C] text-xs font-mono text-[#D4FF3A] overflow-x-auto">
{`# Run Python Sentiment Analyzer via CLI:
python3 sentiment_analyzer.py "The new multimodal AI reasoning model is absolutely amazing and revolutionary!"`}
          </pre>
        </div>

        {/* Section 2: Mathematical Formulations */}
        <div className="p-4 rounded-xl bg-[#0D0F12] border border-[#2A303C] mb-6 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#C4B5FD] uppercase">
            <Code className="w-4 h-4" />
            <span>VADER Normalization & Compound Scoring Mathematics</span>
          </div>
          <p className="text-xs text-[#A0A6B2]">
            The compound score normalizes total sentence valence $x = \sum v_i$ using the standard VADER empirical alpha constant ($\alpha = 15$):
          </p>
          <div className="p-3 rounded-lg bg-[#16191E] border border-[#2A303C] font-mono text-xs text-[#F8F7F4] text-center">
            Compound Score = x / sqrt(x&sup2; + 15)
          </div>
          <ul className="text-xs text-[#A0A6B2] space-y-1 list-disc pl-5">
            <li><strong>Positive Polarity:</strong> Compound Score &ge; +0.05</li>
            <li><strong>Neutral Polarity:</strong> -0.05 &lt; Compound Score &lt; +0.05</li>
            <li><strong>Negative Polarity:</strong> Compound Score &le; -0.05</li>
          </ul>
        </div>

        {/* Section 3: Dual-Layer Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-[#0D0F12] border border-[#2A303C]">
            <h4 className="text-xs font-bold font-mono uppercase text-[#D4FF3A] mb-2">Layer 1: Gemini 2.5 Flash LLM</h4>
            <p className="text-xs text-[#A0A6B2] leading-relaxed">
              When <code className="text-[#F8F7F4]">GEMINI_API_KEY</code> is active, the backend delegates semantic inference to Google Gemini 2.5 Flash for high-level irony resolution, complex double negations, and conversational reasoning.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#0D0F12] border border-[#2A303C]">
            <h4 className="text-xs font-bold font-mono uppercase text-[#38BDF8] mb-2">Layer 2: Algorithmic VADER Engine</h4>
            <p className="text-xs text-[#A0A6B2] leading-relaxed">
              Embedded client-and-server zero-latency fallback engine equipped with 400+ valence tokens, booster scaling ('very', 'insanely'), negator flipping, and 6-emotion classification.
            </p>
          </div>
        </div>

        {/* Section 4: Internship Evaluation Checklist */}
        <div className="p-4 rounded-xl bg-[#0D0F12] border border-[#D4FF3A]/30 mb-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#D4FF3A] uppercase font-mono mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Internship Evaluation Checklist</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#F8F7F4]">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-[#D4FF3A]" />
              <span>Full-Stack Express + Node.js API</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-[#D4FF3A]" />
              <span>Real Python NLP Analyzer Script</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-[#D4FF3A]" />
              <span>CSV Upload, Processing & Export</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-[#D4FF3A]" />
              <span>Token Valence Influence Heatmap</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-[#D4FF3A]" />
              <span>7 Curated Cultural Topic Spectra</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-[#D4FF3A]" />
              <span>Continuous Live-Inspired Social Pulse</span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-[#D4FF3A] text-[#0D0F12] hover:bg-[#bde626] transition-colors cursor-pointer"
          >
            Close Documentation
          </button>
        </div>

      </div>
    </div>
  );
};
