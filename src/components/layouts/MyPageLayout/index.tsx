import { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '@hooks/auth/useAuth';
import ROUTES from '@constants/routes';
import { HOST_MY_PAGE_MENU, USER_MY_PAGE_MENU } from '@constants/myPage';
import {
  SMyPageWrap,
  SMyPageContainer,
  SMyPageGrid,
  SMyPageMenuBar,
  SMyPageContents,
  SMyPageMenuLink,
} from './styles';

interface MyPageLayoutProps {
  children: ReactNode;
}

const MyPageLayout = () => {
  const {
    member: { data, authLoading },
  } = useAuth();
  const menu = data?.role === 'user' ? USER_MY_PAGE_MENU : HOST_MY_PAGE_MENU;

  if (!data) return <Navigate to={ROUTES.home} />;

  return (
    <SMyPageWrap>
      <SMyPageContainer>
        <SMyPageGrid>
          <SMyPageMenuBar>
            <h2>마이페이지</h2>
            <div>
              {menu.map(({ name, path }) => {
                return (
                  <SMyPageMenuLink to={path} key={name}>
                    <span>{name}</span>
                  </SMyPageMenuLink>
                );
              })}
            </div>
          </SMyPageMenuBar>
          <SMyPageContents>
            <Outlet />
          </SMyPageContents>
        </SMyPageGrid>
      </SMyPageContainer>
    </SMyPageWrap>
  );
};

export default MyPageLayout;
