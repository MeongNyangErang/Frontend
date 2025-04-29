import { DASH_BOARD_MENU_LIST } from '@admin/constants/dashboard';
import { FaChevronRight } from 'react-icons/fa';
import useIsLoading from '@shared/hooks/ui/useIsLoading';
import useError from '@shared/hooks/ui/useError';
import Button from '@shared/components/common/Button';
import Modal from '@shared/components/common/Modal';
import useAdminLogout from '@admin/hooks/auth/useAdminLogout';
import {
  SDashBoardWrap,
  SDashBoardTitle,
  SDashBoardMenu,
  SDashBoardLink,
} from './styles';

const DashBoard = () => {
  const { logoutAdminUser } = useAdminLogout();
  const { isLoading, startIsLoading, endIsLoading } = useIsLoading();
  const { error, updateError, resetError } = useError();

  const handleLogout = async () => {
    startIsLoading();

    try {
      await logoutAdminUser();
    } catch (error) {
      updateError('로그아웃에 실패했습니다.');
    } finally {
      endIsLoading();
    }
  };

  return (
    <SDashBoardWrap>
      <SDashBoardTitle>관리자 대시보드</SDashBoardTitle>
      <SDashBoardMenu>
        {DASH_BOARD_MENU_LIST.map(({ name, path }) => (
          <SDashBoardLink key={name} to={path}>
            {name}
            <FaChevronRight />
          </SDashBoardLink>
        ))}
      </SDashBoardMenu>
      <Button
        onClick={handleLogout}
        variant="grayBorder"
        disabled={isLoading}
        fontSize="14px"
        fixedHeight
        fullWidth
      >
        로그아웃
      </Button>
      <Modal
        isOpen={!!error}
        variant="centered"
        closeType="none"
        role="alert"
        onClose={resetError}
      >
        {error}
      </Modal>
    </SDashBoardWrap>
  );
};

export default DashBoard;
