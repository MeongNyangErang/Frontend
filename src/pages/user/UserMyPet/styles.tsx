import styled from 'styled-components';

const SUserMyPetWrap = styled.div``;

const SUserMyPetItems = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const SUserMyPetItem = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr;
`;

const SItemImageBox = styled.div`
  display: flex;

  > img {
    width: 100%;
  }
`;

const SItemTextBox = styled.div`
  > h3 {
    font-size: 16px;
    font-weight: 500;
  }

  > p {
    color: ${({ theme }) => theme.colors.gray600};
  }

  > span {
  }
`;

const SRegisterPetButton = styled.div``;

export {
  SUserMyPetWrap,
  SUserMyPetItems,
  SUserMyPetItem,
  SItemImageBox,
  SItemTextBox,
  SRegisterPetButton,
};
