import { css } from 'styled-components';
import { theme } from './theme';

export const buttonStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  min-height: 36px;
  font-size: 14px;
  font-weight: 500;
  border-radius: ${({ theme }) => theme.radius.md};
`;

export const inputStyle = css`
  padding: 8px 12px;
  width: 100%;
  height: 48px;
  font-size: 14px;
  border-radius: ${theme.radius.sm};
  outline: none;
`;

export const inputVariantStyles = {
  white: css`
    background-color: #fff;
    border: 1px solid ${theme.colors.gray300};

    &:focus {
      border-color: ${theme.colors.gray500};
    }

    &::placeholder {
      font-size: 14px;
      color: ${theme.colors.gray300};
    }
  `,
  gray: css`
    background-color: ${theme.colors.gray100};

    &:focus {
      background-color: ${theme.colors.gray200};
    }

    &::placeholder {
      font-size: 13px;
      color: ${theme.colors.gray500};
    }
  `,
};

export const labelDotStyle = css`
  position: relative;
  margin-bottom: 2px;
  font-size: 13px;
  line-height: 1;
  color: ${({ theme }) => theme.colors.gray600};

  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    width: 4px;
    height: 4px;
    border-radius: 9999px;
    background-color: ${({ theme }) => theme.colors.main};
    transform: translate(100%, -100%);
  }
`;

export const pageTitleStyle = css`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray700};
`;

export const noScrollBarStyle = css`
  -ms-overflow-style: none; /* IE 10+ */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ellipsisStyle = css<{ $line: number }>`
  display: -webkit-box;
  -webkit-line-clamp: ${({ $line }) => $line};
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
