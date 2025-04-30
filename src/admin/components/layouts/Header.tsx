import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logoImage from '@shared/assets/images/logo.png';

const Header = () => {
  return (
    <SHeaderWrap>
      <SHeaderContainer>
        <SHeaderLogo to="/">
          <img src={logoImage} alt="멍냥이랑" />
        </SHeaderLogo>
      </SHeaderContainer>
    </SHeaderWrap>
  );
};

export default Header;

const SHeaderWrap = styled.header`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: ${({ theme }) => theme.layouts.headerHeight};
  padding: ${({ theme }) => `0 ${theme.layouts.paddingX}`};
  background-color: #fff;
  box-shadow: ${({ theme }) => theme.shadow.bottom};
`;

const SHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  height: 100%;
  max-width: ${({ theme }) => theme.layouts.adminWidth};
  width: 100%;
`;

const SHeaderLogo = styled(Link)`
  width: 100px;

  > img {
    display: block;
    width: 100%;
  }
`;
