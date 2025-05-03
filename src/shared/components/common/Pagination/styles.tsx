import styled, { css } from 'styled-components';

const SPagination = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 4px;
`;

const buttonStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 26px;
  height: 26px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray500};
  line-height: 1;
  background-color: #fff;
  border: ${({ theme }) => `1px solid ${theme.colors.gray300}`};
  border-radius: ${({ theme }) => theme.radius.sm};

  &:hover {
    color: ${({ theme }) => theme.colors.gray600};
    background-color: ${({ theme }) => theme.colors.gray100};
  }
`;

const SPaginationItem = styled.button`
  ${buttonStyle}

  &.is--active {
    background-color: ${({ theme }) => theme.colors.main};
    border-color: ${({ theme }) => theme.colors.main};
    color: #fff;
  }

  &:disabled {
    cursor: auto;
  }
`;

const SNavigationButton = styled.button`
  ${buttonStyle}
  font-size: 11px;

  &:disabled {
    display: none;
  }
`;

export { SPagination, SPaginationItem, SNavigationButton };
