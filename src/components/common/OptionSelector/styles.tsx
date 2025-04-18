import styled, { css } from 'styled-components';

const SOptionSelectorWrap = styled.div<{
  $variant: 'squareFixed' | 'squareResponsive' | 'capsule';
}>`
  ${({ $variant }) =>
    $variant === 'capsule' &&
    css`
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
    `}

  ${({ $variant }) =>
    $variant.includes('square') &&
    css`
      display: flex;
      align-items: center;
      gap: 8px;
    `}
`;

const squareFixedStyle = css`
  width: 80px;
  height: 80px;
  border-radius: 12px;
`;

const squareResponsiveStyle = css`
  width: 25%;
  aspect-ratio: 1;
  border-radius: 12px;
`;

const capsuleStyle = css`
  padding: 6px 12px;
  min-width: 56px;
  border-radius: 9999px;
`;

const SOptionSelectorButton = styled.button<{
  $variant: 'squareFixed' | 'squareResponsive' | 'capsule';
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray400};
  border: ${({ theme }) => `1px solid ${theme.colors.gray400}`};
  background-color: #fff;

  ${({ $variant }) => $variant === 'squareFixed' && squareFixedStyle}
  ${({ $variant }) => $variant === 'squareResponsive' && squareResponsiveStyle}
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
