import styled from 'styled-components';
import {
  inputStyle,
  inputVariantStyles,
  labelDotStyle,
} from '@components/styles/mixins';

const SFormGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;

  label {
    ${labelDotStyle}
  }
`;

const SInputBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 6px;
  width: 100%;
  column-gap: ${({ theme }) => theme.layouts.paddingX};

  > input {
    flex: 1;
  }
`;

const SInput = styled.input`
  ${inputStyle};
  ${inputVariantStyles.gray};
`;

const SMessage = styled.div<{ type: 'success' | 'error' }>`
  margin-top: 4px;
  font-size: 12px;
  color: ${({ type, theme }) =>
    type === 'error' ? theme.colors.main : theme.colors.infoText};
`;

export { SFormGroup, SInputBox, SInput, SMessage };
