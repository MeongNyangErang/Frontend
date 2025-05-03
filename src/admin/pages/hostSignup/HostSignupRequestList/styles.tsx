import { media } from '@shared/components/styles/responsive';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SHostSignupRequestList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const SHostSignupRequestItem = styled(Link)`
  display: flex;
  flex-direction: column;
  row-gap: 2px;

  padding: ${({ theme }) => theme.layouts.paddingX};
  background-color: ${({ theme }) => theme.colors.gray100};
  border-radius: ${({ theme }) => theme.radius.md};

  > p {
    flex: 1;
    font-weight: 500;
  }

  > span {
    color: ${({ theme }) => theme.colors.gray600};
  }

  ${media.mobile} {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    column-gap: 8px;
  }
`;

const SPaginationWrap = styled.div`
  padding-top: 20px;
  margin-bottom: 20px;
`;

export { SHostSignupRequestList, SHostSignupRequestItem, SPaginationWrap };
