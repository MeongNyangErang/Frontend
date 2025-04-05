import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { ellipsisStyle } from '@components/styles/mixins';

const SResultWrap = styled.div`
  padding: ${({ theme }) =>
    `${theme.layouts.paddingX} ${theme.layouts.paddingX} 40px`};
`;

const SItems = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`;

const SItem = styled(NavLink)`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
`;

const SImageArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 172px;
  background-color: ${({ theme }) => theme.colors.gray200};

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const STextArea = styled.div`
  padding: ${({ theme }) => theme.layouts.paddingX};
  background-color: #fff;
  border: ${({ theme }) => `1px solid ${theme.colors.gray300}`};
  border-top: none;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
`;

const SNameBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 12px;
`;

const SName = styled.h3<{ $line: number }>`
  flex: 1;
  font-size: 16px;
  font-weight: 600;

  ${ellipsisStyle}
`;

const SRating = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 2px 8px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.main};
  border: ${({ theme }) => `1px solid ${theme.colors.main}`};
  border-radius: 9999px;
`;

const SPriceBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 6px;
`;

const SCapacity = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  > div {
    display: flex;
    align-items: center;
    gap: 2px;
    color: ${({ theme }) => theme.colors.gray600};
    font-size: 12px;

    > svg {
      font-size: 14px;
    }
  }
`;

const SPrice = styled.p<{ $line: number }>`
  font-size: 16px;
  font-weight: 500;
  ${ellipsisStyle}
`;

export {
  SResultWrap,
  SItems,
  SItem,
  SImageArea,
  STextArea,
  SNameBox,
  SPriceBox,
  SName,
  SRating,
  SPrice,
  SCapacity,
};
