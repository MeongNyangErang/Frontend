import useHostSignupRequestList from '@admin/hooks/query/useHostSignupRequestList';
import ROUTES from '@admin/constants/routes';
import usePageParam from '@shared/hooks/router/usePageParam';
import usePaginationNavigator from '@shared/hooks/router/usePaginationNavigator';
import PaginatedListPage from '@admin/components/templates/PaginatedListPage';
import { SHostSignupRequestItem } from './styles';

const HostSignupRequestList = () => {
  const currentPage = usePageParam();
  const { data, isLoading, isError } = useHostSignupRequestList(currentPage);
  const { content, totalElements, size } = data || {};

  const onClickPagination = usePaginationNavigator(ROUTES.hosts.root);

  return (
    <>
      <PaginatedListPage
        title="승인 대기 호스트 회원"
        isLoading={isLoading}
        isError={isError}
        currentPage={currentPage}
        totalElements={totalElements}
        size={size}
        onClickPagination={onClickPagination}
        content={content}
        renderListItem={({ hostId, createdAt }) => (
          <SHostSignupRequestItem
            to={ROUTES.hosts.detail(hostId)}
            key={createdAt}
          >
            <p>호스트 ID : {hostId}</p>
            <span>{createdAt}</span>
          </SHostSignupRequestItem>
        )}
      />
    </>
  );
};

export default HostSignupRequestList;
