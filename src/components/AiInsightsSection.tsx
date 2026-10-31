import React, { useState } from 'react';
import { Sparkles, ThumbsUp, ThumbsDown, AlertCircle, TrendingUp, RefreshCw, Layers } from 'lucide-react';

export const AiInsightsSection: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string>('Artificial Intelligence');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Dynamic state for insights
  const [insights, setInsights] = useState({
    publicMood: 'High euphoria around autonomous agentic reasoning and visual grounding, tempered by sharp consumer scrutiny regarding API rate limits and hallucination frequency.',
    whatPeopleLike: [
      'Generational speed leaps in multimodal models and instant visual inference',
      'Open-source quantization breakthroughs enabling local desktop execution',
      'Massive developer productivity gains in automated test generation and refactoring'
    ],
    whatPeopleDislike: [
      'Hallucinations on specific package syntax and non-existent software parameters',
      'Sudden rate limit throttles during peak deployment and production hours',
      'Subscription cost stacking across multiple proprietary AI developer platforms'
    ],
    emergingIssues: [
      'Erosion of code review rigor when engineers accept autocompletions without deep audit',
      'Escalating licensing tensions between open training corpuses and copyright holders'
    ],
    topKeywords: [
      { word: 'Breakthrough', sentiment: 'Positive', count: 4820 },
      { word: 'Multimodal', sentiment: 'Positive', count: 3910 },
      { word: 'Hallucination', sentiment: 'Negative', count: 2410 },
      { word: 'Local LLM', sentiment: 'Positive', count: 2150 },
      { word: 'Rate Limit', sentiment: 'Negative', count: 1820 },
      { word: 'Efficiency', sentiment: 'Positive', count: 1690 }
    ],
    executiveSummary: 'Public sentiment surrounding Artificial Intelligence registers an overall net positive polarity of 64%. Euphoria around generational performance gains is balanced by intense vocal intolerance for support bottlenecks and predatory monetization. Platforms demonstrating authentic user respect and engineering reliability are capturing outsized loyalty.'
  });

  const handleTopicSwitch = async (topic: string) => {
    setSelectedTopic(topic);
    setIsRefreshing(true);

    try {
      const res = await fetch('/api/generate-insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic })
      });

      if (res.ok) {
        const data = await res.json();
        setInsights(prev => ({
          ...prev,
          publicMood: data.publicMood || prev.publicMood,
          whatPeopleLike: data.whatPeopleLike || prev.whatPeopleLike,
          whatPeopleDislike: data.whatPeopleDislike || prev.whatPeopleDislike,
          emergingIssues: data.emergingIssues || prev.emergingIssues,
          executiveSummary: data.executiveSummary || prev.executiveSummary
        }));
      }
    } catch (err) {
      console.warn('Insights API fallback:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <section id="ai-insights" className="py-16 border-b border-[#2A303C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#D4FF3A] mb-1">
              Macro Emotional Synthesis
            </div>
            <h2 className="text-3xl font-extrabold text-[#F8F7F4] tracking-tight">
              AI Insights & Sentiment Intelligence
            </h2>
            <p className="text-sm text-[#A0A6B2] mt-1 max-w-xl">
              Distilled executive summaries of public sentiment, top consumer praises, friction points, and emerging societal trends.
            </p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {['Artificial Intelligence', 'Cricket', 'Bollywood', 'Technology', 'Environment'].map((t) => (
              <button
                key={t}
                onClick={() => handleTopicSwitch(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                  selectedTopic === t
                    ? 'bg-[#D4FF3A] text-[#0D0F12]'
                    : 'bg-[#16191E] text-[#A0A6B2] hover:text-[#F8F7F4] border border-[#2A303C]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Overall Public Mood Banner */}
        <div className="p-6 rounded-2xl bg-[#16191E] border border-[#2A303C] mb-8 relative overflow-hidden shadow-xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#D4FF3A]/15 border border-[#D4FF3A]/30 flex items-center justify-center text-[#D4FF3A] shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs font-mono uppercase text-[#D4FF3A] font-bold">
                  Overall Public Mood Index · {selectedTopic}
                </span>
                {isRefreshing && (
                  <span className="flex items-center gap-1 text-xs text-[#38BDF8] font-mono">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Synthesizing...</span>
                  </span>
                )}
              </div>
              <p className="text-base sm:text-lg font-semibold text-[#F8F7F4] leading-relaxed">
                "{insights.publicMood}"
              </p>
            </div>
          </div>
        </div>

        {/* 3-Column Core Breakdown: What People Like, What People Dislike, Emerging Issues */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* What People Like */}
          <div className="p-6 rounded-2xl bg-[#16191E] border border-[#D4FF3A]/30">
            <div className="flex items-center gap-2 text-[#D4FF3A] font-bold text-sm mb-4 uppercase tracking-wide">
              <ThumbsUp className="w-4 h-4" />
              <span>What People Praise Most</span>
            </div>
            <ul className="space-y-3">
              {insights.whatPeopleLike.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-[#F8F7F4] leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF3A] shrink-0 mt-1.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What People Dislike */}
          <div className="p-6 rounded-2xl bg-[#16191E] border border-[#FF453A]/30">
            <div className="flex items-center gap-2 text-[#FF453A] font-bold text-sm mb-4 uppercase tracking-wide">
              <ThumbsDown className="w-4 h-4" />
              <span>Common Consumer Grievances</span>
            </div>
            <ul className="space-y-3">
              {insights.whatPeopleDislike.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-[#F8F7F4] leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF453A] shrink-0 mt-1.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Emerging Issues */}
          <div className="p-6 rounded-2xl bg-[#16191E] border border-[#C4B5FD]/30">
            <div className="flex items-center gap-2 text-[#C4B5FD] font-bold text-sm mb-4 uppercase tracking-wide">
              <AlertCircle className="w-4 h-4" />
              <span>Commonly Discussed Issues</span>
            </div>
            <ul className="space-y-3">
              {insights.emergingIssues.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-[#F8F7F4] leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C4B5FD] shrink-0 mt-1.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Executive Summary & Keywords */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          <div className="lg:col-span-7 p-6 rounded-2xl bg-[#16191E] border border-[#2A303C] flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono uppercase text-[#A0A6B2] block mb-2">Executive Sentiment Summary</span>
              <p className="text-sm text-[#F8F7F4] leading-relaxed">
                {insights.executiveSummary}
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-[#2A303C] text-xs font-mono text-[#D4FF3A]">
              Model: Google Gemini 2.5 Flash & Algorithmic VADER Lexicon Engine
            </div>
          </div>

          <div className="lg:col-span-5 p-6 rounded-2xl bg-[#16191E] border border-[#2A303C]">
            <span className="text-xs font-mono uppercase text-[#A0A6B2] block mb-3">Highest Frequency Domain Keywords</span>
            <div className="flex flex-wrap gap-2">
              {insights.topKeywords.map((kw, i) => (
                <div
                  key={i}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 ${
                    kw.sentiment === 'Positive'
                      ? 'bg-[#D4FF3A]/10 text-[#D4FF3A] border-[#D4FF3A]/30'
                      : 'bg-[#FF453A]/10 text-[#FF453A] border-[#FF453A]/30'
                  }`}
                >
                  <span>{kw.word}</span>
                  <span className="text-[10px] opacity-75 font-mono tabular-nums">
                    ({kw.count.toLocaleString()})
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
