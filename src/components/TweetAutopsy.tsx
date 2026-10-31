import React, { useState } from 'react';
import { SentimentAnalysisResult } from '../types';
import { analyzeSentimentRuleBased } from '../lib/vaderEngine';
import { Search, Sparkles, AlertCircle, CheckCircle2, XCircle, HelpCircle, Activity, BrainCircuit, RefreshCw, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

const PRESET_TWEETS = [
  {
    label: 'Breakthrough Joy',
    text: 'Multimodal AI reasoning dropped our system latency by 80%! What an incredible, revolutionary milestone for our team 🚀'
  },
  {
    label: 'Customer Outrage',
    text: 'Waited 3 hours on customer service just to have my ticket closed with zero fix. Worst service ever, absolute scam.'
  },
  {
    label: 'Complex Negation',
    text: 'Honestly, the new operating system update is not bad at all. Battery life has improved and performance is solid.'
  },
  {
    label: 'Technical Neutral',
    text: 'Quarterly financial report indicates semiconductor shipment volume remained flat at 14.2 million units year-over-year.'
  }
];

export const TweetAutopsy: React.FC = () => {
  const [inputTweet, setInputTweet] = useState<string>(PRESET_TWEETS[0].text);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [result, setResult] = useState<SentimentAnalysisResult | null>(() => analyzeSentimentRuleBased(PRESET_TWEETS[0].text));
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (tweetToAnalyze?: string) => {
    const text = tweetToAnalyze || inputTweet;
    if (!text.trim()) {
      setError('Please enter or select a tweet to investigate.');
      return;
    }

    setError(null);
    setIsAnalyzing(true);

    try {
      // Call full-stack backend endpoint
      const response = await fetch('/api/analyze-tweet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data: SentimentAnalysisResult = await response.json();
      setResult(data);

      if (data.sentiment === 'Positive') {
        confetti({
          particleCount: 30,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#D4FF3A', '#38BDF8', '#FFFFFF']
        });
      }
    } catch (err: any) {
      console.warn('Backend endpoint unavailable, using internal VADER NLP engine:', err);
      // Fallback to internal VADER engine
      const localResult = analyzeSentimentRuleBased(text);
      setResult(localResult);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getSentimentBadge = (sentiment: string) => {
    if (sentiment === 'Positive') {
      return (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#D4FF3A]/15 border border-[#D4FF3A]/40 text-[#D4FF3A]">
          <CheckCircle2 className="w-4 h-4" />
          <span className="font-extrabold uppercase tracking-wide text-sm">Positive Polarity</span>
        </div>
      );
    }
    if (sentiment === 'Negative') {
      return (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FF453A]/15 border border-[#FF453A]/40 text-[#FF453A]">
          <XCircle className="w-4 h-4" />
          <span className="font-extrabold uppercase tracking-wide text-sm">Negative Polarity</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#A0A6B2]/15 border border-[#A0A6B2]/40 text-[#A0A6B2]">
        <HelpCircle className="w-4 h-4" />
        <span className="font-extrabold uppercase tracking-wide text-sm">Neutral Polarity</span>
      </div>
    );
  };

  return (
    <section id="tweet-autopsy" className="py-16 border-b border-[#2A303C] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#D4FF3A] mb-1">
              Deep Neural NLP Diagnostic
            </div>
            <h2 className="text-3xl font-extrabold text-[#F8F7F4] tracking-tight">
              Tweet Autopsy
            </h2>
            <p className="text-sm text-[#A0A6B2] mt-1 max-w-xl">
              Dissect any social media post to its atomic emotional triggers, token valence weights, and contextual self-attention scores.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#A0A6B2]">
            <BrainCircuit className="w-4 h-4 text-[#38BDF8]" />
            <span>Dual Pipeline: <strong className="text-[#F8F7F4]">Transformer Attention + VADER Lexicon</strong></span>
          </div>
        </div>

        {/* 2-Column Lab Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Input Lab Console */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-6 rounded-2xl bg-[#16191E] border border-[#2A303C] shadow-lg">
              <label htmlFor="tweet-input" className="block text-xs font-bold uppercase tracking-wider text-[#F8F7F4] mb-2 flex items-center justify-between">
                <span>Subject Tweet For Examination</span>
                <span className="text-[11px] text-[#A0A6B2] font-mono tabular-nums">{inputTweet.length}/280</span>
              </label>

              <textarea
                id="tweet-input"
                rows={4}
                value={inputTweet}
                onChange={(e) => setInputTweet(e.target.value)}
                placeholder="Paste or type any tweet here (e.g. 'Can't believe how great this software is...')"
                className="w-full p-4 rounded-xl bg-[#0D0F12] border border-[#2A303C] text-sm text-[#F8F7F4] placeholder-[#A0A6B2]/50 focus:outline-none focus:border-[#D4FF3A] transition-colors resize-none leading-relaxed font-sans"
              />

              {error && (
                <div className="mt-2 text-xs text-[#FF453A] flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{error}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={() => handleAnalyze()}
                  disabled={isAnalyzing}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-[#0D0F12] bg-[#D4FF3A] hover:bg-[#bde626] transition-all cursor-pointer shadow-[0_0_20px_rgba(212,255,58,0.3)] disabled:opacity-50 active:scale-98"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Scanning Synapses...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      <span>Investigate Emotion</span>
                    </>
                  )}
                </button>
              </div>

              {/* 1-Click Test Presets */}
              <div className="mt-6 pt-5 border-t border-[#2A303C]">
                <span className="text-[11px] font-mono uppercase text-[#A0A6B2] block mb-2">
                  1-Click Benchmark Presets:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {PRESET_TWEETS.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setInputTweet(preset.text);
                        handleAnalyze(preset.text);
                      }}
                      className="text-left p-2.5 rounded-lg bg-[#0D0F12] hover:bg-[#20252D] border border-[#2A303C] hover:border-[#D4FF3A]/40 text-xs transition-colors cursor-pointer"
                    >
                      <div className="font-semibold text-[#F8F7F4] truncate">{preset.label}</div>
                      <div className="text-[11px] text-[#A0A6B2] truncate mt-0.5">{preset.text}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Holographic Lab Visual Card */}
            <div className="rounded-2xl overflow-hidden border border-[#2A303C] bg-[#16191E] relative">
              <img
                src="/src/assets/images/nlp_lab_hologram_1793473107873.jpg"
                alt="NLP Sentiment Investigation Hologram"
                className="w-full h-48 object-cover opacity-80"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#16191E] via-[#16191E]/40 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4">
                <span className="text-[10px] font-mono text-[#D4FF3A] uppercase tracking-wider block">Autopsy Protocol</span>
                <p className="text-xs text-[#F8F7F4] font-medium">Real-time word-level valence scoring with negator inversion checks.</p>
              </div>
            </div>

          </div>

          {/* Right Column: Autopsy Findings */}
          <div className="lg:col-span-7 space-y-6">
            {result ? (
              <div className="p-6 sm:p-8 rounded-2xl bg-[#16191E] border border-[#2A303C] shadow-xl space-y-6">
                
                {/* Status Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#2A303C]">
                  <div>
                    <span className="text-[11px] font-mono uppercase text-[#A0A6B2] block">Classification Verdict</span>
                    <div className="mt-1">{getSentimentBadge(result.sentiment)}</div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div>
                      <span className="text-[11px] font-mono uppercase text-[#A0A6B2] block">Confidence</span>
                      <div className="text-xl font-bold font-mono text-[#F8F7F4] tabular-nums">
                        {Math.round(result.confidence * 100)}%
                      </div>
                    </div>

                    <div>
                      <span className="text-[11px] font-mono uppercase text-[#A0A6B2] block">Compound Metric</span>
                      <div className={`text-xl font-bold font-mono tabular-nums ${
                        result.compoundScore > 0 ? 'text-[#D4FF3A]' : result.compoundScore < 0 ? 'text-[#FF453A]' : 'text-[#A0A6B2]'
                      }`}>
                        {result.compoundScore > 0 ? `+${result.compoundScore}` : result.compoundScore}
                      </div>
                    </div>

                    <div>
                      <span className="text-[11px] font-mono uppercase text-[#A0A6B2] block">Dominant Emotion</span>
                      <div className="text-xl font-bold text-[#C4B5FD]">
                        {result.dominantEmotion}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sentiment Ratio Breakdown Bar */}
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#A0A6B2] mb-2">
                    <span>Valence Polarity Distribution</span>
                    <span>Sum: 100%</span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-[#0D0F12] overflow-hidden flex border border-[#2A303C]">
                    <div
                      style={{ width: `${result.breakdown.positive}%` }}
                      className="h-full bg-[#D4FF3A] transition-all duration-500"
                      title={`Positive: ${result.breakdown.positive}%`}
                    />
                    <div
                      style={{ width: `${result.breakdown.neutral}%` }}
                      className="h-full bg-[#A0A6B2]/40 transition-all duration-500"
                      title={`Neutral: ${result.breakdown.neutral}%`}
                    />
                    <div
                      style={{ width: `${result.breakdown.negative}%` }}
                      className="h-full bg-[#FF453A] transition-all duration-500"
                      title={`Negative: ${result.breakdown.negative}%`}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#A0A6B2] mt-1.5">
                    <span className="text-[#D4FF3A]">{result.breakdown.positive}% Positive</span>
                    <span className="text-[#A0A6B2]">{result.breakdown.neutral}% Neutral</span>
                    <span className="text-[#FF453A]">{result.breakdown.negative}% Negative</span>
                  </div>
                </div>

                {/* Important Influencing Words / Token Heatmap */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#F8F7F4] mb-3 flex items-center justify-between">
                    <span>Token Valence Influence Heatmap</span>
                    <span className="text-[11px] text-[#A0A6B2] font-mono">Word Attention Weight</span>
                  </h4>

                  {result.influencingWords && result.influencingWords.length > 0 ? (
                    <div className="flex flex-wrap gap-2 p-4 rounded-xl bg-[#0D0F12] border border-[#2A303C]">
                      {result.influencingWords.map((token, idx) => {
                        let colorClass = 'bg-[#16191E] text-[#A0A6B2] border-[#2A303C]';
                        if (token.type === 'positive') {
                          colorClass = 'bg-[#D4FF3A]/15 text-[#D4FF3A] border-[#D4FF3A]/40';
                        } else if (token.type === 'negative') {
                          colorClass = 'bg-[#FF453A]/15 text-[#FF453A] border-[#FF453A]/40';
                        } else if (token.type === 'intensifier') {
                          colorClass = 'bg-[#38BDF8]/15 text-[#38BDF8] border-[#38BDF8]/40';
                        } else if (token.type === 'negator') {
                          colorClass = 'bg-[#FF6B35]/15 text-[#FF6B35] border-[#FF6B35]/40';
                        }

                        return (
                          <div
                            key={idx}
                            className={`px-2.5 py-1 rounded-md text-xs font-mono border flex items-center gap-1.5 ${colorClass}`}
                            title={`Word: ${token.word} | Type: ${token.type} | Weight: ${token.weight}`}
                          >
                            <span className="font-semibold">{token.word}</span>
                            <span className="text-[10px] opacity-80 tabular-nums">
                              {token.type === 'negator'
                                ? 'NEG'
                                : token.weight > 0
                                ? `+${token.weight}`
                                : token.weight}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-[#0D0F12] border border-[#2A303C] text-xs text-[#A0A6B2]">
                      No strong polarity keywords detected. Sentence evaluated based on balanced factual phrasing.
                    </div>
                  )}
                </div>

                {/* 6-Dimensional Emotion Breakdown */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#F8F7F4] mb-3">
                    6-Dimensional Emotion Spectrum
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {result.emotions.map((emo, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-[#0D0F12] border border-[#2A303C]">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="font-medium text-[#F8F7F4]">{emo.emotion}</span>
                          <span className="font-mono text-xs tabular-nums text-[#D4FF3A] font-bold">{emo.score}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-[#16191E] rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${emo.score}%`,
                              backgroundColor: emo.color || '#D4FF3A'
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Linguistic Explanation */}
                <div className="p-4 rounded-xl bg-[#0D0F12] border border-[#2A303C]">
                  <div className="text-xs font-bold text-[#D4FF3A] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Linguistic Explanation & Reasoning</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#A0A6B2] leading-relaxed">
                    {result.explanation}
                  </p>
                </div>

              </div>
            ) : (
              <div className="p-12 rounded-2xl bg-[#16191E] border border-[#2A303C] text-center text-[#A0A6B2]">
                <Activity className="w-10 h-10 mx-auto text-[#2A303C] mb-3 animate-pulse" />
                <p className="text-sm">Enter a tweet on the left to begin emotional investigation.</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
