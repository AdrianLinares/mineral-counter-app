import * as React from 'react';

/**
 * Breakpoint value in pixels that defines mobile devices
 * Screens smaller than this value are considered mobile
 * Common breakpoint for tablets and mobile devices
 */
const MOBILE_BREAKPOINT = 768;

/**
 * Custom React hook to detect if the current device is mobile
 * 
 * This hook uses the Window.matchMedia API to detect screen size changes
 * and determine if the current viewport width matches mobile dimensions.
 * 
 * Features:
 * - Real-time screen size detection
 * - Automatic updates on window resize
 * - Cleanup on component unmount
 * - TypeScript support
 * 
 * @returns {boolean} True if the device is mobile, false otherwise
 * 
 * @example
 * ```tsx
 * function ResponsiveComponent() {
 *   const isMobile = useIsMobile();
 *   
 *   return (
 *     <div>
 *       {isMobile ? (
 *         <MobileLayout />
 *       ) : (
 *         <DesktopLayout />
 *       )}
 *     </div>
 *   );
 * }
 * ```
 */
export function useIsMobile() {
  // State to store mobile status, initially undefined to prevent hydration issues
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    // Create a media query list to watch for mobile breakpoint
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    /**
     * Handler function for screen size changes
     * Updates isMobile state based on current window width
     */
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Add event listener for screen size changes
    mql.addEventListener('change', onChange);
    
    // Set initial value
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

    // Cleanup function to remove event listener when component unmounts
    return () => mql.removeEventListener('change', onChange);
  }, []); // Empty dependency array means this effect runs once on mount

  // Convert undefined to false and return boolean
  return !!isMobile;
}
