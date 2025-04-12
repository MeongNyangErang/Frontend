import styled from 'styled-components';

const SChatWrap = styled.div`
  padding: ${({ theme }) => `0 ${theme.layouts.paddingX}`};
`;

const SChatContiner = styled.div`
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layouts.innerWidth};
`;

export { SChatWrap, SChatContiner };
