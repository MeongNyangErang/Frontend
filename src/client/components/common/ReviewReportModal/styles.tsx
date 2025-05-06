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
  margin-bottom: 32px;
  width: 100%;
`;

const ImageUploaderWrap = styled.div`
  margin-bottom: 28px;
`;

const SErrorMessage = styled.div`
  padding-top: 8px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.main};
`;

export {
  SReportModalTitle,
  SSectionName,
  SReviewToReport,
  SReportForm,
  ImageUploaderWrap,
  SErrorMessage,
};
