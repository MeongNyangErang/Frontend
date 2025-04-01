import styled from 'styled-components';

const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: pink;
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
  height: 2000px;
  background-color: yellow;
`;

export { SContainer, SNavigatorWrap, SNavigator, SFilterItems, SFilterItem };
