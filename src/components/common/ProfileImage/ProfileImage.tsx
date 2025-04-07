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
  width: ${({ $width }) => $width};
  aspect-ratio: 1/1;
  background-color: #fff;
  border: ${({ theme }) => `1px solid ${theme.colors.gray200}`};
  border-radius: 9999px;

  img {
    position: absolute;
    left: 6px;
    top: 6px;
    width: calc(100% - 12px);
    height: calc(100% - 12px);
    border-radius: 9999px;
    object-fit: cover;
  }
`;
