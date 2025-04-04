import { useEffect } from 'react';
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
  useEffect(() => {
    const mobileContainer = document.getElementById('mobile-container')!;
    if (isOpen) {
      mobileContainer.style.overflow = 'hidden';
    } else {
      mobileContainer.style.overflow = '';
    }

    return () => {
      mobileContainer.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <Portal selector="modal-root">
      <SWrap $variant={variant}>
        <SModal $variant={variant}>
          {closeType !== 'none' && (
            <SModalHeader>
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
