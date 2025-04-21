import styled from 'styled-components';
import { media } from '@components/styles/responsive';
import { SSectionWrap } from '@components/layouts/SectionLayout';

const SRecommendationArea = styled(SSectionWrap)`
  padding-bottom: 60px;
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

  margin-bottom: 12px;
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray700};
  letter-spacing: -1px;

  > i {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 4px;
    width: 18px;
    color: ${({ theme }) => theme.colors.gray600};
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
  margin-bottom: 36px;
`;

const SSectionBox = styled.div`
  display: flex;
  align-items: center;
  height: 233px;
`;

export {
  SRecommendationArea,
  SSearchBarArea,
  SSearchBarContainer,
  SSectionTitle,
  SSectionContainer,
  SSectionBox,
};
