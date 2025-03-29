import styled from 'styled-components';
import profileDefault from '@assets/images/user/profileDefault.png';

interface Props {
  imageUrl: string | null;
  width: string;
}

const ProfileImage = ({ imageUrl, width }: Props) => {
  return (
    <SProfileWrap $width={width}>
      <img src={imageUrl || profileDefault} alt="프로필 이미지" />
    </SProfileWrap>
  );
};

export default ProfileImage;

const SProfileWrap = styled.div<{ $width: string }>`
  position: relative;
  padding-bottom: 100%;
  width: ${({ $width }) => $width};
  height: 0;
  background-color: #fff;
  border: ${({ theme }) => `1px solid ${theme.colors.gray200}`};
  border-radius: 9999px;

  img {
    position: absolute;
    left: 8px;
    top: 8px;
    width: calc(100% - 16px);
    height: calc(100% - 16px);
    border-radius: 9999px;
    object-fit: cover;
  }
`;
