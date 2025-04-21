import styled from 'styled-components';
import { media } from '@components/styles/responsive';

const SSearchBarArea = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: ${({ theme }) => `30px ${theme.layouts.paddingX}`};
`;

const SSearchBarContainer = styled.div`
  max-width: ${({ theme }) => theme.layouts.innerWidth};
  width: 100%;

  ${media.tablet} {
    > div {
      position: relative;
      z-index: 1;
      padding: 20px 16px;
      background-color: ${({ theme }) => theme.colors.gray100};
      border-radius: 8px;
    }
  }
`;

const SSectionTitle = styled.h2``;

const SSectionContainer = styled.div``;

export {
  SSearchBarArea,
  SSearchBarContainer,
  SSectionTitle,
  SSectionContainer,
};
