import { useState, UIEventHandler, useRef, useEffect, memo } from 'react';
import { IoMdRefresh } from 'react-icons/io';
import { FaXmark } from 'react-icons/fa6';
import Button from '@components/common/Button';
import BottomDrawer from '@components/common/BottomDrawer';
import OptionSelector from '@components/common/OptionSelector';
import useSearchFilter from '@hooks/page/useSearchFilter';
import { SearchFilterType, SearchQuery } from '@typings/search';
import { SEARCH_FILTER_ITEMS, FILTER_CATEGORIES } from '@constants/search';
import RadioSelector from './RadioSelector';
import FilterItemName from './FIlterItemName';
import {
  SContainer,
  SControlBox,
  SFilterHeader,
  SResetButton,
  SScrollArea,
  SNavigator,
  SNavIndicator,
  SFilterItems,
  SFilterItem,
  SItemContent,
} from './styles';

interface Props {
  isOpen: boolean;
  onClose(): void;
  currentFilter: SearchFilterType;
  currentQuery: SearchQuery;
}

const SearchFilter = ({
  isOpen,
  onClose,
  currentFilter,
  currentQuery,
}: Props) => {
  const {
    filterState,
    isFilterEmpty,
    isFilterChanged,
    onClickFilterButton,
    onToggleRadio,
    onToggleOptions,
    handleResetFilter,
    updateFilterState,
  } = useSearchFilter(currentFilter, currentQuery);
  const [activeFilterIndex, setActiveFilterIndex] = useState(-1);
  const [navStyle, setNavStyle] = useState({ width: 0, left: 0 });
  const itemLocations = useRef<number[]>([]);
  const navAreaRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleCloseDrawer = () => {
    onClose();
    updateFilterState(currentFilter);
  };

  const handleScroll: UIEventHandler<HTMLDivElement> = (e) => {
    const scrollTop = e.currentTarget.scrollTop;
    for (let i = 0; i < itemLocations.current.length - 1; i++) {
      if (scrollTop <= itemLocations.current[i]) {
        setActiveFilterIndex(i);
        break;
      }
    }
  };

  const scrollToActiveFilter = (index: number) => {
    const location = itemLocations.current[index];
    const target = scrollAreaRef.current;
    if (target) {
      target.scrollTo({ top: location, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const target = navAreaRef.current;
    if (target) {
      const activeButton = target.querySelectorAll('button')[activeFilterIndex];
      if (!activeButton) return;

      const left = activeButton.offsetLeft;
      const width = activeButton.offsetWidth;

      target.scrollTo({
        left: activeFilterIndex === 0 ? 0 : left,
        behavior: 'smooth',
      });

      requestAnimationFrame(() => {
        setNavStyle({ left, width });
      });
    }
  }, [activeFilterIndex]);

  useEffect(() => {
    if (!isOpen) {
      updateFilterState({ ...currentFilter });
      setActiveFilterIndex(-1);
      return;
    }

    setActiveFilterIndex(0);
  }, [isOpen]);

  return (
    <BottomDrawer isOpen={isOpen} maxWidth="560px">
      <SContainer>
        <SFilterHeader>
          <button onClick={handleCloseDrawer}>
            <FaXmark />
          </button>
          <div>필터</div>
        </SFilterHeader>
        <SNavigator ref={navAreaRef}>
          <div>
            {FILTER_CATEGORIES.map((category, index) => (
              <button
                key={category}
                className={index === activeFilterIndex ? 'is-active' : ''}
                onClick={() => scrollToActiveFilter(index)}
              >
                {category}
              </button>
            ))}
          </div>
          <SNavIndicator $width={navStyle.width} $left={navStyle.left} />
        </SNavigator>
        <SScrollArea onScroll={handleScroll} ref={scrollAreaRef}>
          <SFilterItems>
            {FILTER_CATEGORIES.map((category, index) => {
              return (
                <SFilterItem
                  key={category}
                  ref={(el) => {
                    if (el) {
                      itemLocations.current[index] = el.offsetTop;
                    }
                  }}
                >
                  <FilterItemName category={category} />
                  {SEARCH_FILTER_ITEMS.filter(
                    (item) => item.category === category,
                  ).map(({ type, options, key }) => {
                    return (
                      <SItemContent key={key}>
                        {type === 'radio' && (
                          <RadioSelector
                            options={options}
                            currentOption={filterState[key]}
                            filterKey={key}
                            onClick={onToggleRadio(key)}
                          />
                        )}
                        {(type === 'capsule' || type === 'squareFixed') && (
                          <OptionSelector
                            $variant={type}
                            onClick={onToggleOptions(key)}
                            options={options}
                            currentValue={filterState[key]}
                          />
                        )}
                      </SItemContent>
                    );
                  })}
                </SFilterItem>
              );
            })}
          </SFilterItems>
        </SScrollArea>
      </SContainer>
      <SControlBox>
        <SResetButton onClick={handleResetFilter} disabled={isFilterEmpty}>
          <IoMdRefresh />
          초기화
        </SResetButton>
        <Button
          onClick={onClickFilterButton}
          variant="main"
          fontSize="14px"
          fullWidth={true}
          fixedHeight={true}
          disabled={!isFilterChanged}
        >
          숙소보기
        </Button>
      </SControlBox>
    </BottomDrawer>
  );
};

export default memo(SearchFilter);
