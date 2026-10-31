import React from 'react';
import { ArrowUp, Sparkles, Terminal } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenDocs: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenDocs }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#2A303C] bg-[#0D0F12] py-12 text-[#A0A6B2] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#2A303C]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 bg-[#D4FF3A] rounded-xs shadow-[0_0_12px_#D4FF3A]"></span>
              <span className="text-base font-bold tracking-tight text-[#F8F7F4] uppercase">
                TWEETVERSE <span className="text-[#D4FF3A]">AI</span>
              </span>
            </div>
            <p className="text-xs text-[#A0A6B2] max-w-sm leading-relaxed">
              Decoding the internet's emotional pulse through natural language processing, transformer attention, and affective valence computation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs">
            <button
              onClick={() => onNavigate('mood-explorer')}
              className="hover:text-[#F8F7F4] transition-colors cursor-pointer"
            >
              Mood Explorer
            </button>
            <button
              onClick={() => onNavigate('tweet-autopsy')}
              className="hover:text-[#F8F7F4] transition-colors cursor-pointer"
            >
              Tweet Autopsy
            </button>
            <button
              onClick={() => onNavigate('emotion-universe')}
              className="hover:text-[#F8F7F4] transition-colors cursor-pointer"
            >
              Emotion Universe
            </button>
            <button
              onClick={() => onNavigate('brand-faceoff')}
              className="hover:text-[#F8F7F4] transition-colors cursor-pointer"
            >
              Brand Face-Off
            </button>
            <button
              onClick={() => onNavigate('tweet-lab')}
              className="hover:text-[#F8F7F4] transition-colors cursor-pointer"
            >
              Tweet Laboratory
            </button>
            <button
              onClick={() => onNavigate('social-pulse')}
              className="hover:text-[#F8F7F4] transition-colors cursor-pointer"
            >
              Social Pulse
            </button>
            <button
              onClick={onOpenDocs}
              className="text-[#D4FF3A] hover:underline transition-colors cursor-pointer font-medium"
            >
              System Docs
            </button>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#16191E] border border-[#2A303C] hover:text-[#F8F7F4] hover:bg-[#20252D] transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#A0A6B2]">
          <div>
            © {new Date().getFullYear()} TWEETVERSE AI Research & Social Intelligence Laboratory. Built with React & Node.js.
          </div>
          <div className="flex items-center gap-4 font-mono">
            <span>VADER Norm · Transformer Self-Attention · CSV Engine</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
