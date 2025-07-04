import NoticeForm from '@admin/components/common/NoticeForm';
import { SSubPageTitle } from '@admin/components/styles/mixins';
import ROUTES from '@admin/constants/routes';
import useNumericParam from '@shared/hooks/router/useNumericParam';
import useNoticeDetail from '@admin/hooks/page/useNoticeDetail';
import MessageBox from '@shared/components/common/MessageBox';

const NoticeEdit = () => {
  const numericParam = useNumericParam('noticeId', ROUTES.notices.root(0));

  if (!numericParam) return null;

  const { data, isLoading, error } = useNoticeDetail(numericParam);

  if (isLoading) return null;

  if (!data || error) {
    return (
      <>
        <SSubPageTitle>공지 수정</SSubPageTitle>
        <MessageBox variant="light">
          데이터를 불러오는데 실패했습니다.
        </MessageBox>
      </>
    );
  }

  return (
    <>
      <SSubPageTitle>공지 수정</SSubPageTitle>
      <NoticeForm type="edit" initialData={data} />
    </>
  );
};

export default NoticeEdit;
