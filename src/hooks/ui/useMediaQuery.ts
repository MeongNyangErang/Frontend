import { useEffect, useState } from 'react';

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(
    typeof window !== undefined ? window.matchMedia(query).matches : false,
  );

  useEffect(() => {
    const media = window.matchMedia(query);
    const handleChange = () => setMatches(media.matches);
    media.addEventListener('change', handleChange);

    return () => {
      media.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
};

export default useMediaQuery;
