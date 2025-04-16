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
  const [cursor, setCursor] = useState<number | null>(null);
  const {
    data: { last, content } = {},
    isLoading,
    error,
  } = useSearchAccommodations(currentQuery, cursor, currentFilter);

  const updateCursor = useCallback(() => {
    if (content) {
      const id = content[content.length - 1].accommodationId;
      setCursor(id);
    }
  }, [content]);

  const observerTargetRef = useInfiniteScroll(
    updateCursor,
    !isLoading && !error && !last,
  );

  useEffect(() => {
    if (!content) return;
    setSearchedData((prev) => [...prev, ...content]);
  }, [content]);

  useEffect(() => {
    setSearchedData([]);
    setCursor(null);
  }, [currentQuery, currentFilter]);

  return (
    <SectionLayout>
      <SMessageArea>
        {error && <MessageBox>{error.message}</MessageBox>}
        {!error && !isLoading && searchedData.length === 0 && (
          <MessageBox>검색 결과가 없습니다.</MessageBox>
        )}
      </SMessageArea>
      {!error && !isLoading && (
        <SItems>
          {searchedData.map(
            ({
              accommodationType,
              accommodationId,
              accommodationName,
              thumbnailImageUrl,
              totalRating,
              price,
            }) => {
              return (
                <SItem
                  key={accommodationId}
                  to={`${ROUTES.accommodationDetail.root(accommodationId)}`}
                >
                  <SImageArea>
                    <SItemTypeBadge $type={accommodationType}>
                      {ACCOMMODATION_TYPE_MAP[accommodationType]}
                    </SItemTypeBadge>
                    {thumbnailImageUrl ? (
                      <img src={thumbnailImageUrl} alt={accommodationName} />
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
                          <FaUser />2
                        </div>
                        <div>
                          <FaPaw />2
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
