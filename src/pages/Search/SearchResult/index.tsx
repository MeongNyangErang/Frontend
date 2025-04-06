import { memo } from 'react';
import { FaUser, FaPaw } from 'react-icons/fa6';
import { FaStar } from 'react-icons/fa';
import { useSearchAccommodations } from '@hooks/query/useSearchAccommodations';
import { SectionLayout } from '@components/layouts/SectionLayout';
import { SearchQuery, SearchFilterType } from '@typings/search';
import ROUTES from '@constants/routes';
import { ACCOMMODATION_TYPE_MAP } from '@constants/accommodation';
import MessageBox from '@components/common/MessageBox';
import Loader from '@components/common/Loader';

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
} from './styles';

interface SearchResultProps {
  currentQuery: SearchQuery;
  currentFilter: SearchFilterType;
}

const SearchResult = ({ currentQuery, currentFilter }: SearchResultProps) => {
  const { data, isLoading, error } = useSearchAccommodations(
    currentQuery,
    currentFilter,
  );

  if (isLoading) {
    return (
      <MessageBox>
        <Loader loading color="grayBorder" size={8} />
      </MessageBox>
    );
  }
  if (error) {
    return <MessageBox>{error.message}</MessageBox>;
  }

  return (
    <SectionLayout>
      <SItems>
        {data?.content.map(
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
                to={`${ROUTES.detail(accommodationId.toString())}`}
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
    </SectionLayout>
  );
};

export default memo(SearchResult);
