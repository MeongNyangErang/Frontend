import { memo } from 'react';
import { useSearchAccommodations } from '@hooks/query/useSearchAccommodations';
import { FaStar } from 'react-icons/fa';
import { SearchQuery, SearchFilterType } from '@typings/search';
import ROUTES from '@constants/routes';
import { FaUser, FaDog } from 'react-icons/fa6';

import {
  SResultWrap,
  SItems,
  SItem,
  SImageArea,
  STextArea,
  SNameBox,
  SPriceBox,
  SName,
  SRating,
  SPrice,
  SCapacity,
} from './styles';

interface Props {
  currentQuery: SearchQuery;
  currentFilter: SearchFilterType;
}

const SearchResult = ({ currentQuery, currentFilter }: Props) => {
  const { data, isLoading, error } = useSearchAccommodations(
    currentQuery,
    currentFilter,
  );

  if (isLoading) {
    return <>loading...</>;
  }
  if (error) {
    return <>error occurred</>;
  }
  return (
    <SResultWrap>
      <SItems>
        {data?.content.map(
          ({
            accommodationId,
            name,
            thumbnailImageUrl,
            totalRating,
            minPrice,
          }) => {
            return (
              <SItem
                key={accommodationId}
                to={`${ROUTES.detail(accommodationId.toString())}`}
              >
                <SImageArea>
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
                        <FaDog />2
                      </div>
                    </SCapacity>
                    <SPrice $line={1}>{minPrice.toLocaleString()}원</SPrice>
                  </SPriceBox>
                </STextArea>
              </SItem>
            );
          },
        )}
      </SItems>
    </SResultWrap>
  );
};

export default memo(SearchResult);
