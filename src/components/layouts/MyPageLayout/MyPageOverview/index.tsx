import { useNavigate } from 'react-router-dom';
import { USER_OVERVEIW_LIST, HOST_OVERVIEW_LIST } from '@constants/myPage';
import Modal from '@components/common/Modal';
import Button from '@components/common/Button';
import useLogout from '@hooks/auth/useLogout';
import {
  SMyPageOverviewWrap,
  SOverviewItem,
  SOverviewModalContents,
} from './styles';
import useToggleModal from '@hooks/ui/useToggleModal';
import { useCallback } from 'react';

interface MyPageOverviewProps {
  role: 'host' | 'user';
}

const MyPageOverview = ({ role }: MyPageOverviewProps) => {
  const { logout: hostLogout } = useLogout('host');
  const { logout: userLogout } = useLogout('user');
  const { isModalOpen, openModal, closeModal } = useToggleModal();
  const navigate = useNavigate();
  const isHost = role === 'host';
  const overviewList = isHost ? HOST_OVERVIEW_LIST : USER_OVERVEIW_LIST;
  const logoutFn = isHost ? hostLogout : userLogout;
  const handleLogout = useCallback(() => {
    logoutFn();
    closeModal();
  }, [logoutFn]);

  return (
    <>
      <SMyPageOverviewWrap>
        {overviewList.map(({ path, desc, name }) => {
          return (
            <SOverviewItem onClick={() => navigate(path)} key={name}>
              <p>{name}</p>
              <span>{desc}</span>
            </SOverviewItem>
          );
        })}
        <SOverviewItem onClick={() => openModal()}>
          <p>로그아웃</p>
        </SOverviewItem>
      </SMyPageOverviewWrap>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        variant="centered"
        closeType="x"
      >
        <SOverviewModalContents>
          <p>정말 로그아웃 하시겠어요?</p>
          <Button onClick={handleLogout} variant="main" fontSize="14px">
            확인
          </Button>
        </SOverviewModalContents>
      </Modal>
    </>
  );
};

export default MyPageOverview;
