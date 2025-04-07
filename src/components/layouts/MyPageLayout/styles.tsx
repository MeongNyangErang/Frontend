import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { media } from '@components/styles/responsive';

const SMyPageWrap = styled.div`
  padding: ${({ theme }) => `0 ${theme.layouts.paddingX}`};
  min-height: ${({ theme }) =>
    `calc(100vh - ${theme.layouts.headerHeight} - ${theme.layouts.footerHeight})`};
  background-color: #fff;
`;

const SMyPageContainer = styled.div`
  margin: 0 auto;
  padding-top: 20px;
  max-width: ${({ theme }) => theme.layouts.innerWidth};

  ${media.tablet} {
    padding-top: 60px;
  }
`;

const SMyPageGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  ${media.desktop} {
    column-gap: 40px;
    grid-template-columns: 180px 1fr;
  }
`;

const SMyPageMenuBar = styled.aside`
  display: none;

  ${media.desktop} {
    display: block;
    > h2 {
      font-size: 20px;
      font-weight: 500;
      padding-bottom: ${({ theme }) => theme.layouts.paddingX};
      margin-bottom: 4px;
      border-bottom: ${({ theme }) => `1.5px solid ${theme.colors.gray300}`};
    }

    > div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      row-gap: 8px;
    }
  }
`;

const SMyPageMenuLink = styled(NavLink)`
  padding: ${({ theme }) => `12px ${theme.layouts.paddingX}`};
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray600};
  transition: ${({ theme }) => theme.transition.default};

  &:not(.active):hover {
    color: ${({ theme }) => theme.colors.gray800};
  }

  &.active {
    color: ${({ theme }) => theme.colors.sub};
  }
`;

const SMyPageContents = styled.div`
  padding-bottom: 30px;
`;

export {
  SMyPageWrap,
  SMyPageContainer,
  SMyPageGrid,
  SMyPageMenuBar,
  SMyPageContents,
  SMyPageMenuLink,
};
