import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  buttonStyle,
  inputStyle,
  inputVariantStyles,
} from '@components/styles/mixins';

const SLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => `72px ${theme.layouts.paddingX}`};
`;

const SLogo = styled(Link)`
  width: 96px;

  h2 {
    width: 100%;
    display: flex;
  }

  img {
    width: 100%;
  }
`;

const SDesc = styled.p`
  padding-top: 12px;
  margin-bottom: 20px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.gray700};
`;

const SForm = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  padding-bottom: 32px;
  width: 100%;
  max-width: 380px;

  input {
    ${inputStyle}
    ${inputVariantStyles.white}
  }
`;

const SSocialArea = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  padding-top: 32px;
  margin-bottom: 16px;
  width: 100%;
  max-width: 380px;
  border-top: ${({ theme }) => `1px solid ${theme.colors.gray300}`};

  &::before {
    content: '간편 로그인';
    position: absolute;
    top: 0;
    left: 50%;
    padding: 4px 8px;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.gray500};
    background-color: #fff;
    transform: translate(-50%, -50%);
  }
`;

const SSocialButton = styled.button<{ $variant: 'yellow' | 'gray' }>`
  ${buttonStyle}
  position:relative;
  height: 48px;
  color: ${({ theme }) => theme.colors.gray700};
  background-color: ${({ $variant, theme }) =>
    $variant === 'yellow' ? '#FEE500' : theme.colors.gray100};

  > img {
    position: absolute;
    left: 12px;
    width: 24px;
    margin-right: 7px;
  }
`;

const SSignUpButton = styled.button`
  padding: 0 2px 2px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray500};
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.gray500}`};
`;

const SModalContents = styled.div`
  width: 100%;

  > p {
    margin-bottom: 24px;
    text-align: center;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.gray600};
  }

  > div {
    display: flex;
    column-gap: 16px;
    margin-bottom: 32px;

    button {
      flex: 1;
      display: flex;
      flex-direction: column;
      row-gap: 4px;
      align-items: center;
      padding: 24px 8px;
      font-size: 32px;
      text-align: center;
      border-radius: ${({ theme }) => theme.radius.md};

      &:first-child {
        background-color: #fff2f4;
        color: #f58398;
      }

      &:last-child {
        background-color: #fff5e8;
        color: #f2a784;
      }

      > span {
        font-size: 14px;
      }
    }
  }
`;

export {
  SLogin,
  SLogo,
  SDesc,
  SForm,
  SSocialArea,
  SSocialButton,
  SSignUpButton,
  SModalContents,
};
