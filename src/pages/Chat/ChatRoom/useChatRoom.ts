import { ChangeEvent, useRef, useState } from 'react';
import useChatMessages from '@hooks/page/chat/useChatMessages';
import useAuth from '@hooks/auth/useAuth';

const useChatRoom = (chatRoomId: string) => {
  const { member } = useAuth();
  const numericRoomId = Number(chatRoomId);
  const validRoomId = isNaN(numericRoomId) ? undefined : numericRoomId;
  const {
    messages,
    chatError,
    infiniteScrollRef,
    scrollContainerRef,
    sendMessage,
    sendImage,
    updateError,
  } = useChatMessages(validRoomId);
  const [text, setText] = useState('');
  const [image, setImage] = useState<null | File>(null);
  const [imagePreview, setImagePreview] = useState('');
  const imageInputRef = useRef<HTMLInputElement>(null);
  type ErrorKey = keyof typeof chatError;
  const errorKey = Object.keys(chatError).find(
    (key) => chatError[key as ErrorKey],
  );
  const errorMessage = errorKey && chatError[errorKey as ErrorKey];

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

  const handleCloseErrorModal = () => {
    if (!errorKey) return;
    updateError(errorKey as ErrorKey, '');
  };

  const handleSubmit = async () => {
    if (text) {
      sendMessage(text, () => setText(''));
    } else if (image) {
      await sendImage(image, () => {
        setImage(null);
        setImagePreview('');
      });
    }
  };

  return {
    member,
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
  };
};

export default useChatRoom;
