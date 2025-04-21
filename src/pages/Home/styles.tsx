import styled from 'styled-components';
import { media } from '@components/styles/responsive';
import bgImage from '@assets/images/bg/search-bg-3.png';

const SSearchBarArea = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 240px;
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
    background-image: url(${bgImage});
    background-position: center top;
    background-size: auto 240px;
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
