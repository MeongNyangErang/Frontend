import { media } from '@components/styles/responsive';
import styled from 'styled-components';

const SChatWrap = styled.div`
  padding: ${({ theme }) => `0 ${theme.layouts.paddingX}`};
  height: ${({ theme }) =>
    `calc(100vh - ${theme.layouts.headerHeight} - ${theme.layouts.footerHeight})`};
`;

const SChatContiner = styled.div`
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layouts.innerWidth};
  height: 100%;

  ${media.tablet} {
    display: grid;
    grid-template-columns: 360px 1fr;
    grid-template-rows: 100%;
    border-left: ${({ theme }) => `1px solid ${theme.colors.gray300}`};
    border-right: ${({ theme }) => `1px solid ${theme.colors.gray300}`};
  }
`;

export { SChatWrap, SChatContiner };
