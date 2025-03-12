import useMediaQuery from './useMediaQuery';

/**
 * Hook that returns information about the current device
 * @returns {Object} Device information
 */
const useDeviceDetect = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
  const isDesktop = useMediaQuery('(min-width: 1025px)');
  
  return {
    isMobile,
    isTablet,
    isDesktop,
    // A helper prop for basic mobile vs desktop distinction
    isSmallScreen: isMobile || isTablet
  };
};

export default useDeviceDetect; 