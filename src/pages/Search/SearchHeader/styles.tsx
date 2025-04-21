import styled from 'styled-components';

const SHeaderWrap = styled.div`
  position: sticky;
  left: 0;
  top: ${({ theme }) => theme.layouts.headerHeight};
  z-index: 1000;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.gray200}`};
  background-color: #fff;
`;

const SHeaderContainer = styled.div`
  padding: ${({ theme }) => `0 ${theme.layouts.paddingX}`};

  &:first-child {
    padding: ${({ theme }) => `12px ${theme.layouts.paddingX}`};
    border-bottom: ${({ theme }) => `1px solid ${theme.colors.gray200}`};
  }

  > div {
    max-width: ${({ theme }) => theme.layouts.innerWidth};
    margin: 0 auto;
  }
`;

export { SHeaderWrap, SHeaderContainer };
