import styled from 'styled-components';
import { FaXmark, FaArrowLeftLong } from 'react-icons/fa6';
import { media } from '@components/styles/responsive';

interface Props {
  title: string;
  onClick(): void;
  style: 'x' | 'arrow';
}

const SubPageHeader = ({ title, onClick, style }: Props) => {
  return (
    <Swrap>
      <button onClick={onClick}>
        {style === 'x' ? <FaXmark /> : <FaArrowLeftLong />}
      </button>
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
  padding: ${({ theme }) => theme.layouts.paddingX};
  width: 100%;

  ${media.tablet} {
    justify-content: flex-start;
    padding: 0;
  }

  > button {
    position: absolute;
    top: 50%;
    left: ${({ theme }) => theme.layouts.paddingX};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 12px 12px 0;
    font-size: 20px;
    transform: translateY(-50%);

    ${media.tablet} {
      display: none;
    }
  }

  > h2 {
    font-size: 16px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.gray700};

    ${media.tablet} {
      font-size: 22px;
    }
  }
`;
