import { noScrollBarStyle } from '@shared/components/styles/mixins';
import styled from 'styled-components';

const SImageUploaderWrap = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
`;

const SImageButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  width: 80px;
  height: 80px;
  border: ${({ theme }) => `1px solid ${theme.colors.gray400}`};
  border-radius: 8px;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.gray500};
  background-color: #fff;

  > span {
    font-size: 12px;
  }

  &:hover {
    filter: brightness(0.95);
  }
`;

const SImagePreviews = styled.div`
  ${noScrollBarStyle}
  overflow-x: auto;
  flex: 1;
`;

const SImagePreviewsWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  column-gap: 16px;
  width: max-content;
  height: 96px;
`;

const SImagePreview = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border: ${({ theme }) => `1px solid ${theme.colors.gray200}`};
  background-color: #fff;
  border-radius: 8px;

  > img {
    width: 90%;
    height: 90%;
    object-fit: cover;
  }
`;

const SImageDeleteButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  color: ${({ theme }) => theme.colors.gray600};
  border: ${({ theme }) => `1px solid ${theme.colors.gray400}`};
  border-radius: 9999px;
  background-color: #fff;
  transform: translate(40%, -40%);
  box-shadow: ${({ theme }) => theme.shadow.bottom};
  &:hover {
    filter: brightness(0.95);
  }
`;

export {
  SImageUploaderWrap,
  SImageButton,
  SImagePreviewsWrap,
  SImagePreviews,
  SImagePreview,
  SImageDeleteButton,
};
