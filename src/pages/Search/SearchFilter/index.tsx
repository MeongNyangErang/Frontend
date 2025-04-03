import { useState, Fragment } from 'react';
import { FaPaw } from 'react-icons/fa';
import { IoMdRefresh } from 'react-icons/io';
import Button from '@components/common/Button';
import BottomDrawer from '@components/common/BottomDrawer';
import SubPageHeader from '@components/common/SubPageHeader';
import OptionSelector from '@components/common/OptionSelector';
import {
  SearchFilterType,
  SearchFilterKey,
  SingleSelectFilterKey,
} from '@typings/search';
import { SEARCH_FILTER_ITEMS, FILTER_CATEGORIES } from '@constants/search';
import RadioSelector from './RadioSelector';
import {
  SContainer,
  SControlBox,
  SResetButton,
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

const SearchFilter = ({ isOpen, onClose, currentFilter }: Props) => {
  const [filterState, setFilterState] = useState(currentFilter);

  const handleCloseDrawer = () => {
    onClose();
    setFilterState(currentFilter);
  };

  const onToggleRadio = (filterKey: SearchFilterKey) => (option: string) => {
    setFilterState((prev) => {
      const isCurrentOption = option === prev[filterKey];
      return {
        ...prev,
        [filterKey]: isCurrentOption ? '' : option,
      };
    });
  };

  const onToggleOptions =
    (filterKey: Exclude<SearchFilterKey, SingleSelectFilterKey>) =>
    (option: string) => {
      setFilterState((prev) => {
        const currentValue = prev[filterKey];
        const isOptionIncluded = currentValue.includes(option);
        return {
          ...prev,
          [filterKey]: isOptionIncluded
            ? currentValue.filter((v) => v !== option)
            : [...currentValue, option],
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
              {FILTER_CATEGORIES.map((n) => (
                <button key={n}>{n}</button>
              ))}
            </div>
          </SNavigator>
          <SFilterItems>
            {FILTER_CATEGORIES.map((category) => {
              return (
                <SFilterItem key={category}>
                  <SItemName>
                    {category}
                    {category === '동반 반려동물' && (
                      <i>
                        <FaPaw />
                      </i>
                    )}
                  </SItemName>
                  {SEARCH_FILTER_ITEMS.filter(
                    (item) => item.category === category,
                  ).map(({ type, options, key }) => {
                    return (
                      <Fragment key={key}>
                        {type === 'radio' && (
                          <RadioSelector
                            options={options}
                            currentOption={filterState[key]}
                            filterKey={key}
                            onClick={onToggleRadio(key)}
                          />
                        )}
                        {(type === 'capsule' || type === 'square') && (
                          <OptionSelector
                            $variant={type}
                            onClick={onToggleOptions(key)}
                            options={options}
                            name={key}
                            currentValue={filterState[key]}
                          />
                        )}
                      </Fragment>
                    );
                  })}
                </SFilterItem>
              );
            })}
          </SFilterItems>
        </SNavigatorWrap>
      </SContainer>
      <SControlBox>
        <SResetButton>
          <IoMdRefresh />
          초기화
        </SResetButton>
        <Button
          onClick={() => {
            console.log(filterState);
          }}
          variant="main"
          fontSize="14px"
          fullWidth={true}
          fixedHeight={true}
        >
          숙소보기
        </Button>
      </SControlBox>
    </BottomDrawer>
  );
};

export default SearchFilter;
