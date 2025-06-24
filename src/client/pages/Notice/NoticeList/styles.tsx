import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { BREAK_POINTS } from '@shared/components/styles/responsive';
import { oneLineStyle } from '@shared/components/styles/mixins';

const paddingBox = css`
  padding: ${({ theme }) => `0 ${theme.layouts.paddingX}`};
`;

const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: ${({ theme }) =>
    `calc(100vh - ${theme.layouts.headerHeight} - ${theme.layouts.footerHeight})`};
`;

const SPageTitle = styled.div`
  ${paddingBox}
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  background-color: ${({ theme }) => theme.colors.gray100};

  h2 {
    font-size: 20px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray700};
  }
`;

const SPageContent = styled.div`
  ${paddingBox}
  flex: 1;
  margin: 0 auto;
  width: 100%;
  max-width: ${BREAK_POINTS.tablet};
`;

const SNoticeList = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 16px;
`;

const SNoticeListBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 52px;
`;

const SNoticeItem = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding-bottom: 16px;
  margin-bottom: 16px;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.gray200}`};

  > i {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.gray500};
  }
`;

const SNoticeTitle = styled.h3`
  ${oneLineStyle}
  font-size: 15px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray700};
`;

const SNoticeCreatedAt = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.gray600};
`;

export {
  SContainer,
  SPageTitle,
  SPageContent,
  SNoticeList,
  SNoticeListBottom,
  SNoticeItem,
  SNoticeTitle,
  SNoticeCreatedAt,
};
