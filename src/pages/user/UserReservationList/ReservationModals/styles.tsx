import styled from 'styled-components';

const SReviewSummary = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  padding: ${({ theme }) => theme.layouts.paddingX};
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray100};
  border-radius: ${({ theme }) => theme.radius.sm};

  > div {
    margin-bottom: 2px;
    font-size: 18px;
    font-weight: 500;
  }

  > span {
    margin-bottom: 2px;
    font-size: 16px;
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

const SRatingBox = styled.div``;

const SRatingTitle = styled.div``;

export { SReviewSummary, SRatingBox, SRatingTitle };
