import styled from 'styled-components';
import { media } from '@components/styles/responsive';

const SSearchBarArea = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => `40px ${theme.layouts.paddingX}`};

  ${media.tablet} {
    padding: ${({ theme }) => `52px ${theme.layouts.paddingX}`};
  }

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
  max-width: ${({ theme }) => theme.layouts.innerWidth};
  width: 100%;
  > p {
    font-size: 18px;
  }
`;

export { SSearchBarArea, SSearchBarContainer };
