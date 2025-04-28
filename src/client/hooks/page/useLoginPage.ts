import { useState, useCallback } from 'react';
import useToggleModal from '@shared/hooks/ui/useToggleModal';
import { MemberRole } from '@typings/member';
import useIsLoading from '@shared/hooks/ui/useIsLoading';
import useError from '@shared/hooks/ui/useError';

const useLoginPage = () => {
  const { isModalOpen, openModal, closeModal } = useToggleModal();
  const [currentType, setCurrentType] = useState<MemberRole>('USER');
  const { isLoading, startIsLoading, endIsLoading } = useIsLoading();
  const { error, resetError, updateError } = useError();

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
    startIsLoading,
    endIsLoading,
    updateError,
    resetError,
  };
};

export default useLoginPage;
