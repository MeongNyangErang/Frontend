import {
  inputStyle,
  inputVariantStyles,
  labelDotStyle,
} from '@components/styles/mixins';
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

const SFormInputBox = styled.div`
  width: 100%;
  margin-bottom: 8px;
`;

const SFormLabel = styled.span`
  ${labelDotStyle}
  display: inline-block;
  padding-bottom: 6px;
`;

const SFormInput = styled.input`
  ${inputStyle}
  ${inputVariantStyles.gray};
  margin-bottom: 4px;
`;

const SFormErrorMessage = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.main};
`;

export {
  SProfileEditWrap,
  SProfileEditItem,
  SProfileEditList,
  SProfileImageEdit,
  SFormTitle,
  SFormInputBox,
  SFormInput,
  SFormLabel,
  SFormErrorMessage,
};
