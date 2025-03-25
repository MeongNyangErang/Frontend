import styled from 'styled-components';

const SWrap = styled.div<{ $variant: 'full' | 'centered' }>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: ${({ $variant }) =>
    $variant === 'full' ? '#fff' : 'rgba(0,0,0,0.5)'};

  ${({ $variant }) =>
    $variant === 'centered' &&
    `
    display: flex;
    justify-content: center;
    align-items: center;
  `}
`;

const SModal = styled.div<{ $variant: 'full' | 'centered' }>`
  padding: 24px;
  background-color: #fff;
  ${({ $variant }) =>
    $variant === 'centered' &&
    `
    width: 90%;
    max-width: 500px;
    min-width: 280px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: var(--border-radius);
  `}
`;

export { SWrap, SModal };
