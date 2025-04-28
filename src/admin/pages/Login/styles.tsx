import styled from 'styled-components';
import {
  inputStyle,
  inputVariantStyles,
} from '@shared/components/styles/mixins';

const SLoginWrap = styled.div`
  padding: ${({ theme }) => `0 ${theme.layouts.paddingX}`};
  min-height: 100vh;
`;

const SLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 72px 0 0;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layouts.loginWidth};
`;

const SLoginLogo = styled.h1`
  max-width: 132px;
  margin-bottom: 40px;

  > img {
    display: block;
    width: 100%;
  }
`;

const SLoginForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SLoginInput = styled.input`
  ${inputStyle}
  ${inputVariantStyles.white}
  width: 100%;
`;

export { SLoginWrap, SLoginContainer, SLoginLogo, SLoginForm, SLoginInput };
