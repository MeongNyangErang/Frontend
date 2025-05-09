import { memo } from 'react';
import filterIcon from '@assets/icons/filterIcon.png';
import sortIcon from '@assets/icons/sortIcon.png';
import {
  SSearchControlsWrap,
  SSearchControlsContainer,
  SFilterButton,
  SSortButton,
} from './styles';

interface Props {
  isFiltered: boolean;
  onOpenFilter(): void;
}

const SearchControls = ({ onOpenFilter, isFiltered }: Props) => {
  return (
    <SSearchControlsWrap>
      <SSearchControlsContainer>
        <SFilterButton
          className={isFiltered ? 'is--active' : ''}
          onClick={onOpenFilter}
        >
          <img src={filterIcon} alt="필터" /> 필터
        </SFilterButton>
        <SSortButton onClick={() => {}}>
          최신 등록순
          <img src={sortIcon} alt="정렬" />
        </SSortButton>
      </SSearchControlsContainer>
    </SSearchControlsWrap>
  );
};

export default memo(SearchControls);
