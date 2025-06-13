import { SSubPageTitle } from '@admin/components/styles/mixins';
import NoticeForm from '@admin/components/common/NoticeForm';

const NoticeCreate = () => {
  return (
    <>
      <SSubPageTitle>공지 작성</SSubPageTitle>
      <NoticeForm type="new" />
    </>
  );
};

export default NoticeCreate;
