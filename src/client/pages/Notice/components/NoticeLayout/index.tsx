import { ReactNode } from 'react';
import { SContainer, SPageContent, SPageTitle } from './styles';

interface NotieLayoutProps {
  children: ReactNode;
}

const NoticeLayout = ({ children }: NotieLayoutProps) => {
  return (
    <SContainer>
      <SPageTitle>
        <h2>공지사항</h2>
      </SPageTitle>
      <SPageContent>{children}</SPageContent>
    </SContainer>
  );
};

export default NoticeLayout;
