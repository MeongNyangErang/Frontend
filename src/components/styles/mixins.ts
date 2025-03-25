import { css } from 'styled-components';

export const buttonStyle = css`
  padding: 8px 16px;
  font-size: 14px;
  background-color: ${({ theme }) => theme.colors.main};
  color: white;
  font-weight: 500;
  border-radius: ${({ theme }) => theme.radius.sm};
  display: inline-block;
`;
