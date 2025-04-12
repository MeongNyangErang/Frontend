import { memo } from 'react';
import styled from 'styled-components';
import { SearchFilterKey } from '@typings/search';
import { QUERY_KEYS } from '@constants/queryKeys';
import StarRating from '@components/common/StarRating';

interface Props {
  options: readonly string[];
  currentOption: string;
  filterKey: SearchFilterKey;
  onClick(option: string): void;
}

const RadioSelector = ({
  options,
  currentOption,
  filterKey,
  onClick,
}: Props) => {
  const isNumberOptions = !Number.isNaN(Number(options[0]));
  const isRating = filterKey === QUERY_KEYS.SEARCH.FILTER.USER_RATING;

  return (
    <SRadioArea>
      {options.map((option) => {
        return (
          <SButton
            key={option}
            onClick={() => onClick(option)}
            data-checked={
              !isNumberOptions
                ? String(option === currentOption)
                : !!currentOption
                  ? String(Number(option) >= Number(currentOption))
                  : 'false'
            }
          >
            {isRating && <StarRating rate={option} $readOnly size="1.8em" />}
            {isRating ? `${option}점 이상` : option}
          </SButton>
        );
      })}
    </SRadioArea>
  );
};

export default memo(RadioSelector);

const SRadioArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 20px;
`;

const SButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.colors.gray500};

  &[data-checked='true'] {
    color: ${({ theme }) => theme.colors.gray700};
  }

  &[data-checked='true']::before {
    background-color: ${({ theme }) => theme.colors.main};
    border-color: ${({ theme }) => theme.colors.main};
  }

  &::before {
    content: '';
    display: inline-block;
    width: 18px;
    height: 18px;
    border: ${({ theme }) => `1px solid ${theme.colors.gray300}`};
    border-radius: 9999px;
  }
`;
