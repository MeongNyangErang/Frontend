import { useState, useRef, ChangeEvent } from 'react';
import { FaCamera } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import {
  SImageUploaderWrap,
  SImageAddButton,
  SPreviewWrap,
  SPreviewContainer,
  SPreview,
} from './styles';

interface ImagesUploaderProps {
  images: File[];
  addImage: (image: File) => void;
  removeImage: (index: number) => void;
}

const MAX_IMAGE_COUNT = 1;

const ImagesUploader = ({
  images,
  addImage,
  removeImage,
}: ImagesUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleClickAddButton = () => {
    if (!inputRef.current) return;
    inputRef.current.click();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (images.length === MAX_IMAGE_COUNT) return;
    const files = e.target.files;
    if (!files || !files[0]) return;
    const newImage = files[0];
    addImage(newImage);
    updatePreview(newImage);
  };

  const updatePreview = (newImage: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      setImagePreviews((prev) => [...prev, url]);
    };
    reader.readAsDataURL(newImage);
  };

  const deleteImage = (index: number) => {
    removeImage(index);
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <SImageUploaderWrap>
      <SImageAddButton type="button" onClick={handleClickAddButton}>
        <FaCamera />
        <span>사진 업로드</span>
      </SImageAddButton>
      <SPreviewWrap>
        <SPreviewContainer>
          {imagePreviews.map((preview, i) => (
            <SPreview key={preview}>
              <img src={preview} alt="미리보기" />
              <button type="button" onClick={() => deleteImage(i)}>
                <FaXmark />
              </button>
            </SPreview>
          ))}
        </SPreviewContainer>
      </SPreviewWrap>
      <input type="file" ref={inputRef} onChange={handleInputChange} />
    </SImageUploaderWrap>
  );
};

export default ImagesUploader;
