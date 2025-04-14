import { ChangeEvent, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { FaCamera } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import useChatMessages from '@hooks/page/chat/useChatMessages';
import useAuth from '@hooks/auth/useAuth';
import { ChatPartnerState } from '@typings/chat';
import ROUTES from '@constants/routes';
import { formatDateOrTime } from '@utils/date';
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
} from './styles';

interface ChatRoomProps {
  chatRoomId: string;
  partnerInfo: ChatPartnerState;
}

const ChatRoom = ({
  chatRoomId,
  partnerInfo: { partnerImageUrl, partnerName },
}: ChatRoomProps) => {
  const { member } = useAuth();
  const { messages } = useChatMessages(
    Number.isNaN(chatRoomId) ? undefined : Number(chatRoomId),
  );
  const [text, setText] = useState('');
  const [image, setImage] = useState<null | File>(null);
  const [imagePreview, setImagePreview] = useState('');
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleClickImageButton = () => {
    const target = imageInputRef.current;
    if (target) target.click();
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const file = files[0];
      setImage(file);

      const reader = new FileReader();

      reader.onload = (e) => {
        const result = e.target?.result;
        if (result && typeof result === 'string') setImagePreview(result);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview('');
  };

  if (!member) return <Navigate to={ROUTES.home} />;

  return (
    <SChatRoomWrap>
      <SChatContainer>
        <SMessageList>
          {messages.map((message, index) => {
            const { content, messageId, senderType, created_at } = message;
            const isMyMessage = senderType === member.role.toUpperCase();
            const isThePreviousSender =
              index > 0 && messages[index - 1].senderType === senderType;
            const formattedTime = formatDateOrTime(created_at);
            return (
              <SMessage
                key={created_at}
                className={isMyMessage ? 'right' : 'left'}
              >
                {isMyMessage ? (
                  <SMessageContainer className="right">
                    <SMessageTime>{formattedTime}</SMessageTime>
                    <SMessageContent>
                      <p>{content}</p>
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
                      <p>{content}</p>
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
          <SSubmitButton disabled={!image && !text}>전송</SSubmitButton>
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
  );
};

export default ChatRoom;
