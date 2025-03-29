import styled from 'styled-components';
import { buttonStyle } from '@components/styles/mixins';

const SButton = styled.button<{
  $variant: 'main' | 'grayBorder' | 'mainBorder' | 'accent';
  $fullWidth: boolean | undefined;
  $fontSize: string;
  $fixedHeight: boolean | undefined;
}>`
  ${buttonStyle}

  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};

  height: ${({ $fixedHeight }) => ($fixedHeight ? '48px' : 'auto')};

  background-color: ${({ $variant, theme }) =>
    $variant === 'main'
      ? theme.colors.main
      : $variant === 'accent'
        ? theme.colors.info
        : '#fff'};

  font-size: ${({ $fontSize }) => $fontSize};

  color: #fff;

  ${({ $variant, theme }) =>
    $variant === 'grayBorder' &&
    `
      color: ${theme.colors.gray500};
      border: 1px solid ${theme.colors.gray500};
    `}

  ${({ $variant, theme }) =>
    $variant === 'mainBorder' &&
    `
      color: ${theme.colors.main};
      border: 1px solid ${theme.colors.main};
    `}

   ${({ $variant, theme }) =>
    $variant === 'accent' &&
    `
      color: ${theme.colors.infoText};
    `}


    &:disabled {
    color: ${({ theme }) => theme.colors.gray500};
    background-color: ${({ theme }) => theme.colors.gray200};
    border: none;
  }
`;

export { SButton };
