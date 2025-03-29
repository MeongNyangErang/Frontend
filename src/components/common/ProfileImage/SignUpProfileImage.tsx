import styled from 'styled-components';
import ProfileImageUploader from '@components/common/ProfileImage/ProfileImageUploader';
import SubPageHeader from '@components/common/SubPageHeader';
import Button from '@components/common/Button';
import { FileFormatFields } from '@typings/signUp';

interface Props {
  profileImage: File | null;
  onChange(key: FileFormatFields, file: File | null): void;
  onPrev(): void;
  onClick(): void;
}

const SignUpProfileImage = ({
  profileImage,
  onChange,
  onPrev,
  onClick,
}: Props) => {
  return (
    <>
      <SubPageHeader title="프로필 이미지" onClick={onPrev} style="arrow" />
      <SWrap>
        <SSubTitle>프로필 이미지 등록(선택)</SSubTitle>
        <ProfileImageUploader
          profileImage={profileImage}
          onChange={onChange}
          width="50%"
          maxWidth="200px"
        />
        <Button
          onClick={onClick}
          variant="main"
          fontSize="14px"
          fixedHeight={true}
          fullWidth={true}
        >
          가입하기
        </Button>
      </SWrap>
    </>
  );
};

export default SignUpProfileImage;

const SWrap = styled.div`
  padding: ${({ theme }) => `32px ${theme.layouts.paddingX}`};
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 32px;
`;

const SSubTitle = styled.h3`
  width: 100%;
  color: ${({ theme }) => theme.colors.gray500};
`;
