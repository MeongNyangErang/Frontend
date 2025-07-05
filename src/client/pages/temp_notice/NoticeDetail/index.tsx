import ROUTES from '@constants/routes';
import useNumericParam from '@shared/hooks/router/useNumericParam';
import useNoticeDetail from '@hooks/page/useNoticeDetail';
import MessageBox from '@shared/components/common/MessageBox';
import { formatUTCTimeToStr } from '@shared/utils/date';
import NoticeLayout from '../components/NoticeLayout';
import { SNoticeHeader, SNoticeBody } from './styles';

const NoticeDetail = () => {
  const numericNoticeId = useNumericParam('noticeId', ROUTES.notice.list);

  if (!numericNoticeId) return null;

  const { data, isLoading, error } = useNoticeDetail(numericNoticeId);

  if (isLoading) return null;

  if (error || !data)
    return (
      <NoticeLayout>
        <MessageBox>공지사항을 불러오지 못했습니다.</MessageBox>
      </NoticeLayout>
    );

  const { title, createdAt, content, noticeImageUrl } = data;

  return (
    <NoticeLayout>
      <SNoticeHeader>
        <h3>{title}</h3>
        <p>{formatUTCTimeToStr(createdAt)}</p>
      </SNoticeHeader>
      <SNoticeBody>
        {noticeImageUrl && <img src={noticeImageUrl} alt={title} />}
        {content}
      </SNoticeBody>
    </NoticeLayout>
  );
};

export default NoticeDetail;
