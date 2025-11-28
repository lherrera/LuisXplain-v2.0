import React from 'react';
import { Search, Loader2, DatabricksLogo } from './icons';

interface HeaderProps {
  query: string;
  setQuery: (query: string) => void;
  loading: boolean;
  handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  animateHeader: boolean;
}

const Header: React.FC<HeaderProps> = ({ query, setQuery, loading, handleSearch, animateHeader }) => {
  return (
    <div className={`transition-all duration-700 ease-in-out ${animateHeader ? 'py-8' : 'py-32'} px-4 flex flex-col items-center justify-center bg-white shadow-sm border-b border-slate-200`}>
      <div className="text-center max-w-2xl w-full space-y-6">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="p-3 bg-red-600 rounded-2xl shadow-lg shadow-red-200">
            <DatabricksLogo className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">
            Luis<span className="text-red-600">Xplain</span>
          </h1>
        </div>
        
        <p className={`text-slate-500 text-lg transition-opacity duration-500 ${animateHeader ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
          Enter a query to see real Google results and an AI explanation of <span className="font-semibold text-slate-700">why</span> they were chosen.
        </p>

        <form onSubmit={handleSearch} className="relative w-full max-w-xl mx-auto group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className={`w-5 h-5 transition-colors ${loading ? 'text-red-500' : 'text-slate-400 group-focus-within:text-red-500'}`} />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., 'Why is the sky blue?' or 'Cheap flights to Tokyo'"
            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-full shadow-inner text-lg focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all placeholder:text-slate-400"
            disabled={loading}
          />
          <button 
            type="submit" 
            disabled={loading || !query.trim()}
            className="absolute right-2 top-2 bottom-2 bg-red-600 hover:bg-red-700 text-white px-6 rounded-full font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-md hover:shadow-lg"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <span>Search</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;