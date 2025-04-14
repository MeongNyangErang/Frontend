import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { media } from '@components/styles/responsive';

const SWishlistWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  column-gap: 24px;
  row-gap: 18px;
  padding: 24px 0 30px;

  ${media.tablet} {
    grid-template-columns: 1fr 1fr;
  }
`;

const SWishItem = styled.div`
  position: relative;
  padding-bottom: 18px;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.gray300}`};
`;

const SWishItemLink = styled(Link)`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding-right: 30px;
`;

const SThumbnailBox = styled.div`
  overflow: hidden;
  width: 100px;
  aspect-ratio: 1;
  border-radius: 8px;

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const SInfoBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  > h3 {
    margin-bottom: 2px;
    font-size: 16px;
    font-weight: 500;
  }

  > p {
    margin-bottom: 2px;
    font-size: 13px;
    color: ${({ theme }) => theme.colors.gray600};
  }

  > div {
    display: flex;
    align-items: center;
    gap: 4px;

    > em {
      font-size: 13px;
      color: ${({ theme }) => theme.colors.gray600};
    }
  }
`;

const SWishButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0;
  top: 0;
  width: 30px;
  aspect-ratio: 1;

  border: ${({ theme }) => `1px solid ${theme.colors.gray200}`};
  border-radius: 9999px;
  transition: ${({ theme }) => theme.transition.default};

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray300};
  }

  > svg {
    font-size: 20px;
    color: ${({ theme }) => theme.colors.main};
  }
`;

const SWishlistBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export {
  SWishlistWrap,
  SWishItem,
  SWishItemLink,
  SThumbnailBox,
  SInfoBox,
  SWishButton,
  SWishlistBottom,
};
