import { useState } from 'react';
import BottomDrawer from '@components/common/BottomDrawer';
import SubPageHeader from '@components/common/SubPageHeader';
import { SearchFilterType, SearchFilterKey } from '@typings/search';
import { SEARCH_FILTER_ITEMS } from '@constants/search';
import RadioStyle from './RadioStyle';
import {
  SContainer,
  SNavigatorWrap,
  SNavigator,
  SFilterItems,
  SFilterItem,
  SItemName,
} from './styles';

interface Props {
  isOpen: boolean;
  onClose(): void;
  currentFilter: SearchFilterType;
}

const navigator = ['숙소유형', '가격', '사용자 평점', '#특징', '시설/서비스'];

const SearchFilter = ({ isOpen, onClose, currentFilter }: Props) => {
  const [filterState, setFilterState] = useState(currentFilter);

  const handleCloseDrawer = () => {
    onClose();
    setFilterState(currentFilter);
  };

  const onClickRadio = (filterKey: SearchFilterKey) => (option: string) => {
    setFilterState((prev) => {
      const isCurrentOption = option === prev[filterKey];
      return {
        ...prev,
        [filterKey]: isCurrentOption ? '' : option,
      };
    });
  };

  return (
    <BottomDrawer isOpen={isOpen}>
      <SContainer>
        <SubPageHeader
          onClick={handleCloseDrawer}
          title="필터"
          style="x"
        ></SubPageHeader>
        <SNavigatorWrap>
          <SNavigator>
            <div>
              {navigator.map((n) => (
                <button key={n}>{n}</button>
              ))}
            </div>
          </SNavigator>
          <SFilterItems>
            {SEARCH_FILTER_ITEMS.map(({ key, name, options, type }) => {
              return (
                <SFilterItem key={key}>
                  <SItemName>{name}</SItemName>
                  {type === 'radio' && (
                    <RadioStyle
                      options={options}
                      currentOption={filterState[key]}
                      filterKey={key}
                      onClick={onClickRadio(key)}
                    />
                  )}
                </SFilterItem>
              );
            })}
          </SFilterItems>
        </SNavigatorWrap>
      </SContainer>
    </BottomDrawer>
  );
};

export default SearchFilter;
