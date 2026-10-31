import React, { useState } from 'react';
import { TOPICS_DATA } from '../data/mockData';
import { TopicInsight, SentimentType } from '../types';
import { Cpu, Film, Trophy, GraduationCap, Smartphone, Gamepad2, Leaf, MessageSquare, ThumbsUp, ThumbsDown, Minus, Info } from 'lucide-react';

export const MoodExplorer: React.FC = () => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>('ai');

  const selectedTopic: TopicInsight = TOPICS_DATA.find(t => t.id === selectedTopicId) || TOPICS_DATA[0];

  const getTopicIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-4 h-4" />;
      case 'Film': return <Film className="w-4 h-4" />;
      case 'Trophy': return <Trophy className="w-4 h-4" />;
      case 'GraduationCap': return <GraduationCap className="w-4 h-4" />;
      case 'Smartphone': return <Smartphone className="w-4 h-4" />;
      case 'Gamepad2': return <Gamepad2 className="w-4 h-4" />;
      case 'Leaf': return <Leaf className="w-4 h-4" />;
      default: return <Cpu className="w-4 h-4" />;
    }
  };

  const getSentimentColor = (sentiment: SentimentType) => {
    if (sentiment === 'Positive') return 'text-[#D4FF3A] bg-[#D4FF3A]/10 border-[#D4FF3A]/30';
    if (sentiment === 'Negative') return 'text-[#FF453A] bg-[#FF453A]/10 border-[#FF453A]/30';
    return 'text-[#A0A6B2] bg-[#A0A6B2]/10 border-[#A0A6B2]/30';
  };

  return (
    <section id="mood-explorer" className="py-16 border-b border-[#2A303C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Title and Simulated Label */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#D4FF3A] mb-1">
              Interactive Sentiment Spectrum
            </div>
            <h2 className="text-3xl font-extrabold text-[#F8F7F4] tracking-tight">
              Mood Explorer
            </h2>
            <p className="text-sm text-[#A0A6B2] mt-1 max-w-xl">
              Select a cultural domain to reveal live sentiment distribution, keyword resonance, and representative social discourse.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#16191E] border border-[#2A303C] text-xs text-[#A0A6B2] self-start md:self-auto">
            <Info className="w-4 h-4 text-[#C4B5FD] shrink-0" />
            <span>Curated Benchmark Dataset · <strong className="text-[#F8F7F4]">Simulated Data</strong></span>
          </div>
        </div>

        {/* Topic Selector Tabs (7 Topics) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-thin">
          {TOPICS_DATA.map((topic) => {
            const isSelected = topic.id === selectedTopic.id;
            return (
              <button
                key={topic.id}
                onClick={() => setSelectedTopicId(topic.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#D4FF3A] text-[#0D0F12] shadow-[0_0_15px_rgba(212,255,58,0.35)]'
                    : 'bg-[#16191E] text-[#A0A6B2] hover:text-[#F8F7F4] hover:bg-[#20252D] border border-[#2A303C]'
                }`}
              >
                {getTopicIcon(topic.iconName)}
                <span>{topic.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${isSelected ? 'bg-[#0D0F12]/20 text-[#0D0F12]' : 'bg-[#2A303C] text-[#A0A6B2]'}`}>
                  {topic.sentimentDistribution.positive}% Pos
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Display: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Visual Sentiment Distribution & Keyword Cloud */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Sentiment Breakdown Card */}
            <div className="p-6 rounded-2xl bg-[#16191E] border border-[#2A303C]">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-[#F8F7F4]">{selectedTopic.name}</h3>
                  <p className="text-xs text-[#A0A6B2]">{selectedTopic.description}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono uppercase text-[#A0A6B2]">Dominant Emotion</span>
                  <div className="text-sm font-bold text-[#D4FF3A]">{selectedTopic.dominantEmotion}</div>
                </div>
              </div>

              {/* Stacked Sentiment Ratio Bar */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-between text-xs font-mono text-[#A0A6B2]">
                  <span>Sentiment Ratio Distribution</span>
                  <span>{selectedTopic.sampleCount.toLocaleString()} Analyzed Tweets</span>
                </div>
                
                <div className="h-4 w-full rounded-full bg-[#0D0F12] overflow-hidden flex p-0.5 border border-[#2A303C]">
                  <div
                    style={{ width: `${selectedTopic.sentimentDistribution.positive}%` }}
                    className="h-full bg-[#D4FF3A] rounded-l-full transition-all duration-500"
                    title={`Positive: ${selectedTopic.sentimentDistribution.positive}%`}
                  />
                  <div
                    style={{ width: `${selectedTopic.sentimentDistribution.neutral}%` }}
                    className="h-full bg-[#A0A6B2]/40 transition-all duration-500"
                    title={`Neutral: ${selectedTopic.sentimentDistribution.neutral}%`}
                  />
                  <div
                    style={{ width: `${selectedTopic.sentimentDistribution.negative}%` }}
                    className="h-full bg-[#FF453A] rounded-r-full transition-all duration-500"
                    title={`Negative: ${selectedTopic.sentimentDistribution.negative}%`}
                  />
                </div>

                {/* Legend with percentages */}
                <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
                  <div className="p-2 rounded-lg bg-[#0D0F12] border border-[#D4FF3A]/30">
                    <div className="flex items-center justify-center gap-1 text-[#D4FF3A] font-bold">
                      <ThumbsUp className="w-3 h-3" />
                      <span className="tabular-nums">{selectedTopic.sentimentDistribution.positive}%</span>
                    </div>
                    <span className="text-[10px] text-[#A0A6B2] uppercase font-mono">Positive</span>
                  </div>

                  <div className="p-2 rounded-lg bg-[#0D0F12] border border-[#A0A6B2]/30">
                    <div className="flex items-center justify-center gap-1 text-[#A0A6B2] font-bold">
                      <Minus className="w-3 h-3" />
                      <span className="tabular-nums">{selectedTopic.sentimentDistribution.neutral}%</span>
                    </div>
                    <span className="text-[10px] text-[#A0A6B2] uppercase font-mono">Neutral</span>
                  </div>

                  <div className="p-2 rounded-lg bg-[#0D0F12] border border-[#FF453A]/30">
                    <div className="flex items-center justify-center gap-1 text-[#FF453A] font-bold">
                      <ThumbsDown className="w-3 h-3" />
                      <span className="tabular-nums">{selectedTopic.sentimentDistribution.negative}%</span>
                    </div>
                    <span className="text-[10px] text-[#A0A6B2] uppercase font-mono">Negative</span>
                  </div>
                </div>
              </div>

              {/* Key Observation Quote */}
              <div className="p-3.5 rounded-xl bg-[#0D0F12] border border-[#2A303C] text-xs text-[#A0A6B2] leading-relaxed">
                <span className="text-[#D4FF3A] font-semibold">AI Synthesized Observation: </span>
                {selectedTopic.keyObservation}
              </div>
            </div>

            {/* Keyword Frequency Card */}
            <div className="p-6 rounded-2xl bg-[#16191E] border border-[#2A303C]">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold text-[#F8F7F4] uppercase tracking-wide">
                  Most Discussed Keywords
                </h4>
                <span className="text-xs text-[#A0A6B2]">Frequency rank</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {selectedTopic.topKeywords.map((kw, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium ${getSentimentColor(kw.sentiment)}`}
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

          {/* Right Column: Representative Social Posts */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-bold text-[#F8F7F4] uppercase tracking-wide flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#D4FF3A]" />
                <span>Representative Discourse in {selectedTopic.name}</span>
              </h4>
              <span className="text-xs text-[#A0A6B2]">Sample Feed</span>
            </div>

            <div className="space-y-4">
              {selectedTopic.sampleTweets.map((tweet) => (
                <div
                  key={tweet.id}
                  className="p-5 rounded-2xl bg-[#16191E] border border-[#2A303C] hover:border-[#A0A6B2]/40 transition-all shadow-md group"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={tweet.avatar}
                        alt={tweet.author}
                        className="w-10 h-10 rounded-full object-cover border border-[#2A303C]"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="text-sm font-semibold text-[#F8F7F4] group-hover:text-[#D4FF3A] transition-colors">
                          {tweet.author}
                        </div>
                        <div className="text-xs text-[#A0A6B2] font-mono">
                          {tweet.handle} · {tweet.time}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold border ${getSentimentColor(tweet.sentiment)}`}>
                        {tweet.sentiment}
                      </span>
                      <span className="text-xs font-mono text-[#A0A6B2] tabular-nums">
                        {Math.round(tweet.confidence * 100)}% conf
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-[#F8F7F4] leading-relaxed mb-4">
                    {tweet.text}
                  </p>

                  <div className="flex items-center justify-between text-xs text-[#A0A6B2] pt-3 border-t border-[#2A303C]/70">
                    <div className="flex items-center gap-4">
                      <span>♥ {tweet.likes.toLocaleString()} likes</span>
                      <span>🔄 {tweet.retweets.toLocaleString()} retweets</span>
                    </div>
                    <div className="font-mono text-[11px] text-[#C4B5FD]">
                      Emotion: <strong className="text-[#F8F7F4]">{tweet.dominantEmotion}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
