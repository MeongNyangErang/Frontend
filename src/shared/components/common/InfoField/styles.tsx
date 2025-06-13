import styled from 'styled-components';
import {
  inputStyle,
  inputVariantStyles,
} from '@shared/components/styles/mixins';

const SInfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const SInfoKey = styled.span`
  margin-bottom: 6px;
  color: ${({ theme }) => theme.colors.gray600};
`;

const SInfoValue = styled.div`
  ${inputStyle}
  ${inputVariantStyles.gray}
  display: flex;
  align-items: center;
  min-height: 48px;
  height: auto;
`;

export { SInfoGroup, SInfoKey, SInfoValue };
