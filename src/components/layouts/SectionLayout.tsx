import { ReactNode } from 'react';
import styled from 'styled-components';

export const SectionLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SSectionWrap>
      <SSectionContainer>{children}</SSectionContainer>
    </SSectionWrap>
  );
};

export const SSectionWrap = styled.div`
  width: 100%;
  padding: ${({ theme }) => `0 ${theme.layouts.paddingX}`};
  background-color: #fff;
`;

export const SSectionContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: ${({ theme }) => theme.layouts.innerWidth};
  min-width: 320px;
  background-color: #fff;
`;
