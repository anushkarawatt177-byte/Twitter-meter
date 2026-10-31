#!/usr/bin/env python3
"""
TWEETVERSE AI - Python Sentiment & Emotion Analysis Engine
Demonstrates VADER / NLP Sentiment Classification & Multi-Emotion Extraction
Compatible with NLTK, HuggingFace transformers, and standard JSON REST APIs.
"""

import sys
import json
import re
import math

# Core Sentiment Lexicon (VADER-compatible weights)
LEXICON = {
    "love": 3.4, "amazing": 3.4, "incredible": 3.5, "phenomenal": 3.7, "masterpiece": 3.8,
    "breathtaking": 3.4, "stunning": 3.2, "magnificent": 3.4, "delighted": 2.9,
    "excellent": 3.1, "triumph": 3.0, "win": 2.5, "outstanding": 3.3,
    "flawless": 3.4, "perfect": 3.2, "good": 1.9, "great": 2.4, "happy": 2.3, "enjoy": 2.2,
    "bad": -2.1, "poor": -1.9, "sad": -2.1, "annoying": -2.2, "disappointed": -2.3, "fail": -2.2,
    "terrible": -3.4, "horrible": -3.5, "awful": -3.3, "disaster": -3.4, "hate": -3.4,
    "worst": -3.6, "trash": -3.1, "scam": -3.5, "fraud": -3.7, "furious": -3.5, "outrage": -3.4
}

BOOSTERS = {
    "very": 0.3, "really": 0.28, "extremely": 0.35, "absolutely": 0.32, "insanely": 0.38
}

NEGATIONS = {
    "not", "never", "hardly", "barely", "don't", "doesn't", "didn't", "won't", "wouldn't", "can't"
}

EMOTIONS = {
    "Happiness": ["happy", "joy", "grateful", "love", "delighted", "proud", "smile"],
    "Excitement": ["excited", "thrilled", "hyped", "amazing", "phenomenal", "epic"],
    "Anger": ["furious", "hate", "outrage", "worst", "scam", "trash", "mad"],
    "Frustration": ["annoyed", "lag", "glitch", "bug", "broken", "slow", "delay", "tired"],
    "Sadness": ["sad", "heartbroken", "miss", "cry", "depressed", "grief", "loss"],
    "Fear": ["scared", "terrifying", "panic", "danger", "risk", "doom", "threat"]
}

def analyze_tweet(text: str) -> dict:
    if not text or not text.strip():
        return {
            "sentiment": "Neutral",
            "confidence": 0.5,
            "compoundScore": 0.0,
            "dominantEmotion": "Happiness",
            "influencingWords": []
        }

    raw_tokens = text.strip().split()
    words = [re.sub(r"^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$", "", t).lower() for t in raw_tokens]

    total_valence = 0.0
    influencing_words = []
    emotion_scores = {e: 5 for e in EMOTIONS}

    negator = False
    negator_dist = 0

    for i, word in enumerate(words):
        if not word:
            continue

        if word in NEGATIONS:
            negator = True
            negator_dist = 0
            influencing_words.append({"word": raw_tokens[i], "weight": 0.0, "type": "negator"})
            continue

        if negator:
            negator_dist += 1
            if negator_dist > 3:
                negator = False

        if word in BOOSTERS:
            influencing_words.append({"word": raw_tokens[i], "weight": BOOSTERS[word], "type": "intensifier"})
            continue

        score = LEXICON.get(word)
        if score is not None:
            if i > 0 and words[i-1] in BOOSTERS:
                score += (1.0 if score > 0 else -1.0) * BOOSTERS[words[i-1]]
            if negator:
                score *= -0.74

            total_valence += score
            influencing_words.append({
                "word": raw_tokens[i],
                "weight": round(score, 2),
                "type": "positive" if score > 0 else "negative"
            })

        for emo, kws in EMOTIONS.items():
            if word in kws:
                emotion_scores[emo] += 25

    # VADER Normalization: x / sqrt(x^2 + 15)
    compound = total_valence / math.sqrt(total_valence * total_valence + 15.0)
    compound = max(-1.0, min(1.0, compound))

    if compound >= 0.05:
        sentiment = "Positive"
    elif compound <= -0.05:
        sentiment = "Negative"
    else:
        sentiment = "Neutral"

    confidence = round(min(0.98, max(0.60, abs(compound) * 0.45 + 0.55)), 2)
    dominant_emotion = max(emotion_scores, key=emotion_scores.get)

    return {
        "text": text,
        "sentiment": sentiment,
        "confidence": confidence,
        "compoundScore": round(compound, 3),
        "dominantEmotion": dominant_emotion,
        "influencingWords": influencing_words
    }

if __name__ == "__main__":
    test_tweet = "The new multimodal AI reasoning model is absolutely amazing and revolutionary!" if len(sys.argv) < 2 else sys.argv[1]
    result = analyze_tweet(test_tweet)
    print(json.dumps(result, indent=2))
