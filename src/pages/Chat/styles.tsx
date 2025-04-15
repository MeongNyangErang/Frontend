import styled from 'styled-components';
import { media } from '@components/styles/responsive';
import bg from '@assets/images/logo-gray.png';

const SChatWrap = styled.div`
  height: ${({ theme }) =>
    `calc(100vh - ${theme.layouts.headerHeight} - ${theme.layouts.mobileNavHeight})`};

  ${media.tablet} {
    height: ${({ theme }) =>
      `calc(100vh - ${theme.layouts.headerHeight} - ${theme.layouts.footerHeight})`};
  }
`;

const SChatContiner = styled.div`
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layouts.innerWidth};
  height: 100%;

  ${media.tablet} {
    display: grid;
    grid-template-columns: 360px 1fr;
    grid-template-rows: 100%;
    border-left: ${({ theme }) => `1px solid ${theme.colors.gray300}`};
    border-right: ${({ theme }) => `1px solid ${theme.colors.gray300}`};
  }
`;

const SEmptyChatRoomMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 1;
    width: 60%;
    height: 100%;
    background-image: url(${bg});
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: contain;
    opacity: 0.15;
    transform: translate(-50%, -50%);
  }

  > p {
    position: relative;
    z-index: 2;
    font-size: 16px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray600};
  }
`;

export { SChatWrap, SChatContiner, SEmptyChatRoomMessage };
