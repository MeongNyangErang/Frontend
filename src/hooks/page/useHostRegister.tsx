import { useState, useCallback } from 'react';

const useHostRegister = (initialState: string[] = []) => {
  const [selectedRegister, setSelectedRegister] =
    useState<string[]>(initialState);

  const toggleRegister = useCallback((option: string) => {
    setSelectedRegister((prevState) =>
      prevState.includes(option)
        ? prevState.filter((item) => item !== option)
        : [...prevState, option],
    );
  }, []);

  return { selectedRegister, toggleRegister };
};

export default useHostRegister;
