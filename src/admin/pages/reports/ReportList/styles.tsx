import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SReportItem = styled(Link)`
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.gray100};
  border-radius: ${({ theme }) => theme.radius.sm};

  > p {
    color: ${({ theme }) => theme.colors.gray600};
  }
`;

export { SReportItem };
