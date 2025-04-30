import styled from 'styled-components';

const SImageUploaderWrap = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
  height: 96px;

  > input[type='file'] {
    display: none;
  }
`;

const SImageAddButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
  height: 80px;
  aspect-ratio: 1;
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: 28px;
  color: ${({ theme }) => theme.colors.gray400};
  background-color: ${({ theme }) => theme.colors.gray100};

  span {
    font-size: 11px;
  }
`;

const SPreviewWrap = styled.div`
  overflow-x: auto;
  flex: 1;
  padding-top: 16px;
  height: 100%;
`;

const SPreviewContainer = styled.div`
  display: flex;
  gap: 12px;
  width: max-content;
  height: 100%;
`;

const SPreview = styled.div`
  position: relative;
  height: 100%;

  img {
    height: 100%;
    aspect-ratio: 1;
    border-radius: ${({ theme }) => theme.radius.sm};
    object-fit: cover;
  }

  button {
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    border: ${({ theme }) => `1px solid ${theme.colors.gray300}`};
    border-radius: 9999px;
    background-color: #fff;
    box-shadow: ${({ theme }) => theme.shadow.card};
    transform: translate(50%, -50%);
  }
`;

export {
  SImageUploaderWrap,
  SImageAddButton,
  SPreviewWrap,
  SPreviewContainer,
  SPreview,
};
