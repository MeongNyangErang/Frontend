import { useNavigate } from 'react-router-dom';
import { FaUser, FaHouseUser } from 'react-icons/fa';
import ROUTES from '@constants/routes';
import { SModalContents } from './styles';

const MemberTypeSelector = () => {
  const navigate = useNavigate();

  return (
    <SModalContents>
      <p>가입하실 회원 유형을 선택해주세요.</p>
      <div>
        <button
          onClick={() => {
            navigate(ROUTES.signUp.user);
          }}
        >
          <FaUser />
          <span>
            일반 회원
            <br />
            가입하기
          </span>
        </button>
        <button
          onClick={() => {
            navigate(ROUTES.signUp.host);
          }}
        >
          <FaHouseUser />
          <span>
            호스트 회원
            <br />
            가입하기
          </span>
        </button>
      </div>
    </SModalContents>
  );
};

export default MemberTypeSelector;
