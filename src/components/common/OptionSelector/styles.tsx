import styled, { css } from 'styled-components';

const SOptionSelectorWrap = styled.div<{ $variant: 'square' | 'capsule' }>`
  padding: 20px 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ $variant }) => ($variant === 'square' ? '12px' : '8px')};
`;

const squareStyle = css`
  width: 64px;
  height: 64px;
  border-radius: 8px;
`;

const capsuleStyle = css`
  padding: 4px 8px;
  border-radius: 9999px;
`;

const SOptionSelectorButton = styled.button<{ $variant: 'square' | 'capsule' }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.gray400};
  border: ${({ theme }) => `1px solid ${theme.colors.gray400}`};

  ${({ $variant }) => $variant === 'square' && squareStyle}
  ${({ $variant }) => $variant === 'capsule' && capsuleStyle}

  &[data-checked='true'] {
    color: ${({ theme }) => theme.colors.sub};
    border-color: ${({ theme }) => theme.colors.sub};
    background-color: ${({ theme }) => theme.colors.light};
  }

  > span {
    font-size: 11px;
  }
`;

export { SOptionSelectorWrap, SOptionSelectorButton };
