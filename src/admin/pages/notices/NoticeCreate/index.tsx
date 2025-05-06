import { SSubPageTitle } from '@admin/components/styles/mixins';
import NoticeRegisterForm from '@admin/components/common/NoticeRegisterForm';

const NoticeCreate = () => {
  return (
    <>
      <SSubPageTitle>공지 작성</SSubPageTitle>
      <NoticeRegisterForm />
    </>
  );
};

export default NoticeCreate;
