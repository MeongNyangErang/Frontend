import { useState } from 'react';

const useIsLoading = () => {
  const [isLoading, setIsLoading] = useState(false);
  const startIsLoading = () => {
    setIsLoading(true);
  };
  const endIsLoading = () => {
    setIsLoading(false);
  };

  return { isLoading, startIsLoading, endIsLoading };
};

export default useIsLoading;
