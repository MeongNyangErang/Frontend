import styled from 'styled-components';

const SNoticeHeader = styled.div`
  padding: 30px 0 18px;
  margin-bottom: 20px;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.gray200}`};

  > h3 {
    font-size: 16px;
    font-weight: 500;
  }

  > p {
    color: ${({ theme }) => theme.colors.gray500};
  }
`;

const SNoticeBody = styled.div`
  white-space: pre-line;

  img {
    display: block;
    margin-bottom: 20px;
    max-width: 100%;
  }
`;

export { SNoticeHeader, SNoticeBody };
