import { media } from '@shared/components/styles/responsive';
import styled from 'styled-components';

const SMapWrap = styled.div<{ $headerHeight: number }>`
  width: 100%;
  height: ${({ theme, $headerHeight }) =>
    `calc(100vh - ${theme.layouts.headerHeight} - ${$headerHeight}px)`};
  padding: 0;

  ${media.mobile} {
    padding: ${({ theme }) => theme.layouts.paddingX};
  }
`;

const SMapContainer = styled.div`
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layouts.innerWidth};
  width: 100%;
  height: 100%;
  background-color: pink;

  ${media.mobile} {
    overflow: hidden;
    border-radius: ${({ theme }) => theme.radius.sm};
  }
`;

export { SMapWrap, SMapContainer };
