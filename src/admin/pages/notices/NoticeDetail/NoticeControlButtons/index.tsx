import { useNavigate } from 'react-router-dom';
import Button from '@shared/components/common/Button';
import ROUTES from '@admin/constants/routes';
import { SButtonWrap } from './styles';

interface NoticeControlButtonsProps {
  noticeId: number;
}

const NoticeControlButtons = ({ noticeId }: NoticeControlButtonsProps) => {
  const navigate = useNavigate();

  const onClickEditButton = () => {
    navigate(ROUTES.notices.edit(noticeId));
  };

  return (
    <SButtonWrap>
      <Button variant="grayBorder" fixedHeight fullWidth>
        삭제
      </Button>
      <Button
        onClick={onClickEditButton}
        variant="grayBorder"
        fixedHeight
        fullWidth
      >
        수정
      </Button>
    </SButtonWrap>
  );
};

export default NoticeControlButtons;
