import { useState, useCallback } from 'react';
import useToggleModal from '@hooks/ui/useToggleModal';
import { MemberRole } from '@typings/member';

const useLoginPage = () => {
  const { isModalOpen, openModal, closeModal } = useToggleModal();
  const [currentType, setCurrentType] = useState<MemberRole>('user');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const startLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  const endLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  const showError = useCallback((message: string) => {
    setError(message);
  }, []);

  const resetError = useCallback(() => {
    setError('');
  }, []);

  const changeTab = useCallback((type: MemberRole) => {
    setCurrentType(type);
  }, []);

  return {
    currentType,
    isLoading,
    error,
    isModalOpen,
    openModal,
    closeModal,
    changeTab,
    startLoading,
    endLoading,
    showError,
    resetError,
  };
};

export default useLoginPage;
