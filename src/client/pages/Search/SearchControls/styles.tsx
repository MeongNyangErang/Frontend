import styled from 'styled-components';

const SSearchControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
    color: ${({ theme }) => theme.colors.main};
  }

  > svg {
    font-size: 12px;
  }
`;

const SViewButton = styled.button`
  display: flex;
  align-items: center;
  letter-spacing: -1px;
  gap: 4px;
  color: ${({ theme }) => theme.colors.gray700};
  font-size: 13px;
`;

export { SSearchControlsContainer, SFilterButton, SViewButton };
