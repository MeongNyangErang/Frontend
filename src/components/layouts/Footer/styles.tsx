import styled from 'styled-components';

const SFooterWrap = styled.footer`
  padding-bottom: ${({ theme }) => theme.layouts.mobileNavHeight};
  height: ${({ theme }) => theme.layouts.footerHeight};
  background-color: ${({ theme }) => theme.colors.gray100};
`;

const SFooterLogo = styled.h2`
  width: 124px;

  > img {
    width: 100%;
    opacity: 0.2;
  }
`;

const SSocialLinks = styled.div;

export { SFooterWrap, SFooterLogo, SSocialLinks };
