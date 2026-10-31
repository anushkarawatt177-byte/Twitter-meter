import { SentimentAnalysisResult, SentimentType, EmotionType, EmotionScore, WordInfluence } from '../types';

// VADER Lexicon subset tuned for social media sentiment and emotion extraction
const LEXICON: Record<string, number> = {
  // Strong Positive (+2.5 to +4.0)
  love: 3.4,
  loved: 3.3,
  loving: 3.2,
  amazing: 3.4,
  incredible: 3.5,
  spectacular: 3.6,
  phenomenal: 3.7,
  masterpiece: 3.8,
  brilliant: 3.3,
  awesome: 3.1,
  superb: 3.2,
  excellent: 3.1,
  delighted: 2.9,
  triumph: 3.0,
  victory: 2.8,
  win: 2.5,
  winner: 2.8,
  winning: 2.7,
  outstanding: 3.3,
  flawless: 3.4,
  perfection: 3.5,
  perfect: 3.2,
  beautiful: 2.9,
  groundbreaking: 3.1,
  revolutionary: 3.2,
  genius: 3.2,
  legendary: 3.3,
  magical: 3.1,
  excited: 2.9,
  thrilled: 3.2,
  ecstatic: 3.6,
  blessed: 2.8,
  cheers: 2.2,
  inspiring: 3.0,
  inspires: 2.9,
  inspired: 2.9,
  breathtaking: 3.4,
  stunning: 3.2,
  magnificent: 3.4,
  delightful: 2.8,

  // Moderate Positive (+1.0 to +2.4)
  good: 1.9,
  great: 2.4,
  nice: 1.8,
  happy: 2.3,
  glad: 1.9,
  enjoy: 2.2,
  enjoyed: 2.1,
  enjoying: 2.2,
  fun: 2.1,
  cool: 1.7,
  solid: 1.5,
  fine: 1.2,
  promising: 1.8,
  clean: 1.4,
  smart: 1.9,
  helpful: 2.0,
  friendly: 2.0,
  impressive: 2.3,
  recommend: 2.1,
  worth: 1.8,
  progress: 1.7,
  proud: 2.2,
  gratitude: 2.4,
  thank: 1.8,
  thanks: 1.8,
  satisfaction: 2.1,
  satisfied: 2.0,
  support: 1.7,
  supported: 1.7,
  positive: 2.0,
  optimistic: 2.2,
  safe: 1.6,
  growth: 1.8,
  favorite: 2.4,

  // Moderate Negative (-1.0 to -2.4)
  bad: -2.1,
  poor: -1.9,
  sad: -2.1,
  annoying: -2.2,
  annoyed: -2.0,
  slow: -1.4,
  boring: -1.8,
  disappointed: -2.3,
  disappointing: -2.3,
  flawed: -1.7,
  fail: -2.2,
  failed: -2.2,
  failure: -2.3,
  confusing: -1.6,
  confused: -1.5,
  mediocre: -1.8,
  lag: -1.6,
  laggy: -1.9,
  glitch: -1.8,
  bug: -1.7,
  buggy: -2.0,
  problem: -1.7,
  issues: -1.5,
  issue: -1.5,
  stressful: -2.0,
  exhausting: -1.9,
  tired: -1.6,
  concern: -1.5,
  concerned: -1.6,
  worried: -1.8,
  worry: -1.8,
  overpriced: -1.9,
  expensive: -1.3,
  loss: -1.9,
  lost: -1.8,
  miss: -1.4,

  // Strong Negative (-2.5 to -4.0)
  terrible: -3.4,
  horrible: -3.5,
  awful: -3.3,
  disaster: -3.4,
  disastrous: -3.5,
  hate: -3.4,
  hated: -3.3,
  hates: -3.3,
  worst: -3.6,
  trash: -3.1,
  garbage: -3.2,
  scam: -3.5,
  scammer: -3.6,
  fraud: -3.7,
  furious: -3.5,
  outrage: -3.4,
  outrageous: -3.3,
  disgusting: -3.4,
  gross: -2.7,
  unacceptable: -3.0,
  catastrophe: -3.6,
  catastrophic: -3.7,
  toxic: -3.1,
  nightmare: -3.4,
  abysmal: -3.6,
  pathetic: -3.2,
  ruined: -3.0,
  ruin: -2.9,
  corrupt: -3.3,
  dead: -2.6,
  useless: -2.8,
  crap: -2.9,
  sucks: -3.0,
  suck: -2.9
};

// Booster words & intensifiers
const BOOSTERS: Record<string, number> = {
  very: 0.293,
  really: 0.28,
  extremely: 0.35,
  insanely: 0.38,
  absolutely: 0.32,
  completely: 0.29,
  totally: 0.28,
  so: 0.25,
  huge: 0.24,
  massively: 0.32,
  deeply: 0.28,
  super: 0.3,
  hardly: -0.25,
  barely: -0.26,
  scarcely: -0.25,
  somewhat: -0.15,
  slightly: -0.18
};

// Negation triggers
const NEGATIONS = new Set([
  'not', 'no', 'never', 'neither', 'hardly', 'barely', 'scarcely', 
  "isn't", "aren't", "wasn't", "weren't", "haven't", "hasn't", 
  "don't", "doesn't", "didn't", "won't", "wouldn't", "cannot", "cant", "can't"
]);

// Emotion lexical markers
const EMOTION_MAP: Record<EmotionType, string[]> = {
  Happiness: [
    'happy', 'joy', 'grateful', 'blessed', 'smile', 'love', 'loved', 'delighted', 
    'peace', 'satisfaction', 'content', 'glad', 'celebrate', 'cheers', 'warmth', 'proud'
  ],
  Excitement: [
    'excited', 'thrilled', 'insane', 'hyped', 'amazing', 'phenomenal', 'epic', 
    'groundbreaking', 'revolutionary', 'gamechanger', 'mindblown', 'ecstatic', 'wow', 'superb'
  ],
  Anger: [
    'furious', 'hate', 'outrage', 'disgusting', 'corrupt', 'boycott', 'scam', 
    'fraud', 'trash', 'garbage', 'worst', 'abysmal', 'infuriating', 'mad', 'evil'
  ],
  Frustration: [
    'annoyed', 'lag', 'glitch', 'bug', 'broken', 'slow', 'waste', 'useless', 
    'wait', 'delay', 'stuck', 'exhausting', 'headache', 'tired', 'confusing', 'disappointed'
  ],
  Sadness: [
    'sad', 'heartbroken', 'miss', 'cry', 'crying', 'depressed', 'grief', 
    'tragedy', 'unfortunate', 'loss', 'lost', 'lonely', 'pity', 'regret', 'mourn'
  ],
  Fear: [
    'scared', 'terrifying', 'panic', 'danger', 'risk', 'doom', 'dread', 
    'crisis', 'threat', 'unsafe', 'anxious', 'anxiety', 'worried', 'catastrophe', 'horror'
  ]
};

const EMOTION_COLORS: Record<EmotionType, string> = {
  Happiness: '#D4FF3A',    // Neon lime
  Excitement: '#38BDF8',   // Sky blue / cyan
  Anger: '#FF453A',        // Red
  Frustration: '#FF6B35',  // Electric orange
  Sadness: '#C4B5FD',      // Lavender
  Fear: '#A855F7'          // Purple
};

export function analyzeSentimentRuleBased(text: string): SentimentAnalysisResult {
  if (!text || text.trim().length === 0) {
    return {
      text: '',
      sentiment: 'Neutral',
      confidence: 0.5,
      compoundScore: 0,
      breakdown: { positive: 0, negative: 0, neutral: 100 },
      dominantEmotion: 'Happiness',
      emotions: (Object.keys(EMOTION_MAP) as EmotionType[]).map(e => ({
        emotion: e,
        score: 16.6,
        color: EMOTION_COLORS[e]
      })),
      influencingWords: [],
      explanation: 'No textual input was provided to analyze.'
    };
  }

  // Tokenize preserving case & punctuation cues
  const rawTokens = text.trim().split(/\s+/);
  const words = rawTokens.map(t => t.replace(/^[^a-zA-Z0-9$#@]+|[^a-zA-Z0-9$#@]+$/g, ''));

  let totalValence = 0;
  const wordInfluences: WordInfluence[] = [];
  const emotionScores: Record<EmotionType, number> = {
    Happiness: 5,
    Excitement: 5,
    Anger: 5,
    Frustration: 5,
    Sadness: 5,
    Fear: 5
  };

  // Check exclamation marks and all-caps emphasis
  const exclamationCount = (text.match(/!/g) || []).length;
  const questionCount = (text.match(/\?/g) || []).length;
  const punctAmp = Math.min(exclamationCount * 0.15, 0.45);

  let negatorActive = false;
  let negatorDistance = 0;

  for (let i = 0; i < words.length; i++) {
    const rawWord = rawTokens[i];
    const cleanWord = words[i].toLowerCase();
    
    if (!cleanWord) continue;

    // Check negation
    if (NEGATIONS.has(cleanWord)) {
      negatorActive = true;
      negatorDistance = 0;
      wordInfluences.push({
        word: rawWord,
        weight: 0,
        type: 'negator'
      });
      continue;
    }

    if (negatorActive) {
      negatorDistance++;
      if (negatorDistance > 3) {
        negatorActive = false;
      }
    }

    // Check booster
    if (BOOSTERS[cleanWord]) {
      wordInfluences.push({
        word: rawWord,
        weight: BOOSTERS[cleanWord],
        type: 'intensifier'
      });
      continue;
    }

    // Check lexicon
    let score = LEXICON[cleanWord];
    if (score !== undefined) {
      // Check if uppercase shout
      const isAllCaps = rawWord.length > 2 && rawWord === rawWord.toUpperCase();
      if (isAllCaps) {
        score = score > 0 ? score + 0.75 : score - 0.75;
      }

      // Check booster in preceding word
      if (i > 0) {
        const prevWord = words[i - 1].toLowerCase();
        if (BOOSTERS[prevWord]) {
          score += (score > 0 ? 1 : -1) * BOOSTERS[prevWord];
        }
      }

      // Apply negation flip
      if (negatorActive) {
        score = score * -0.74;
      }

      totalValence += score;

      wordInfluences.push({
        word: rawWord,
        weight: Number(score.toFixed(2)),
        type: score > 0 ? 'positive' : 'negative'
      });
    }

    // Emotion matching
    for (const [emo, keywords] of Object.entries(EMOTION_MAP) as [EmotionType, string[]][]) {
      if (keywords.includes(cleanWord)) {
        emotionScores[emo] += 25;
      }
    }
  }

  // Adjust total valence with punctuation amplifier
  if (totalValence > 0) {
    totalValence += punctAmp;
  } else if (totalValence < 0) {
    totalValence -= punctAmp;
  }

  // Normalize compound score between -1.0 and 1.0 (VADER standard normalization formula: x / sqrt(x^2 + alpha))
  const alpha = 15;
  const compound = totalValence / Math.sqrt(totalValence * totalValence + alpha);
  const normalizedCompound = Number(Math.max(-1, Math.min(1, compound)).toFixed(3));

  // Determine sentiment category based on standard VADER thresholds
  let sentiment: SentimentType = 'Neutral';
  if (normalizedCompound >= 0.05) {
    sentiment = 'Positive';
  } else if (normalizedCompound <= -0.05) {
    sentiment = 'Negative';
  } else {
    sentiment = 'Neutral';
  }

  // Calculate percentage breakdown
  let posPct = 0;
  let negPct = 0;
  let neuPct = 0;

  if (normalizedCompound > 0) {
    posPct = Math.round(normalizedCompound * 85 + 15);
    negPct = Math.max(2, Math.round((1 - normalizedCompound) * 10));
    neuPct = Math.max(0, 100 - posPct - negPct);
  } else if (normalizedCompound < 0) {
    const abs = Math.abs(normalizedCompound);
    negPct = Math.round(abs * 85 + 15);
    posPct = Math.max(2, Math.round((1 - abs) * 10));
    neuPct = Math.max(0, 100 - negPct - posPct);
  } else {
    neuPct = 78;
    posPct = 11;
    negPct = 11;
  }

  // Confidence calculation
  const confidence = Number(
    Math.min(0.98, Math.max(0.62, Math.abs(normalizedCompound) * 0.45 + 0.55)).toFixed(2)
  );

  // Normalize emotion scores to 100% total
  if (sentiment === 'Positive') {
    emotionScores.Happiness += 35 + Math.round(posPct * 0.4);
    emotionScores.Excitement += 25 + Math.round(posPct * 0.3);
  } else if (sentiment === 'Negative') {
    emotionScores.Anger += 30 + Math.round(negPct * 0.35);
    emotionScores.Frustration += 35 + Math.round(negPct * 0.4);
    emotionScores.Sadness += 20;
    emotionScores.Fear += 15;
  } else {
    emotionScores.Happiness += 10;
    emotionScores.Frustration += 10;
  }

  const emotionTotal = Object.values(emotionScores).reduce((a, b) => a + b, 0);
  const emotionsList: EmotionScore[] = (Object.keys(emotionScores) as EmotionType[]).map(e => ({
    emotion: e,
    score: Math.round((emotionScores[e] / emotionTotal) * 100),
    color: EMOTION_COLORS[e]
  })).sort((a, b) => b.score - a.score);

  // Ensure sum equals 100
  const emotionSum = emotionsList.reduce((acc, curr) => acc + curr.score, 0);
  if (emotionsList.length > 0 && emotionSum !== 100) {
    emotionsList[0].score += (100 - emotionSum);
  }

  const dominantEmotion = emotionsList[0].emotion;

  // Generate analytical human-readable explanation
  let explanation = '';
  const topTokens = wordInfluences.filter(w => Math.abs(w.weight) > 0);
  const tokenNames = topTokens.map(t => `"${t.word}" (${t.weight > 0 ? '+' : ''}${t.weight})`).slice(0, 4).join(', ');

  if (sentiment === 'Positive') {
    explanation = `Classified as Positive (${Math.round(confidence * 100)}% confidence). Strong positive sentiment markers detected in ${tokenNames || 'contextual phrasing'}. The linguistic tone conveys enthusiastic endorsement and satisfaction, primarily driven by ${dominantEmotion}.`;
  } else if (sentiment === 'Negative') {
    explanation = `Classified as Negative (${Math.round(confidence * 100)}% confidence). Adverse sentiment markers identified in ${tokenNames || 'critical phrasing'}. The discourse displays heightened criticism and ${dominantEmotion.toLowerCase()}, characterized by unfavorable valence tokens.`;
  } else {
    explanation = `Classified as Neutral (${Math.round(confidence * 100)}% confidence). The sentence balances factual or descriptive statements without significant emotional polarity or directional skew. Dominant subtle undertone reflects objective discourse.`;
  }

  return {
    text,
    sentiment,
    confidence,
    compoundScore: normalizedCompound,
    breakdown: {
      positive: posPct,
      negative: negPct,
      neutral: neuPct
    },
    dominantEmotion,
    emotions: emotionsList,
    influencingWords: wordInfluences,
    explanation,
    timestamp: new Date().toISOString(),
    source: 'vader-nlp'
  };
}
