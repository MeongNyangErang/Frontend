import styled, { css } from 'styled-components';
import { buttonStyle } from '@components/styles/mixins';

const variantStyles = {
  main: css`
    background-color: ${({ theme }) => theme.colors.main};
    color: #fff;
  `,
  grayBorder: css`
    background-color: #fff;
    color: ${({ theme }) => theme.colors.gray500};
    border: 1px solid ${({ theme }) => theme.colors.gray400};
    box-shadow: 0 2px 4px rgba(120, 120, 120, 0.05);
  `,
  mainBorder: css`
    background-color: #fff;
    color: ${({ theme }) => theme.colors.main};
    border: 1px solid ${({ theme }) => theme.colors.main};
  `,
  accent: css`
    background-color: ${({ theme }) => theme.colors.info};
    color: ${({ theme }) => theme.colors.infoText};
  `,
};

const SButton = styled.button<{
  $variant: 'main' | 'grayBorder' | 'mainBorder' | 'accent';
  $fullWidth?: boolean;
  $fontSize: string;
  $fixedHeight?: boolean;
  $disabledStyle: boolean;
}>`
  ${buttonStyle}

  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  height: ${({ $fixedHeight }) => ($fixedHeight ? '48px' : 'auto')};
  font-size: ${({ $fontSize }) => $fontSize};
  transition: ${({ theme }) => theme.transition.default};

  ${({ $variant }) => variantStyles[$variant]}

  &:hover {
    filter: brightness(0.95);
  }

  &:disabled {
    ${({ $disabledStyle }) =>
      $disabledStyle &&
      css`
        color: ${({ theme }) => theme.colors.gray500};
        background-color: ${({ theme }) => theme.colors.gray200};
        border: none;
      `}
  }
`;

export { SButton };
