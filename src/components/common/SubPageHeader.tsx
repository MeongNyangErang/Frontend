import styled from 'styled-components';
import { FaXmark, FaArrowLeftLong } from 'react-icons/fa6';
import { media } from '@components/styles/responsive';

interface Props {
  title: string;
  style: 'x' | 'arrow' | 'noButton';
  onClick?: () => void;
}

const SubPageHeader = ({ title, onClick, style }: Props) => {
  return (
    <Swrap>
      {style !== 'noButton' && (
        <button onClick={onClick}>
          {style === 'x' ? <FaXmark /> : <FaArrowLeftLong />}
        </button>
      )}
      <h2>{title}</h2>
    </Swrap>
  );
};

export default SubPageHeader;

const Swrap = styled.header`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => `${theme.layouts.paddingX} 0`};
  width: 100%;

  ${media.desktop} {
    justify-content: flex-start;
    padding: 0;
  }

  > button {
    position: absolute;
    top: 50%;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 12px 12px 0;
    font-size: 18px;
    transform: translateY(-50%);

    ${media.desktop} {
      display: none;
    }
  }

  > h2 {
    font-size: 16px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.gray700};

    ${media.desktop} {
      font-size: 22px;
    }
  }
`;
