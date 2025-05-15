import styled from 'styled-components';
import { oneLineStyle } from '@shared/components/styles/mixins';

const SItem = styled.div`
  overflow: hidden;
  display: flex;
  align-items: center;
  height: 132px;
  background-color: #fff;
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.card};
  transform: translateY(-38px);
  cursor: pointer;
`;

const SImageArea = styled.div`
  position: relative;
  width: 108px;
  height: 100%;

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const SRating = styled.div`
  position: absolute;
  left: 8px;
  top: 8px;
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 0 6px;
  margin-bottom: 6px;
  background-color: ${({ theme }) => theme.colors.gray200};
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray700};
  border-radius: ${({ theme }) => theme.radius.sm};

  svg {
    color: ${({ theme }) => theme.colors.starYellow};
  }
`;

const STextArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 10px;
  height: 100%;
`;

const STextAreaTop = styled.div``;

const SItemType = styled.div`
  margin-bottom: 2px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.gray600};
`;

const SName = styled.div`
  ${oneLineStyle}
  margin-bottom: 2px;
  font-weight: 500;
`;

const SCapacity = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray600};

  > div {
    display: flex;
    align-items: center;
    gap: 1px;
  }

  svg {
    font-size: 12px;
  }
`;

const SPrice = styled.div`
  ${oneLineStyle}
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  width: 100%;
  font-size: 13px;
  font-weight: 500;

  > span {
    font-size: 11px;
    color: ${({ theme }) => theme.colors.gray600};
  }
`;

export {
  SItem,
  SItemType,
  SImageArea,
  STextArea,
  STextAreaTop,
  SName,
  SRating,
  SCapacity,
  SPrice,
};
