import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  inputStyle,
  inputVariantStyles,
} from '@shared/components/styles/mixins';

const SDashBoardWrap = styled.div`
  margin: 0 auto;
  padding-top: 40px;
  max-width: ${({ theme }) => theme.layouts.loginWidth};
`;

const SDashBoardTitle = styled.div`
  margin-bottom: 48px;
  font-size: 18px;
  font-weight: 500;
`;

const SDashBoardMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 56px;
`;

const SDashBoardLink = styled(Link)`
  ${inputStyle}
  ${inputVariantStyles.gray}
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    color: ${({ theme }) => theme.colors.gray500};
  }
`;

export { SDashBoardWrap, SDashBoardTitle, SDashBoardMenu, SDashBoardLink };
