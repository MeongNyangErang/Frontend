import { FaXmark, FaArrowLeftLong } from 'react-icons/fa6';
import {
  SWrap,
  SModal,
  SModalHeader,
  SModalBody,
  SModalFooter,
} from './styles';
import Button from '../Button';
import Portal from '../Portal';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  variant: 'full' | 'centered';
  role?: 'alert' | 'confirm';
  closeType: 'none' | 'arrow' | 'x';
  onClose?: () => void;
}

const Modal = ({
  isOpen,
  children,
  variant,
  closeType,
  role,
  onClose,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <Portal selector="modal-root">
      <SWrap $variant={variant}>
        <SModal $variant={variant}>
          {closeType !== 'none' && (
            <SModalHeader $closeType={closeType}>
              <button onClick={onClose}>
                {closeType === 'x' ? <FaXmark /> : <FaArrowLeftLong />}
              </button>
            </SModalHeader>
          )}
          {['alert', 'confirm'].includes(role || '') ? (
            <>
              <SModalBody>{children}</SModalBody>
              <SModalFooter>
                <Button variant="main" fontSize="14px" onClick={onClose!}>
                  확인
                </Button>
              </SModalFooter>
            </>
          ) : (
            children
          )}
        </SModal>
      </SWrap>
    </Portal>
  );
};

export default Modal;
