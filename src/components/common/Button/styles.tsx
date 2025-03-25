import styled from 'styled-components';
import { buttonStyle } from '@components/styles/mixins';

const SButton = styled.button<{
  $color: 'main' | 'white';
  $fullWidth: boolean | undefined;
  $fontSize: string;
}>`
  ${buttonStyle}

  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};

  background-color: ${({ $color, theme }) =>
    $color === 'main' ? theme.colors.main : '#fff'};

  font-size: ${({ $fontSize }) => $fontSize};

  color: ${({ $color, theme }) =>
    $color === 'main' ? '#fff' : theme.colors.gray500};

  ${({ $color, theme }) =>
    $color === 'white' &&
    `
      border: 1px solid ${theme.colors.gray500}
    `}
`;

export { SButton };
