import Modal from '@components/common/Modal';
import Button from '@components/common/Button';
import { SDeleteConfirmation } from './styles';
import PetForm from './PetForm';
import { PetInfo } from '@typings/pet';

interface UserMyPetModalsProps {
  selectedPet: null | PetInfo;
  selectedId: null | number;
  isModalOpen: boolean;
  isFormOpen: boolean;
  deleteLoading: boolean;
  deleteError: string;
  handleCompeleteDelete: () => void;
  handleDeleteItem: () => void;
  onSuccessSubmitPetForm: () => void;
  closeForm: () => void;
  resetSelectedPet: () => void;
}

const UserMyPetModals = ({
  selectedPet,
  selectedId,
  isModalOpen,
  isFormOpen,
  deleteLoading,
  deleteError,
  handleCompeleteDelete,
  handleDeleteItem,
  onSuccessSubmitPetForm,
  closeForm,
  resetSelectedPet,
}: UserMyPetModalsProps) => {
  return (
    <>
      <Modal
        onClose={() => {
          closeForm();
          resetSelectedPet();
        }}
        isOpen={isFormOpen}
        variant="full"
        closeType="x"
      >
        <PetForm selectedPet={selectedPet} onSuccess={onSuccessSubmitPetForm} />
      </Modal>
      <Modal
        isOpen={isModalOpen && !!selectedId}
        variant="centered"
        closeType="x"
        onClose={handleCompeleteDelete}
      >
        <SDeleteConfirmation>
          <p>정말 삭제하시겠습니까?</p>
          <div>
            <Button
              variant="grayBorder"
              fontSize="13px"
              fullWidth
              onClick={handleCompeleteDelete}
              disabled={deleteLoading}
            >
              취소
            </Button>
            <Button
              variant="accent"
              fontSize="13px"
              fullWidth
              onClick={handleDeleteItem}
              disabled={deleteLoading}
            >
              확인
            </Button>
          </div>
          <span>{deleteError}</span>
        </SDeleteConfirmation>
      </Modal>
    </>
  );
};

export default UserMyPetModals;
