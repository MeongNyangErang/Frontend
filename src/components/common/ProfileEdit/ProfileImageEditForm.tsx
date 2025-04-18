import { useState } from 'react';
import styled from 'styled-components';
import useError from '@hooks/ui/useError';
import useIsLoading from '@hooks/ui/useIsLoading';
import { changeProfileImage } from '@services/profileEdit';
import { SFormErrorMessage, SFormTitle } from './styles';
import Button from '../Button';
import Loader from '../Loader';
import ProfileImageUploader from '../ProfileImage/ProfileImageUploader';
import EditSuccessMessage from './EditSuccessMessage';

interface ProflieImageEditForm {
  onClose: () => void;
  defaultValue: string | null;
}

const ProfileImageEditForm = ({
  onClose,
  defaultValue,
}: ProflieImageEditForm) => {
  const [profileImage, setProflieImage] = useState<File | null>(null);
  const { error, updateError } = useError();
  const { isLoading, startIsLoading, endIsLoading } = useIsLoading();
  const [isSuccess, setIsSuccess] = useState(false);

  const onChangeProfileImage = (key: 'profileImage', file: null | File) => {
    setProflieImage(file);
  };

  const handleSubmit = async () => {
    if (!profileImage) return;
    updateError('');

    const formData = new FormData();
    formData.append('newProfileImage', profileImage);

    startIsLoading();
    try {
      await changeProfileImage(formData);
      setIsSuccess(true);
    } catch (error) {
      updateError('프로필 이미지 변경에 실패했습니다. 다시 시도해주세요');
    } finally {
      endIsLoading();
    }
  };

  if (isSuccess) {
    return (
      <EditSuccessMessage
        message="프로필 이미지가 변경되었습니다."
        onClose={onClose}
      />
    );
  }

  return (
    <>
      <SFormTitle>프로필 이미지 변경</SFormTitle>
      <ProfileImageUploader
        width="45%"
        maxWidth="180px"
        profileImage={profileImage}
        onChange={onChangeProfileImage}
        defaultProfileImage={defaultValue}
      />
      <SSubmitButtonBox>
        <Button
          onClick={handleSubmit}
          fullWidth
          fixedHeight
          variant="main"
          disabled={!profileImage || isLoading}
        >
          {isLoading ? (
            <Loader size={8} color="grayBorder" loading />
          ) : (
            '변경하기'
          )}
        </Button>
      </SSubmitButtonBox>
      <SFormErrorMessage>{error}</SFormErrorMessage>
    </>
  );
};

export default ProfileImageEditForm;

const SSubmitButtonBox = styled.div`
  padding-top: 30px;
  margin-bottom: 6px;
  width: 100%;
`;
