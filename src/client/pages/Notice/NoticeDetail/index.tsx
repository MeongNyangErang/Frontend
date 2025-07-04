import ROUTES from '@constants/routes';
import useNumericParam from '@shared/hooks/router/useNumericParam';
import useNoticeDetail from '@hooks/page/useNoticeDetail';

const NoticeDetail = () => {
  const numericNoticeId = useNumericParam('noticeId', ROUTES.notice.list);

  if (!numericNoticeId) return null;

  const { data, isLoading, error } = useNoticeDetail(numericNoticeId);

  if (isLoading) return null;

  if (error || !data) return <></>;

  return <></>;
};

export default NoticeDetail;
