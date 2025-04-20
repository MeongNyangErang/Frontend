import { theme } from '@components/styles/theme';
import styled from 'styled-components';

const SSearchBarArea = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => `52px ${theme.layouts.paddingX}`};

  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: ${({ theme }) => theme.colors.gray100};
  }
`;

const SSearchBarContainer = styled.div`
  position: static;
  max-width: ${({ theme }) => theme.layouts.innerWidth};
  width: 100%;
  z-index: 1;

  > p {
    font-size: 18px;
  }
`;

export { SSearchBarArea, SSearchBarContainer };
