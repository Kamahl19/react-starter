import { useEffect, useState, useCallback } from 'react';

// Due to SSR
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
const getMatches = (query: string) => window?.matchMedia(query).matches ?? false;

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(getMatches(query));

  const handleChange = useCallback(() => setMatches(getMatches(query)), [query]);

  useEffect(() => {
    const mm = window.matchMedia(query);

    handleChange();

    mm.addEventListener('change', handleChange);

    return () => mm.removeEventListener('change', handleChange);
  }, [query, handleChange]);

  return matches;
};

export default useMediaQuery;
