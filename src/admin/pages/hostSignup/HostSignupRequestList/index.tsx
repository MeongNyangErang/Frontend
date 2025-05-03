import { useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Pagination from '@shared/components/common/Pagination';
import { SSubPageTitle } from '@admin/components/styles/mixins';
import useHostSignupRequestList from '@admin/hooks/query/useHostSignupRequestList';
import ROUTES from '@admin/constants/routes';
import {
  SHostSignupRequestList,
  SHostSignupRequestItem,
  SPaginationWrap,
} from './styles';

const HostSignupRequestList = () => {
  const [param] = useSearchParams();
  const page = Number(param.get('page'));
  const currentPage = !Number.isNaN(page) && page >= 0 ? page : 0;
  const navigate = useNavigate();
  const {
    data: { data: { content, size, totalElements } = {} } = {},
    isLoading,
    error,
  } = useHostSignupRequestList(currentPage);

  const onClickPagination = useCallback((page: number) => {
    navigate(ROUTES.hosts.root(page));
  }, []);

  return (
    <>
      <SSubPageTitle>승인 대기 호스트 회원</SSubPageTitle>
      {!error && (
        <SHostSignupRequestList>
          {content?.map(({ hostId, createdAt }) => (
            <SHostSignupRequestItem
              to={ROUTES.hosts.detail(hostId)}
              key={createdAt}
            >
              <p>호스트 ID : {hostId}</p>
              <span>{createdAt}</span>
            </SHostSignupRequestItem>
          ))}
        </SHostSignupRequestList>
      )}
      {typeof totalElements === 'number' && typeof size === 'number' && (
        <SPaginationWrap>
          <Pagination
            currentPage={page}
            totalResults={totalElements}
            size={size}
            onClick={onClickPagination}
          />
        </SPaginationWrap>
      )}
    </>
  );
};

export default HostSignupRequestList;
