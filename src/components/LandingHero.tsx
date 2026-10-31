import React from 'react';
import { ArrowRight, Compass, ShieldCheck, Zap, Activity, Cpu, Layers, Sparkles } from 'lucide-react';

interface LandingHeroProps {
  onExploreMood: () => void;
  onLaunchAutopsy: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onExploreMood, onLaunchAutopsy }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 border-b border-[#2A303C]">
      {/* Ambient background glow & conversation flow lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-[#D4FF3A]/20 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 -right-20 w-[500px] h-[500px] bg-[#C4B5FD]/15 rounded-full blur-[130px]" />
        <div className="absolute bottom-0 left-10 w-[450px] h-[450px] bg-[#FF6B35]/15 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Live-inspired emotional activity indicator */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#A0A6B2] mb-6">
          <div className="flex items-center gap-2 px-3 py-1 bg-[#16191E] border border-[#2A303C] rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#D4FF3A] animate-ping" />
            <span className="text-[#F8F7F4] font-medium">LIVE PULSE</span>
          </div>
          <span>·</span>
          <span>Global Optimism Index: <strong className="text-[#D4FF3A] tabular-nums">68.4%</strong></span>
          <span>·</span>
          <span>Synapses Processed: <strong className="text-[#F8F7F4] tabular-nums">2,841,920</strong></span>
          <span>·</span>
          <span className="hidden sm:inline">Inference Latency: <strong className="text-[#C4B5FD] tabular-nums">38ms</strong></span>
        </div>

        {/* Main 2-Column Split: Headline & Narrative on Left, 3D Globe with Floating Bubbles on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          <div className="lg:col-span-7">
            <div className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#D4FF3A] bg-[#D4FF3A]/10 border border-[#D4FF3A]/30 rounded mb-4">
              Next-Gen Social Media Intelligence
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F8F7F4] leading-[1.08] mb-6 text-balance">
              EVERY TWEET HAS A FEELING. <span className="text-[#D4FF3A] underline decoration-[#D4FF3A]/40 decoration-4 underline-offset-6">WE FIND IT.</span>
            </h1>

            <p className="text-lg sm:text-xl text-[#A0A6B2] font-normal leading-relaxed mb-8 max-w-2xl">
              Behind millions of characters flowing across the digital atmosphere lie waves of human joy, anger, tension, and hope. 
              Tweetverse AI combines transformer-driven natural language processing with high-resolution emotional valence modeling to decode what the world truly feels.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreMood}
                className="flex items-center gap-2.5 px-6 py-3.5 text-sm font-bold text-[#0D0F12] bg-[#D4FF3A] hover:bg-[#bde626] rounded-xl shadow-[0_0_25px_rgba(212,255,58,0.35)] transition-all transform hover:-translate-y-0.5 cursor-pointer whitespace-nowrap active:scale-95"
              >
                <Compass className="w-4 h-4" />
                <span>Explore Internet Mood</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onLaunchAutopsy}
                className="flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#F8F7F4] bg-[#16191E] hover:bg-[#20252D] border border-[#2A303C] hover:border-[#A0A6B2]/40 rounded-xl transition-all cursor-pointer whitespace-nowrap active:scale-95"
              >
                <Activity className="w-4 h-4 text-[#FF6B35]" />
                <span>Investigate Tweet Autopsy</span>
              </button>
            </div>

            {/* Trust points */}
            <div className="mt-8 pt-6 border-t border-[#2A303C]/60 flex flex-wrap items-center gap-6 text-xs text-[#A0A6B2]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#D4FF3A]" />
                <span>Zero Hallucinated Metrics</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-[#38BDF8]" />
                <span>Hybrid Gemini & VADER Pipeline</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-[#C4B5FD]" />
                <span>6-Dimensional Emotion Universe</span>
              </div>
            </div>
          </div>

          {/* Right Column: Globe Graphic with Floating Tweet Sentiment Badges */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#2A303C] shadow-2xl bg-[#16191E] group">
              <img
                src="/src/assets/images/tweetverse_hero_globe_1793473107698.jpg"
                alt="3D Digital Globe of Internet Emotional Atmosphere"
                className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F12] via-transparent to-transparent opacity-80" />

              {/* Floating Tweet Bubble 1 (Positive) */}
              <div className="absolute top-6 left-6 max-w-[240px] p-3 rounded-xl bg-[#0D0F12]/85 backdrop-blur-md border border-[#D4FF3A]/50 shadow-lg text-xs animate-bounce" style={{ animationDuration: '4s' }}>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-semibold text-[#F8F7F4] truncate">@kavya_builds</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#D4FF3A]/20 text-[#D4FF3A]">POSITIVE</span>
                </div>
                <p className="text-[#A0A6B2] line-clamp-2">"Our latency dropped by 80%! What an incredible milestone! 🚀"</p>
              </div>

              {/* Floating Tweet Bubble 2 (Negative / Anger) */}
              <div className="absolute bottom-8 right-6 max-w-[250px] p-3 rounded-xl bg-[#0D0F12]/85 backdrop-blur-md border border-[#FF6B35]/50 shadow-lg text-xs animate-bounce" style={{ animationDuration: '5s', animationDelay: '1s' }}>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-semibold text-[#F8F7F4] truncate">@gamer_critic</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#FF6B35]/20 text-[#FF6B35]">FRUSTRATION</span>
                </div>
                <p className="text-[#A0A6B2] line-clamp-2">"Match crashed again. Terrible server disconnects during ranked!"</p>
              </div>

              {/* Floating Tweet Bubble 3 (Excitement) */}
              <div className="absolute top-1/2 -left-2 transform -translate-y-1/2 max-w-[210px] p-2.5 rounded-xl bg-[#0D0F12]/90 backdrop-blur-md border border-[#38BDF8]/40 shadow-lg text-xs hidden sm:block">
                <div className="flex items-center gap-1.5 mb-1 text-[10px] font-mono text-[#38BDF8]">
                  <Sparkles className="w-3 h-3" />
                  <span>EMOTION DETECTED</span>
                </div>
                <p className="text-[#F8F7F4] font-medium text-[11px]">"Groundbreaking milestone for humanity!"</p>
              </div>
            </div>
          </div>

        </div>

        {/* Section: Short Explanation of How AI Decodes Human Sentiment */}
        <div className="mt-12 pt-10 border-t border-[#2A303C]/80">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl font-bold text-[#F8F7F4] tracking-tight mb-2">
              How AI Understands Human Emotions in 4 Stages
            </h2>
            <p className="text-sm text-[#A0A6B2]">
              From raw noisy slang and emojis to multi-dimensional psychological valence scoring.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-5 rounded-xl bg-[#16191E] border border-[#2A303C] hover:border-[#D4FF3A]/50 transition-colors">
              <div className="w-9 h-9 rounded-lg bg-[#D4FF3A]/10 border border-[#D4FF3A]/30 flex items-center justify-center text-[#D4FF3A] font-mono font-bold text-sm mb-3">
                01
              </div>
              <h3 className="text-base font-semibold text-[#F8F7F4] mb-1.5">Tokenization & Slang Mapping</h3>
              <p className="text-xs text-[#A0A6B2] leading-relaxed">
                Extracts raw tokens, emojis, acronyms, and hashtags, parsing informal tweet sentence structures without losing emotional nuance.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#16191E] border border-[#2A303C] hover:border-[#38BDF8]/50 transition-colors">
              <div className="w-9 h-9 rounded-lg bg-[#38BDF8]/10 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8] font-mono font-bold text-sm mb-3">
                02
              </div>
              <h3 className="text-base font-semibold text-[#F8F7F4] mb-1.5">Valence & Booster Scaling</h3>
              <p className="text-xs text-[#A0A6B2] leading-relaxed">
                Applies calibrated linguistic weights for modifiers ('insanely', 'barely') and negations ('not terrible', 'hardly functional').
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#16191E] border border-[#2A303C] hover:border-[#C4B5FD]/50 transition-colors">
              <div className="w-9 h-9 rounded-lg bg-[#C4B5FD]/10 border border-[#C4B5FD]/30 flex items-center justify-center text-[#C4B5FD] font-mono font-bold text-sm mb-3">
                03
              </div>
              <h3 className="text-base font-semibold text-[#F8F7F4] mb-1.5">Contextual Semantic Attention</h3>
              <p className="text-xs text-[#A0A6B2] leading-relaxed">
                Resolves sarcasm, contrasting clauses, and figurative expressions using deep neural multi-head self-attention mechanisms.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#16191E] border border-[#2A303C] hover:border-[#FF6B35]/50 transition-colors">
              <div className="w-9 h-9 rounded-lg bg-[#FF6B35]/10 border border-[#FF6B35]/30 flex items-center justify-center text-[#FF6B35] font-mono font-bold text-sm mb-3">
                04
              </div>
              <h3 className="text-base font-semibold text-[#F8F7F4] mb-1.5">6-Class Emotion Projection</h3>
              <p className="text-xs text-[#A0A6B2] leading-relaxed">
                Classifies text across Happiness, Excitement, Anger, Frustration, Sadness, and Fear with calibrated confidence probabilities.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
