import { memo, useEffect, useCallback, useState } from 'react';
import { FaUser, FaPaw } from 'react-icons/fa6';
import { FaStar } from 'react-icons/fa';
import { useSearchAccommodations } from '@hooks/query/useSearchAccommodations';
import useInfiniteScroll from '@hooks/ui/useInfiniteScroll';
import { SectionLayout } from '@components/layouts/SectionLayout';
import { SearchBaseType, SearchFilterType } from '@typings/search';
import ROUTES from '@constants/routes';
import { ACCOMMODATION_TYPE_MAP } from '@constants/accommodation';
import MessageBox from '@components/common/MessageBox';
import Loader from '@components/common/Loader';
import { Accommodation } from '@typings/response/accommodations';

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
} from './styles';

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

  const updatePage = useCallback(() => {
    if (!last) {
      setCurrentPage(page + 1);
    }
  }, [page, last]);

  const observerTargetRef = useInfiniteScroll(
    updatePage,
    !isLoading && !error && !last,
  );

  useEffect(() => {
    setSearchedData([]);
    setCurrentPage(0);
  }, [currentQuery, currentFilter]);

  useEffect(() => {
    if (!content) return;
    setSearchedData((prev) => [...prev, ...content]);
  }, [content]);

  return (
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
  );
};

export default memo(SearchResult);
