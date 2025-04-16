import { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { compareObjs, isAllValuesEmpty } from '@utils/compare';
import ROUTES from '@constants/routes';
import { getSearchFilter } from '@utils/searchParams';
import {
  SearchFilterKey,
  SingleSelectFilterKey,
  SearchBaseType,
  SearchFilterType,
} from '@typings/search';

const useSearchFilter = (
  currentFilter: SearchFilterType,
  currentQuery: SearchBaseType,
) => {
  const [filterState, setFilterState] = useState(currentFilter);
  const navigate = useNavigate();
  const isFilterEmpty = useMemo(() => {
    return isAllValuesEmpty(filterState);
  }, [filterState]);
  const isFilterChanged = useMemo(() => {
    return !compareObjs(currentFilter, filterState);
  }, [currentFilter, filterState]);

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
  // console.log(filterState);
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

  const updateFilterState = (newFilterState: SearchFilterType) => {
    setFilterState(newFilterState);
  };

  const getSearchParams = () => {
    const params = new URLSearchParams();

    for (let key in currentQuery) {
      params.append(key, currentQuery[key as keyof SearchBaseType]);
    }

    for (let key in filterState) {
      const typedKey = key as SearchFilterKey;
      const value = filterState[typedKey];
      console.log(typedKey, value, filterState);
      if (Array.isArray(value)) {
        if (value.length > 0) params.append(typedKey, value.toString());
      } else {
        if (value) params.append(typedKey, value);
      }
    }

    return params;
  };

  const onClickFilterButton = useCallback(() => {
    if (!isFilterChanged) return;

    navigate(`${ROUTES.search}?${getSearchParams().toString()}`);
  }, [isFilterChanged, navigate, filterState]);

  return {
    filterState,
    isFilterEmpty,
    isFilterChanged,
    handleResetFilter,
    updateFilterState,
    onToggleRadio,
    onToggleOptions,
    onClickFilterButton,
  };
};

export default useSearchFilter;
