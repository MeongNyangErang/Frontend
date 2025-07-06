import usePageParam from '@shared/hooks/router/usePageParam';
import usePaginationNavigator from '@shared/hooks/router/usePaginationNavigator';
import { formatUTCTimeToStr } from '@shared/utils/date';
import useReportList from '@admin/hooks/query/useReportList';
import ROUTES from '@admin/constants/routes';
import PaginatedListPage from '@admin/components/templates/PaginatedListPage';
import { SReportItem } from './styles';

const ReportList = () => {
  const currentPage = usePageParam();
  const { data, isLoading, isError } = useReportList(currentPage);
  const { content, totalElements, size } = data || {};

  const onClickPagination = usePaginationNavigator(ROUTES.reports.root);

  return (
    <PaginatedListPage
      title="신고 목록"
      isLoading={isLoading}
      isError={isError}
      content={content}
      currentPage={currentPage}
      totalElements={totalElements}
      size={size}
      onClickPagination={onClickPagination}
      renderListItem={({ reviewReportId, createdAt }) => (
        <SReportItem key={createdAt} to={ROUTES.reports.detail(reviewReportId)}>
          <div>신고ID : {reviewReportId}</div>
          <p>{formatUTCTimeToStr(createdAt, true)}</p>
        </SReportItem>
      )}
    />
  );
};

export default ReportList;
