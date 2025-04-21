import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { oneLineStyle } from '@components/styles/mixins';

const SSliderWrap = styled.div`
  position: relative;
`;

const SNavigationButton = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -8px;
  width: 36px;
  height: 36px;
  font-size: 16px;
  background-color: #fff;
  border: ${({ theme }) => `1px solid ${theme.colors.gray200}`};
  transform: translate(0, -100%);
  color: ${({ theme }) => theme.colors.gray600};
  cursor: pointer;

  & &:hover {
    background-color: ${({ theme }) => theme.colors.gray100};
  }

  &.swiper-prev-button {
    margin-right: -1px;
    transform: translate(-100%, -100%);
  }
  &.swiper-next-button {
  }
`;

const SItemLink = styled(Link)`
  > span {
    position: absolute;
    right: 8px;
    top: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25px;
    height: 25px;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.gray800};

    &::after {
      content: '';
      position: absolute;
      right: 0;
      left: 0;
      top: 0;
      bottom: 0;
      background-color: #eee;
      border-radius: 9999px;
      opacity: 0.3;
    }
  }

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
    display: block;
    width: 100%;
    height: 160px;
    object-fit: cover;
    transition: ${({ theme }) => theme.transition.default};
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
      background-color: ${({ theme }) => theme.colors.gray100};
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

export { SSliderWrap, SItemLink, SImageArea, SDescArea, SNavigationButton };
