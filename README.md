# TWEETVERSE AI – Decode the Internet's Emotions

An innovative, visually immersive social intelligence platform that decodes the internet's emotional pulse in real time using NLP sentiment analysis, multi-emotion classification, and deep contextual reasoning.

---

## 🌟 Key Features

1. **Visual Identity & Design Constitution**
   - High-contrast warm off-white (`#F8F7F4`) on deep obsidian charcoal (`#0D0F12`) canvas.
   - Fluorescent lime green (`#D4FF3A`), electric orange (`#FF6B35`), and soft lavender (`#C4B5FD`) accents.
   - Fluid interactive 3D globe visualization, animated conversation particles, and asymmetric editorial layouts.
   - Monospace tabular figures (`tabular-nums`) for all telemetry and data points.

2. **Landing Page – "The Internet Has Feelings"**
   - Marquee headline: *"EVERY TWEET HAS A FEELING. WE FIND IT."*
   - Dynamic emotional activity telemetry indicator.
   - Interactive 4-step explanation of how AI models extract semantic polarity and emotional resonance.

3. **Mood Explorer**
   - Real-world curated datasets across 7 primary cultural verticals:
     - Artificial Intelligence
     - Bollywood
     - Cricket
     - Education
     - Technology
     - Gaming
     - Environment
   - Interactive sentiment distribution breakdown (Positive, Negative, Neutral) + top recurring topic keywords.

4. **Tweet Autopsy (AI Investigation Laboratory)**
   - Paste any tweet or select benchmark presets.
   - Instant categorization into **Positive**, **Negative**, or **Neutral** with confidence scores.
   - **Word-Level Token Heatmap**: Highlights exact words that influenced the decision with weights and attribution.
   - Comprehensive analytical explanation synthesizing syntactic nuances.

5. **Emotion Universe**
   - 6-dimensional emotional constellation:
     - **Happiness** (Lime)
     - **Excitement** (Cyan)
     - **Anger** (Vivid Red)
     - **Frustration** (Electric Orange)
     - **Sadness** (Lavender)
     - **Fear** (Purple)
   - Interactive orbit nodes displaying trigger keywords, frequency percentages, and representative posts.

6. **Brand Face-Off**
   - Direct competitive head-to-head emotion comparison:
     - Netflix vs Amazon Prime Video
     - Apple vs Samsung
     - OpenAI vs Anthropic
     - Custom brand comparison
   - Side-by-side sentiment distribution, net sentiment spread, top positive/negative keywords, and executive AI summary.

7. **Tweet Laboratory (CSV Batch Engine)**
   - Upload any CSV file or load the built-in benchmark dataset.
   - Select the target tweet-text column.
   - Real-time batch processing with progress bar.
   - Interactive search, filter by sentiment, and 1-click CSV export with augmented sentiment metrics.

8. **Social Pulse (Live Feed)**
   - Continuously streaming social posts with animated sentiment badges and emotion markers.
   - Play/Pause toggle and speed controls.
   - Clearly labeled simulated live stream.

9. **AI Insights Generator**
   - Synthesizes public sentiment into actionable intelligence:
     - What people like most
     - What people dislike
     - Commonly discussed issues
     - Overall public mood index

---

## 🛠 Technology Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Motion (Framer Motion), Lucide Icons, Canvas Confetti.
- **Backend**: Node.js Express server + Python VADER / NLTK sentiment engine.
- **AI Models**: Google Gemini 2.5 Flash / 3.8 Flash via `@google/genai` TypeScript SDK with algorithmic VADER NLP fallback.
- **Data Engine**: PapaParse for high-performance CSV serialization and parsing.

---

## 🚀 Running the Project

### Full-Stack Web Application (Node.js & Express)

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (runs on port 3000)
npm run dev

# 3. Build for production
npm run build
npm start
```

### Standalone Python Sentiment Engine

```bash
# Test the Python VADER analyzer directly via CLI
python3 sentiment_analyzer.py "The new multimodal AI reasoning model is absolutely amazing and revolutionary!"
```

---

## 📊 Evaluation & Demo Guide

- **Tweet Autopsy**: Test varied phrasing with sarcasm, negations (e.g. *"not bad at all"*), and boosters (e.g. *"insanely fast"*). Observe the word-level weight highlights!
- **Tweet Laboratory**: Click *"Load Benchmark CSV"* to run instant batch processing on 20+ realistic tweets, filter by sentiment, and export the processed CSV.
- **Brand Face-Off**: Switch between Netflix vs Amazon Prime and Apple vs Samsung to inspect net sentiment scores and comparative keyword drivers.
