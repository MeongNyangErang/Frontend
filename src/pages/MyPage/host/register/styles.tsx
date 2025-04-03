import styled from 'styled-components';

export const SFieldset = styled.fieldset`
  font-family: 'Noto Sans KR';
  padding: 16px;
  border: none;
  display: flex;
  flex-direction: column;
`;

export const SOptionSelectorWrapper = styled.div`
  margin-bottom: 8px;
`;

export const SLabel = styled.label`
  font-family: 'Noto Sans KR';
  display: block;
  font-size: 1rem;
  margin: 10px 0;
`;

export const SLabelFile = styled.label`
  font-family: 'Noto Sans KR';
  display: block;
  font-size: 1rem;
  margin-top: 20px;
  padding-bottom: 10px;
`;

export const SInput = styled.input`
  font-family: 'Noto Sans KR';
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 1rem;
`;

export const SDescriptionWrapper = styled.div`
  position: relative;
`;

export const SInputExplain = styled.textarea`
  font-family: 'Noto Sans KR';
  width: 100%;
  height: 100px;
  padding: 8px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 1rem;
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
  background-color: var(--sub-color);
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  margin-left: auto;
  &:hover {
    background-color: var(--sub-color);
    border: 1px solid #f03e5e;
  }
`;

export const SImagePreviewWrapper = styled.div`
  margin-top: 10px;
  width: 50%;
  height: 150px;
  border: 2px dashed #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

export const SInputFile = styled.input`
  border: 1px solid #ccc;
  width: 60%;
  padding: 2px;
`;

export const SFormItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 49%;
`;

export const SInputNumber = styled.input`
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
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
`;

export const SSOptionSelectorWrapper = styled.div`
  margin-bottom: 8px;
`;

export const SSLabel = styled.label`
  font-family: 'Noto Sans KR';
  display: block;
  font-size: 1rem;
  margin: 10px 0;
`;

export const SSLabelFile = styled.label`
  font-family: 'Noto Sans KR';
  display: block;
  font-size: 1rem;
  margin-top: 20px;
  padding-bottom: 10px;
`;

export const SSInput = styled.input`
  font-family: 'Noto Sans KR';
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 1rem;
`;

export const SSDescriptionWrapper = styled.div`
  position: relative;
`;

export const SSInputExplain = styled.textarea`
  font-family: 'Noto Sans KR';
  width: 100%;
  height: 100px;
  padding: 8px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 1rem;
  resize: none;
  overflow-y: auto;
`;

export const SSInputAddress = styled.input`
  font-family: 'Noto Sans KR';
  width: 100%;
  padding: 8px;
  margin-bottom: 7px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 1rem;
`;

export const SSCharacterCount = styled.div`
  position: absolute;
  bottom: 8px;
  right: 8px;
  font-size: 0.875rem;
  color: #6b7280;
`;

export const SSButton = styled.button`
  background-color: var(--sub-color);
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  margin-left: auto;
  &:hover {
    background-color: var(--sub-color);
    border: 1px solid #f03e5e;
  }
`;

export const SSImagePreviewWrapper = styled.div`
  margin-top: 10px;
  width: 50%;
  height: 150px;
  border: 2px dashed #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;

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
  border: 1px solid #ccc;
  width: 60%;
  padding: 2px;
`;
