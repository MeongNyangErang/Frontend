import { memo } from 'react';
import { FaUser, FaPaw } from 'react-icons/fa6';
import { FaStar, FaHeart } from 'react-icons/fa';
import Modal from '@shared/components/common/Modal';
import { useSearchAccommodations } from '@hooks/query/useSearchAccommodations';
import useInfiniteScroll from '@shared/hooks/ui/useInfiniteScroll';
import { SectionLayout } from '@components/layouts/SectionLayout';
import ROUTES from '@constants/routes';
import { ACCOMMODATION_TYPE_MAP } from '@constants/accommodation';
import MessageBox from '@shared/components/common/MessageBox';
import Loader from '@shared/components/common/Loader';
import { SearchViewProps } from '@typings/search';
import useSearchWish from './useSearchWish';
import {
  SMessageArea,
  SItems,
  SItem,
  SItemTypeBadge,
  SImageArea,
  STextArea,
  SNameBox,
  SPriceBox,
  SName,
  SRating,
  SPrice,
  SCapacity,
  SItemsBottom,
  SWishButton,
} from './styles';

const SearchListView = ({ currentQuery, currentFilter }: SearchViewProps) => {
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
            {results?.map(
              (
                {
                  accommodationType,
                  accommodationId,
                  accommodationName,
                  thumbnailUrl,
                  totalRating,
                  price,
                  standardPetCount,
                  standardPeopleCount,
                  wishlisted,
                },
                i,
              ) => {
                return (
                  <SItem
                    key={accommodationId.toString() + i.toString()}
                    to={`${ROUTES.accommodationDetail.root(accommodationId)}`}
                    state={{
                      checkInDate: currentQuery.checkInDate,
                      checkOutDate: currentQuery.checkOutDate,
                      peopleCount: currentQuery.peopleCount,
                      petCount: currentQuery.petCount,
                    }}
                  >
                    <SWishButton
                      onClick={(e) => {
                        handleClickWishButton(
                          e,
                          accommodationId,
                          wishlisted,
                          toggleWishStatus,
                        );
                      }}
                      $isActive={wishlisted}
                    >
                      <FaHeart />
                    </SWishButton>
                    <SImageArea>
                      <SItemTypeBadge $type={accommodationType}>
                        {ACCOMMODATION_TYPE_MAP[accommodationType]}
                      </SItemTypeBadge>
                      {thumbnailUrl ? (
                        <img src={thumbnailUrl} alt={accommodationName} />
                      ) : (
                        <div>NO IMAGE</div>
                      )}
                    </SImageArea>
                    <STextArea>
                      <SNameBox>
                        <SName $line={1}>{accommodationName}</SName>
                        <SRating>
                          <FaStar />
                          {totalRating.toString().padEnd(3, '.0')}
                        </SRating>
                      </SNameBox>
                      <SPriceBox>
                        <SCapacity>
                          <div>
                            <FaUser />
                            {standardPeopleCount}
                          </div>
                          <div>
                            <FaPaw />
                            {standardPetCount}
                          </div>
                        </SCapacity>
                        <SPrice $line={1}>
                          <span>1박/</span>
                          {price.toLocaleString()}원~
                        </SPrice>
                      </SPriceBox>
                    </STextArea>
                  </SItem>
                );
              },
            )}
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

export default memo(SearchListView);
