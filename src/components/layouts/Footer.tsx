import styled from 'styled-components';

const Footer = () => {
  return <SFooter>푸터영역</SFooter>;
};

export default Footer;

const SFooter = styled.footer`
  padding-bottom: ${({ theme }) => theme.layouts.navHeight};
  height: ${({ theme }) => theme.layouts.footerHeight};
  background-color: ${({ theme }) => theme.colors.gray300};
`;
