import styled from 'styled-components';
import { media } from '@components/styles/responsive';

const SUserMyPetWrap = styled.div`
  padding-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${media.desktop} {
    padding-top: 20px;
  }
`;

const SUserEmptyBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
  width: 100%;
  font-size: 13px;
  letter-spacing: -1;
  color: ${({ theme }) => theme.colors.gray600};
  background-color: ${({ theme }) => theme.colors.gray100};
  border-radius: 8px;
`;

const SUserMyPetStatus = styled.div`
  padding-top: 16px;
  margin-bottom: 12px;
  width: 100%;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray600};
  letter-spacing: -1px;

  ${media.desktop} {
    padding-top: 0;
  }
`;

const SUserMyPetItems = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  width: 100%;
  margin-bottom: 30px;

  ${media.tablet} {
    grid-template-columns: 1fr 1fr;
  }

  ${media.desktop} {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const SUserMyPetItem = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  column-gap: ${({ theme }) => theme.layouts.paddingX};
  row-gap: 8px;
  padding: ${({ theme }) => theme.layouts.paddingX};
  border: ${({ theme }) => `1px solid ${theme.colors.gray200}`};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.card};
`;

const SItemImageBox = styled.div`
  display: flex;
  width: 64px;

  > img {
    width: 100%;
  }
`;

const SItemTextBox = styled.div`
  flex: 1;

  > h3 {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-bottom: 4px;
    font-weight: 500;

    > span {
      color: ${({ theme }) => theme.colors.gray600};
      font-weight: 400;
    }
  }

  > p {
    margin-bottom: 6px;
    font-size: 13px;
    color: ${({ theme }) => theme.colors.gray500};
  }

  > div {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;

    > span {
      padding: 4px 8px;
      font-size: 13px;
      color: ${({ theme }) => theme.colors.lightRedTxt};
      background-color: ${({ theme }) => theme.colors.lightRedBg};
      border-radius: ${({ theme }) => theme.radius.sm};

      &:last-child {
        color: ${({ theme }) => theme.colors.lightOrangeTxt};
        background-color: ${({ theme }) => theme.colors.lightOrangeBg};
      }
    }
  }
`;

const SItemButtonBox = styled.div`
  grid-column: 1 / 3;
  display: flex;
  justify-content: center;
  align-items: center;

  ${media.desktop} {
    width: 100%;
  }
`;

const SItemEditButton = styled.button`
  position: relative;
  padding: 4px 6px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray400};

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 2px;
    width: 28px;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.gray300};
    transform: translateX(-50%);
  }
`;

export {
  SUserMyPetWrap,
  SUserMyPetStatus,
  SUserMyPetItems,
  SUserMyPetItem,
  SItemImageBox,
  SItemTextBox,
  SItemButtonBox,
  SItemEditButton,
  SUserEmptyBox,
};
