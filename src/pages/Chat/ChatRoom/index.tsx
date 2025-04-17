import { Navigate } from 'react-router-dom';
import { FaCamera } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import Modal from '@components/common/Modal';
import { ChatPartnerState } from '@typings/chat';
import ROUTES from '@constants/routes';
import { formatDateOrTime } from '@utils/date';
import useChatRoom from './useChatRoom';
import {
  SChatRoomWrap,
  SChatContainer,
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
} from './styles';

interface ChatRoomProps {
  chatRoomId: string;
  partnerInfo: ChatPartnerState;
}

const ChatRoom = ({
  chatRoomId,
  partnerInfo: { partnerImageUrl, partnerName },
}: ChatRoomProps) => {
  const {
    member: { data },
    messages,
    text,
    image,
    imagePreview,
    errorKey,
    errorMessage,
    infiniteScrollRef,
    scrollContainerRef,
    imageInputRef,
    handleChangeText,
    handleClickImageButton,
    handleChangeImage,
    handleRemoveImage,
    handleCloseErrorModal,
    handleSubmit,
  } = useChatRoom(chatRoomId);

  if (!data) return <Navigate to={ROUTES.home} />;

  return (
    <>
      <SChatRoomWrap>
        <SChatContainer ref={scrollContainerRef}>
          <SMessageList>
            <div ref={infiniteScrollRef} />
            {messages.map((message, index) => {
              const { messageContent, senderType, created_at, messageType } =
                message;
              const isMyMessage = senderType === data.role.toUpperCase();
              const isThePreviousSender =
                index > 0 && messages[index - 1].senderType === senderType;
              const isText = messageType === 'MESSAGE';
              const formattedTime = formatDateOrTime(created_at);
              return (
                <SMessage
                  key={`${created_at}${index}`}
                  className={isMyMessage ? 'right' : 'left'}
                >
                  {isMyMessage ? (
                    <SMessageContainer className="right">
                      <SMessageTime>{formattedTime}</SMessageTime>
                      <SMessageContent>
                        <div>
                          {isText ? (
                            <SMessageText>{messageContent}</SMessageText>
                          ) : (
                            <SMessageImage src={messageContent} alt="이미지" />
                          )}
                        </div>
                      </SMessageContent>
                    </SMessageContainer>
                  ) : (
                    <SMessageContainer className="left">
                      <SMessageProfile>
                        {!isThePreviousSender && (
                          <img src={partnerImageUrl} alt="프로필 이미지" />
                        )}
                      </SMessageProfile>
                      <SMessageContent>
                        {!isThePreviousSender && <span>{partnerName}</span>}
                        <div>
                          {isText ? (
                            <SMessageText>{messageContent}</SMessageText>
                          ) : (
                            <SMessageImage src={messageContent} alt="이미지" />
                          )}
                        </div>
                      </SMessageContent>
                      <SMessageTime>{formattedTime}</SMessageTime>
                    </SMessageContainer>
                  )}
                </SMessage>
              );
            })}
          </SMessageList>
        </SChatContainer>
        <STextBox>
          <STextBoxInputWrap className={image ? 'disabled' : ''}>
            <input
              type="file"
              ref={imageInputRef}
              onChange={handleChangeImage}
              accept=".jpg, .jpeg, .png"
            />
            <STextBoxInput
              type="text"
              value={text}
              onChange={handleChangeText}
              disabled={!!image}
            />
            <SImageButton onClick={handleClickImageButton} disabled={!!text}>
              <FaCamera />
            </SImageButton>
            <SSubmitButton disabled={!image && !text} onClick={handleSubmit}>
              전송
            </SSubmitButton>
          </STextBoxInputWrap>
        </STextBox>
        {imagePreview && (
          <SImagePreivewBox>
            <div>
              <img src={imagePreview} alt="이미지 프리뷰" />
              <button onClick={handleRemoveImage}>
                <FaXmark />
              </button>
            </div>
          </SImagePreivewBox>
        )}
      </SChatRoomWrap>
      <Modal
        isOpen={!!errorKey}
        role="alert"
        variant="centered"
        closeType="none"
        onClose={handleCloseErrorModal}
      >
        <SErrorMessage>{errorMessage}</SErrorMessage>
      </Modal>
    </>
  );
};

export default ChatRoom;
