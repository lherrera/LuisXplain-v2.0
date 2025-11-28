
export interface SearchResult {
  title: string;
  url: string;
  snippet: string;
  relevance_score: number;
  explanation: string;
}

export interface SearchData {
  search_intent: string;
  intent_type: 'Informational' | 'Transactional' | 'Navigational' | 'General';
  results: SearchResult[];
}
