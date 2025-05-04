import styled from 'styled-components';

const SReportModalTitle = styled.div`
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 500;
`;

const SSectionName = styled.div`
  margin-bottom: 8px;
  width: 100%;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray800};
  letter-spacing: -1px;
`;

const SReviewToReport = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  margin-bottom: 24px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray100};
  border-radius: ${({ theme }) => theme.radius.sm};

  > p {
    font-weight: 500;
    font-size: 12px;
  }

  > div {
    font-size: 13px;
    color: ${({ theme }) => theme.colors.gray600};
  }
`;

const SReportForm = styled.form`
  width: 100%;
`;

const SReportTextareaWrap = styled.div`
  padding: 12px 12px 8px;
  width: 100%;
  border: ${({ theme }) => `1px solid ${theme.colors.gray300}`};
  border-radius: ${({ theme }) => theme.radius.sm};
  background-color: ${({ theme }) => theme.colors.gray200};
`;

const SReportTextarea = styled.textarea`
  width: 100%;
  background-color: pink;
  resize: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray400};
  }
`;

const STextLengthCounter = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.gray500};
  text-align: right;

  > span {
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray700};
  }
`;

export {
  SReportModalTitle,
  SSectionName,
  SReviewToReport,
  SReportForm,
  SReportTextareaWrap,
  SReportTextarea,
  STextLengthCounter,
};
