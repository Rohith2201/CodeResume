export interface KeywordMatch {
  keyword: string;
  count: number;
  context: string[];
}

export function findKeywordMatches(text: string, keywords: string[]): KeywordMatch[] {
  const matches: KeywordMatch[] = [];
  const sentences = text.split(/[.!?]+/);

  keywords.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
    const count = (text.match(regex) || []).length;
    
    if (count > 0) {
      const context = sentences.filter(sentence => 
        sentence.toLowerCase().includes(keyword.toLowerCase())
      ).map(s => s.trim());

      matches.push({ keyword, count, context });
    }
  });

  return matches;
}