import { memo, useEffect, useCallback, useState } from 'react';
import { FaUser, FaPaw } from 'react-icons/fa6';
import { FaStar, FaHeart } from 'react-icons/fa';
import Modal from '@components/common/Modal';
import { useSearchAccommodations } from '@hooks/query/useSearchAccommodations';
import useInfiniteScroll from '@hooks/ui/useInfiniteScroll';
import { SectionLayout } from '@components/layouts/SectionLayout';
import { SearchBaseType, SearchFilterType } from '@typings/search';
import ROUTES from '@constants/routes';
import { ACCOMMODATION_TYPE_MAP } from '@constants/accommodation';
import MessageBox from '@components/common/MessageBox';
import Loader from '@components/common/Loader';
import { Accommodation } from '@typings/response/accommodations';
import useAuth from '@hooks/auth/useAuth';
import { addToWishlist, deleteFromWishlist } from '@services/wishlist';
import useWishlist from '@hooks/query/user/useWishlist';
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
import useError from '@hooks/ui/useError';

interface SearchResultProps {
  currentQuery: SearchBaseType;
  currentFilter: SearchFilterType;
}

const SearchResult = ({ currentQuery, currentFilter }: SearchResultProps) => {
  const [searchedData, setSearchedData] = useState<Accommodation[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const {
    data: { last, content, page = 0 } = {},
    isLoading,
    error,
  } = useSearchAccommodations(currentQuery, currentPage, currentFilter);
  const { member } = useAuth();
  const { refreshWishlist } = useWishlist(0);
  const {
    error: wishError,
    updateError: updateWishError,
    resetError: resetWishError,
  } = useError();

  const updatePage = useCallback(() => {
    if (!last) {
      setCurrentPage(page + 1);
    }
  }, [page, last]);

  const observerTargetRef = useInfiniteScroll(
    updatePage,
    !isLoading && !error && !last,
  );
  const handleSuccessAddWish = (accommodationId: number) => {
    setSearchedData((prev) => {
      const targetIndex = prev.findIndex(
        (v) => v.accommodationId === accommodationId,
      );
      const updated = {
        ...prev[targetIndex],
        wishlisted: !prev[targetIndex].wishlisted,
      };
      const updatedResult = prev.map((v, i) => {
        if (i === targetIndex) return updated;
        return v;
      });
      return updatedResult;
    });
    refreshWishlist();
  };

  const handleClickWishButton = async (
    e: React.MouseEvent,
    accommodationId: number,
    wishlisted: boolean,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (!member.data || member.data.role === 'HOST') {
      updateWishError('로그인한 사용자만 이용 할 수 있습니다.');
      return;
    }

    try {
      !wishlisted
        ? await addToWishlist(accommodationId)
        : await deleteFromWishlist(accommodationId);
      handleSuccessAddWish(accommodationId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setCurrentPage(0);
  }, [currentQuery, currentFilter]);

  useEffect(() => {
    if (!content) return;
    console.log('content 변경', content);
    if (currentPage === 0) {
      setSearchedData([...content]);
    } else {
      setSearchedData((prev) => [...prev, ...content]);
    }
  }, [content]);

  return (
    <>
      <SectionLayout>
        <SMessageArea>
          {error && <MessageBox>{error.message}</MessageBox>}
          {!error && !isLoading && searchedData.length === 0 && (
            <MessageBox>검색 결과가 없습니다.</MessageBox>
          )}
        </SMessageArea>
        {!error && (
          <SItems>
            {searchedData.map(
              ({
                accommodationType,
                accommodationId,
                accommodationName,
                thumbnailUrl,
                totalRating,
                price,
                standardPetCount,
                standardPeopleCount,
                wishlisted,
              }) => {
                return (
                  <SItem
                    key={accommodationId}
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
                        handleClickWishButton(e, accommodationId, wishlisted);
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

export default memo(SearchResult);
