import { memo, useEffect, useCallback, useState } from 'react';
import { FaUser, FaPaw } from 'react-icons/fa6';
import { FaStar } from 'react-icons/fa';
import { useSearchAccommodations } from '@hooks/query/useSearchAccommodations';
import useInfiniteScroll from '@hooks/ui/useInfiniteScroll';
import { SectionLayout } from '@components/layouts/SectionLayout';
import { SearchQuery, SearchFilterType } from '@typings/search';
import ROUTES from '@constants/routes';
import { ACCOMMODATION_TYPE_MAP } from '@constants/accommodation';
import MessageBox from '@components/common/MessageBox';
import Loader from '@components/common/Loader';
import { Accommodation } from '@typings/response/accommodations';

import {
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
  currentQuery: SearchQuery;
  currentFilter: SearchFilterType;
}

const SearchResult = ({ currentQuery, currentFilter }: SearchResultProps) => {
  const [searchedData, setSearchedData] = useState<Accommodation[]>([]);
  const [cursor, setCursor] = useState<number | null>(null);
  const {
    data: { hasNext, nextCursor, content } = {},
    isLoading,
    error,
  } = useSearchAccommodations(currentQuery, cursor, currentFilter);

  const updateCursor = useCallback(() => {
    if (nextCursor) setCursor(nextCursor);
  }, [nextCursor]);

  const observerTargetRef = useInfiniteScroll(
    updateCursor,
    !isLoading && !!hasNext,
  );

  useEffect(() => {
    if (!content) return;
    setSearchedData((prev) => [...prev, ...content]);
  }, [content]);

  useEffect(() => {
    setSearchedData([]);
    setCursor(null);
  }, [currentQuery, currentFilter]);

  if (error) return <MessageBox>{error.message}</MessageBox>;

  return (
    <SectionLayout>
      <SItems>
        {searchedData.map(
          ({
            type,
            accommodationId,
            name,
            thumbnailImageUrl,
            totalRating,
            minPrice,
          }) => {
            return (
              <SItem
                key={accommodationId}
                to={`${ROUTES.accommodationDetail.root(accommodationId)}`}
              >
                <SImageArea>
                  <SItemTypeBadge $type={type}>
                    {ACCOMMODATION_TYPE_MAP[type]}
                  </SItemTypeBadge>
                  {thumbnailImageUrl ? (
                    <img src={thumbnailImageUrl} alt={name} />
                  ) : (
                    <div>NO IMAGE</div>
                  )}
                </SImageArea>
                <STextArea>
                  <SNameBox>
                    <SName $line={1}>{name}</SName>
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
                      {minPrice.toLocaleString()}원~
                    </SPrice>
                  </SPriceBox>
                </STextArea>
              </SItem>
            );
          },
        )}
      </SItems>
      <SItemsBottom ref={observerTargetRef}>
        <Loader loading={isLoading} color="grayBorder" size={8} />
      </SItemsBottom>
    </SectionLayout>
  );
};

export default memo(SearchResult);
