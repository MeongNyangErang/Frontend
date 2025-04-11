import { useState, useCallback } from 'react';
import { AxiosError } from 'axios';
import { PetInfoState, PetInfo, PetInfoKey, PetInfoValue } from '@typings/pet';
import { initialPetInfoState } from '@constants/pet';
import useIsLoading from '@hooks/ui/useIsLoading';
import useError from '@hooks/ui/useError';
import { formatDate } from '@utils/date';
import { editMyPet, registerMyPet } from '@services/pet';

interface UsePetFormProps {
  selectedPet: PetInfo | null;
  onSuccess: () => void;
}

const deleteIdFromState = (selectedPet: PetInfo) => {
  const newInfoArray = Object.entries(selectedPet).filter(
    ([key]) => key !== 'id',
  );
  return Object.fromEntries(newInfoArray) as PetInfoState;
};

const usePetForm = ({ selectedPet, onSuccess }: UsePetFormProps) => {
  const [newInfo, setNewInfo] = useState<PetInfoState>(
    selectedPet ? deleteIdFromState(selectedPet) : initialPetInfoState,
  );
  const { error, updateError, resetError } = useError();
  const { isLoading, startIsLoading, endIsLoading } = useIsLoading();

  const onClickOption = useCallback(
    (key: PetInfoKey) => (value: PetInfoValue) => {
      setNewInfo((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const onChangeInput = (key: PetInfoKey, value: string) => {
    setNewInfo((prev) => ({ ...prev, [key]: value }));
  };

  const handleChangeDate = (date: Date | null) => {
    if (!date) return;
    setNewInfo((prev) => ({ ...prev, birthDate: formatDate(date) }));
  };

  const handleSubmitPetForm = async () => {
    if (error) resetError();

    for (let key in newInfo) {
      if (!newInfo[key as keyof typeof newInfo]) {
        updateError(`${key}를 입력해주세요.`);
        return;
      }
    }

    startIsLoading();
    try {
      if (selectedPet) {
        await editMyPet(newInfo, selectedPet.petId);
      } else {
        await registerMyPet(newInfo);
      }
      onSuccess();
    } catch (error) {
      if (error instanceof AxiosError) {
        updateError(error.message);
      } else {
        updateError('에러가 발생했습니다. 다시 시도해주세요');
      }
    } finally {
      endIsLoading();
    }
  };

  return {
    newInfo,
    isLoading,
    error,
    onClickOption,
    onChangeInput,
    handleChangeDate,
    handleSubmitPetForm,
  };
};

export default usePetForm;
