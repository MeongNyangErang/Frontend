import styled from 'styled-components';
import { noScrollBarStyle } from '@components/styles/mixins';
import { media, BREAK_POINTS } from '@components/styles/responsive';

const SChatRoomWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const SChatContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => `0 ${theme.layouts.paddingX}`};
  width: 100%;

  ${media.tablet} {
    padding: 0;
  }

  ${`@media (max-width:${BREAK_POINTS.tablet})`} {
    ${noScrollBarStyle}
  }
`;

const SChatInfoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => `${theme.layouts.paddingX}`};
  margin: ${({ theme }) => `30px 0`};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.gray100};

  ${media.tablet} {
    margin: ${({ theme }) => `30px ${theme.layouts.paddingX}`};
  }
`;

const SMessageList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 0;
`;

const SMessage = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 12px 0;
  width: 100%;

  ${media.tablet} {
    padding: ${({ theme }) => theme.layouts.paddingX};
  }

  &.left {
    justify-content: flex-start;
    padding-right: 48px;
  }

  &.right {
    justify-content: flex-end;
    padding-left: 48px;
  }
`;

const SMessageContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

const SMessageContent = styled.div`
  display: flex;
  flex-direction: column;

  > span {
    font-size: 13px;
    margin-bottom: 6px;
    color: ${({ theme }) => theme.colors.gray600};
  }

  > div {
    .left & {
      margin-right: 8px;
    }
    .right & {
      margin-left: 8px;
    }
  }
`;

const SMessageText = styled.div`
  padding: 8px 12px;
  border-radius: 8px;
  .left & {
    background-color: ${({ theme }) => theme.colors.gray100};
  }
  .right & {
    color: #fff;
    background-color: ${({ theme }) => theme.colors.main};
  }
`;

const SMessageImage = styled.img`
  display: block;
  width: 100%;
`;

const SMessageProfile = styled.div`
  flex-shrink: 0;
  width: 6vw;
  min-width: 36px;
  max-width: 60px;
  margin-right: 8px;

  > img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: 9999px;
  }
`;

const SMessageTime = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.gray500};

  .left & {
    text-align: left;
  }
  .right & {
    text-align: right;
  }
`;

const STextBox = styled.div`
  padding: ${({ theme }) => `12px ${theme.layouts.paddingX}`};
  width: 100%;
  height: 64px;
  background-color: #fff;
  box-shadow: ${({ theme }) => theme.shadow.top};
`;

const STextBoxInputWrap = styled.div`
  overflow: hidden;
  display: flex;
  gap: 4px;
  width: 100%;
  height: 100%;
  border: ${({ theme }) => `1px solid ${theme.colors.gray300}`};
  border-radius: 8px;
  background-color: #fff;

  &.disabled {
    background-color: ${({ theme }) => theme.colors.gray200};
  }

  > input[type='file'] {
    display: none;
  }
`;

const STextBoxInput = styled.input`
  flex: 1;
  padding: 0 0 0 10px;
`;

const SImageButton = styled.button`
  padding: 0 8px;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.gray500};
`;

const SSubmitButton = styled.button`
  padding: 0 16px;
  letter-spacing: -1px;
  font-weight: 500;
  color: #fff;
  background-color: ${({ theme }) => theme.colors.main};

  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray400};
  }
`;

const SImagePreivewBox = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 64px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: ${({ theme }) => `12px ${theme.layouts.paddingX}`};
  background-color: rgba(0, 0, 0, 0.1);

  > div {
    position: relative;

    img {
      max-width: 60px;
      max-height: 60px;
    }

    button {
      position: absolute;
      right: 0;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      border-radius: 9999px;
      background-color: #fff;
      transform: translate(50%, -40%);
    }
  }
`;

const SErrorMessage = styled.div``;

export {
  SChatRoomWrap,
  SChatContainer,
  SChatInfoBox,
  SMessageList,
  SMessage,
  SMessageContainer,
  SMessageContent,
  SMessageProfile,
  SMessageTime,
  STextBox,
  STextBoxInputWrap,
  STextBoxInput,
  SImageButton,
  SSubmitButton,
  SImagePreivewBox,
  SErrorMessage,
  SMessageText,
  SMessageImage,
};
