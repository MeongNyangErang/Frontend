import styled from 'styled-components';
import {
  labelDotStyle,
  inputStyle,
  inputVariantStyles,
} from '@components/styles/mixins';
import { media } from '@components/styles/responsive';

const SPetFormWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
`;

const SPetFormTitle = styled.div`
  margin-bottom: 32px;
  font-size: 16px;
  font-weight: 500;
`;

const SPetFormGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 32px;
  padding-bottom: 20px;
  margin-bottom: 20px;
  width: 100%;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.gray200}`};

  > p {
    flex-basis: 40px;
    flex-shrink: 0;

    span {
      ${labelDotStyle}
      font-size: 14px;
    }
  }

  > div {
    position: relative;
    flex: 1;
  }

  .react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker__input-container {
    > input {
      ${inputStyle}
      ${inputVariantStyles.gray}
    }
  }

  .react-datepicker__triangle {
    display: none;
  }

  .react-datepicker-popper {
    top: 100% !important;
    right: 0;
    transform: translate(0, 0) !important;
  }

  .react-datepicker {
    width: 100%;
    font-size: 13px;
    box-shadow: ${({ theme }) => theme.shadow.card};
  }

  .react-datepicker__navigation {
    top: 4px;
  }

  .react-datepicker__header {
    padding-top: 12px;
    background-color: ${({ theme }) => theme.colors.gray100};
  }

  .react-datepicker__day-names {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 16px 0 8px;
  }

  .react-datepicker__month-container {
    width: 100%;
  }

  .react-datepicker__week {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }

  .react-datepicker__day {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    width: calc((100% - 0.8rem) / 7);
    aspect-ratio: 1;

    &:not([aria-disabled='true']):hover {
      border-radius: 9999px;
    }
  }

  .react-datepicker__day--selected {
    background-color: ${({ theme }) => theme.colors.main};
    border-radius: 9999px;

    &:not([aria-disabled='true']):hover {
      background-color: ${({ theme }) => theme.colors.main};
    }
  }

  .react-datepicker__day--keyboard-selected {
    background-color: ${({ theme }) => theme.colors.light};
    border-radius: 9999px;
  }

  .react-datepicker__day--keyboard-selected:not([aria-disabled='true']):hover {
    background-color: ${({ theme }) => theme.colors.main};
  }

  .react-datepicker__day--outside-month {
    color: ${({ theme }) => theme.colors.gray500};
  }
`;

const SPetFormInput = styled.input`
  ${inputStyle}
  ${inputVariantStyles.gray}
`;

const SPetFormSubmitBox = styled.div`
  padding-top: 24px;
  width: 100%;
`;

const SPetFormError = styled.div``;

export {
  SPetFormWrap,
  SPetFormTitle,
  SPetFormGroup,
  SPetFormInput,
  SPetFormSubmitBox,
  SPetFormError,
};
