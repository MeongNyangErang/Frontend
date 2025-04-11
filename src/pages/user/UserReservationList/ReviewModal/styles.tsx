import { noScrollBarStyle } from '@components/styles/mixins';
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
  margin-bottom: 22px;

  > span {
    margin-left: 4px;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.gray600};
  }
`;

const STextBoxWrap = styled.div`
  margin-bottom: 4px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  padding: 16px 12px 10px;
  width: 100%;
  height: 200px;
  border: ${({ theme }) => `1px solid ${theme.colors.gray300}`};
  border-radius: ${({ theme }) => theme.radius.sm};
`;

const STextBox = styled.textarea`
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
`;

const SImageBox = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;

  > input {
    display: none;
  }
`;

const SImageButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border: ${({ theme }) => `1px solid ${theme.colors.gray400}`};
  border-radius: 8px;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.gray500};
  background-color: #fff;

  > span {
    font-size: 13px;
  }

  &:hover {
    filter: brightness(0.95);
  }
`;

const SImagePreviews = styled.div`
  ${noScrollBarStyle}
  overflow-x: auto;
  flex: 1;
`;

const SImagePreviewsWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  column-gap: 16px;
  width: max-content;
  height: 96px;
`;

const SImagePreview = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border: ${({ theme }) => `1px solid ${theme.colors.gray200}`};
  background-color: #fff;
  border-radius: 8px;

  > img {
    width: 90%;
    height: 90%;
    object-fit: cover;
  }
`;

const SImageDeleteButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  color: ${({ theme }) => theme.colors.gray600};
  border: ${({ theme }) => `1px solid ${theme.colors.gray400}`};
  border-radius: 9999px;
  background-color: #fff;
  transform: translate(40%, -40%);
  box-shadow: ${({ theme }) => theme.shadow.bottom};
  &:hover {
    filter: brightness(0.95);
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
  STextBoxWrap,
  STextBox,
  STextLength,
  SImageNotice,
  SImageBox,
  SImageButton,
  SImagePreviews,
  SImagePreviewsWrap,
  SImagePreview,
  SImageDeleteButton,
  SErrorMessage,
};
