import { useRef, useEffect } from 'react';

const useInfiniteScroll = (callback: () => void, enabled: boolean) => {
  const observerTargetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!observerTargetRef.current || !enabled) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        callback();
      }
    });

    observer.observe(observerTargetRef.current);
    return () => observer.disconnect();
  }, [enabled, callback]);

  return observerTargetRef;
};

export default useInfiniteScroll;
