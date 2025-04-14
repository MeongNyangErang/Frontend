import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { media } from '@components/styles/responsive';
import { oneLineStyle } from '@components/styles/mixins';

const SChatListWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%;
`;

const SChatTitle = styled.h2`
  padding: 30px 0 12px;
  width: 100%;
  font-size: 16px;
  font-weight: 500;

  ${media.tablet} {
    padding: ${({ theme }) => `30px ${theme.layouts.paddingX} 12px`};
  }
`;

const SChatListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  width: 100%;
`;

const SChatListBox = styled.div`
  display: flex;
  flex-direction: column;
  height: max-content;
`;

const SChatListItem = styled(NavLink)`
  display: flex;
  align-items: flex-start;
  padding: 14px 0;
  width: 100%;
  height: 92px;
  gap: 16px;
  border-top: ${({ theme }) => `1px solid ${theme.colors.gray300}`};
  background-color: #fff;

  &.active {
    background-color: ${({ theme }) => theme.colors.gray100};
  }

  &:first-child {
    border-top: none;
  }

  ${media.tablet} {
    padding: ${({ theme }) => `14px ${theme.layouts.paddingX}`};
  }
`;

const SItemImage = styled.div`
  width: 52px;

  > img {
    width: 100%;
    aspect-ratio: 1;
    border-radius: 9999px;
  }
`;

const SItemInfo = styled.div`
  flex: 1;

  > * {
    ${oneLineStyle}
  }

  > div {
    margin-bottom: 2px;
    font-weight: 500;
  }

  > p,
  span {
    font-size: 13px;
    color: ${({ theme }) => theme.colors.gray600};
  }
`;

const SItemUnread = styled.div`
  min-width: 20px;

  > span {
    padding: 1px 8px;
    line-height: 1;
    font-size: 11px;
    font-weight: 500;
    color: #fff;
    background-color: ${({ theme }) => theme.colors.main};
    border-radius: 9999px;
  }
`;

const SChatItemBottom = styled.div`
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export {
  SChatListWrap,
  SChatTitle,
  SChatListContainer,
  SChatListBox,
  SChatListItem,
  SItemImage,
  SItemInfo,
  SItemUnread,
  SChatItemBottom,
};
