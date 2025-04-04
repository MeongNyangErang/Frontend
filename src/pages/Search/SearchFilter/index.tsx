import {
  useState,
  Fragment,
  UIEventHandler,
  useRef,
  useCallback,
  useEffect,
  memo,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdRefresh } from 'react-icons/io';
import Button from '@components/common/Button';
import BottomDrawer from '@components/common/BottomDrawer';
import SubPageHeader from '@components/common/SubPageHeader';
import OptionSelector from '@components/common/OptionSelector';
import ROUTES from '@constants/routes';
import { compareObjs, isAllValuesEmpty } from '@utils/compare';
import { getSearchFilter } from '@utils/searchParams';
import {
  SearchFilterType,
  SearchFilterKey,
  SingleSelectFilterKey,
  SearchQuery,
} from '@typings/search';
import { SEARCH_FILTER_ITEMS, FILTER_CATEGORIES } from '@constants/search';
import RadioSelector from './RadioSelector';
import FilterItemName from './FIlterItemName';
import {
  SContainer,
  SControlBox,
  SResetButton,
  SScrollArea,
  SNavigator,
  SNavIndicator,
  SFilterItems,
  SFilterItem,
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
  const [filterState, setFilterState] = useState(currentFilter);
  const [activeFilterIndex, setActiveFilterIndex] = useState(-1);
  const [navStyle, setNavStyle] = useState({ width: 0, left: 0 });
  const filterItems = useRef<number[]>([]);
  const navAreaRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const isFilterEmpty = isAllValuesEmpty(filterState);
  const isFilterChanged = !compareObjs(currentFilter, filterState);

  const handleCloseDrawer = () => {
    onClose();
    setFilterState(currentFilter);
  };

  const onToggleRadio = useCallback(
    (filterKey: SearchFilterKey) => (option: string) => {
      setFilterState((prev) => {
        const isCurrentOption = option === prev[filterKey];
        return {
          ...prev,
          [filterKey]: isCurrentOption ? '' : option,
        };
      });
    },
    [],
  );

  const onToggleOptions = useCallback(
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
      },
    [],
  );

  const handleResetFilter = () => {
    setFilterState(getSearchFilter(null));
  };

  const onClickFilterButton = useCallback(() => {
    if (!isFilterChanged) return;

    console.log(filterState);

    const params = new URLSearchParams();
    for (let key in currentQuery) {
      params.append(key, currentQuery[key as keyof SearchQuery]);
    }

    for (let key in filterState) {
      const typedKey = key as SearchFilterKey;
      const value1 = filterState[typedKey];
      const value2 = currentFilter[typedKey];
      if (Array.isArray(value1)) {
        if (!value1.every((v, i) => v === value2[i]) && value1.length > 0)
          params.append(key, value1.toString());
      } else {
        if (value1 !== value2 && value1 !== '') params.append(key, value1);
      }
    }

    navigate(`${ROUTES.search}?${params.toString()}`);
  }, [filterState, isFilterChanged, currentFilter, currentQuery, navigate]);

  const handleScroll: UIEventHandler<HTMLDivElement> = (e) => {
    const scrollTop = e.currentTarget.scrollTop;
    for (let i = 0; i < filterItems.current.length - 1; i++) {
      if (scrollTop <= filterItems.current[i]) {
        setActiveFilterIndex(i);
        break;
      }
    }
  };

  const scrollToActiveFilter = (index: number) => {
    const location = filterItems.current[index];
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
    if (!isOpen) setFilterState({ ...currentFilter });
    setActiveFilterIndex(isOpen ? 0 : -1);
  }, [isOpen]);

  return (
    <BottomDrawer isOpen={isOpen}>
      <SContainer>
        <SubPageHeader
          onClick={handleCloseDrawer}
          title="필터"
          style="x"
        ></SubPageHeader>
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
                      filterItems.current[index] = el.offsetTop;
                    }
                  }}
                >
                  <FilterItemName category={category} />
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
