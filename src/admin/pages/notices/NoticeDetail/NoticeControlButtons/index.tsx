import { useNavigate } from 'react-router-dom';
import Button from '@shared/components/common/Button';
import ROUTES from '@admin/constants/routes';
import useIsLoading from '@shared/hooks/ui/useIsLoading';
import useError from '@shared/hooks/ui/useError';
import Modal from '@shared/components/common/Modal';
import { deleteNotice } from '@admin/services/adminNotices';
import useNoticeList from '@admin/hooks/query/useNoticeList';
import { SButtonWrap } from './styles';

interface NoticeControlButtonsProps {
  noticeId: number;
}

const NoticeControlButtons = ({ noticeId }: NoticeControlButtonsProps) => {
  const { isLoading, startIsLoading, endIsLoading } = useIsLoading();
  const { error, updateError, resetError } = useError();
  const { refreshNoticeList } = useNoticeList(0, false);
  const navigate = useNavigate();

  const handleRemoveNotice = async () => {
    startIsLoading();

    try {
      await deleteNotice(noticeId);
      await refreshNoticeList();
      navigate(ROUTES.notices.root(0));
    } catch (error) {
      console.log(error);
      updateError('공지사항 삭제에 실패했습니다.');
    } finally {
      endIsLoading();
    }
  };

  const onClickEditButton = () => {
    navigate(ROUTES.notices.edit(noticeId));
  };

  return (
    <>
      <SButtonWrap>
        <Button
          onClick={handleRemoveNotice}
          variant="grayBorder"
          fixedHeight
          fullWidth
          disabled={isLoading}
        >
          삭제
        </Button>
        <Button
          onClick={onClickEditButton}
          variant="grayBorder"
          fixedHeight
          fullWidth
          disabled={isLoading}
        >
          수정
        </Button>
      </SButtonWrap>
      <Modal
        variant="centered"
        role="alert"
        isOpen={!!error}
        closeType="none"
        onClose={resetError}
      >
        {error}
      </Modal>
    </>
  );
};

export default NoticeControlButtons;
