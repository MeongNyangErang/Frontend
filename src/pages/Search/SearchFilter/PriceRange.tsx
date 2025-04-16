import { ChangeEvent, useRef, useEffect, memo } from 'react';
import styled from 'styled-components';

interface PriceRangeProps {
  currentValue: string[];
  onChange: (key: 'minPrice' | 'maxPrice', value: string) => void;
}

const PriceRange = ({ currentValue, onChange }: PriceRangeProps) => {
  const priceRangeRef = useRef<HTMLDivElement>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    key: 'minPrice' | 'maxPrice',
  ) => {
    const number = Number(e.target.value);
    if (isNaN(number) || number < 0) return;

    onChange(key, number.toString());
  };

  useEffect(() => {
    const priceArea = priceRangeRef.current;
    if (!priceArea) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (target && !priceArea.contains(target)) {
        const value1 = Number(currentValue[0]);
        const value2 = Number(currentValue[1]);
        if (value1 > value2) {
          onChange('maxPrice', currentValue[0]);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);
  }, [currentValue]);

  return (
    <SPriceRangeWrap ref={priceRangeRef}>
      <SPriceInput
        type="number"
        min={0}
        placeholder="min"
        value={currentValue[0]}
        onChange={(e) => handleChange(e, 'minPrice')}
      />
      <span />
      <SPriceInput
        type="number"
        min={0}
        placeholder="max"
        value={currentValue[1]}
        onChange={(e) => handleChange(e, 'maxPrice')}
      />
    </SPriceRangeWrap>
  );
};

export default memo(PriceRange);

const SPriceRangeWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  > span {
    width: 12px;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.gray300};
  }
`;

const SPriceInput = styled.input`
  width: 100%;
  padding: 10px;
  height: 44px;
  border: ${({ theme }) => `1px solid ${theme.colors.gray300}`};
  border-radius: 4px;

  &::placeholder {
    font-size: 16px;
    color: ${({ theme }) => theme.colors.gray500};
  }
`;
