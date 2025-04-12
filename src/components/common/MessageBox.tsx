import { ReactNode } from 'react';
import styled from 'styled-components';

interface MessageBoxProps {
  children: ReactNode;
  fontSize?: number;
  variant?: 'white' | 'light';
}

const MessageBox = ({
  children,
  fontSize = 14,
  variant = 'white',
}: MessageBoxProps) => {
  return (
    <SMessageBoxWrap $fontSize={`${fontSize}px`} $variant={variant}>
      {children}
    </SMessageBoxWrap>
  );
};

export default MessageBox;

const SMessageBoxWrap = styled.div<{
  $fontSize: string;
  $variant: 'white' | 'light';
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.layouts.paddingX};
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme, $variant }) =>
    $variant === 'white' ? '#fff' : theme.colors.gray200};
  font-size: ${({ $fontSize }) => $fontSize};
  text-align: center;
`;
