import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { oneLineStyle } from '@shared/components/styles/mixins';

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
  color: ${({ theme }) => theme.colors.gray500};
`;

export {
  SNoticeList,
  SNoticeListBottom,
  SNoticeItem,
  SNoticeTitle,
  SNoticeCreatedAt,
};
