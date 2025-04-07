import styled from 'styled-components';
import {
  SSectionWrap,
  SSectionContainer,
} from '@components/layouts/SectionLayout';
import { media } from '@components/styles/responsive';

const SSignUpWrap = styled(SSectionWrap)`
  ${media.mobile} {
    background-color: ${({ theme }) => theme.colors.gray100};
  }
`;

const SSignUpContainer = styled(SSectionContainer)`
  min-height: 100vh;
  max-width: 480px;
`;

export { SSignUpWrap, SSignUpContainer };
