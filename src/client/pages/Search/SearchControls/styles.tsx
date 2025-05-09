import styled from 'styled-components';

const SSearchControlsWrap = styled.div`
  padding: ${({ theme }) => `0px ${theme.layouts.paddingX}`};
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.gray200}`};
`;

const SSearchControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layouts.innerWidth};
`;

const SFilterButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  color: ${({ theme }) => theme.colors.gray600};
  font-size: 13px;
  border: ${({ theme }) => `1.2px solid ${theme.colors.gray300}`};
  border-radius: 9999px;

  &.is--active {
    border: ${({ theme }) => `1.2px solid ${theme.colors.main}`};
  }

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

export {
  SSearchControlsWrap,
  SSearchControlsContainer,
  SFilterButton,
  SSortButton,
};
