import { useCallback, useEffect, useRef, useState } from 'react';

const useClickOutside = () => {
  const [isOpen, setIsOpen] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);
  const toggleIsOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (targetRef.current && !targetRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);

    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return { isOpen, targetRef, toggleIsOpen };
};

export default useClickOutside;
