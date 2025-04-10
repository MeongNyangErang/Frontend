import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from 'react-icons/fa6';
import styled from 'styled-components';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <HeaderTitle>
      <BackSpace onClick={handleBackClick}>
        <FaArrowLeftLong />
      </BackSpace>
      <Title>{title}</Title>
    </HeaderTitle>
  );
};

const HeaderTitle = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
`;

const BackSpace = styled.button`
  position: absolute;
  left: 0px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
`;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 700;
  color: var(--gray-700);'
`;

export default Header;
