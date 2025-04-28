import { useState } from 'react';

const useError = () => {
  const [error, setError] = useState('');
  const updateError = (error: string) => {
    setError(error);
  };
  const resetError = () => {
    setError('');
  };

  return { error, updateError, resetError };
};

export default useError;
