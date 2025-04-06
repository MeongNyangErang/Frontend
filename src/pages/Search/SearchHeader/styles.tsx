import styled from 'styled-components';
import { SSectionWrap } from '@components/layouts/SectionLayout';

const SHeaderWrap = styled(SSectionWrap)`
  position: sticky;
  left: 0;
  top: ${({ theme }) => theme.layouts.headerHeight};
  z-index: 1000;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.gray200}`};
`;

export { SHeaderWrap };
