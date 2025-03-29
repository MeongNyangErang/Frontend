import styled from 'styled-components';

const SWrap = styled.div<{ $variant: 'full' | 'centered' }>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: ${({ $variant }) =>
    $variant === 'full' ? '#fff' : 'rgba(0,0,0,0.3)'};

  ${({ $variant }) =>
    $variant === 'centered' &&
    `
    display: flex;
    justify-content: center;
    align-items: center;
  `}
`;

const SModal = styled.div<{ $variant: 'full' | 'centered' }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  background-color: #fff;
  ${({ $variant, theme }) =>
    $variant === 'centered' &&
    `
    width: 80%;
    max-width: 450px;
    min-width: 280px;
    min-height: 180px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: ${theme.radius.md};
  `}
`;

const SModalHeader = styled.header`
  width: 100%;
  margin-bottom: 8px;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
    margin-left: -8px;
    font-size: 20px;
  }
`;

const SModalBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SModalFooter = styled.footer``;

export { SWrap, SModal, SModalHeader, SModalBody, SModalFooter };
