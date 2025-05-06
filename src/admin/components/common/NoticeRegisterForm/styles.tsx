import styled from 'styled-components';
import {
  inputStyle,
  inputVariantStyles,
} from '@shared/components/styles/mixins';

const SNoticeForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const SNoticeTitleInput = styled.input`
  ${inputStyle}
  ${inputVariantStyles.gray}
  margin-bottom: ${({ theme }) => theme.layouts.paddingX};
`;

const SImageUploaderWrap = styled.div`
  margin-bottom: ${({ theme }) => theme.layouts.paddingX};
`;

export { SNoticeForm, SNoticeTitleInput, SImageUploaderWrap };
