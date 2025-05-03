import MessageBox from '@shared/components/common/MessageBox';
import Loader from '@shared/components/common/Loader';
import Pagination from '@shared/components/common/Pagination';
import { SSubPageTitle } from '@admin/components/styles/mixins';
import { SListWrap, SPaginationWrap } from './styles';

type PaginatedListPageProps<T> = {
  title: string;
  isLoading: boolean;
  isError: boolean;
  content: T[] | undefined;
  currentPage: number;
  totalElements: number | undefined;
  size: number | undefined;
  renderListItem: (item: T, index: number) => React.ReactNode;
  onClickPagination: (page: number) => void;
};

const PaginatedListPage = <T,>({
  title,
  isLoading,
  isError,
  content,
  currentPage,
  totalElements,
  size,
  renderListItem,
  onClickPagination,
}: PaginatedListPageProps<T>) => {
  if (isLoading) {
    return (
      <>
        <SSubPageTitle>{title}</SSubPageTitle>
        <MessageBox variant="light">
          <Loader color="grayBorder" size={8} loading />
        </MessageBox>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <SSubPageTitle>{title}</SSubPageTitle>
        <MessageBox variant="light">
          데이터를 불러오는데 실패했습니다.
        </MessageBox>
      </>
    );
  }

  return (
    <>
      <SSubPageTitle>{title}</SSubPageTitle>
      <SListWrap>{content?.map(renderListItem)}</SListWrap>
      {totalElements && size && (
        <SPaginationWrap>
          <Pagination
            totalResults={totalElements}
            size={size}
            currentPage={currentPage}
            onClick={onClickPagination}
          />
        </SPaginationWrap>
      )}
    </>
  );
};

export default PaginatedListPage;
