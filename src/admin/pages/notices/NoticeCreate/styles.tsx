import styled from 'styled-components';
import {
  inputStyle,
  inputVariantStyles,
} from '@shared/components/styles/mixins';

const SNoticeForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SNoticeTitleInput = styled.input`
  ${inputStyle}
  ${inputVariantStyles.gray}
`;

const SNoticeContetTextarea = styled.textarea`
  padding: 12px;
  width: 100%;
  min-height: 360px;
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.colors.gray100};
  resize: none;

  &::placeholder {
    font-size: 13px;
    color: ${({ theme }) => theme.colors.gray500};
  }
`;

const SNoticeContentWrap = styled.div``;

export {
  SNoticeForm,
  SNoticeTitleInput,
  SNoticeContetTextarea,
  SNoticeContentWrap,
};
