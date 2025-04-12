import styled from 'styled-components';
import { FaArrowLeftLong } from 'react-icons/fa6';

interface SignUpHeaderProps {
  title: string;
  onClick: () => void;
}

const SignUpHeader = ({ title, onClick }: SignUpHeaderProps) => {
  return (
    <SSignUpHeaderWrap>
      <h2>{title}</h2>
      <SPrevButton onClick={onClick}>
        <FaArrowLeftLong />
      </SPrevButton>
    </SSignUpHeaderWrap>
  );
};

export default SignUpHeader;

const SSignUpHeaderWrap = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.layouts.paddingX};
  position: relative;

  h2 {
    font-size: 16px;
    font-weight: 500;
  }
`;

const SPrevButton = styled.button`
  position: absolute;
  left: 16px;
  top: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  transform: translateY(-50%);
`;
