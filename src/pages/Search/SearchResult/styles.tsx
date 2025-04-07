import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { ellipsisStyle } from '@components/styles/mixins';
import { media } from '@components/styles/responsive';
import { AccommodationType } from '@typings/response/accommodations';

const SItems = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  column-gap: 16px;
  row-gap: 40px;
  padding: ${({ theme }) => `${theme.layouts.paddingX} 0 60px`};

  ${media.mobile} {
    grid-template-columns: 1fr 1fr;
  }

  ${media.desktop} {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const SItem = styled(NavLink)`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border-radius: 12px;

  &:hover {
    img {
      transform: scale(1.05);
    }
  }
`;

const SImageArea = styled.div`
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 172px;
  background-color: ${({ theme }) => theme.colors.gray200};

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: ${({ theme }) => theme.transition.default};
  }

  ${media.tablet} {
    height: 220px;
  }
`;

const SItemTypeBadge = styled.div<{ $type: AccommodationType }>`
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 2;
  padding: 4px 12px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.gray200};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
    border-radius: 9999px;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
    background-color: ${({ theme, $type }) => {
      switch ($type) {
        case 'DETACHEDHOUSE':
          return theme.colors.blueBage;
        case 'FULLVILLA':
          return theme.colors.orangeBage;
        case 'HOTELRESORT':
          return theme.colors.purpleBage;
        case 'PENSION':
          return theme.colors.mintBage;
        default:
          return 'white';
      }
    }};
  }
`;

const STextArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: ${({ theme }) => theme.layouts.paddingX};
  background-color: #fff;
  border: ${({ theme }) => `1px solid ${theme.colors.gray300}`};
  border-top: none;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
`;

const SNameBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

const SName = styled.h3<{ $line: number }>`
  ${ellipsisStyle}
  flex: 1;
  font-size: 16px;
  font-weight: 600;
`;

const SRating = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 2px 8px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray700};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.gray100};

  > svg {
    color: ${({ theme }) => theme.colors.starYellow};
  }
`;

const SPriceBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 6px;
`;

const SCapacity = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  > div {
    position: relative;
    display: flex;
    align-items: center;
    gap: 2px;
    color: ${({ theme }) => theme.colors.gray600};
    font-size: 14px;

    > svg {
      font-size: 12px;
    }

    &:first-child::after {
      content: '';
      position: absolute;
      right: -5px;
      top: 50%;
      width: 1px;
      height: 12px;
      background-color: ${({ theme }) => theme.colors.gray200};
      transform: translateY(-50%);
    }
  }
`;

const SPrice = styled.p<{ $line: number }>`
  ${ellipsisStyle}
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 18px;
  font-weight: 500;

  > span {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.gray500};
  }
`;

const SItemsBottom = styled.div`
  padding: ${({ theme }) => theme.layouts.paddingX};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export {
  SItems,
  SItem,
  SItemTypeBadge,
  SImageArea,
  STextArea,
  SNameBox,
  SPriceBox,
  SName,
  SRating,
  SPrice,
  SCapacity,
  SItemsBottom,
};
