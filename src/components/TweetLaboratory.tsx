import React, { useState, useRef } from 'react';
import Papa from 'papaparse';
import { DEMO_CSV_CONTENT } from '../data/mockData';
import { SentimentAnalysisResult, SentimentType } from '../types';
import { analyzeSentimentRuleBased } from '../lib/vaderEngine';
import { UploadCloud, FileSpreadsheet, Download, Filter, Search, RefreshCw, CheckCircle2, AlertCircle, ArrowUpDown } from 'lucide-react';

export const TweetLaboratory: React.FC = () => {
  const [csvRawData, setCsvRawData] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [selectedColumn, setSelectedColumn] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [analyzedResults, setAnalyzedResults] = useState<SentimentAnalysisResult[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sentimentFilter, setSentimentFilter] = useState<string>('All');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Parse CSV file content
  const handleParseCsvString = (content: string, fileName?: string) => {
    Papa.parse(content, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.data && results.data.length > 0) {
          const firstRow = results.data[0] as Record<string, any>;
          const cols = Object.keys(firstRow);
          setColumns(cols);
          setCsvRawData(results.data);

          // Auto-detect tweet text column
          const detected = cols.find(c => 
            /tweet|text|content|message|post|status/i.test(c)
          ) || cols[0];
          setSelectedColumn(detected);
        }
      },
      error: (err: Error) => {
        console.error('Failed to parse CSV:', err);
      }
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      handleParseCsvString(text, file.name);
    };
    reader.readAsText(file);
  };

  const handleLoadDemoDataset = () => {
    handleParseCsvString(DEMO_CSV_CONTENT, 'tweetverse_benchmark_sample.csv');
  };

  const handleProcessBatch = async () => {
    if (!csvRawData.length || !selectedColumn) return;

    setIsProcessing(true);
    setProgress(0);

    const tweets = csvRawData.map(row => String(row[selectedColumn] || ''));
    
    // Process via backend API or high speed local engine
    try {
      const response = await fetch('/api/batch-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tweets })
      });

      if (response.ok) {
        const data = await response.json();
        setAnalyzedResults(data.records);
      } else {
        throw new Error('API batch error');
      }
    } catch (err) {
      // Fast fallback
      const results: SentimentAnalysisResult[] = [];
      for (let i = 0; i < tweets.length; i++) {
        results.push(analyzeSentimentRuleBased(tweets[i]));
      }
      setAnalyzedResults(results);
    } finally {
      setIsProcessing(false);
      setProgress(100);
    }
  };

  const handleDownloadCsv = () => {
    if (!analyzedResults.length) return;

    const exportRows = analyzedResults.map((item, idx) => ({
      ID: idx + 1,
      TweetText: item.text,
      Sentiment: item.sentiment,
      Confidence: `${Math.round(item.confidence * 100)}%`,
      CompoundScore: item.compoundScore,
      Positive_Pct: `${item.breakdown.positive}%`,
      Negative_Pct: `${item.breakdown.negative}%`,
      Neutral_Pct: `${item.breakdown.neutral}%`,
      DominantEmotion: item.dominantEmotion,
      TopKeywordInfluences: item.influencingWords.map(w => w.word).join(';')
    }));

    const csv = Papa.unparse(exportRows);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `tweetverse_analyzed_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter and sort results
  const filteredResults = analyzedResults
    .filter(r => {
      const matchesFilter = sentimentFilter === 'All' || r.sentiment === sentimentFilter;
      const matchesSearch = !searchTerm || r.text.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      if (sortDirection === 'desc') {
        return b.compoundScore - a.compoundScore;
      }
      return a.compoundScore - b.compoundScore;
    });

  // Calculate summary statistics
  const totalAnalyzed = analyzedResults.length;
  const posCount = analyzedResults.filter(r => r.sentiment === 'Positive').length;
  const negCount = analyzedResults.filter(r => r.sentiment === 'Negative').length;
  const neuCount = analyzedResults.filter(r => r.sentiment === 'Neutral').length;

  return (
    <section id="tweet-lab" className="py-16 border-b border-[#2A303C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#D4FF3A] mb-1">
              Dataset Processing Facility
            </div>
            <h2 className="text-3xl font-extrabold text-[#F8F7F4] tracking-tight">
              Tweet Laboratory
            </h2>
            <p className="text-sm text-[#A0A6B2] mt-1 max-w-xl">
              Upload multi-row CSV files to batch-classify social opinions, filter by polarity, and export model-augmented results.
            </p>
          </div>

          {/* Load Sample Demo Button */}
          <button
            onClick={handleLoadDemoDataset}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#D4FF3A] bg-[#D4FF3A]/10 hover:bg-[#D4FF3A]/20 border border-[#D4FF3A]/30 rounded-xl transition-all cursor-pointer whitespace-nowrap self-start md:self-auto"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Load Curated Benchmark CSV (20 Tweets)</span>
          </button>
        </div>

        {/* Upload & Column Configuration Box */}
        <div className="p-6 rounded-2xl bg-[#16191E] border border-[#2A303C] mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Drag & drop / upload trigger */}
            <div className="md:col-span-6">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".csv"
                className="hidden"
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#2A303C] hover:border-[#D4FF3A]/60 rounded-xl p-6 text-center cursor-pointer transition-colors bg-[#0D0F12]"
              >
                <UploadCloud className="w-8 h-8 text-[#A0A6B2] mx-auto mb-2" />
                <span className="text-sm font-semibold text-[#F8F7F4] block">
                  Click to Upload Custom CSV
                </span>
                <span className="text-xs text-[#A0A6B2] mt-1 block">
                  Supports UTF-8 CSV with standard headers (e.g. text, tweet, content)
                </span>
              </div>
            </div>

            {/* Column Selector & Action Button */}
            <div className="md:col-span-6 space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-[#A0A6B2] mb-1.5">
                  Select Tweet-Text Column
                </label>
                <select
                  value={selectedColumn}
                  onChange={(e) => setSelectedColumn(e.target.value)}
                  disabled={!columns.length}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0D0F12] border border-[#2A303C] text-sm text-[#F8F7F4] focus:outline-none focus:border-[#D4FF3A] disabled:opacity-50"
                >
                  {columns.length === 0 ? (
                    <option>No CSV loaded yet (upload file or load benchmark)</option>
                  ) : (
                    columns.map((col, idx) => (
                      <option key={idx} value={col}>
                        Column: {col}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleProcessBatch}
                  disabled={!csvRawData.length || isProcessing}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-xs font-bold text-[#0D0F12] bg-[#D4FF3A] hover:bg-[#bde626] transition-all cursor-pointer shadow-[0_0_15px_rgba(212,255,58,0.25)] disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Classifying Batch ({csvRawData.length} records)...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Run Batch Classification ({csvRawData.length} Loaded)</span>
                    </>
                  )}
                </button>

                {analyzedResults.length > 0 && (
                  <button
                    onClick={handleDownloadCsv}
                    className="flex items-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-[#F8F7F4] bg-[#20252D] hover:bg-[#2A303C] border border-[#2A303C] transition-all cursor-pointer"
                    title="Export analyzed CSV"
                  >
                    <Download className="w-4 h-4 text-[#D4FF3A]" />
                    <span className="hidden sm:inline">Export CSV</span>
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Processed Summary KPI Strip (if data processed) */}
        {totalAnalyzed > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-[#16191E] border border-[#2A303C]">
              <span className="text-[11px] font-mono uppercase text-[#A0A6B2]">Total Analyzed</span>
              <div className="text-2xl font-black font-mono text-[#F8F7F4] tabular-nums mt-0.5">
                {totalAnalyzed}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#16191E] border border-[#D4FF3A]/30">
              <span className="text-[11px] font-mono uppercase text-[#A0A6B2]">Positive Sentiment</span>
              <div className="text-2xl font-black font-mono text-[#D4FF3A] tabular-nums mt-0.5">
                {posCount} <span className="text-xs font-normal opacity-75">({Math.round((posCount / totalAnalyzed) * 100)}%)</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#16191E] border border-[#FF453A]/30">
              <span className="text-[11px] font-mono uppercase text-[#A0A6B2]">Negative Sentiment</span>
              <div className="text-2xl font-black font-mono text-[#FF453A] tabular-nums mt-0.5">
                {negCount} <span className="text-xs font-normal opacity-75">({Math.round((negCount / totalAnalyzed) * 100)}%)</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#16191E] border border-[#A0A6B2]/30">
              <span className="text-[11px] font-mono uppercase text-[#A0A6B2]">Neutral / Factual</span>
              <div className="text-2xl font-black font-mono text-[#A0A6B2] tabular-nums mt-0.5">
                {neuCount} <span className="text-xs font-normal opacity-75">({Math.round((neuCount / totalAnalyzed) * 100)}%)</span>
              </div>
            </div>
          </div>
        )}

        {/* Interactive Data Table & Filter Controls */}
        {analyzedResults.length > 0 && (
          <div className="p-6 rounded-2xl bg-[#16191E] border border-[#2A303C] shadow-xl">
            {/* Table Toolbar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-4">
              {/* Search input */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 transform -translate-y-1/2 text-[#A0A6B2]" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Filter tweets by keyword..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#0D0F12] border border-[#2A303C] text-xs text-[#F8F7F4] placeholder-[#A0A6B2]/50 focus:outline-none focus:border-[#D4FF3A]"
                />
              </div>

              {/* Segmented Sentiment Filter */}
              <div className="flex items-center gap-1 p-1 bg-[#0D0F12] rounded-xl border border-[#2A303C]">
                {['All', 'Positive', 'Negative', 'Neutral'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSentimentFilter(filter)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      sentimentFilter === filter
                        ? 'bg-[#16191E] text-[#D4FF3A] font-bold shadow-sm'
                        : 'text-[#A0A6B2] hover:text-[#F8F7F4]'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {/* Sort toggle */}
              <button
                onClick={() => setSortDirection(prev => prev === 'desc' ? 'asc' : 'desc')}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#0D0F12] border border-[#2A303C] text-xs text-[#A0A6B2] hover:text-[#F8F7F4] cursor-pointer"
              >
                <ArrowUpDown className="w-3.5 h-3.5" />
                <span>Sort: {sortDirection === 'desc' ? 'High Polarity' : 'Low Polarity'}</span>
              </button>
            </div>

            {/* Results Table */}
            <div className="overflow-x-auto rounded-xl border border-[#2A303C]">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0D0F12] text-[#A0A6B2] font-mono uppercase tracking-wider border-b border-[#2A303C]">
                  <tr>
                    <th className="py-3 px-4 w-12 text-center">#</th>
                    <th className="py-3 px-4 min-w-[280px]">Analyzed Tweet Text</th>
                    <th className="py-3 px-4 w-28">Sentiment</th>
                    <th className="py-3 px-4 w-24 text-right">Confidence</th>
                    <th className="py-3 px-4 w-28 text-right">Compound</th>
                    <th className="py-3 px-4 w-32">Dominant Emotion</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2A303C]/60">
                  {filteredResults.map((item, idx) => (
                    <tr key={idx} className="hover:bg-[#20252D]/50 transition-colors">
                      <td className="py-3 px-4 font-mono text-[#A0A6B2] text-center">{idx + 1}</td>
                      <td className="py-3 px-4 text-[#F8F7F4] font-normal leading-relaxed">{item.text}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-bold border ${
                            item.sentiment === 'Positive'
                              ? 'bg-[#D4FF3A]/15 text-[#D4FF3A] border-[#D4FF3A]/30'
                              : item.sentiment === 'Negative'
                              ? 'bg-[#FF453A]/15 text-[#FF453A] border-[#FF453A]/30'
                              : 'bg-[#A0A6B2]/15 text-[#A0A6B2] border-[#A0A6B2]/30'
                          }`}
                        >
                          {item.sentiment}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-mono tabular-nums text-[#F8F7F4]">
                        {Math.round(item.confidence * 100)}%
                      </td>
                      <td className={`py-3 px-4 text-right font-mono tabular-nums font-bold ${
                        item.compoundScore > 0 ? 'text-[#D4FF3A]' : item.compoundScore < 0 ? 'text-[#FF453A]' : 'text-[#A0A6B2]'
                      }`}>
                        {item.compoundScore > 0 ? `+${item.compoundScore}` : item.compoundScore}
                      </td>
                      <td className="py-3 px-4 text-[#C4B5FD] font-medium">
                        {item.dominantEmotion}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-[#A0A6B2] font-mono">
              <span>Showing {filteredResults.length} of {analyzedResults.length} analyzed records</span>
              <button
                onClick={handleDownloadCsv}
                className="text-[#D4FF3A] hover:underline cursor-pointer flex items-center gap-1 font-semibold"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download as CSV</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
