import styled from 'styled-components';

const SHeaderWrap = styled.div`
  position: sticky;
  left: 0;
  top: ${({ theme }) => theme.layouts.headerHeight};
  z-index: 1000;
  background-color: white;
`;

const SHeaderContainer = styled.div`
  padding: ${({ theme }) => `12px ${theme.layouts.paddingX}`};
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.gray200}`};
  > div {
    margin: 0 auto;
    max-width: ${({ theme }) => theme.layouts.innerWidth};
  }
`;

const SOverlay = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
`;

export { SHeaderWrap, SHeaderContainer, SOverlay };
