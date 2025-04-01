import styled from 'styled-components';

const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #fff;
`;

const SNavigatorWrap = styled.div`
  flex: 1;
  overflow-y: auto;
  position: relative;
`;

const SNavigator = styled.div`
  overflow-x: auto;
  position: sticky;
  left: 0;
  top: 0;
  background-color: tomato;

  > div {
    display: flex;
    padding: ${({ theme }) => `0 ${theme.layouts.paddingX}`};
    align-items: center;
    width: max-content;
  }

  button {
    padding: 16px;

    &.is-active {
      color: ${({ theme }) => theme.colors.main};
      border-bottom: ${({ theme }) => `2px solid ${theme.colors.main}`};
    }
  }
`;

const SFilterItems = styled.div`
  padding: ${({ theme }) => `0 ${theme.layouts.paddingX} 32px`};
`;

const SFilterItem = styled.div`
  border-top: ${({ theme }) => `1px solid ${theme.colors.gray200}`};
  background-color: beige;

  &:first-child {
    border-top: none;
  }
`;

const SItemName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray700};
`;

export {
  SContainer,
  SNavigatorWrap,
  SNavigator,
  SFilterItems,
  SFilterItem,
  SItemName,
};
