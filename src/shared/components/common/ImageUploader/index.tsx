import { ChangeEvent, useRef, memo } from 'react';
import { FaCamera } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import { InitialImage } from '@typings/textImageForm';
import {
  SImageUploaderWrap,
  SImageButton,
  SImagePreviewsWrap,
  SImagePreviews,
  SImagePreview,
  SImageDeleteButton,
} from './styles';

interface ImageUploaderProps {
  images: (File | InitialImage | string)[];
  onAdd: (imageFile: File) => void;
  onRemove: (index: number) => void;
}

const ImageUploader = ({ images, onAdd, onRemove }: ImageUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onAdd(file);
  };

  const getPreviewUrl = (image: File | InitialImage | string) => {
    if (image instanceof File) return URL.createObjectURL(image);
    if (typeof image === 'string') return image;
    return image.imageUrl;
  };

  return (
    <SImageUploaderWrap>
      <input
        type="file"
        ref={inputRef}
        accept=".png,.jpg,.jpeg"
        hidden
        onChange={handleInputChange}
      />
      <SImageButton
        type="button"
        onClick={() => {
          inputRef.current?.click();
        }}
      >
        <FaCamera />
        <span>사진등록</span>
      </SImageButton>
      <SImagePreviews>
        <SImagePreviewsWrap>
          {images.map((image, index) => {
            const url = getPreviewUrl(image);
            return (
              <SImagePreview key={url}>
                <img src={url} alt={`이미지 프리뷰 ${index}`} />
                <SImageDeleteButton onClick={() => onRemove(index)}>
                  <FaXmark />
                </SImageDeleteButton>
              </SImagePreview>
            );
          })}
        </SImagePreviewsWrap>
      </SImagePreviews>
    </SImageUploaderWrap>
  );
};

export default memo(ImageUploader);
