import { FaChevronRight } from 'react-icons/fa';
import useNoticeList from '@hooks/query/useNoticeList';
import useInfiniteScroll from '@shared/hooks/ui/useInfiniteScroll';
import Loader from '@shared/components/common/Loader';
import { formatUTCTimeToStr } from '@shared/utils/date';
import {
  SContainer,
  SPageTitle,
  SPageContent,
  SNoticeList,
  SNoticeListBottom,
  SNoticeItem,
  SNoticeTitle,
  SNoticeCreatedAt,
} from './styles';
import ROUTES from '@constants/routes';

const NoticeList = () => {
  const { result, isLoading, error, fetchNextPage, hasNextPage } =
    useNoticeList();

  const observerTargetRef = useInfiniteScroll(
    fetchNextPage,
    !isLoading && !error && hasNextPage,
  );

  return (
    <SContainer>
      <SPageTitle>
        <h2>공지사항</h2>
      </SPageTitle>
      <SPageContent>
        <SNoticeList>
          {result.map(({ title, createdAt, noticeId }) => (
            <SNoticeItem key={noticeId} to={ROUTES.notice.detail(noticeId)}>
              <div>
                <SNoticeTitle>{title}</SNoticeTitle>
                <SNoticeCreatedAt>
                  {formatUTCTimeToStr(createdAt)}
                </SNoticeCreatedAt>
              </div>
              <i>
                <FaChevronRight />
              </i>
            </SNoticeItem>
          ))}
        </SNoticeList>
        <SNoticeListBottom ref={observerTargetRef}>
          {isLoading && <Loader loading color="grayBorder" size={8} />}
        </SNoticeListBottom>
      </SPageContent>
    </SContainer>
  );
};

export default NoticeList;
