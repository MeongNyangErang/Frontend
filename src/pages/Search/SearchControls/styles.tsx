import styled from 'styled-components';

const SWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => `0 0 ${theme.layouts.paddingX}`};
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.gray200}`};
`;

const SFilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  color: ${({ theme }) => theme.colors.gray600};
  font-size: 13px;
  border: ${({ theme }) => `1.5px solid ${theme.colors.gray300}`};
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
  font-size: 13px;

  > img {
    width: 20px;
  }
`;

export { SWrap, SFilterButton, SSortButton };
