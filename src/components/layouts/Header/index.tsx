import logoImage from '@assets/images/logo.png';
import ROUTES from '@constants/routes';

import {
  SHeader,
  SContainer,
  SNavArea,
  SLogo,
  SMainNav,
  SNavItem,
} from './styles';
import UserMenu from './UserMenu';

const mainMenu = [
  { name: '숙소 찾기', path: ROUTES.search },
  { name: '공지사항', path: '' },
] as const;

const Header = () => {
  return (
    <SHeader>
      <SContainer>
        <SNavArea>
          <SLogo to={ROUTES.home}>
            <img src={logoImage} alt="멍냥이랑" />
          </SLogo>
          <SMainNav>
            {mainMenu.map(({ name, path }) => {
              return (
                <SNavItem to={path} key={name}>
                  {name}
                </SNavItem>
              );
            })}
          </SMainNav>
        </SNavArea>
        <UserMenu />
      </SContainer>
    </SHeader>
  );
};

export default Header;
