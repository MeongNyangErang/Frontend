import styled, { css } from 'styled-components';

const SReviewWrap = styled.div`
  padding-bottom: 42px;
  width: 100%;
`;

const SReviewSummary = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  padding: ${({ theme }) => theme.layouts.paddingX};
  margin-bottom: 28px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray100};
  border-radius: ${({ theme }) => theme.radius.sm};

  > div {
    margin-bottom: 2px;
    font-size: 18px;
    font-weight: 500;
  }

  > span {
    margin-bottom: 4px;
    color: ${({ theme }) => theme.colors.gray600};
  }

  > p {
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.gray600};

    > svg {
      margin-right: 4px;
    }

    > span {
      margin: 0 4px;
    }
  }
`;

const SRatingBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 30px;
  width: 100%;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.gray300}`};
`;

const titleStyle = css`
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
`;

const SRatingTitle = styled.div`
  ${titleStyle}
`;

const SDetailBox = styled.div`
  width: 100%;
`;

const SDetailTitle = styled.div`
  ${titleStyle}
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;

  > span {
    margin-left: 4px;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.gray600};
  }
`;

const SImageNotice = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding-top: 8px;
  margin-bottom: 28px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray500};
`;

const SErrorMessage = styled.div`
  padding: 12px 0;
  color: ${({ theme }) => theme.colors.main};
`;

export {
  SReviewWrap,
  SReviewSummary,
  SRatingBox,
  SRatingTitle,
  SDetailBox,
  SDetailTitle,
  SImageNotice,
  SErrorMessage,
};
