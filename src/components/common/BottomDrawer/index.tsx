import { ReactNode, useEffect, useState, useRef } from 'react';
import { SBottomDrawerWrap, SDrawerOverlay, SDrawerBody } from './styles';
import Portal from '../Portal';

interface Props {
  children: ReactNode;
  isOpen: boolean;
  fullHeight?: boolean;
}

const BottomDrawer = ({ children, isOpen, fullHeight }: Props) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        setVisible(true);
      });
    } else {
      setVisible(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <Portal selector="drawer-root">
      <SBottomDrawerWrap>
        <SDrawerOverlay />
        <SDrawerBody $visible={visible} $fullHeight={fullHeight}>
          {children}
        </SDrawerBody>
      </SBottomDrawerWrap>
    </Portal>
  );
};

export default BottomDrawer;
