import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { oneLineStyle } from '@components/styles/mixins';

const SItemLink = styled(Link)`
  &:hover {
    img {
      transform: scale(1.05);
    }
  }
`;

const SImageArea = styled.div`
  overflow: hidden;
  border-radius: 8px 8px 0 0;

  img {
    width: 100%;
    height: 160px;
    object-fit: cover;
    transition: ${({ theme }) => theme.transition};
  }
`;

const SDescArea = styled.div`
  overflow: hidden;
  padding: 12px 12px 16px;
  border-radius: 0 0 8px 8px;
  background-color: #fff;
  box-shadow: ${({ theme }) => theme.shadow.card};
  border: ${({ theme }) => `1px solid ${theme.colors.gray300}`};
  border-top: none;

  > div {
    display: flex;
    align-items: center;
    gap: 6px;

    > div {
      ${oneLineStyle}
      flex: 1;
      margin-bottom: 6px;
      font-size: 16px;
      font-weight: 500;
      color: ${({ theme }) => theme.colors.gray700};
    }

    > span {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 2px 8px;
      font-size: 12px;
      color: ${({ theme }) => theme.colors.gray600};
      background-color: ${({ theme }) => theme.colors.gray200};
      border-radius: 4px;

      svg {
        font-size: 14px;
        color: ${({ theme }) => theme.colors.starYellow};
      }
    }
  }

  > p {
    ${oneLineStyle}
    font-size: 16px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray800};

    span {
      font-size: 12px;
      color: ${({ theme }) => theme.colors.gray500};
    }
  }
`;

export { SItemLink, SImageArea, SDescArea };
