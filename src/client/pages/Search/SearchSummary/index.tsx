import { FaLocationDot } from 'react-icons/fa6';
import { SearchBaseType } from '@typings/search';
import { formatDateStrToMonthAndDay } from '@utils/date';
import {
  SSearchSummaryWrap,
  SSearchKeyword,
  SSearchConditions,
  SDate,
  SCount,
} from './styles';

interface SearchSummaryProps {
  currentQuery: SearchBaseType;
  onClick(): void;
}

const SearchSummary = ({ currentQuery, onClick }: SearchSummaryProps) => {
  const { location, checkInDate, checkOutDate, peopleCount, petCount } =
    currentQuery;

  return (
    <SSearchSummaryWrap role="button" tabIndex={0} onClick={onClick}>
      <SSearchKeyword>
        <FaLocationDot />
        {location}
      </SSearchKeyword>
      <SSearchConditions>
        <SDate>
          <span>{formatDateStrToMonthAndDay(checkInDate)}</span>
          <span>-</span>
          <span>{formatDateStrToMonthAndDay(checkOutDate)}</span>
        </SDate>
        ·
        <SCount>
          <span>
            인원
            {peopleCount}
          </span>
          <span>
            반려동물
            {petCount}
          </span>
        </SCount>
      </SSearchConditions>
    </SSearchSummaryWrap>
  );
};

export default SearchSummary;
