import styled from 'styled-components';

const STextEditorWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  padding: 16px 12px 10px;
  margin-bottom: 4px;
  width: 100%;
  height: 200px;
  border: ${({ theme }) => `1px solid ${theme.colors.gray300}`};
  border-radius: ${({ theme }) => theme.radius.sm};
  background-color: ${({ theme }) => theme.colors.gray100};
`;

const STextArea = styled.textarea`
  resize: none;
  width: 100%;
  height: 100%;

  &::placeholder {
    font-size: 13px;
    color: ${({ theme }) => theme.colors.gray500};
  }
`;

const STextLength = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray600};

  span {
  }
`;

export { STextEditorWrap, STextArea, STextLength };
