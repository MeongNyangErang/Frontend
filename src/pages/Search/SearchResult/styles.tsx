import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { ellipsisStyle } from '@components/styles/mixins';
import { media } from '@components/styles/responsive';

const SResultWrap = styled.div`
  padding: ${({ theme }) => `${theme.layouts.paddingX} 0 40px`};
`;

const SItems = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 16px;

  ${media.mobile} {
    grid-template-columns: 1fr 1fr;
    column-gap: 16px;
  }
`;

const SItem = styled(NavLink)`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border-radius: 12px;

  ${media.tablet} {
    flex-direction: row;
  }
`;

const SImageArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 172px;
  background-color: ${({ theme }) => theme.colors.gray200};

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${media.tablet} {
    width: 40%;
    max-width: 180px;
    height: 220px;
  }
`;

const STextArea = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.layouts.paddingX};
  background-color: #fff;
  border: ${({ theme }) => `1px solid ${theme.colors.gray300}`};
  border-top: none;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;

  ${media.tablet} {
    flex: 1;
    justify-content: space-between;
    border-top: ${({ theme }) => `1px solid ${theme.colors.gray300}`};
    border-bottom-left-radius: 0;
    border-top-right-radius: 12px;
  }
`;

const SNameBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 12px;

  ${media.tablet} {
    flex-direction: column;
    align-items: flex-start;
  }
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
  gap: 14px;

  > div {
    position: relative;
    display: flex;
    align-items: center;
    gap: 2px;
    color: ${({ theme }) => theme.colors.gray500};
    font-size: 13px;

    > svg {
      font-size: 14px;
    }

    &:first-child::before {
      content: '';
      position: absolute;
      right: -8px;
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
  font-size: 16px;
  font-weight: 500;
`;

export {
  SResultWrap,
  SItems,
  SItem,
  SImageArea,
  STextArea,
  SNameBox,
  SPriceBox,
  SName,
  SRating,
  SPrice,
  SCapacity,
};
