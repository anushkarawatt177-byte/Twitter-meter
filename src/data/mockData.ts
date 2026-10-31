import { TopicInsight, BrandComparisonResult, TweetItem, EmotionType } from '../types';

export const TOPICS_DATA: TopicInsight[] = [
  {
    id: 'ai',
    name: 'Artificial Intelligence',
    iconName: 'Cpu',
    description: 'Autonomous reasoning, generative agents, neural compute & AGI debates',
    sampleCount: 14280,
    sentimentDistribution: {
      positive: 64,
      negative: 22,
      neutral: 14
    },
    dominantEmotion: 'Excitement',
    topKeywords: [
      { word: 'breakthrough', count: 4820, sentiment: 'Positive' },
      { word: 'automation', count: 3210, sentiment: 'Neutral' },
      { word: 'deep learning', count: 2940, sentiment: 'Positive' },
      { word: 'hallucinations', count: 1850, sentiment: 'Negative' },
      { word: 'efficiency', count: 1690, sentiment: 'Positive' },
      { word: 'job impact', count: 1420, sentiment: 'Negative' }
    ],
    sampleTweets: [
      {
        id: 't-ai-1',
        author: 'Dr. Elena Rostova',
        handle: '@elena_neuro',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        text: 'The speed of multimodal multimodal reasoning models this quarter is utterly mindblowing. Real-time visual grounding is finally here!',
        topic: 'Artificial Intelligence',
        sentiment: 'Positive',
        dominantEmotion: 'Excitement',
        confidence: 0.96,
        likes: 1240,
        retweets: 312,
        time: '4m ago'
      },
      {
        id: 't-ai-2',
        author: 'Devon Vance',
        handle: '@vance_code',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
        text: 'Still waiting for an AI code assistant that does not hallucinate nonexistent package APIs in standard TypeScript frameworks.',
        topic: 'Artificial Intelligence',
        sentiment: 'Negative',
        dominantEmotion: 'Frustration',
        confidence: 0.91,
        likes: 843,
        retweets: 94,
        time: '12m ago'
      },
      {
        id: 't-ai-3',
        author: 'Sarah Lin',
        handle: '@sarah_product',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
        text: 'Our engineering throughput doubled after adopting automated testing agents. Invaluable productivity leap for early stage teams.',
        topic: 'Artificial Intelligence',
        sentiment: 'Positive',
        dominantEmotion: 'Happiness',
        confidence: 0.94,
        likes: 2100,
        retweets: 480,
        time: '28m ago'
      }
    ],
    keyObservation: 'High enthusiasm around agentic reasoning and visual grounding, tempered by concerns over hallucination rates and technical reliability.'
  },
  {
    id: 'bollywood',
    name: 'Bollywood',
    iconName: 'Film',
    description: 'Box-office spectacles, cinematic song launches, OTT releases & celebrity discourse',
    sampleCount: 18950,
    sentimentDistribution: {
      positive: 58,
      negative: 26,
      neutral: 16
    },
    dominantEmotion: 'Happiness',
    topKeywords: [
      { word: 'blockbuster', count: 5240, sentiment: 'Positive' },
      { word: 'soundtrack', count: 4120, sentiment: 'Positive' },
      { word: 'screenplay', count: 2890, sentiment: 'Neutral' },
      { word: 'overhyped', count: 2410, sentiment: 'Negative' },
      { word: 'cinematography', count: 2190, sentiment: 'Positive' },
      { word: 'cringe dialogue', count: 1350, sentiment: 'Negative' }
    ],
    sampleTweets: [
      {
        id: 't-bol-1',
        author: 'Arjun Mehta',
        handle: '@arjun_cinema',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
        text: 'Just watched the first day first show! That interval climax sequence gave me goosebumps. Pure cinematic spectacle and peak acting.',
        topic: 'Bollywood',
        sentiment: 'Positive',
        dominantEmotion: 'Excitement',
        confidence: 0.95,
        likes: 3410,
        retweets: 820,
        time: '8m ago'
      },
      {
        id: 't-bol-2',
        author: 'Priya Nambiar',
        handle: '@priya_reviews',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
        text: 'Unpopular opinion: the story is completely predictable and the 3-hour runtime is filled with pointless slow-motion filler scenes.',
        topic: 'Bollywood',
        sentiment: 'Negative',
        dominantEmotion: 'Frustration',
        confidence: 0.93,
        likes: 1240,
        retweets: 304,
        time: '22m ago'
      }
    ],
    keyObservation: 'Strong positive surges triggered by theatrical grand spectacles and musical scores, counterbalanced by vocal criticism of formulaic writing.'
  },
  {
    id: 'cricket',
    name: 'Cricket',
    iconName: 'Trophy',
    description: 'International test matches, IPL auction drama, match-winning sixes & umpire reviews',
    sampleCount: 32400,
    sentimentDistribution: {
      positive: 71,
      negative: 19,
      neutral: 10
    },
    dominantEmotion: 'Excitement',
    topKeywords: [
      { word: 'clutch century', count: 8430, sentiment: 'Positive' },
      { word: 'yorker', count: 6120, sentiment: 'Positive' },
      { word: 'choke', count: 3210, sentiment: 'Negative' },
      { word: 'captaincy', count: 2980, sentiment: 'Neutral' },
      { word: 'world champions', count: 2750, sentiment: 'Positive' },
      { word: 'bad fielding', count: 1820, sentiment: 'Negative' }
    ],
    sampleTweets: [
      {
        id: 't-cric-1',
        author: 'Kabir Das',
        handle: '@cricket_lens',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80',
        text: 'WHAT A SENSATIONAL WIN! 14 runs needed in the final over and he finishes it with two consecutive sixes. Absolute masterclass under pressure!',
        topic: 'Cricket',
        sentiment: 'Positive',
        dominantEmotion: 'Excitement',
        confidence: 0.98,
        likes: 15400,
        retweets: 4890,
        time: '1m ago'
      },
      {
        id: 't-cric-2',
        author: 'Rohan Sharma',
        handle: '@rohan_stats',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
        text: 'Dropping three sitters in powerplay and giving away 24 extras. Disastrous fielding effort today from the top order.',
        topic: 'Cricket',
        sentiment: 'Negative',
        dominantEmotion: 'Anger',
        confidence: 0.92,
        likes: 3120,
        retweets: 580,
        time: '19m ago'
      }
    ],
    keyObservation: 'Massive emotional amplitude: high euphoria during clutch run-chases, switching instantly to fiery frustration during defensive lapses.'
  },
  {
    id: 'education',
    name: 'Education',
    iconName: 'GraduationCap',
    description: 'Curriculum reforms, STEM access, tuition fees, student wellness & adaptive learning',
    sampleCount: 9400,
    sentimentDistribution: {
      positive: 48,
      negative: 34,
      neutral: 18
    },
    dominantEmotion: 'Frustration',
    topKeywords: [
      { word: 'scholarship', count: 2450, sentiment: 'Positive' },
      { word: 'tuition debt', count: 2310, sentiment: 'Negative' },
      { word: 'mentorship', count: 1840, sentiment: 'Positive' },
      { word: 'exam stress', count: 1690, sentiment: 'Negative' },
      { word: 'adaptive tutor', count: 1200, sentiment: 'Positive' },
      { word: 'outdated syllabus', count: 1150, sentiment: 'Negative' }
    ],
    sampleTweets: [
      {
        id: 't-edu-1',
        author: 'Prof. Ananya Roy',
        handle: '@ananya_ed',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
        text: 'Seeing first-generation students secure fully funded research fellowships this morning made my entire year. Hard work truly pays off!',
        topic: 'Education',
        sentiment: 'Positive',
        dominantEmotion: 'Happiness',
        confidence: 0.97,
        likes: 4210,
        retweets: 910,
        time: '15m ago'
      },
      {
        id: 't-edu-2',
        author: 'Marcus Cole',
        handle: '@cole_academic',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
        text: 'Graduating with six-figure student loans into an entry-level hiring freeze is mentally exhausting. The system needs systemic reform.',
        topic: 'Education',
        sentiment: 'Negative',
        dominantEmotion: 'Sadness',
        confidence: 0.94,
        likes: 8900,
        retweets: 2450,
        time: '45m ago'
      }
    ],
    keyObservation: 'Strong pride in student milestones, but persistent underlying debate regarding academic debt, burnout, and syllabus modernization.'
  },
  {
    id: 'technology',
    name: 'Technology',
    iconName: 'Smartphone',
    description: 'Hardware launches, developer ecosystems, open source software & battery innovations',
    sampleCount: 22100,
    sentimentDistribution: {
      positive: 62,
      negative: 23,
      neutral: 15
    },
    dominantEmotion: 'Excitement',
    topKeywords: [
      { word: 'efficiency', count: 6410, sentiment: 'Positive' },
      { word: 'battery life', count: 5120, sentiment: 'Positive' },
      { word: 'overpriced', count: 3280, sentiment: 'Negative' },
      { word: 'open source', count: 3100, sentiment: 'Positive' },
      { word: 'planned obsolescence', count: 2190, sentiment: 'Negative' },
      { word: 'silicon architecture', count: 1980, sentiment: 'Neutral' }
    ],
    sampleTweets: [
      {
        id: 't-tech-1',
        author: 'Jordan Kim',
        handle: '@jordantech',
        avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&auto=format&fit=crop&q=80',
        text: 'The power efficiency on the new 3nm silicon architecture is unreal. Full-day heavy compilation without hearing the fans once.',
        topic: 'Technology',
        sentiment: 'Positive',
        dominantEmotion: 'Excitement',
        confidence: 0.96,
        likes: 5120,
        retweets: 780,
        time: '10m ago'
      },
      {
        id: 't-tech-2',
        author: 'Liam Scott',
        handle: '@liam_hardware',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80',
        text: 'Removing physical repair modularity and charging $1500 for a phone with glue-sealed batteries is customer-hostile engineering.',
        topic: 'Technology',
        sentiment: 'Negative',
        dominantEmotion: 'Anger',
        confidence: 0.95,
        likes: 9240,
        retweets: 3110,
        time: '34m ago'
      }
    ],
    keyObservation: 'Enthusiastic reception for silicon performance gains, contrasted with growing pushback on pricing tiers and repairability limitations.'
  },
  {
    id: 'gaming',
    name: 'Gaming',
    iconName: 'Gamepad2',
    description: 'AAA releases, eSports tournaments, indie masterpieces, server netcode & modding communities',
    sampleCount: 26800,
    sentimentDistribution: {
      positive: 60,
      negative: 28,
      neutral: 12
    },
    dominantEmotion: 'Excitement',
    topKeywords: [
      { word: 'game of the year', count: 7120, sentiment: 'Positive' },
      { word: 'microtransactions', count: 4890, sentiment: 'Negative' },
      { word: 'soundtrack', count: 3950, sentiment: 'Positive' },
      { word: 'laggy servers', count: 3410, sentiment: 'Negative' },
      { word: 'fluid combat', count: 3100, sentiment: 'Positive' },
      { word: 'patch notes', count: 2420, sentiment: 'Neutral' }
    ],
    sampleTweets: [
      {
        id: 't-game-1',
        author: 'Valerie Frost',
        handle: '@val_plays',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        text: 'This indie roguelike is an undeniable masterpiece. Incredible soundtrack, razor-sharp controls, and zero predatory battle passes.',
        topic: 'Gaming',
        sentiment: 'Positive',
        dominantEmotion: 'Happiness',
        confidence: 0.98,
        likes: 7890,
        retweets: 1620,
        time: '7m ago'
      },
      {
        id: 't-game-2',
        author: 'Tarek Vance',
        handle: '@tarek_gg',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
        text: 'Ranked matchmaking crashed three times in a row, lost 60 MMR points due to server disconnects. Absolutely unplayable launch state.',
        topic: 'Gaming',
        sentiment: 'Negative',
        dominantEmotion: 'Anger',
        confidence: 0.97,
        likes: 4320,
        retweets: 890,
        time: '24m ago'
      }
    ],
    keyObservation: 'Community celebrates polished single-player & indie titles while ruthlessly penalizing server downtime and pay-to-win microtransactions.'
  },
  {
    id: 'environment',
    name: 'Environment',
    iconName: 'Leaf',
    description: 'Clean energy transition, carbon capture, biodiversity protection & climate resilience',
    sampleCount: 11300,
    sentimentDistribution: {
      positive: 46,
      negative: 41,
      neutral: 13
    },
    dominantEmotion: 'Fear',
    topKeywords: [
      { word: 'solar breakthrough', count: 3410, sentiment: 'Positive' },
      { word: 'heatwave crisis', count: 3190, sentiment: 'Negative' },
      { word: 'reforestation', count: 2420, sentiment: 'Positive' },
      { word: 'ocean pollution', count: 2180, sentiment: 'Negative' },
      { word: 'clean grid', count: 1840, sentiment: 'Positive' },
      { word: 'extinction risk', count: 1650, sentiment: 'Negative' }
    ],
    sampleTweets: [
      {
        id: 't-env-1',
        author: 'Dr. Clara Thorne',
        handle: '@clara_ecology',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
        text: 'Breakthrough milestone: Renewable energy supplied 74% of the regional power grid across October. Rapid decarbonization is technically viable!',
        topic: 'Environment',
        sentiment: 'Positive',
        dominantEmotion: 'Happiness',
        confidence: 0.95,
        likes: 6120,
        retweets: 1840,
        time: '18m ago'
      },
      {
        id: 't-env-2',
        author: 'Siddharth Sen',
        handle: '@sid_climate',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
        text: 'Record ocean temperatures threaten coral bleaching across the entire archipelago. Urgent systemic policy action cannot wait any longer.',
        topic: 'Environment',
        sentiment: 'Negative',
        dominantEmotion: 'Fear',
        confidence: 0.94,
        likes: 5400,
        retweets: 2120,
        time: '36m ago'
      }
    ],
    keyObservation: 'Dual polarity between technological optimism around renewables and existential alarm concerning extreme weather anomalies.'
  }
];

export const BRAND_COMPARISONS: Record<string, BrandComparisonResult> = {
  'netflix-vs-amazon': {
    brandA: {
      brandName: 'Netflix',
      logo: 'N',
      color: '#E50914',
      sentimentDistribution: { positive: 68, negative: 21, neutral: 11 },
      dominantEmotion: 'Excitement',
      topKeywords: [
        { word: 'Original Series', sentiment: 'Positive' },
        { word: 'Binge-worthy', sentiment: 'Positive' },
        { word: 'Subscription Hike', sentiment: 'Negative' },
        { word: 'Smooth UI', sentiment: 'Positive' },
        { word: 'Cancelled Shows', sentiment: 'Negative' }
      ],
      sampleTweets: [
        'The cinematography in the new sci-fi series is top-tier Netflix storytelling.',
        'Love the instant buffering and recommendations, but stop raising prices every 6 months.'
      ],
      netSentimentScore: 47
    },
    brandB: {
      brandName: 'Amazon Prime Video',
      logo: 'Prime',
      color: '#00A8E1',
      sentimentDistribution: { positive: 54, negative: 32, neutral: 14 },
      dominantEmotion: 'Frustration',
      topKeywords: [
        { word: 'Free Delivery Bundle', sentiment: 'Positive' },
        { word: 'Ad Tiers Added', sentiment: 'Negative' },
        { word: 'Clunky UI', sentiment: 'Negative' },
        { word: 'Sports Streaming', sentiment: 'Positive' },
        { word: 'Rent vs Watch', sentiment: 'Negative' }
      ],
      sampleTweets: [
        'Prime delivery alone pays for the sub, plus Thursday Night Football works great.',
        'Why am I seeing unskippable advertisements on a paid Prime Video subscription? Uninstalled.'
      ],
      netSentimentScore: 22
    },
    winner: 'Netflix',
    aiSummary: 'Netflix maintains a substantial +25pt sentiment advantage over Amazon Prime Video. While consumers appreciate Amazon Prime for ecosystem bundling (free shipping + video), Prime Video suffers from heavy sentiment headwinds regarding forced ad insertions and confusing rental paywalls. Netflix wins decisively on content production quality, binge appeal, and player interface smoothness.',
    keyTakeaways: [
      'Netflix leads user satisfaction with a 68% positive approval score vs Prime at 54%.',
      'The primary grievance against Prime is advertising in paid tiers and interface navigation friction.',
      'Netflix faces consistent user frustration over premature show cancellations and tier repricing.'
    ]
  },
  'apple-vs-samsung': {
    brandA: {
      brandName: 'Apple',
      logo: '',
      color: '#A2AAAD',
      sentimentDistribution: { positive: 65, negative: 23, neutral: 12 },
      dominantEmotion: 'Happiness',
      topKeywords: [
        { word: 'Ecosystem Sync', sentiment: 'Positive' },
        { word: 'Build Quality', sentiment: 'Positive' },
        { word: 'Overpriced Storage', sentiment: 'Negative' },
        { word: 'Camera Processing', sentiment: 'Positive' },
        { word: 'Siri Inconsistency', sentiment: 'Negative' }
      ],
      sampleTweets: [
        'AirDrop and Universal Clipboard between MacBook and iPhone is pure magic in daily workflow.',
        'Charging $200 for 128GB of base storage in 2026 feels outrageously greedy.'
      ],
      netSentimentScore: 42
    },
    brandB: {
      brandName: 'Samsung',
      logo: 'S',
      color: '#1428A0',
      sentimentDistribution: { positive: 59, negative: 27, neutral: 14 },
      dominantEmotion: 'Excitement',
      topKeywords: [
        { word: 'OLED Display', sentiment: 'Positive' },
        { word: 'Periscope Zoom', sentiment: 'Positive' },
        { word: 'Bloatware Apps', sentiment: 'Negative' },
        { word: 'Multitasking Dex', sentiment: 'Positive' },
        { word: 'Shutter Lag', sentiment: 'Negative' }
      ],
      sampleTweets: [
        'The anti-reflective glass and 100x zoom on the Galaxy Ultra is genuinely unmatched.',
        'Still getting pre-installed carrier apps on an expensive flagship phone.'
      ],
      netSentimentScore: 32
    },
    winner: 'Apple',
    aiSummary: 'Apple edges out Samsung by +10 net sentiment points. Apple sentiment is heavily insulated by ecosystem lock-in, premium resale value, and seamless hardware-software integration. Samsung draws significant enthusiasm for hardware boundary-pushing (anti-reflective OLED displays, periscope zoom), but sustains negative drag from carrier bloatware and camera shutter delay in indoor photography.',
    keyTakeaways: [
      'Apple dominates customer retention loyalty with 65% positive sentiment driven by ecosystem harmony.',
      'Samsung captures higher raw excitement among power users for optical zoom and display engineering.',
      'Both brands face consumer resistance over entry-level base pricing.'
    ]
  },
  'openai-vs-anthropic': {
    brandA: {
      brandName: 'OpenAI',
      logo: 'OA',
      color: '#10A37F',
      sentimentDistribution: { positive: 63, negative: 24, neutral: 13 },
      dominantEmotion: 'Excitement',
      topKeywords: [
        { word: 'Voice Mode', sentiment: 'Positive' },
        { word: 'Mass Adoption', sentiment: 'Positive' },
        { word: 'Corporate Drama', sentiment: 'Negative' },
        { word: 'API Rate Limits', sentiment: 'Negative' },
        { word: 'Tool Calling', sentiment: 'Positive' }
      ],
      sampleTweets: [
        'Advanced voice mode feels like talking to a real human tutor with natural cadence.',
        'Service outages during peak work hours are becoming far too frequent for production workflows.'
      ],
      netSentimentScore: 39
    },
    brandB: {
      brandName: 'Anthropic',
      logo: 'CL',
      color: '#D97706',
      sentimentDistribution: { positive: 73, negative: 16, neutral: 11 },
      dominantEmotion: 'Happiness',
      topKeywords: [
        { word: 'Coding Precision', sentiment: 'Positive' },
        { word: 'Artifacts UI', sentiment: 'Positive' },
        { word: 'Nuanced Writing', sentiment: 'Positive' },
        { word: 'Strict Guardrails', sentiment: 'Negative' },
        { word: 'Context Window', sentiment: 'Positive' }
      ],
      sampleTweets: [
        'Sonnet 3.7 with extended thinking solved in one prompt what took me 3 days of manual debugging.',
        'Occasional over-cautious refusals on benign coding prompts can be frustrating.'
      ],
      netSentimentScore: 57
    },
    winner: 'Anthropic',
    aiSummary: 'Anthropic leads OpenAI significantly in developer and researcher sentiment (+57 vs +39 net sentiment). Developers passionately endorse Anthropic models for complex software engineering, superior prose synthesis, and intuitive Artifact interfaces. OpenAI maintains broader public name-recognition and voice novelty, but encounters recurring pushback regarding reliability and corporate governance shifts.',
    keyTakeaways: [
      'Anthropic captures an exceptional 73% positive sentiment ratio among software engineers.',
      'OpenAI leads in consumer mainstream mindshare but suffers higher infrastructure fatigue.',
      'Nuanced reasoning and interactive coding artifacts are the highest rated AI capabilities.'
    ]
  }
};

export const SOCIAL_PULSE_FEED: TweetItem[] = [
  {
    id: 'sp-1',
    author: 'Kavya Raman',
    handle: '@kavya_builds',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    text: 'Just deployed our new neural pipeline on edge devices and the latency dropped by 80%! What an incredible milestone for our team 🚀',
    topic: 'Artificial Intelligence',
    sentiment: 'Positive',
    dominantEmotion: 'Excitement',
    confidence: 0.98,
    likes: 840,
    retweets: 190,
    time: 'Just now'
  },
  {
    id: 'sp-2',
    author: 'Zane Martinez',
    handle: '@zane_orbit',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    text: 'Another round of server lag in the middle of a tournament qualifier. Fix your netcode, this is beyond frustrating!',
    topic: 'Gaming',
    sentiment: 'Negative',
    dominantEmotion: 'Anger',
    confidence: 0.95,
    likes: 340,
    retweets: 78,
    time: '2m ago'
  },
  {
    id: 'sp-3',
    author: 'Nisha Verma',
    handle: '@nisha_eco',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    text: 'Community solar cooperatives just hit record capacity across rural districts. Clean energy access for thousands of local families!',
    topic: 'Environment',
    sentiment: 'Positive',
    dominantEmotion: 'Happiness',
    confidence: 0.96,
    likes: 1220,
    retweets: 410,
    time: '4m ago'
  },
  {
    id: 'sp-4',
    author: 'Liam Chen',
    handle: '@liam_dev',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    text: 'The new documentation rewrite is clean, concise, and actually has working copy-paste code snippets for once.',
    topic: 'Technology',
    sentiment: 'Positive',
    dominantEmotion: 'Happiness',
    confidence: 0.91,
    likes: 415,
    retweets: 55,
    time: '6m ago'
  },
  {
    id: 'sp-5',
    author: 'Sanjay Patel',
    handle: '@sanjay_cricket',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80',
    text: 'Third umpire decision took 6 minutes just to uphold an obvious soft signal call. Killing all game momentum in stadiums.',
    topic: 'Cricket',
    sentiment: 'Negative',
    dominantEmotion: 'Frustration',
    confidence: 0.93,
    likes: 1980,
    retweets: 390,
    time: '9m ago'
  },
  {
    id: 'sp-6',
    author: 'Maya Lin',
    handle: '@maya_reads',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
    text: 'Attending the open university lecture on quantum computing fundamentals. Fascinating material and engaging discussion.',
    topic: 'Education',
    sentiment: 'Positive',
    dominantEmotion: 'Happiness',
    confidence: 0.88,
    likes: 210,
    retweets: 30,
    time: '12m ago'
  }
];

export const DEMO_CSV_CONTENT = `tweet_id,author,tweet_text,category
101,@tech_insider,"The new quantum processor breakthrough is an astonishing leap forward for computing power!",Technology
102,@dev_frustrated,"Two hours waiting on customer support just to be told my account ticket is closed with zero fix. Worst service ever.",Customer Service
103,@cine_fan,"The musical score in the climax had the entire theater cheering in delight. What an absolute masterpiece!",Bollywood
104,@climate_watch,"Alarming heat levels recorded across southern ice sheets today. Time is running out for meaningful action.",Environment
105,@gamer_pro,"Controls are so crisp and fluid, game runs at a locked 144fps without any micro-stutters. Loving every minute!",Gaming
106,@student_voice,"Tuition fees increased by another 12% while library resources got slashed. Completely unacceptable.",Education
107,@cricket_buff,"Final ball boundary to secure the championship trophy! What nerves of steel from the captain!",Cricket
108,@neutral_analyst,"Quarterly earnings show flat revenue growth across cloud divisions with stable margins.",Finance
109,@ai_researcher,"Generative agents autonomously coordinating multi-step simulation tasks is mind-bogglingly impressive.",Artificial Intelligence
110,@angry_shopper,"Package arrived three weeks late, completely smashed and support won't issue a refund. Utter scam.",Retail
111,@code_ninja,"Clean architecture and 100% test coverage makes refactoring an absolute pleasure.",Technology
112,@indie_dev,"Sold our first 10,000 copies! Immensely grateful to every player who believed in our vision.",Gaming
113,@eco_warrior,"Local river cleanup removed over 500kg of plastic debris this weekend. Proud of this community!",Environment
114,@sports_critic,"Terrible bowling changes in the death overs handed the match on a silver platter to the opponents.",Cricket
115,@movie_buff,"Average storyline saved only by brilliant lead actor charisma and breathtaking visual effects.",Bollywood
116,@ed_advocate,"Open source textbooks saved our university students over half a million dollars this semester.",Education
117,@daily_user,"Phone battery drained from 80% to dead in less than two hours after the latest operating system update.",Technology
118,@ai_skeptic,"Deepfake voice scams are spreading dangerously fast. We need robust verification protocols immediately.",Artificial Intelligence
119,@foodie_delight,"Discovered this quiet neighborhood cafe with the most delicious warm sourdough and friendly staff.",Lifestyle
120,@commuter_life,"Train delayed for the fourth time this week due to broken signaling systems. Exhausting routine.",Urban`;

export const EMOTIONS_METADATA: {
  type: EmotionType;
  title: string;
  tagline: string;
  color: string;
  intensity: string;
  valence: 'Positive' | 'Negative' | 'Neutral';
  triggerKeywords: string[];
  description: string;
  share: number;
}[] = [
  {
    type: 'Happiness',
    title: 'Happiness',
    tagline: 'Warmth, gratitude, and communal delight',
    color: '#D4FF3A', // Neon Lime
    intensity: 'High Positive Resonance',
    valence: 'Positive',
    triggerKeywords: ['love', 'grateful', 'proud', 'masterpiece', 'blessed', 'delighted', 'celebrate'],
    description: 'Manifests in social discourse when users celebrate personal milestones, community triumphs, and heartwarming cultural connections.',
    share: 31
  },
  {
    type: 'Excitement',
    title: 'Excitement',
    tagline: 'Anticipation, awe, and revolutionary thrills',
    color: '#38BDF8', // Cyan
    intensity: 'Peak Activation Frequency',
    valence: 'Positive',
    triggerKeywords: ['breakthrough', 'epic', 'insane', 'hyped', 'revolutionary', 'gamechanger', 'phenomenal'],
    description: 'Surges around technological breakthroughs, thrilling sporting climaxes, and long-awaited media releases.',
    share: 24
  },
  {
    type: 'Anger',
    title: 'Anger',
    tagline: 'Outrage, perceived injustice, and vehement protest',
    color: '#FF453A', // Vivid Red
    intensity: 'Volatile High-Energy Polarity',
    valence: 'Negative',
    triggerKeywords: ['worst', 'scam', 'fraud', 'outrage', 'unacceptable', 'boycott', 'trash', 'corrupt'],
    description: 'Fires rapidly in response to customer exploitation, corporate missteps, match controversies, and unfair systemic practices.',
    share: 15
  },
  {
    type: 'Frustration',
    title: 'Frustration',
    tagline: 'Friction, unresolved obstacles, and operational delays',
    color: '#FF6B35', // Electric Orange
    intensity: 'Chronic Friction Spectrum',
    valence: 'Negative',
    triggerKeywords: ['broken', 'lag', 'glitch', 'slow', 'waste', 'delay', 'exhausting', 'confusing', 'stuck'],
    description: 'Reflects repeated small frictions: software glitches, long support queues, server disconnects, and tedious bureaucracy.',
    share: 14
  },
  {
    type: 'Sadness',
    title: 'Sadness',
    tagline: 'Loss, heartbreak, and empathetic grief',
    color: '#C4B5FD', // Soft Lavender
    intensity: 'Low-Energy Introspective Valence',
    valence: 'Negative',
    triggerKeywords: ['heartbroken', 'miss', 'crying', 'loss', 'tragedy', 'lonely', 'mourn', 'grief'],
    description: 'Appears during tributes to public icons, reflections on loss, student debt burdens, and poignant life moments.',
    share: 9
  },
  {
    type: 'Fear',
    title: 'Fear',
    tagline: 'Existential dread, vulnerability, and impending risk',
    color: '#A855F7', // Deep Violet
    intensity: 'Heightened Vigilance Polarity',
    valence: 'Negative',
    triggerKeywords: ['crisis', 'terrifying', 'danger', 'risk', 'doom', 'panic', 'threat', 'catastrophe'],
    description: 'Triggers around climate anomalies, artificial intelligence existential risks, economic downturns, and privacy incursions.',
    share: 7
  }
];
