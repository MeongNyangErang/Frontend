import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { media } from '@components/styles/responsive';
import { oneLineStyle } from '@components/styles/mixins';

const SProfileBoxWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  row-gap: 16px;
  min-height: 170px;

  > span {
    margin: 0 auto;
  }

  ${media.tablet} {
    flex-direction: row;
    padding: 24px 16px;
    border: ${({ theme }) => `1px solid ${theme.colors.gray300}`};
    border-radius: 12px;
    row-gap: 0;
  }
`;

const SProfileArea = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  ${media.tablet} {
    width: auto;
  }
`;

const SProfileImageWrap = styled.div`
  width: 100px;
  ${media.tablet} {
    width: 120px;
  }
`;

const SProfileText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  > p {
    ${oneLineStyle}
    font-size: 16px;
    font-weight: 500;
  }

  > span {
    ${oneLineStyle}
    color: ${({ theme }) => theme.colors.gray600};
  }
`;

const SEditButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;

  ${media.tablet} {
    width: auto;
  }
`;

const SEditButton = styled(Link)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  width: 100%;
  border-radius: 8px;
  color: #ff7b92;
  font-weight: 500;
  background-color: #fff3f5;

  &:last-child {
    color: #f29c70;
    background-color: #fdf5eb;
  }

  ${media.tablet} {
    width: auto;
  }
`;

export {
  SProfileBoxWrap,
  SProfileArea,
  SProfileImageWrap,
  SProfileText,
  SEditButtons,
  SEditButton,
};
