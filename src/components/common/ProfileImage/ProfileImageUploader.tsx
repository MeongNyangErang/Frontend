import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FaCamera } from 'react-icons/fa';
import { FileFormatFields } from '@typings/signUp';
import ProfileImage from './ProfileImage';

interface Props {
  profileImage: File | null;
  onChange(key: FileFormatFields, file: File | null): void;
  width: string;
  maxWidth: string;
}

const ProfileImageUploader = ({
  profileImage,
  onChange,
  width,
  maxWidth,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<null | string>(null);

  const handleClickButton = useCallback(() => {
    if (inputRef.current) inputRef.current.click();
  }, []);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    onChange('profileImage', file ? file[0] : null);
  }, []);

  useEffect(() => {
    if (profileImage) {
      const reader = new FileReader();

      reader.onload = ({ target }) => {
        if (target && typeof target.result === 'string')
          setPreview(target.result);
      };

      reader.readAsDataURL(profileImage);
    } else {
      setPreview(null);
    }
  }, [profileImage]);

  return (
    <>
      <SWrap $width={width} $maxWidth={maxWidth}>
        <ProfileImage imageUrl={preview} width="100%" />
        <SButton onClick={handleClickButton}>
          <FaCamera />
        </SButton>
      </SWrap>
      <SInput
        type="file"
        ref={inputRef}
        onChange={handleChange}
        accept=".png, .jpg, .jpeg"
      />
    </>
  );
};

export default ProfileImageUploader;

const SWrap = styled.div<{ $width: string; $maxWidth: string }>`
  position: relative;
  width: ${({ $width }) => $width};
  max-width: ${({ $maxWidth }) => $maxWidth};
  min-width: 120px;
`;

const SButton = styled.button`
  position: absolute;
  right: 4px;
  bottom: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  background-color: ${({ theme }) => theme.colors.sub};
  font-size: 22px;
  color: #fff;
  border-radius: 9999px;
`;

const SInput = styled.input`
  display: none;
`;
