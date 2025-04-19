import { media } from '@components/styles/responsive';
import styled from 'styled-components';

const SFooterWrap = styled.footer`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => ` 0 ${theme.layouts.paddingX}`};
  height: ${({ theme }) => theme.layouts.footerHeight};
  background-color: ${({ theme }) => theme.colors.gray100};
`;

const SFooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: ${({ theme }) => theme.layouts.innerWidth};
  width: 100%;
  margin: 0 auto;

  ${media.tablet} {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const SFooterLogo = styled.h2`
  width: 92px;

  > img {
    width: 100%;
    opacity: 0.2;
  }

  ${media.tablet} {
    margin-right: 132px;
    width: 112px;
  }
`;

const STeamProflie = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 8px 0 12px;

  > div {
    margin-bottom: 4px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray700};
  }

  > p {
    font-size: 13px;
    color: ${({ theme }) => theme.colors.gray600};
  }

  ${media.tablet} {
    flex: 1;
    align-items: flex-start;
    margin: 0;
  }
`;

const SSocialLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
`;

const SSocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  color: ${({ theme }) => theme.colors.gray700};
  font-size: 22px;

  &.notion {
    font-size: 26px;
  }
`;

export {
  SFooterWrap,
  SFooterContainer,
  SFooterLogo,
  STeamProflie,
  SSocialLinks,
  SSocialLink,
};
