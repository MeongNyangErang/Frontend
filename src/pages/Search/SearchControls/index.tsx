import { memo } from 'react';
import filterIcon from '@assets/icons/filterIcon.png';
import sortIcon from '@assets/icons/sortIcon.png';
import { SWrap, SFilterButton, SSortButton } from './styles';

interface Props {
  onOpenFilter(): void;
}

const SearchControls = ({ onOpenFilter }: Props) => {
  return (
    <SWrap>
      <SFilterButton onClick={onOpenFilter}>
        <img src={filterIcon} alt="필터" /> 필터
      </SFilterButton>
      <SSortButton onClick={() => {}}>
        최신 등록순
        <img src={sortIcon} alt="정렬" />
      </SSortButton>
    </SWrap>
  );
};

export default memo(SearchControls);
