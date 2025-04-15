import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { media } from '@components/styles/responsive';

const SMyPageOverviewWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 22px;
`;

const SOverviewItem = styled.button`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 20px 0;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.gray300}`};

  &:first-child {
    border-top: ${({ theme }) => `1px solid ${theme.colors.gray300}`};
  }

  &:last-child {
    border-bottom: none;
  }

  > p {
    color: ${({ theme }) => theme.colors.gray700};
    font-size: 16px;
    font-weight: 500;

    ${media.tablet} {
      font-size: 18px;
    }
  }

  > span {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: 13px;
    letter-spacing: -1;

    ${media.tablet} {
      font-size: 14px;
    }
  }
`;

const SOverviewModalContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding-bottom: 12px;
`;

export { SMyPageOverviewWrap, SOverviewItem, SOverviewModalContents };
