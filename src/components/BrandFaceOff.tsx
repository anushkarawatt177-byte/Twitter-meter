import React, { useState } from 'react';
import { BRAND_COMPARISONS } from '../data/mockData';
import { BrandComparisonResult } from '../types';
import { Swords, Trophy, Sparkles, ThumbsUp, ThumbsDown, Minus, ArrowRight, CheckCircle2 } from 'lucide-react';

export const BrandFaceOff: React.FC = () => {
  const [selectedPairKey, setSelectedPairKey] = useState<string>('netflix-vs-amazon');
  const [customBrandA, setCustomBrandA] = useState<string>('');
  const [customBrandB, setCustomBrandB] = useState<string>('');
  const [activeComparison, setActiveComparison] = useState<BrandComparisonResult>(
    BRAND_COMPARISONS['netflix-vs-amazon']
  );
  const [isComparingCustom, setIsComparingCustom] = useState<boolean>(false);

  const handlePairChange = (key: string) => {
    setSelectedPairKey(key);
    if (BRAND_COMPARISONS[key]) {
      setActiveComparison(BRAND_COMPARISONS[key]);
    }
  };

  const handleCustomCompare = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customBrandA.trim() || !customBrandB.trim()) return;

    setIsComparingCustom(true);
    try {
      const response = await fetch('/api/brand-compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brandA: customBrandA, brandB: customBrandB })
      });
      if (response.ok) {
        const data = await response.json();
        setActiveComparison(data);
        setSelectedPairKey('custom');
      }
    } catch (err) {
      console.warn('Backend custom compare fallback:', err);
    } finally {
      setIsComparingCustom(false);
    }
  };

  const { brandA, brandB, winner, aiSummary, keyTakeaways } = activeComparison;

  return (
    <section id="brand-faceoff" className="py-16 border-b border-[#2A303C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#D4FF3A] mb-1">
              Competitive Sentiment Intelligence
            </div>
            <h2 className="text-3xl font-extrabold text-[#F8F7F4] tracking-tight">
              Brand Face-Off
            </h2>
            <p className="text-sm text-[#A0A6B2] mt-1 max-w-xl">
              Pit titans against each other to evaluate user loyalty, sentiment deltas, friction points, and overall consumer perception.
            </p>
          </div>

          {/* Quick Matchup Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => handlePairChange('netflix-vs-amazon')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                selectedPairKey === 'netflix-vs-amazon'
                  ? 'bg-[#D4FF3A] text-[#0D0F12]'
                  : 'bg-[#16191E] text-[#A0A6B2] hover:text-[#F8F7F4] border border-[#2A303C]'
              }`}
            >
              Netflix vs Prime
            </button>
            <button
              onClick={() => handlePairChange('apple-vs-samsung')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                selectedPairKey === 'apple-vs-samsung'
                  ? 'bg-[#D4FF3A] text-[#0D0F12]'
                  : 'bg-[#16191E] text-[#A0A6B2] hover:text-[#F8F7F4] border border-[#2A303C]'
              }`}
            >
              Apple vs Samsung
            </button>
            <button
              onClick={() => handlePairChange('openai-vs-anthropic')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                selectedPairKey === 'openai-vs-anthropic'
                  ? 'bg-[#D4FF3A] text-[#0D0F12]'
                  : 'bg-[#16191E] text-[#A0A6B2] hover:text-[#F8F7F4] border border-[#2A303C]'
              }`}
            >
              OpenAI vs Anthropic
            </button>
          </div>
        </div>

        {/* Head-to-Head Visual Arena */}
        <div className="grid grid-cols-1 lg:grid-cols-11 gap-6 items-stretch mb-8">
          
          {/* Brand A Card */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-[#16191E] border border-[#2A303C] flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-lg"
                    style={{ backgroundColor: brandA.color }}
                  >
                    {brandA.logo}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#F8F7F4]">{brandA.brandName}</h3>
                    <span className="text-xs font-mono text-[#A0A6B2]">
                      Dominant Emotion: <strong className="text-[#D4FF3A]">{brandA.dominantEmotion}</strong>
                    </span>
                  </div>
                </div>

                {winner === brandA.brandName && (
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4FF3A]/15 border border-[#D4FF3A]/40 text-[#D4FF3A] text-xs font-bold">
                    <Trophy className="w-3.5 h-3.5" />
                    <span>Sentiment Winner</span>
                  </div>
                )}
              </div>

              {/* Net Sentiment Metric */}
              <div className="mb-6 p-4 rounded-xl bg-[#0D0F12] border border-[#2A303C]">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-xs font-mono uppercase text-[#A0A6B2]">Net Sentiment Index</span>
                  <span className="text-2xl font-black font-mono text-[#D4FF3A] tabular-nums">
                    +{brandA.netSentimentScore}
                  </span>
                </div>
                {/* Sentiment Ratio Bar */}
                <div className="h-3 w-full rounded-full bg-[#16191E] overflow-hidden flex border border-[#2A303C]">
                  <div style={{ width: `${brandA.sentimentDistribution.positive}%` }} className="h-full bg-[#D4FF3A]" />
                  <div style={{ width: `${brandA.sentimentDistribution.neutral}%` }} className="h-full bg-[#A0A6B2]/40" />
                  <div style={{ width: `${brandA.sentimentDistribution.negative}%` }} className="h-full bg-[#FF453A]" />
                </div>
                <div className="flex justify-between text-[11px] font-mono text-[#A0A6B2] mt-2">
                  <span className="text-[#D4FF3A] font-bold">{brandA.sentimentDistribution.positive}% Pos</span>
                  <span>{brandA.sentimentDistribution.neutral}% Neu</span>
                  <span className="text-[#FF453A] font-bold">{brandA.sentimentDistribution.negative}% Neg</span>
                </div>
              </div>

              {/* Top Keywords */}
              <div className="mb-4">
                <span className="text-xs font-mono uppercase text-[#A0A6B2] block mb-2">Top Discussed Themes</span>
                <div className="flex flex-wrap gap-2">
                  {brandA.topKeywords.map((kw, i) => (
                    <span
                      key={i}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium border ${
                        kw.sentiment === 'Positive'
                          ? 'bg-[#D4FF3A]/10 text-[#D4FF3A] border-[#D4FF3A]/30'
                          : 'bg-[#FF453A]/10 text-[#FF453A] border-[#FF453A]/30'
                      }`}
                    >
                      {kw.word}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sample quote */}
            <div className="mt-4 pt-3 border-t border-[#2A303C] text-xs text-[#A0A6B2] italic">
              "{brandA.sampleTweets[0]}"
            </div>
          </div>

          {/* VS Divider in Center */}
          <div className="lg:col-span-1 flex items-center justify-center py-4 lg:py-0">
            <div className="w-12 h-12 rounded-full bg-[#16191E] border border-[#2A303C] flex items-center justify-center text-[#D4FF3A] shadow-lg">
              <Swords className="w-5 h-5" />
            </div>
          </div>

          {/* Brand B Card */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-[#16191E] border border-[#2A303C] flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-lg"
                    style={{ backgroundColor: brandB.color }}
                  >
                    {brandB.logo}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#F8F7F4]">{brandB.brandName}</h3>
                    <span className="text-xs font-mono text-[#A0A6B2]">
                      Dominant Emotion: <strong className="text-[#FF6B35]">{brandB.dominantEmotion}</strong>
                    </span>
                  </div>
                </div>

                {winner === brandB.brandName && (
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4FF3A]/15 border border-[#D4FF3A]/40 text-[#D4FF3A] text-xs font-bold">
                    <Trophy className="w-3.5 h-3.5" />
                    <span>Sentiment Winner</span>
                  </div>
                )}
              </div>

              {/* Net Sentiment Metric */}
              <div className="mb-6 p-4 rounded-xl bg-[#0D0F12] border border-[#2A303C]">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-xs font-mono uppercase text-[#A0A6B2]">Net Sentiment Index</span>
                  <span className="text-2xl font-black font-mono text-[#D4FF3A] tabular-nums">
                    +{brandB.netSentimentScore}
                  </span>
                </div>
                {/* Sentiment Ratio Bar */}
                <div className="h-3 w-full rounded-full bg-[#16191E] overflow-hidden flex border border-[#2A303C]">
                  <div style={{ width: `${brandB.sentimentDistribution.positive}%` }} className="h-full bg-[#D4FF3A]" />
                  <div style={{ width: `${brandB.sentimentDistribution.neutral}%` }} className="h-full bg-[#A0A6B2]/40" />
                  <div style={{ width: `${brandB.sentimentDistribution.negative}%` }} className="h-full bg-[#FF453A]" />
                </div>
                <div className="flex justify-between text-[11px] font-mono text-[#A0A6B2] mt-2">
                  <span className="text-[#D4FF3A] font-bold">{brandB.sentimentDistribution.positive}% Pos</span>
                  <span>{brandB.sentimentDistribution.neutral}% Neu</span>
                  <span className="text-[#FF453A] font-bold">{brandB.sentimentDistribution.negative}% Neg</span>
                </div>
              </div>

              {/* Top Keywords */}
              <div className="mb-4">
                <span className="text-xs font-mono uppercase text-[#A0A6B2] block mb-2">Top Discussed Themes</span>
                <div className="flex flex-wrap gap-2">
                  {brandB.topKeywords.map((kw, i) => (
                    <span
                      key={i}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium border ${
                        kw.sentiment === 'Positive'
                          ? 'bg-[#D4FF3A]/10 text-[#D4FF3A] border-[#D4FF3A]/30'
                          : 'bg-[#FF453A]/10 text-[#FF453A] border-[#FF453A]/30'
                      }`}
                    >
                      {kw.word}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sample quote */}
            <div className="mt-4 pt-3 border-t border-[#2A303C] text-xs text-[#A0A6B2] italic">
              "{brandB.sampleTweets[0]}"
            </div>
          </div>

        </div>

        {/* AI Comparison Summary Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#16191E] border border-[#2A303C]">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4FF3A] mb-3">
            <Sparkles className="w-4 h-4" />
            <span>AI Comparative Synthesis & Executive Verdict</span>
          </div>

          <p className="text-sm sm:text-base text-[#F8F7F4] leading-relaxed mb-6">
            {aiSummary}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-[#2A303C]">
            {keyTakeaways.map((takeaway, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-[#A0A6B2] leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-[#D4FF3A] shrink-0 mt-0.5" />
                <span>{takeaway}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
