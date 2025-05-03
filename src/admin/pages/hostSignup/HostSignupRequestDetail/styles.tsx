import styled from 'styled-components';
import {
  inputStyle,
  inputVariantStyles,
} from '@shared/components/styles/mixins';

const SHostRequestDataGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const SHostRequestDataName = styled.span`
  margin-bottom: 6px;
  color: ${({ theme }) => theme.colors.gray600};
`;

const SHostRequestDataValue = styled.p`
  ${inputStyle}
  ${inputVariantStyles.gray}
    display: flex;
  align-items: center;
`;

const SHostRequestImageArea = styled.div`
  display: flex;
  gap: 20px;
  padding: ${({ theme }) => theme.layouts.paddingX};
  min-height: 360px;
  background-color: ${({ theme }) => theme.colors.gray100};
  border-radius: ${({ theme }) => theme.radius.sm};

  > img {
    width: 50%;
    max-width: 400px;
  }
`;

export {
  SHostRequestDataGroup,
  SHostRequestDataName,
  SHostRequestDataValue,
  SHostRequestImageArea,
};
