import { useNavigate } from 'react-router-dom';
import { SSubPageTitle } from '@admin/components/styles/mixins';
import Button from '@shared/components/common/Button';
import ROUTES from '@admin/constants/routes';
import { SNoticeWrap, SNoticeList } from './styles';

const NoticeList = () => {
  const navigate = useNavigate();
  const handleClickNewNoticeButton = () => {
    navigate(ROUTES.notices.new);
  };

  return (
    <SNoticeWrap>
      <SSubPageTitle>공지사항 목록</SSubPageTitle>
      <SNoticeList></SNoticeList>
      <Button
        onClick={handleClickNewNoticeButton}
        variant="grayBorder"
        fontSize="14px"
        fixedHeight
      >
        새 공지 작성
      </Button>
    </SNoticeWrap>
  );
};

export default NoticeList;
