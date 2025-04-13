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

    setTimeout(() => {
      if (observerTargetRef.current) {
        observer.observe(observerTargetRef.current);
      }
    }, 100);

    return () => observer.disconnect();
  }, [enabled, callback]);

  return observerTargetRef;
};

export default useInfiniteScroll;
