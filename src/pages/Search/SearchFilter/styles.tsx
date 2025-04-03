import styled from 'styled-components';

const SContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #fff;
`;

const contorlBoxSize = '72px';

const SControlBox = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: ${({ theme }) => `12px ${theme.layouts.paddingX}`};
  width: 100%;
  height: ${contorlBoxSize};
  background-color: #fff;
  box-shadow: ${({ theme }) => theme.shadow.top};

  > button:last-child {
    flex: 1;
  }
`;

const SResetButton = styled.button`
  display: flex;
  align-items: center;
  gap: 2px;
  color: ${({ theme }) => theme.colors.gray500};

  > svg {
    font-size: 20px;
  }
`;

const SNavigatorWrap = styled.div`
  flex: 1;
  padding-bottom: ${contorlBoxSize};
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
  padding-top: 20px;
  border-top: ${({ theme }) => `1px solid ${theme.colors.gray200}`};

  &:first-child {
    border-top: none;
  }
`;

const SItemName = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray700};

  > i {
    display: flex;
    align-items: center;
  }
`;

export {
  SContainer,
  SControlBox,
  SResetButton,
  SNavigatorWrap,
  SNavigator,
  SFilterItems,
  SFilterItem,
  SItemName,
};
