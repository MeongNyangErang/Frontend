import styled from 'styled-components';

export const SFieldset = styled.fieldset`
  font-family: 'Noto Sans KR';
  padding: 16px;
  border: none;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  margin: 0 auto;
  width: 100%;
  max-width: 1024px;
  min-width: 320px;
`;

export const SOptionSelectorWrapper = styled.div`
  margin-bottom: 0px;
`;

export const SLabel = styled.label`
  font-family: 'Noto Sans KR';
  display: block;
  font-size: 14px;
  margin-top: 15px;
  margin-bottom: 5px;
  color: var(--gray-600);
`;

export const SLabelFile = styled.label`
  font-family: 'Noto Sans KR';
  display: block;
  font-size: 14px;
  margin-top: 20px;
  padding-bottom: 10px;
  color: var(--gray-600);
`;

export const SInput = styled.input`
  font-family: 'Noto Sans KR';
  width: 100%;
  height:40px;
  padding: 8px 12px;
  margin-bottom: 5px;
  background-color: var(--gray-100);
  &:active {
    background-color: var(--gray-200);
  border-radius: 4px;
  font-size: 14px;
`;

export const SDescriptionWrapper = styled.div`
  position: relative;
`;

export const SInputExplain = styled.textarea`
  font-family: 'Noto Sans KR';
  width: 100%;
  height: 100px;
  padding: 8px 12px;
  background-color: var(--gray-100);
    &:active {
    background-color: var(--gray-200);
  border-radius: 4px;
  font-size: 14px;
  resize: none;
  overflow-y: auto;
`;

export const SCharacterCount = styled.div`
  position: absolute;
  bottom: 8px;
  right: 8px;
  font-size: 0.875rem;
  color: #6b7280;
`;

export const SButton = styled.button`
  background-color: #f03e5e;
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  margin: 30px 0;
  height: 40px;
  text-align: center;
  font-weight: bold;
  &:hover {
    background-color: rgb(238, 46, 81);
  }
`;

export const SImagePreviewWrapper = styled.div`
  width: 30%;
  height: 130px;
  border: 2px dashed #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  margin-bottom: 10px;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

export const SInputFile = styled.input`
  display: none;
`;

export const SFormItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 24%;
`;

export const SInputNumber = styled.input`
  padding: 8px 12px;
  height: 40px;
  font-size: 14px;
  background-color: var(--gray-100);
    &:active {
    background-color: var(--gray-200);
  border-radius: 4px;
  cursor: pointer;
`;

export const SFormContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 10px;
`;

/* 숙소 Style */
export const SSFieldset = styled.fieldset`
  font-family: 'Noto Sans KR';
  padding: 16px;
  border: none;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  margin: 0 auto;
  width: 100%;
  max-width: 1024px;
  min-width: 320px;
`;

export const SSOptionSelectorWrapper = styled.div`
  margin-bottom: 0px;
`;

export const SSLabel = styled.label`
  font-family: 'Noto Sans KR';
  display: block;
  font-size: 14px;
  margin-top: 15px;
  margin-bottom: 5px;
  color: var(--gray-600);
`;

export const SSLabelFile = styled.label`
  font-family: 'Noto Sans KR';
  display: block;
  font-size: 14px;
  margin-top: 20px;
  padding-bottom: 10px;
  color: var(--gray-600);
`;

export const SSInput = styled.input`
  font-family: 'Noto Sans KR';
  width: 100%;
  height:40px;
  padding: 8px 12px;
  margin-bottom: 5px;
  border-radius: 4px;
  font-size: 14px;
  background-color: var(--gray-100);
    &:active {
    background-color: var(--gray-200);
`;

export const SSDescriptionWrapper = styled.div`
  position: relative;
`;

export const SSInputExplain = styled.textarea`
  font-family: 'Noto Sans KR';
  width: 100%;
  height: 100px;
  padding: 8px 12px;
  background-color: var(--gray-100);
   &:active {
  background-color: var(--gray-200);
  border-radius: 4px;
  font-size: 14px;
  resize: none;
  overflow-y: auto;
`;

export const SSInputAddress = styled.input`
  font-family: 'Noto Sans KR';
  width: 100%;
  height:40px;
  padding: 8px 12px;
  margin-bottom: 7px;
  background-color: var(--gray-100);
    &:active {
    background-color: var(--gray-200);
  border-radius: 4px;
  font-size: 14px;
`;

export const SSCharacterCount = styled.div`
  position: absolute;
  bottom: 8px;
  right: 8px;
  font-size: 0.875rem;
  color: var(--gray-600);
`;

export const SSButton = styled.button`
  background-color: #f03e5e;
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  margin: 30px 0;
  height: 40px;
  text-align: center;
  font-weight: bold;
  &:hover {
    background-color: rgb(238, 46, 81);
  }
`;

export const SSImagePreviewWrapper = styled.div`
  width: 30%;
  height: 130px;
  border: 2px dashed #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  margin-bottom: 10px;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

export const SSPreviewWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  gap: 10px;
  justify-content: flex-start;
`;

export const SSInputFile = styled.input`
  display: none;
`;

export const SSUploadContainer = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
  padding: 28px;
  font-size: 12px;
  background-color: var(--gray-100);
  border: 1px solid #ddd;
  text-align: center;
  cursor: pointer;
  border-radius: 8px;
  color: var(--gray-600);

  &:hover {
    background-color: var(--gray-200);
  }
`;

export const SErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  margin-bottom: 10px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  text-align: center;
`;
