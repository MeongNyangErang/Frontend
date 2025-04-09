import styled from 'styled-components';
import {
  labelDotStyle,
  inputStyle,
  inputVariantStyles,
} from '@components/styles/mixins';
import { media } from '@components/styles/responsive';

const SPetFormWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
`;

const SPetFormTitle = styled.div`
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: 500;
`;

const SPetFormGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 32px;
  margin-bottom: 20px;
  width: 100%;

  ${media.mobile} {
    margin-bottom: 28px;
  }

  > p {
    flex-basis: 40px;
    flex-shrink: 0;

    span {
      ${labelDotStyle}
      font-size: 14px;
    }
  }

  > div {
    flex: 1;
  }
`;

const SPetFormInput = styled.input`
  ${inputStyle}
  ${inputVariantStyles.gray}
`;

export { SPetFormWrap, SPetFormTitle, SPetFormGroup, SPetFormInput };
