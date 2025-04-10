import styled, { css } from 'styled-components';
import { media, BREAK_POINTS } from '@components/styles/responsive';

const SWrap = styled.div<{ $variant: 'full' | 'centered' }>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1100;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.overlay};
`;

const SModal = styled.div<{ $variant: 'full' | 'centered' }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  background-color: #fff;

  ${({ $variant, theme }) =>
    $variant === 'centered' &&
    `
    padding: 24px;
    width: 80%;
    max-width: 450px;
    min-width: 280px;
    min-height: 160px;
    max-height: 600px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: ${theme.radius.md};
  `}
  ${({ $variant, theme }) =>
    $variant === 'full' &&
    `
    padding: ${theme.layouts.paddingX};
    width: 100%;
    max-width: ${BREAK_POINTS.mobile};
    height: 100%;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    
    ${media.mobile}{
      height: calc(100% - 32px);
      max-height: 800px;
      border-radius: ${theme.radius.md};
    }
  `}
`;

const SModalHeader = styled.header<{ $closeType: 'none' | 'arrow' | 'x' }>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 8px;
  width: 100%;

  ${({ $closeType }) =>
    $closeType === 'x' &&
    css`
      justify-content: flex-end;
    `}

  > button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
    margin: -10px -10px 0;
    font-size: 20px;
  }
`;

const SModalBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px 0;
`;

const SModalFooter = styled.footer``;

export { SWrap, SModal, SModalHeader, SModalBody, SModalFooter };
