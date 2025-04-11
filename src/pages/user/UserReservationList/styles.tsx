import { media } from '@components/styles/responsive';
import styled from 'styled-components';

const STabs = styled.div`
  position: relative;
  padding-top: 0;
  margin-bottom: 24px;
  border-bottom: ${({ theme }) => `1.5px solid ${theme.colors.gray200}`};

  ${media.desktop} {
    padding-top: 24px;
  }
`;

const STab = styled.button`
  padding: 0 12px;
  height: 40px;
  margin-bottom: 4;

  &.is-active {
    color: ${({ theme }) => theme.colors.main};
    font-weight: 700;
  }
`;

const STabIndicator = styled.div<{ $width: number; $left: number }>`
  position: absolute;
  left: ${({ $left }) => `${$left}px`};
  bottom: -0.5px;
  width: ${({ $width }) => `${$width}px`};
  height: 2px;
  background-color: ${({ theme }) => theme.colors.main};
  transition: ${({ theme }) => theme.transition.default};
`;

const SReservationListWrap = styled.div`
  padding-bottom: 30px;
`;

const SReservationList = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 24px;
`;

const SReservation = styled.div`
  overflow: hidden;
  background-color: #fff;
  border: ${({ theme }) => `1px solid ${theme.colors.gray200}`};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.card};
  word-break: break-all;
`;

const SReservationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.gray200}`};
  background-color: ${({ theme }) => theme.colors.gray100};
`;

const SReservationDate = styled.div`
  color: ${({ theme }) => theme.colors.gray600};
  font-weight: 500;

  > span {
    position: relative;
    padding-right: 8px;
    margin-right: 8px;
    font-weight: 400;

    &::after {
      content: '';
      position: absolute;
      right: 0;
      top: 50%;
      width: 1px;
      height: 14px;
      background-color: ${({ theme }) => theme.colors.gray400};
      transform: translateY(-50%);
    }
  }
`;

const SReservationBody = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  padding: 12px;

  ${media.tablet} {
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
  }
`;

const SReservationDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  > h3 {
    margin-bottom: 6px;
    font-size: 18px;
    font-weight: 500;
  }

  > p {
    margin-bottom: 8px;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.gray700};
  }

  > div {
    display: flex;
    align-items: center;
    margin-bottom: 4px;
    color: ${({ theme }) => theme.colors.gray600};

    > span {
      margin: 0 4px;
    }
    > svg {
      margin-right: 4px;
    }
  }

  > span {
    display: flex;
    align-items: center;
    margin-bottom: 4px;
    color: ${({ theme }) => theme.colors.gray600};
  }
`;

const SReservationPrice = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  margin-bottom: 12px;
  font-size: 20px;
  font-weight: 500;

  > span {
    font-size: 14px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.gray600};
  }
`;

const SReservationButtonArea = styled.div`
  width: 100%;

  ${media.tablet} {
    width: auto;
  }
`;

const SReservationButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;

  > button {
    width: 100%;

    ${media.mobile} {
      width: auto;
      min-width: 120px;
    }
  }

  > span {
    padding: 4px 6px;
    font-size: 13px;
    color: #fff;
    background-color: ${({ theme }) => theme.colors.gray700};
    border-radius: 4px;
  }
`;

const SListBottom = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 0;
  text-align: center;
`;

export {
  STabs,
  STab,
  STabIndicator,
  SReservationListWrap,
  SReservationList,
  SReservation,
  SReservationHeader,
  SReservationBody,
  SReservationDate,
  SReservationDetail,
  SReservationButtonArea,
  SReservationPrice,
  SReservationButtons,
  SListBottom,
};
