import { media } from '@components/styles/responsive';
import styled from 'styled-components';

const SProfileEditWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  column-gap: 40px;
  row-gap: 28px;
  padding-top: 24px;

  ${media.desktop} {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
  }
`;

const SProfileImageEdit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > button {
    position: relative;
    z-index: 2;
    padding: 6px 12px;
    margin-top: 8px;
    font-size: 12px;
    background-color: #fff;
    color: ${({ theme }) => theme.colors.gray600};
    border: ${({ theme }) => `1px solid ${theme.colors.gray400}`};
    border-radius: 4px;
  }
`;

const SProfileEditList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: ${({ theme }) => `1px solid ${theme.colors.gray300}`};
  border-radius: 8px;
  margin-bottom: 60px;
  width: 100%;
`;

const SProfileEditItem = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => `14px ${theme.layouts.paddingX}`};
  width: 100%;
  font-size: 14px;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.gray300}`};
  &:last-child {
    border-bottom: none;
  }
`;

const SFormTitle = styled.div`
  margin-bottom: 24px;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
`;

export {
  SProfileEditWrap,
  SProfileEditItem,
  SProfileEditList,
  SProfileImageEdit,
  SFormTitle,
};
