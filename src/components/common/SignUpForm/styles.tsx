import { media } from '@components/styles/responsive';
import styled, { css } from 'styled-components';

const verticalStyle = css`
  display: flex;
  flex-direction: column;
  row-gap: 24px;
`;

const SWrap = styled.div`
  ${verticalStyle}
  padding: ${({ theme }) => `${theme.layouts.paddingX} 0 60px`};

  ${media.mobile} {
    padding: ${({ theme }) =>
      `${theme.layouts.paddingX} ${theme.layouts.paddingX} 60px`};
  }
`;

const SForm = styled.form`
  ${verticalStyle}
`;

export { SWrap, SForm };
