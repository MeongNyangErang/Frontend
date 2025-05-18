import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { ellipsisStyle } from '@shared/components/styles/mixins';
import { media } from '@shared/components/styles/responsive';
import { AccommodationType } from '@typings/response/accommodations';

const SMessageArea = styled.div`
  padding: 20px 0;
`;

const SItems = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  column-gap: 16px;
  row-gap: 40px;
  padding: ${({ theme }) => `${theme.layouts.paddingX} 0 60px`};

  ${media.mobile} {
    grid-template-columns: 1fr 1fr;
  }

  ${media.desktop} {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const SItemsBottom = styled.div`
  padding: ${({ theme }) => theme.layouts.paddingX};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10px;
`;

export { SMessageArea, SItems, SItemsBottom };
