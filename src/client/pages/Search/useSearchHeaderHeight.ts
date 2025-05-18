import { useEffect, useRef, useState } from 'react';
import useMediaQuery from '@hooks/ui/useMediaQuery';
import { BREAK_POINTS } from '@shared/components/styles/responsive';

const useSearchHeaderHeight = () => {
  const isTablet = useMediaQuery(`(max-width:${BREAK_POINTS.tablet})`);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      const height = headerRef.current.offsetHeight;
      setHeaderHeight(height);
    }
  }, [headerRef, isTablet]);

  return { headerHeight, headerRef };
};

export default useSearchHeaderHeight;
