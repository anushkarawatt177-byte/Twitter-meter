import React, { useState, useEffect } from 'react';
import { SOCIAL_PULSE_FEED } from '../data/mockData';
import { TweetItem, SentimentType, EmotionType } from '../types';
import { Radio, Play, Pause, FastForward, SlidersHorizontal, Info, Heart, MessageCircle, Repeat } from 'lucide-react';

const GENERATED_POOL: Omit<TweetItem, 'id' | 'time'>[] = [
  {
    author: 'Devika Sharma',
    handle: '@devika_ml',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    text: 'Self-hosted local LLM running at 45 tokens/second on an ordinary laptop! The open source ecosystem moves faster than big tech.',
    topic: 'Artificial Intelligence',
    sentiment: 'Positive',
    dominantEmotion: 'Excitement',
    confidence: 0.97,
    likes: 1420,
    retweets: 310
  },
  {
    author: 'Liam Davies',
    handle: '@liam_stream',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    text: 'Another sudden price hike on streaming with more ads inserted into movies? Time to cancel all monthly subs.',
    topic: 'Technology',
    sentiment: 'Negative',
    dominantEmotion: 'Anger',
    confidence: 0.94,
    likes: 3100,
    retweets: 780
  },
  {
    author: 'Aarav Patel',
    handle: '@aarav_cricket',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80',
    text: 'What an unplayable reverse-swing yorker to close out the 19th over. Masterclass in death bowling execution!',
    topic: 'Cricket',
    sentiment: 'Positive',
    dominantEmotion: 'Excitement',
    confidence: 0.98,
    likes: 8200,
    retweets: 2410
  },
  {
    author: 'Clara Oswald',
    handle: '@clara_nature',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    text: 'Offshore wind installations just generated over 50% of the coastline grid power today. Clean energy is winning.',
    topic: 'Environment',
    sentiment: 'Positive',
    dominantEmotion: 'Happiness',
    confidence: 0.95,
    likes: 4210,
    retweets: 890
  },
  {
    author: 'Samir Rao',
    handle: '@samir_code',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    text: 'Three hours stuck debugging why dependencies fail on Node v22. Error messages are entirely opaque and unhelpful.',
    topic: 'Technology',
    sentiment: 'Negative',
    dominantEmotion: 'Frustration',
    confidence: 0.93,
    likes: 620,
    retweets: 95
  },
  {
    author: 'Meera Iyer',
    handle: '@meera_edu',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
    text: 'Our student robotics club just took 1st place in the national tournament! So incredibly proud of their grit.',
    topic: 'Education',
    sentiment: 'Positive',
    dominantEmotion: 'Happiness',
    confidence: 0.99,
    likes: 5400,
    retweets: 1200
  }
];

export const SocialPulse: React.FC = () => {
  const [feed, setFeed] = useState<TweetItem[]>(SOCIAL_PULSE_FEED);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [speedInterval, setSpeedInterval] = useState<number>(3500); // 3.5s default
  const [selectedTopic, setSelectedTopic] = useState<string>('All');

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      // Pick random tweet from pool
      const template = GENERATED_POOL[Math.floor(Math.random() * GENERATED_POOL.length)];
      const newPost: TweetItem = {
        ...template,
        id: `sp-dyn-${Date.now()}`,
        time: 'Just now'
      };

      setFeed(prev => [newPost, ...prev.slice(0, 19)]);
    }, speedInterval);

    return () => clearInterval(timer);
  }, [isPlaying, speedInterval]);

  const filteredFeed = selectedTopic === 'All'
    ? feed
    : feed.filter(f => f.topic.toLowerCase() === selectedTopic.toLowerCase());

  const getSentimentBadge = (sentiment: SentimentType) => {
    if (sentiment === 'Positive') return 'bg-[#D4FF3A]/15 text-[#D4FF3A] border-[#D4FF3A]/40';
    if (sentiment === 'Negative') return 'bg-[#FF453A]/15 text-[#FF453A] border-[#FF453A]/40';
    return 'bg-[#A0A6B2]/15 text-[#A0A6B2] border-[#A0A6B2]/40';
  };

  return (
    <section id="social-pulse" className="py-16 border-b border-[#2A303C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#D4FF3A] mb-1">
              Real-Time Atmospheric Stream
            </div>
            <h2 className="text-3xl font-extrabold text-[#F8F7F4] tracking-tight">
              Social Pulse – Live-Inspired Stream
            </h2>
            <p className="text-sm text-[#A0A6B2] mt-1 max-w-xl">
              Continuously incoming social commentary with algorithmic emotion classification and polarity indicators.
            </p>
          </div>

          {/* Stream Controls */}
          <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
            <div className="flex items-center gap-1 p-1 bg-[#16191E] border border-[#2A303C] rounded-xl text-xs">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                  isPlaying ? 'bg-[#D4FF3A] text-[#0D0F12]' : 'bg-[#2A303C] text-[#F8F7F4]'
                }`}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? 'Streaming' : 'Paused'}</span>
              </button>

              <button
                onClick={() => setSpeedInterval(prev => prev === 3500 ? 1800 : 3500)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                  speedInterval === 1800 ? 'text-[#38BDF8] font-bold' : 'text-[#A0A6B2] hover:text-[#F8F7F4]'
                }`}
                title="Toggle faster stream intake"
              >
                {speedInterval === 1800 ? 'Fast (1.8s)' : '1x (3.5s)'}
              </button>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#16191E] border border-[#2A303C] rounded-xl text-xs text-[#A0A6B2]">
              <Info className="w-3.5 h-3.5 text-[#C4B5FD]" />
              <span>Simulated Real-Time Demonstration Feed</span>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6">
          <span className="text-xs font-mono uppercase text-[#A0A6B2] mr-2 flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </span>
          {['All', 'Artificial Intelligence', 'Cricket', 'Technology', 'Environment', 'Education', 'Gaming'].map((topic) => (
            <button
              key={topic}
              onClick={() => setSelectedTopic(topic)}
              className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer transition-colors ${
                selectedTopic === topic
                  ? 'bg-[#F8F7F4] text-[#0D0F12] font-semibold'
                  : 'bg-[#16191E] text-[#A0A6B2] hover:text-[#F8F7F4] border border-[#2A303C]'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>

        {/* Stream List */}
        <div className="space-y-3">
          {filteredFeed.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-[#16191E] border border-[#2A303C] hover:border-[#A0A6B2]/40 transition-all shadow-md group relative overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2.5">
                <div className="flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.author}
                    className="w-9 h-9 rounded-full object-cover border border-[#2A303C]"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#F8F7F4] group-hover:text-[#D4FF3A] transition-colors">
                        {item.author}
                      </span>
                      <span className="text-xs font-mono text-[#A0A6B2]">
                        {item.handle}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#A0A6B2] font-mono">
                      Domain: <strong className="text-[#F8F7F4]">{item.topic}</strong> · {item.time}
                    </span>
                  </div>
                </div>

                {/* Sentiment & Emotion Badges */}
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold border ${getSentimentBadge(item.sentiment)}`}>
                    {item.sentiment}
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-xs font-mono bg-[#0D0F12] border border-[#2A303C] text-[#C4B5FD]">
                    {item.dominantEmotion}
                  </span>
                  <span className="text-xs font-mono text-[#A0A6B2] tabular-nums">
                    {Math.round(item.confidence * 100)}%
                  </span>
                </div>
              </div>

              <p className="text-sm text-[#F8F7F4] leading-relaxed mb-3">
                {item.text}
              </p>

              <div className="flex items-center gap-6 text-xs text-[#A0A6B2] font-mono pt-2 border-t border-[#2A303C]/60">
                <span className="flex items-center gap-1 hover:text-[#FF453A] cursor-pointer">
                  <Heart className="w-3.5 h-3.5" />
                  <span>{item.likes.toLocaleString()}</span>
                </span>
                <span className="flex items-center gap-1 hover:text-[#D4FF3A] cursor-pointer">
                  <Repeat className="w-3.5 h-3.5" />
                  <span>{item.retweets.toLocaleString()}</span>
                </span>
                <span className="text-[#D4FF3A] text-[11px]">
                  NLP Verified
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
