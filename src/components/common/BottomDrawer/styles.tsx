import styled from 'styled-components';

const SBottomDrawerWrap = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1100;
  width: 100%;
  height: 100%;
`;

const SDrawerOverlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.overlay};
`;

const SDrawerBody = styled.div<{ $visible: boolean; $fullHeight?: boolean }>`
  overflow: hidden;
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 1;
  width: 100%;
  height: ${({ $fullHeight }) => ($fullHeight ? '100%' : 'calc(100% - 20px)')};
  background-color: #fff;
  border-top-right-radius: ${({ $fullHeight }) =>
    $fullHeight ? '0px' : '12px'};
  border-top-left-radius: ${({ $fullHeight }) =>
    $fullHeight ? '0px' : '12px'};
  transform: ${({ $visible }) =>
    $visible ? 'translateY(0)' : 'translateY(100%)'};
  transition: transform 200ms ease-in-out;
`;

export { SBottomDrawerWrap, SDrawerOverlay, SDrawerBody };
