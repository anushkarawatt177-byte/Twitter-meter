export type SentimentType = 'Positive' | 'Negative' | 'Neutral';

export type EmotionType = 
  | 'Happiness' 
  | 'Excitement' 
  | 'Anger' 
  | 'Frustration' 
  | 'Sadness' 
  | 'Fear';

export interface WordInfluence {
  word: string;
  weight: number; // positive or negative contribution
  type: 'positive' | 'negative' | 'neutral' | 'intensifier' | 'negator';
}

export interface EmotionScore {
  emotion: EmotionType;
  score: number; // 0 to 100
  color: string;
}

export interface SentimentAnalysisResult {
  text: string;
  sentiment: SentimentType;
  confidence: number; // 0.0 - 1.0 (or percentage 0-100)
  compoundScore: number; // -1.0 to 1.0
  breakdown: {
    positive: number; // 0 - 100
    negative: number; // 0 - 100
    neutral: number; // 0 - 100
  };
  dominantEmotion: EmotionType;
  emotions: EmotionScore[];
  influencingWords: WordInfluence[];
  explanation: string;
  timestamp?: string;
  source?: 'gemini-nlp' | 'vader-nlp';
}

export interface TweetItem {
  id: string;
  author: string;
  handle: string;
  avatar: string;
  text: string;
  topic: string;
  sentiment: SentimentType;
  dominantEmotion: EmotionType;
  confidence: number;
  likes: number;
  retweets: number;
  time: string;
}

export interface TopicInsight {
  id: string;
  name: string;
  iconName: string;
  description: string;
  sampleCount: number;
  sentimentDistribution: {
    positive: number;
    negative: number;
    neutral: number;
  };
  dominantEmotion: EmotionType;
  topKeywords: { word: string; count: number; sentiment: SentimentType }[];
  sampleTweets: TweetItem[];
  keyObservation: string;
}

export interface BrandData {
  brandName: string;
  logo: string;
  color: string;
  sentimentDistribution: {
    positive: number;
    negative: number;
    neutral: number;
  };
  dominantEmotion: EmotionType;
  topKeywords: { word: string; sentiment: SentimentType }[];
  sampleTweets: string[];
  netSentimentScore: number; // +100 to -100
}

export interface BrandComparisonResult {
  brandA: BrandData;
  brandB: BrandData;
  winner: string;
  aiSummary: string;
  keyTakeaways: string[];
}

export interface BatchAnalysisSummary {
  totalProcessed: number;
  positiveCount: number;
  negativeCount: number;
  neutralCount: number;
  averageConfidence: number;
  dominantEmotion: EmotionType;
  topKeywords: { word: string; count: number }[];
  records: SentimentAnalysisResult[];
}
