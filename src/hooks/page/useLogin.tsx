import React, { useState, useCallback, ChangeEvent } from 'react';
import useToggleModal from '@hooks/ui/useToggleModal';

const useLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, openModal, closeModal } = useToggleModal();

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, key: 'email' | 'password') => {
      setFormData((prev) => ({ ...prev, [key]: e.target.value }));
    },
    [],
  );

  const onSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('durl');
    setIsLoading(true);
    try {
    } catch (error) {}
  }, []);

  return {
    formData,
    isLoading,
    isOpen,
    openModal,
    closeModal,
    onChange,
    onSubmit,
  };
};

export default useLogin;
