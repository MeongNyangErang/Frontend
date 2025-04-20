import { useRef, useEffect } from 'react';

const useInfiniteScroll = (callback: () => void, enabled: boolean) => {
  const observerTargetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!observerTargetRef.current || !enabled) return;

    console.log('callback', callback);
    console.log(observerTargetRef.current);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        console.log('isIntersecting');
        observer.unobserve(entry.target);
        callback();
        console.log('callback worked');
      }
    });

    console.log('here');

    setTimeout(() => {
      if (observerTargetRef.current) {
        observer.observe(observerTargetRef.current);
      }
    }, 100);

    console.log('here2');

    return () => observer.disconnect();
  }, [enabled, callback]);

  return observerTargetRef;
};

export default useInfiniteScroll;
