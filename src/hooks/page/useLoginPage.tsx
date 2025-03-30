import React, { useState, useCallback, ChangeEvent } from 'react';
import useToggleModal from '@hooks/ui/useToggleModal';
import useLogin from '@hooks/auth/useLogin';

const useLoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { isModalOpen, openModal, closeModal } = useToggleModal();
  const { login } = useLogin();

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, key: 'email' | 'password') => {
      setFormData((prev) => ({ ...prev, [key]: e.target.value }));
    },
    [],
  );

  const resetError = useCallback(() => {
    setError('');
  }, []);

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      try {
        login(formData.email, formData.password);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    },
    [formData],
  );

  return {
    formData,
    isLoading,
    error,
    isMemberSelectorOpen: isModalOpen,
    openMemberSelector: openModal,
    closeMemberSelector: closeModal,
    resetError,
    onChange,
    onSubmit,
  };
};

export default useLoginPage;
