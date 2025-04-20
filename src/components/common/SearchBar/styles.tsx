import styled, { css } from 'styled-components';
import { media } from '@components/styles/responsive';
import locationIcon from '@assets/icons/locationIcon.png';
import calendarIcon from '@assets/icons/calendarIcon.png';

export const SearchBarWrapper = styled.div`
  display: flex;
  gap: 4px;
  width: 100%;
  flex-direction: column;
  color: #888;

  ${media.tablet} {
    flex-direction: row;
    gap: 4px;
  }
`;

const iconStyle = css`
  content: '';
  position: absolute;
  display: block;
  left: 8px;
  top: 50%;
  z-index: 2;
  width: 14px;
  height: 14px;
  background-size: cover;
  opacity: 0.5;
  transform: translateY(-50%);
`;

export const SInputBox = styled.div`
  position: relative;

  ${media.tablet} {
    width: 60%;
  }

  &::before {
    ${iconStyle}
    background-image: url(${locationIcon});
  }
`;

export const SNumberInputWrapper = styled.div`
  display: flex;
  gap: 10px;
  padding: 8px 12px;
  justify-content: space-between;
  align-items: center;

  > div {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

export const SInput = styled.input`
  position: relative;
  width: 100%;
  font-size: 14px;
  height: 42px;
  padding: 12px 12px 12px 24px;
  border-radius: 10px 10px 0 0;
  border: 1px solid #ccc;
  box-sizing: border-box;
  background-color: #fff;

  ${media.tablet} {
    height: 100%;
    border-radius: 8px 0 0 8px;
  }
`;

export const SLocationDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  z-index: 100;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 20px 10px;
`;

export const SPeopleDropdown = styled.div`
  top: 100% !important;
  right: 0px !important;
  left: auto !important;
  z-index: 100;
  width: 100%;
  min-width: 280px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 16px 12px;
  transform: none !important;
`;

export const SDropdownItem = styled.div`
  padding: 10px 0;

  cursor: pointer;

  .location &:hover {
    background-color: ${({ theme }) => theme.colors.light};
  }
`;

export const SLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  font-size: 14px;
  cursor: pointer;

  > span {
    display: flex;
    align-items: center;

    img {
      display: none;
      margin-right: 3px;
      width: 14px;
      opacity: 0.5;

      ${media.mobile} {
        display: block;
      }
    }
  }
`;

export const SDatePickerWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 14px;

  input {
    width: 100%;
    cursor: pointer;
  }

  .react-datepicker-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .react-datepicker-popper {
    top: 100% !important;
    left: 0 !important;
    right: 0 !important;
    transform: translateX(0) !important;

    ${media.tablet} {
      right: auto !important;
    }
  }

  .react-datepicker__header {
    background-color: #ffffff;
    border-bottom: none;
    font-family: 'Noto Sans KR';
  }

  .react-datepicker {
    margin-left: -1px;
    max-width: 400px;
    width: calc(200% + 4px);
    font-family: 'Noto Sans KR';
    border-color: #ccc;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

    ${media.tablet} {
      margin-left: 0;
      width: 400px;
    }
  }

  .react-datepicker {
    position: relative;
    z-index: 100;
  }

  .react-datepicker__day-names {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 10px;
  }
  .react-datepicker__current-month {
    padding: 10px 0;
  }

  .react-datepicker__month-container {
    width: 100%;
  }

  .react-datepicker__month {
    margin: 10px;
  }
  .react-datepicker__week {
    display: flex;
  }
  .react-datepicker__day {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    width: 14.2857%;
    aspect-ratio: 1;
    border-radius: 9999px;
  }

  .react-datepicker__day--keyboard-selected {
    background-color: transparent !important;
  }

  .react-datepicker__day--today {
    background-color: ${({ theme }) => theme.colors.light} !important;
  }

  .react-datepicker__day:not([aria-disabled='true']):hover {
    border-radius: 9999px;
  }

  .react-datepicker__day--selected {
    background-color: ${({ theme }) => theme.colors.main};
  }

  .react-datepicker__day--in-selecting-range {
    border-radius: 0;
    background-color: ${({ theme }) => theme.colors.main};
    &:hover {
      background-color: ${({ theme }) => theme.colors.main};
    }
  }

  .react-datepicker__day--selecting-range-start,
  .react-datepicker__day--range-start {
    border-radius: 9999px 0 0 9999px !important;
    background-color: ${({ theme }) => theme.colors.main};
  }

  .react-datepicker__day--selecting-range-end:not(
      .react-datepicker__day--selecting-range-start
    ),
  .react-datepicker__day--range-end {
    border-radius: 0 9999px 9999px 0 !important;
    background-color: ${({ theme }) => theme.colors.main};
  }

  .react-datepicker__day--in-range:not(.react-datepicker__day--selected):not(
      .react-datepicker__day--range-end
    ) {
    border-radius: 0;
  }

  .react-datepicker__day--in-range {
    background-color: ${({ theme }) => theme.colors.main};

    &:hover {
      background-color: ${({ theme }) => theme.colors.main};
    }
  }

  .react-datepicker__triangle {
    display: none;
  }

  .react-datepicker__navigation {
    top: 18px;
  }

  .react-datepicker__navigation--previous {
    left: 10px;
  }
  .react-datepicker__navigation--next {
    right: 10px;
  }
`;

export const SButton = styled.button`
  width: 30px;
  height: 30px;
  background-color: #f5f5f5;
  color: var(--gray-600);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  font-size: 11px;
`;

export const SearchButton = styled.button`
  padding: 10px;
  background-color: rgb(252, 109, 135);
  color: white;
  border-radius: 8px;
  text-align: center;
  position: static;
  z-index: 10;

  &:hover {
    background-color: var(--main-color);
  }

  ${media.tablet} {
    margin-left: 4px;
    width: 150px;
    height: 52px;
  }
`;
export const STextInput = styled.input`
  width: 10px;
  text-align: center;
  cursor: pointer;
`;

export const SCheckWrapper = styled.div`
  position: relative;
  z-index: 11;
  width: 50%;
  height: 42px;
  display: flex;
  background-color: white;
  padding: 0px 10px 0px 26px;
  border: 1px solid #ccc;
  border-radius: 0 0 0px 10px;

  ${media.tablet} {
    border-radius: 0;
    height: auto;
  }

  &::before {
    ${iconStyle};
    background-image: url(${calendarIcon});
  }
`;

export const SBoxWrapper = styled.div`
  width: 50%;
  display: flex;
  background-color: white;
  padding: 0 10px;
  border: 1px solid #ccc;
  border-radius: 0 0 10px 0px;
  font-family: 'Noto Sans KR';
  position: relative;

  ${media.tablet} {
    border-radius: 0 8px 8px 0;
  }
`;

export const SContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 4px;

  ${media.tablet} {
    gap: 4px;
    width: 100%;
  }
`;

export const SApplyButton = styled.button`
  border-radius: 8px;
  height: 42px;
  width: 100%;
  text-align: center;
  color: ${({ theme }) => theme.colors.main};
  background-color: ${({ theme }) => theme.colors.light};
`;
