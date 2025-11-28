import React, { useState, useEffect, useRef } from 'react';
import { performSearchAnalysis } from './services/geminiService';
import type { SearchData } from './types';
import Header from './components/Header';
import ResultsView from './components/ResultsView';

const App: React.FC = () => {
  const [query, setQuery] = useState('Databricks vs Snowflake');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<SearchData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [animateHeader, setAnimateHeader] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 4;

  const resultsRef = useRef<HTMLDivElement>(null);

  const runSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);
    setData(null);
    setAnimateHeader(true);
    setCurrentPage(1);

    try {
      const resultData = await performSearchAnalysis(searchQuery);
      setData(resultData);
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to perform search analysis. ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    runSearch(query);
  };
  
  useEffect(() => {
    runSearch(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only on initial mount with the default query

  useEffect(() => {
    if (data && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [data]);
  
  const paginate = (pageNumber: number) => {
    const totalPages = Math.ceil((data?.results?.length || 0) / resultsPerPage);
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    if (resultsRef.current) {
      const yOffset = -100; 
      const y = resultsRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({top: y, behavior: 'smooth'});
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-red-100 selection:text-red-900">
      <Header
        query={query}
        setQuery={setQuery}
        loading={loading}
        handleSearch={handleSearch}
        animateHeader={animateHeader || !!data}
      />
      
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8" ref={resultsRef}>
        <ResultsView
          loading={loading}
          error={error}
          data={data}
          currentPage={currentPage}
          resultsPerPage={resultsPerPage}
          paginate={paginate}
        />
      </main>
    </div>
  );
};

export default App;
