import React from 'react';
import { Sparkles, Terminal, FileText } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenDocs: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate, onOpenDocs }) => {
  const navItems = [
    { id: 'landing', label: 'Overview' },
    { id: 'mood-explorer', label: 'Mood Explorer' },
    { id: 'tweet-autopsy', label: 'Tweet Autopsy' },
    { id: 'emotion-universe', label: 'Emotion Universe' },
    { id: 'brand-faceoff', label: 'Brand Face-Off' },
    { id: 'tweet-lab', label: 'Tweet Lab' },
    { id: 'social-pulse', label: 'Social Pulse' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#2A303C]/80 bg-[#0D0F12]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single clean text element Brand Wordmark */}
        <button
          onClick={() => onNavigate('landing')}
          className="text-left group flex items-center gap-2 cursor-pointer transition-transform hover:scale-102"
        >
          <span className="w-2.5 h-2.5 bg-[#D4FF3A] rounded-xs shadow-[0_0_12px_#D4FF3A]"></span>
          <span className="text-lg font-bold tracking-tight text-[#F8F7F4] uppercase whitespace-nowrap shrink-0">
            TWEETVERSE <span className="text-[#D4FF3A]">AI</span>
          </span>
        </button>

        {/* Zone 2: Single-line clean navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#A0A6B2]">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
                  isActive
                    ? 'text-[#D4FF3A] font-semibold border-b-2 border-[#D4FF3A]'
                    : 'hover:text-[#F8F7F4]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action & Docs Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenDocs}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-[#A0A6B2] hover:text-[#F8F7F4] bg-[#16191E] border border-[#2A303C] rounded-md transition-colors cursor-pointer"
            title="View Architecture & Setup Documentation"
          >
            <FileText className="w-3.5 h-3.5 text-[#C4B5FD]" />
            <span className="hidden sm:inline">Docs & API</span>
          </button>
          
          <button
            onClick={() => onNavigate('tweet-autopsy')}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#0D0F12] bg-[#D4FF3A] hover:bg-[#c2ed2b] rounded-lg shadow-[0_0_15px_rgba(212,255,58,0.3)] transition-all cursor-pointer whitespace-nowrap shrink-0 active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Investigate Tweet</span>
          </button>
        </div>

      </div>
    </header>
  );
};
