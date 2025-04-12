import styled from 'styled-components';
import { noScrollBarStyle } from '@components/styles/mixins';

const SContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  background-color: #fff;
`;

const SFilterHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: ${({ theme }) => `20px ${theme.layouts.paddingX} 20px`};

  > div {
    font-weight: 500;
  }

  > button {
    position: absolute;
    left: ${({ theme }) => theme.layouts.paddingX};
    top: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    font-size: 18px;
    transform: translateY(-50%);
  }
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
  color: ${({ theme }) => theme.colors.gray700};

  > svg {
    font-size: 20px;
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.gray400};
  }
`;

const SScrollArea = styled.div`
  flex: 1;
  padding-bottom: ${contorlBoxSize};
  overflow-y: auto;
  position: relative;

  ${noScrollBarStyle}
`;

const SNavigator = styled.div`
  overflow-x: auto;
  position: relative;
  background-color: #fff;
  box-shadow: ${({ theme }) => theme.shadow.bottom};

  ${noScrollBarStyle};

  > div:first-child {
    display: flex;
    padding: ${({ theme }) => `0 ${theme.layouts.paddingX}`};
    align-items: center;
    gap: 12px;
    width: max-content;
  }

  button {
    padding: 10px 6px;
    color: ${({ theme }) => theme.colors.gray600};
    font-size: 13px;
    font-weight: 500;

    &.is-active {
      position: relative;
      color: ${({ theme }) => theme.colors.main};
    }
  }
`;

const SNavIndicator = styled.div<{ $width: number; $left: number }>`
  position: absolute;
  left: ${({ $left }) => `${$left}px`};
  bottom: 2px;
  width: ${({ $width }) => `${$width}px`};
  height: 2px;
  background-color: ${({ theme }) => theme.colors.main};
  transition:
    left 200ms ease-in-out,
    width 200ms ease-in-out;
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

const SItemContent = styled.div`
  padding: 20px 0 28px;
`;

export {
  SContainer,
  SFilterHeader,
  SControlBox,
  SResetButton,
  SScrollArea,
  SNavigator,
  SNavIndicator,
  SFilterItems,
  SFilterItem,
  SItemName,
  SItemContent,
};
