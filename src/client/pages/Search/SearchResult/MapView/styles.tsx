import { media } from '@shared/components/styles/responsive';
import styled from 'styled-components';

const SMapWrap = styled.div<{ $headerHeight: number }>`
  position: relative;
  width: 100%;
  height: ${({ theme, $headerHeight }) =>
    `calc(100vh - ${theme.layouts.headerHeight} - ${$headerHeight}px)`};
  padding: 0;

  ${media.mobile} {
    padding: ${({ theme }) => theme.layouts.paddingX};
  }
`;

const SMapContainer = styled.div`
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layouts.innerWidth};
  width: 100%;
  height: 100%;

  ${media.mobile} {
    overflow: hidden;
    border-radius: ${({ theme }) => theme.radius.sm};
  }
`;

const SMoreAccommodationsButton = styled.button`
  position: absolute;
  top: 32px;
  left: 50%;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray700};
  background-color: #fff;
  border: ${({ theme }) => `1.5px solid ${theme.colors.gray700}`};
  border-radius: 9999px;
  transform: translate(-50%, 0);

  &:disabled {
    color: ${({ theme }) => theme.colors.gray500};
    background-color: ${({ theme }) => theme.colors.gray200};
    border-color: ${({ theme }) => theme.colors.gray400};
  }
`;

export { SMapWrap, SMapContainer, SMoreAccommodationsButton };
