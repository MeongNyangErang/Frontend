import styled from 'styled-components';
import { inputStyle, inputVariantStyles } from '@components/styles/mixins';

const SDropDownSelectorWrap = styled.div`
  position: relative;
`;

const SDropDownButton = styled.button`
  ${inputStyle}
  ${inputVariantStyles.gray}
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    color: ${({ theme }) => theme.colors.gray700};
  }
`;

const SDropDownPlaceholder = styled.span`
  color: ${({ theme }) => theme.colors.gray500};
`;

const SDropDownOptions = styled.div`
  position: absolute;
  z-index: 2;
  top: 100%;
  left: 0;
  padding: 16px;
  width: 100%;
  background-color: #fff;
  border: ${({ theme }) => `1px solid ${theme.colors.gray100}`};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.bottom};
  transform: translateY(8px);
`;

const SDropDownOption = styled.button`
  padding: 10px 0;
  width: 100%;
  &:hover {
    color: ${({ theme }) => theme.colors.main};
  }
`;

export {
  SDropDownSelectorWrap,
  SDropDownButton,
  SDropDownOptions,
  SDropDownOption,
  SDropDownPlaceholder,
};
