import styled, { css } from 'styled-components';
import { BREAK_POINTS } from '@shared/components/styles/responsive';

const paddingBox = css`
  padding: ${({ theme }) => `0 ${theme.layouts.paddingX}`};
`;

const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: ${({ theme }) =>
    `calc(100vh - ${theme.layouts.headerHeight} - ${theme.layouts.footerHeight})`};
`;

const SPageTitle = styled.div`
  ${paddingBox}
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  background-color: ${({ theme }) => theme.colors.gray100};

  h2 {
    font-size: 20px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray700};
  }
`;

const SPageContent = styled.div`
  ${paddingBox}
  flex: 1;
  margin: 0 auto 52px;
  width: 100%;
  max-width: ${BREAK_POINTS.tablet};
`;

export { SContainer, SPageTitle, SPageContent };
