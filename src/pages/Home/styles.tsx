import styled from 'styled-components';
import { media } from '@components/styles/responsive';
import { SSectionWrap } from '@components/layouts/SectionLayout';

const SRecommendationArea = styled(SSectionWrap)`
  padding-bottom: 60px;
`;

const SRecommendationContainer = styled.div`
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layouts.innerWidth};
`;

const SSearchBarArea = styled.div`
  position: relative;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: ${({ theme }) => `30px ${theme.layouts.paddingX}`};
`;

const SSearchBarContainer = styled.div`
  max-width: ${({ theme }) => theme.layouts.innerWidth};
  width: 100%;

  ${media.tablet} {
    > div {
      position: relative;
      z-index: 1;
      padding: 20px 16px;
      background-color: ${({ theme }) => theme.colors.gray100};
      border-radius: 8px;
    }
  }
`;

const SSectionTitle = styled.h2`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray700};
  letter-spacing: -2px;

  > i {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 2px;
    font-size: 18px;
    color: ${({ theme }) => theme.colors.main};
  }

  > span {
    margin-right: 6px;

    strong {
      font-weight: 500;
      color: ${({ theme }) => theme.colors.main};
    }
  }
`;

const SSectionContainer = styled.div`
  padding-bottom: 28px;
  margin-bottom: 22px;

  border-bottom: ${({ theme }) => `1px solid ${theme.colors.gray100}`};

  ${media.tablet} {
    padding-bottom: 32px;
    margin-bottom: 24px;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const SSectionBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 233px;
`;

export {
  SRecommendationArea,
  SRecommendationContainer,
  SSearchBarArea,
  SSearchBarContainer,
  SSectionTitle,
  SSectionContainer,
  SSectionBox,
};
