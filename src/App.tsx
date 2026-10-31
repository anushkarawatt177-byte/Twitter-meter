import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LandingHero } from './components/LandingHero';
import { MoodExplorer } from './components/MoodExplorer';
import { TweetAutopsy } from './components/TweetAutopsy';
import { EmotionUniverse } from './components/EmotionUniverse';
import { BrandFaceOff } from './components/BrandFaceOff';
import { TweetLaboratory } from './components/TweetLaboratory';
import { SocialPulse } from './components/SocialPulse';
import { AiInsightsSection } from './components/AiInsightsSection';
import { Footer } from './components/Footer';
import { DocumentationModal } from './components/DocumentationModal';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('landing');
  const [isDocsOpen, setIsDocsOpen] = useState<boolean>(false);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'landing') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Scroll listener to update active nav tab
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'mood-explorer',
        'tweet-autopsy',
        'emotion-universe',
        'brand-faceoff',
        'tweet-lab',
        'social-pulse',
        'ai-insights'
      ];

      const scrollPosition = window.scrollY + 120;

      if (window.scrollY < 300) {
        setActiveSection('landing');
        return;
      }

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0D0F12] text-[#F8F7F4] flex flex-col font-sans selection:bg-[#D4FF3A] selection:text-[#0D0F12]">
      {/* Navigation */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenDocs={() => setIsDocsOpen(true)}
      />

      {/* Main Page Layout */}
      <main className="flex-1">
        {/* 1. Landing Hero with Globe, Activity Telemetry & 4-Stage AI Explanation */}
        <LandingHero
          onExploreMood={() => handleNavigate('mood-explorer')}
          onLaunchAutopsy={() => handleNavigate('tweet-autopsy')}
        />

        {/* 2. Mood Explorer: 7 Topics with Sentiment Distribution & Keywords */}
        <MoodExplorer />

        {/* 3. Tweet Autopsy: AI Investigation Lab with Token Valence Heatmap */}
        <TweetAutopsy />

        {/* 4. Emotion Universe: 6-Dimensional Emotion Constellation */}
        <EmotionUniverse />

        {/* 5. Brand Face-Off: Competitive Head-to-Head Comparison */}
        <BrandFaceOff />

        {/* 6. Tweet Laboratory: CSV Upload, Batch Classification, CSV Export */}
        <TweetLaboratory />

        {/* 7. Social Pulse: Real-Time Live-Inspired Stream */}
        <SocialPulse />

        {/* 8. AI Insights: Macro Emotional Synthesis & Praises/Grievances */}
        <AiInsightsSection />
      </main>

      {/* Quiet Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenDocs={() => setIsDocsOpen(true)}
      />

      {/* Technical Architecture & Evaluation Modal */}
      <DocumentationModal
        isOpen={isDocsOpen}
        onClose={() => setIsDocsOpen(false)}
      />
    </div>
  );
}
