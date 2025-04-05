import { memo } from 'react';
import styled from 'styled-components';
import filterIcon from '@assets/icons/filterIcon.png';
import sortIcon from '@assets/icons/sortIcon.png';

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
        정렬
        <img src={sortIcon} alt="정렬" />
      </SSortButton>
    </SWrap>
  );
};

export default memo(SearchControls);

const SWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) =>
    `0 ${theme.layouts.paddingX} ${theme.layouts.paddingX}`};
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.gray200}`};
`;

const SFilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  color: ${({ theme }) => theme.colors.gray600};
  font-size: 12px;
  border: ${({ theme }) => `1px solid ${theme.colors.gray400}`};
  border-radius: 9999px;

  > img {
    width: 16px;
  }
`;

const SSortButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0px;
  padding: 4px 8px;
  color: ${({ theme }) => theme.colors.gray600};
  font-size: 12px;

  > img {
    width: 20px;
  }
`;
