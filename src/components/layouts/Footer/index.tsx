import { RiNotionLine } from 'react-icons/ri';
import { FaGithub } from 'react-icons/fa';
import logoImage from '@assets/images/logo-black.png';
import {
  SFooterWrap,
  SFooterContainer,
  SFooterLogo,
  STeamProflie,
  SSocialLinks,
  SSocialLink,
} from './styles';

const Footer = () => {
  return (
    <SFooterWrap>
      <SFooterContainer>
        <SFooterLogo>
          <img src={logoImage} alt="로고" />
        </SFooterLogo>
        <STeamProflie>
          <div>멍냥2조</div>
          <p>Front-End: 김세현 박민주</p>
          <p>Back-End: 강석진 이의재 유호준</p>
        </STeamProflie>
        <SSocialLinks>
          <SSocialLink
            className="notion"
            href="https://www.notion.so/1b9f11e7008e80f1b4d6f911ddba30a0"
            target="blank"
          >
            <RiNotionLine />
          </SSocialLink>
          <SSocialLink
            className="github"
            href="https://github.com/MeongNyangErang"
            target="blank"
          >
            <FaGithub />
          </SSocialLink>
        </SSocialLinks>
      </SFooterContainer>
    </SFooterWrap>
  );
};

export default Footer;
