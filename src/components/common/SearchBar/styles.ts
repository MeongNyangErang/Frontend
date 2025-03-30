import styled from 'styled-components';

export const SearchBarWrapper = styled.div`
  display: flex;
  gap: 2px;
  width: 100%;
  padding: 16px;
  flex-direction: column;
  color: #888;
`;

export const SInputBox = styled.div`
  position: relative;
  width: 100%;
`;

export const SNumberInputWrapper = styled.div`
  display: flex;
  gap: 10px;
  padding: 8px 12px;
  align-items: center;
`;

export const SInput = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 10px 10px 0 0;
  border: 1px solid #ccc;
  box-sizing: border-box;
`;

export const SLocationDropdown = styled.div`
  position: absolute;
  top: 40px;
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  z-index: 10;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  text-align: center;
`;

export const SPeopleDropdown = styled.div`
  position: absolute;
  top: 155px;
  right: 15px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

export const SDropdownItem = styled.div`
  margin: 5px 5px;
  padding: 5px;
  cursor: pointer;
`;

export const SLabel = styled.label`
  font-size: 14px;
  cursor: pointer;
  margin-right: 20px;
`;

export const SDatePickerWrapper = styled.div`
  width: 60px;

  .react-datepicker__header {
    background-color: #ffffff;
    border-bottom: none;
    font-family: 'Noto Sans KR';
  }

  .react-datepicker {
    left: 35px;
    font-family: 'Noto Sans KR';
  }

  .react-datepicker__day {
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
  }
`;

export const SButton = styled.button`
  width: 30px;
  height: 30px;
  background-color: var(--gray-300);
  color: var(--gray-600);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  &:hover {
    background-color: var(--gray-400);
  }
`;

export const SearchButton = styled.button`
  padding: 10px;
  background-color: rgb(252, 109, 135);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  &:hover {
    background-color: var(--main-color);
  }
`;
export const STextInput = styled.input`
  width: 10px;
  text-align: center;
  cursor: pointer;
`;

export const SCheckWrapper = styled.div`
  width: 50%;
  display: flex;
  background-color: white;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 0 0 0px 10px;
`;

export const SBoxWrapper = styled.div`
  width: 50%;
  display: flex;
  background-color: white;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 0 0 10px 0px;
  font-family: 'Noto Sans KR';
`;

export const SContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 3px;
  margin-bottom: 5px;
`;

export const SApplyButton = styled.button`
  padding: 5px;
  border: 1px solid rgb(253, 100, 133);
  border-radius: 4px;
  cursor: pointer;
  width: 95%;
  text-align: center;
`;
