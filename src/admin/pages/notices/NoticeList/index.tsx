import { useNavigate } from 'react-router-dom';
import Button from '@shared/components/common/Button';
import ROUTES from '@admin/constants/routes';
import PaginatedListPage from '@admin/components/templates/PaginatedListPage';
import usePageParam from '@shared/hooks/router/usePageParam';
import useNoticeList from '@admin/hooks/query/useNoticeList';
import usePaginationNavigator from '@shared/hooks/router/usePaginationNavigator';
import { SNoticeItem } from './styles';

const NoticeList = () => {
  const currentPage = usePageParam();
  const { data, isLoading, isError } = useNoticeList(currentPage);
  const { content, totalElements, size } = data || {};
  const onClickPagination = usePaginationNavigator(ROUTES.notices.root);

  const navigate = useNavigate();
  const handleClickNewNoticeButton = () => {
    navigate(ROUTES.notices.new);
  };

  return (
    <>
      <PaginatedListPage
        title="공지사항 목록"
        currentPage={currentPage}
        isLoading={isLoading}
        isError={isError}
        content={content}
        totalElements={totalElements}
        size={size}
        onClickPagination={onClickPagination}
        renderListItem={({ noticeId, title, createdAt }) => (
          <SNoticeItem to={ROUTES.notices.detail(noticeId)} key={noticeId}>
            <h3>{title}</h3>
            <span>{createdAt}</span>
          </SNoticeItem>
        )}
      />
      <Button
        onClick={handleClickNewNoticeButton}
        variant="grayBorder"
        fontSize="14px"
        fullWidth
        fixedHeight
      >
        새 공지 작성
      </Button>
    </>
  );
};

export default NoticeList;
