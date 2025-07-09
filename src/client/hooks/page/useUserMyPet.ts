import { useState, useCallback } from 'react';
import useMyPetList from '@hooks/query/user/useMyPetList';
import useToggleModal from '@shared/hooks/ui/useToggleModal';
import useIsLoading from '@shared/hooks/ui/useIsLoading';
import useError from '@shared/hooks/ui/useError';
import { PetInfo } from '@typings/pet';
import { deleteMyPet } from '@services/pet';
import useUserPetRecommendations from '@hooks/query/user/useUserPetRecommendations';

const useUserMyPet = () => {
  const { data, error, isLoading, refreshMyPetList } = useMyPetList();
  const [selectedPet, setSelectedPet] = useState<PetInfo | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const {
    isModalOpen: isFormOpen,
    openModal: openForm,
    closeModal: closeForm,
  } = useToggleModal();
  const { isModalOpen, openModal, closeModal } = useToggleModal();
  const {
    error: deleteError,
    updateError: updateDeleteError,
    resetError: resetDeleteError,
  } = useError();
  const {
    isLoading: deleteLoading,
    startIsLoading: startDeleteLoading,
    endIsLoading: endDeleteLoading,
  } = useIsLoading();
  const { invalidateUserPetRecommendations } = useUserPetRecommendations(false);

  const resetSelectedPet = () => {
    if (selectedPet) setSelectedPet(null);
  };

  const handleEditItem = (pet: PetInfo) => {
    setSelectedPet(pet);
    openForm();
  };

  const handleClickDeleteButton = (petId: number) => {
    setSelectedId(petId);
    openModal();
  };

  const handleCompeleteDelete = () => {
    setSelectedId(null);
    closeModal();
  };

  const handleDeleteItem = async () => {
    if (!selectedId) return;
    if (deleteError) resetDeleteError();

    startDeleteLoading();
    try {
      await deleteMyPet(selectedId);
      refreshMyPetList();
      handleCompeleteDelete();
    } catch (error) {
      updateDeleteError('에러가 발생했습니다. 다시 시도해주세요.');
    } finally {
      endDeleteLoading();
    }
  };

  const onSuccessSubmitPetForm = useCallback(() => {
    closeForm();
    resetSelectedPet();
    refreshMyPetList();
    invalidateUserPetRecommendations();
  }, [resetSelectedPet]);

  return {
    selectedPet,
    selectedId,
    data,
    error,
    isLoading,
    isFormOpen,
    isModalOpen,
    deleteLoading,
    deleteError,
    openForm,
    closeForm,
    handleEditItem,
    handleClickDeleteButton,
    handleDeleteItem,
    handleCompeleteDelete,
    resetSelectedPet,
    onSuccessSubmitPetForm,
  };
};

export default useUserMyPet;
