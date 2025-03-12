import { useEffect, useState } from 'react';

/**
 * Hook that detects if a media query matches
 * @param {string} query - Media query to match
 * @returns {boolean} Whether the media query matches
 */
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    // Set initial value
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    
    // Create event listener
    const listener = () => {
      setMatches(media.matches);
    };
    
    // Add event listener
    media.addEventListener('change', listener);
    
    // Clean up function
    return () => {
      media.removeEventListener('change', listener);
    };
  }, [matches, query]);

  return matches;
};

export default useMediaQuery; 