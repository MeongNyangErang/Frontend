import { useState, useCallback } from 'react';

const useRegister = <T extends string>(initialState: T[] = []) => {
  const [selectedRegister, setSelectedRegister] = useState<T[]>(initialState);

  const toggleRegister = useCallback((option: T) => {
    setSelectedRegister((prevState) =>
      prevState.includes(option)
        ? prevState.filter((item) => item !== option)
        : [...prevState, option],
    );
  }, []);

  return { selectedRegister, toggleRegister };
};

export default useRegister;
