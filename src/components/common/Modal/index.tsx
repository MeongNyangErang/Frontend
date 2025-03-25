import { useEffect } from 'react';
import { SWrap, SModal } from './styles';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose(): void;
  variant: 'full' | 'centered';
}

const Modal = ({ isOpen, children, onClose, variant }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <SWrap $variant={variant}>
      <SModal $variant={variant}>{children}</SModal>
    </SWrap>
  );
};

export default Modal;
