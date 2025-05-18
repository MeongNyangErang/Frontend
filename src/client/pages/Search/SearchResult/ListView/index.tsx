import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '@shared/components/common/Modal';
import { useSearchAccommodations } from '@hooks/query/useSearchAccommodations';
import useInfiniteScroll from '@shared/hooks/ui/useInfiniteScroll';
import { SectionLayout } from '@components/layouts/SectionLayout';
import MessageBox from '@shared/components/common/MessageBox';
import Loader from '@shared/components/common/Loader';
import { SearchViewProps } from '@typings/search';
import ROUTES from '@constants/routes';
import SearchItemCard from '../ListItemCard';
import useSearchWish from '../useSearchWish';
import { SMessageArea, SItems, SItemsBottom } from './styles';

const ListView = ({ currentQuery, currentFilter }: SearchViewProps) => {
  const {
    results,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    toggleWishStatus,
  } = useSearchAccommodations(currentQuery, currentFilter);

  const observerTargetRef = useInfiniteScroll(
    fetchNextPage,
    !isLoading && !error && hasNextPage,
  );

  const { wishError, resetWishError, handleClickWishButton } = useSearchWish();

  const navigate = useNavigate();

  const onClickWishButton = useCallback(
    (e: React.MouseEvent, accommodationId: number, wishListed: boolean) => {
      handleClickWishButton(e, accommodationId, wishListed, toggleWishStatus);
    },
    [toggleWishStatus],
  );

  const onClickCard = useCallback(
    (accommodationId: number) =>
      navigate(ROUTES.accommodationDetail.root(accommodationId), {
        state: {
          checkInDate: currentQuery.checkInDate,
          checkOutDate: currentQuery.checkOutDate,
          peopleCount: currentQuery.peopleCount,
          petCount: currentQuery.petCount,
        },
      }),
    [navigate, currentQuery],
  );

  if (error) {
    return (
      <SMessageArea>
        <MessageBox>{error.message}</MessageBox>
      </SMessageArea>
    );
  }

  return (
    <>
      <SectionLayout>
        {!isLoading && results.length === 0 && (
          <SMessageArea>
            <MessageBox>검색 결과가 없습니다.</MessageBox>
          </SMessageArea>
        )}
        {!error && (
          <SItems>
            {results?.map(({ longitude, latitude, ...rest }, index) => (
              <SearchItemCard
                key={longitude.toString() + index.toString()}
                {...rest}
                onClickCard={onClickCard}
                onClickWishButton={onClickWishButton}
              />
            ))}
          </SItems>
        )}
        <SItemsBottom ref={observerTargetRef}>
          {isLoading && <Loader loading color="grayBorder" size={8} />}
        </SItemsBottom>
      </SectionLayout>
      <Modal
        variant="centered"
        closeType="none"
        role="alert"
        isOpen={!!wishError}
        onClose={() => {
          resetWishError();
        }}
      >
        {wishError}
      </Modal>
    </>
  );
};

export default memo(ListView);
