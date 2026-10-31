import React, { useState } from 'react';
import { EMOTIONS_METADATA } from '../data/mockData';
import { EmotionType } from '../types';
import { Orbit, Flame, Heart, Zap, AlertTriangle, CloudRain, ShieldAlert } from 'lucide-react';

export const EmotionUniverse: React.FC = () => {
  const [selectedEmotionType, setSelectedEmotionType] = useState<EmotionType>('Happiness');

  const selectedEmotion = EMOTIONS_METADATA.find(e => e.type === selectedEmotionType) || EMOTIONS_METADATA[0];

  const getEmotionIcon = (type: EmotionType) => {
    switch (type) {
      case 'Happiness': return <Heart className="w-5 h-5 text-[#D4FF3A]" />;
      case 'Excitement': return <Zap className="w-5 h-5 text-[#38BDF8]" />;
      case 'Anger': return <Flame className="w-5 h-5 text-[#FF453A]" />;
      case 'Frustration': return <AlertTriangle className="w-5 h-5 text-[#FF6B35]" />;
      case 'Sadness': return <CloudRain className="w-5 h-5 text-[#C4B5FD]" />;
      case 'Fear': return <ShieldAlert className="w-5 h-5 text-[#A855F7]" />;
    }
  };

  return (
    <section id="emotion-universe" className="py-16 border-b border-[#2A303C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#D4FF3A] mb-1">
              Affective Constellation
            </div>
            <h2 className="text-3xl font-extrabold text-[#F8F7F4] tracking-tight">
              Emotion Universe
            </h2>
            <p className="text-sm text-[#A0A6B2] mt-1 max-w-xl">
              An interactive 6-dimensional constellation mapping the psychological currents surging across global social conversations.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#A0A6B2]">
            <Orbit className="w-4 h-4 text-[#D4FF3A]" />
            <span>Interactive Node Topology</span>
          </div>
        </div>

        {/* Constellation Planetary Bubbles Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          {EMOTIONS_METADATA.map((emotion) => {
            const isSelected = emotion.type === selectedEmotion.type;
            return (
              <button
                key={emotion.type}
                onClick={() => setSelectedEmotionType(emotion.type)}
                className={`p-5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden group ${
                  isSelected
                    ? 'bg-[#16191E] shadow-xl scale-102 ring-2'
                    : 'bg-[#16191E]/60 hover:bg-[#16191E] border-[#2A303C]'
                }`}
                style={{
                  borderColor: isSelected ? emotion.color : '#2A303C',
                  // @ts-ignore
                  '--tw-ring-color': isSelected ? emotion.color : 'transparent'
                }}
              >
                {/* Glow pill behind icon */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${emotion.color}20` }}
                >
                  {getEmotionIcon(emotion.type)}
                </div>

                <div className="text-sm font-bold text-[#F8F7F4] mb-1">{emotion.title}</div>
                <div className="flex items-baseline justify-between">
                  <span className="text-[11px] font-mono text-[#A0A6B2]">{emotion.valence}</span>
                  <span
                    className="text-base font-extrabold font-mono tabular-nums"
                    style={{ color: emotion.color }}
                  >
                    {emotion.share}%
                  </span>
                </div>

                {/* Bottom intensity indicator bar */}
                <div className="mt-3 h-1 w-full bg-[#0D0F12] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${emotion.share * 2.5}%`, backgroundColor: emotion.color }}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Emotion Deep Dive Showcase */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#16191E] border border-[#2A303C] relative overflow-hidden shadow-2xl">
          {/* Subtle colored backlight corner */}
          <div
            className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-20"
            style={{ backgroundColor: selectedEmotion.color }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span
                  className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider font-mono"
                  style={{ backgroundColor: `${selectedEmotion.color}25`, color: selectedEmotion.color }}
                >
                  {selectedEmotion.intensity}
                </span>
                <span className="text-xs text-[#A0A6B2]">·</span>
                <span className="text-xs text-[#A0A6B2] font-mono">Discourse Volume: <strong className="text-[#F8F7F4]">{selectedEmotion.share}%</strong></span>
              </div>

              <h3 className="text-3xl font-extrabold text-[#F8F7F4] flex items-center gap-3">
                <span>{selectedEmotion.title}</span>
                <span className="text-sm font-normal text-[#A0A6B2]">({selectedEmotion.tagline})</span>
              </h3>

              <p className="text-sm text-[#A0A6B2] leading-relaxed max-w-2xl">
                {selectedEmotion.description}
              </p>

              <div className="pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#F8F7F4] mb-2">
                  Top Linguistic Triggers & Keywords
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedEmotion.triggerKeywords.map((kw, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg text-xs font-mono font-medium border"
                      style={{
                        backgroundColor: `${selectedEmotion.color}15`,
                        borderColor: `${selectedEmotion.color}40`,
                        color: selectedEmotion.color
                      }}
                    >
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 p-5 rounded-xl bg-[#0D0F12] border border-[#2A303C] space-y-3">
              <div className="text-xs font-mono uppercase text-[#A0A6B2] flex items-center justify-between">
                <span>Real-Time Synthesized Sample</span>
                <span style={{ color: selectedEmotion.color }}>Vibrating Node</span>
              </div>

              <p className="text-sm text-[#F8F7F4] italic leading-relaxed">
                {selectedEmotion.type === 'Happiness' && '"Overwhelmed with gratitude for our open source contributors. Together we reached 1M users without spending a dime on ads!"'}
                {selectedEmotion.type === 'Excitement' && '"HOLY SMOKES! Just tested the autonomous agent orchestrating 5 models simultaneously. The future arrived overnight!"'}
                {selectedEmotion.type === 'Anger' && '"Double charging customer cards and then ignoring cancellation emails for 2 weeks is straight-up fraud. Unacceptable!"'}
                {selectedEmotion.type === 'Frustration' && '"Another meeting that could have been a 2-line email while the staging database has been crashed all morning."'}
                {selectedEmotion.type === 'Sadness' && '"Heartbroken to hear about the passing of our mentor. Their kindness and technical clarity inspired thousands."'}
                {selectedEmotion.type === 'Fear' && '"The escalation in automated deepfake phishing campaigns is outpacing current consumer defense safeguards."'}
              </p>

              <div className="text-[11px] font-mono text-[#A0A6B2] pt-2 border-t border-[#2A303C]/80 flex justify-between">
                <span>Simulated High-Resonance Post</span>
                <span className="text-[#D4FF3A]">NLP Confidence: 97.4%</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
