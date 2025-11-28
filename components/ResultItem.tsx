import React from 'react';
import type { SearchResult } from '../types';
import { ExternalLink, DatabricksLogo, Info } from './icons';

interface ResultItemProps {
  result: SearchResult;
  rank: number;
}

const ResultItem: React.FC<ResultItemProps> = ({ result, rank }) => {
  const getHostname = (url: string) => {
    try {
      return new URL(url).hostname;
    } catch (_) {
      return url;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-300 overflow-hidden group">
      <div className="flex flex-col md:flex-row">
        {/* Left: Result Content */}
        <div className="flex flex-1 flex-col justify-center p-6 space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1 overflow-hidden">
              <div className="text-xs text-slate-500 font-mono truncate flex items-center gap-2">
                <img 
                  src={`https://www.google.com/s2/favicons?domain=${result.url}&sz=32`} 
                  alt="favicon" 
                  className="w-4 h-4 rounded-sm opacity-70 flex-shrink-0"
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                />
                <span className="truncate">{getHostname(result.url)}</span>
              </div>
              <a 
                href={result.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-xl font-semibold text-blue-600 hover:underline hover:text-blue-800 visited:text-purple-700 leading-tight"
              >
                {result.title}
              </a>
            </div>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed">
            {result.snippet}
          </p>
          <div className="pt-2 flex items-center gap-2 text-xs font-medium text-slate-400">
            <span className="bg-slate-100 px-2 py-1 rounded">Rank #{rank}</span>
            <span>•</span>
            <a href={result.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-slate-600">
              Visit Site <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Right: AI Explanation Panel */}
        <div className="md:w-1/3 bg-slate-50 border-t md:border-t-0 md:border-l border-slate-100 p-6 flex flex-col justify-center relative overflow-hidden min-h-[160px]">
          <Info className="absolute -right-4 -bottom-4 w-32 h-32 text-slate-200 opacity-20 rotate-12" />
          
          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wide flex items-center gap-2">
                <DatabricksLogo className="w-4 h-4 text-red-500" />
                Why this result?
              </h4>
              <div className="flex items-center gap-1 text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-100">
                {result.relevance_score}% Match
              </div>
            </div>
            
            <p className="text-sm text-slate-600 leading-relaxed border-l-2 border-red-200 pl-3">
              {result.explanation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultItem;