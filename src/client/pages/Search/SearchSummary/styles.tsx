import styled from 'styled-components';

const SSearchSummaryWrap = styled.div`
  padding: 12px;
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.colors.gray100};
  cursor: pointer;
`;

const SSearchKeyword = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  color: ${({ theme }) => theme.colors.gray700};
  font-weight: 500;

  > svg {
    font-size: 13px;
  }
`;

const SSearchConditions = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${({ theme }) => theme.colors.gray500};
`;

const SDate = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const SCount = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  > span {
    display: flex;
    align-items: center;
    gap: 1px;

    svg {
      font-size: 12px;
    }
  }
`;

export { SSearchSummaryWrap, SSearchKeyword, SSearchConditions, SDate, SCount };
