import styled from 'styled-components';

const SReviews = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  padding: 20px 0 40px;
`;

const SReview = styled.div`
  display: flex;
  flex-direction: column;
  border: ${({ theme }) => `1px solid ${theme.colors.gray200}`};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.card};
  background-color: #fff;
`;

const SReviewHeader = styled.div`
  padding: 8px 12px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray100};
`;

const SReviewBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px 12px 18px;
  width: 100%;
`;

const SContentBox = styled.div`
  margin-bottom: 12px;
`;

const SRateBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;

  > p {
    color: ${({ theme }) => theme.colors.gray500};
  }
`;

const SImagesBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  > div {
    overflow: hidden;
    margin-bottom: 16px;
    width: 60px;
    aspect-ratio: 1;
    border-radius: 8px;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const STextBox = styled.div``;

const SButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
`;

const SReivewsBottom = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export {
  SReviews,
  SReview,
  SReviewHeader,
  SReviewBody,
  SRateBox,
  SImagesBox,
  STextBox,
  SContentBox,
  SButtonBox,
  SReivewsBottom,
};
