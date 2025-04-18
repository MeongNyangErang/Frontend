import logoImage from '@assets/images/logo-black.png';
import { SFooterWrap, SFooterLogo } from './styles';

const Footer = () => {
  return (
    <SFooterWrap>
      <SFooterLogo>
        <img src={logoImage} alt="로고" />
      </SFooterLogo>
    </SFooterWrap>
  );
};

export default Footer;
