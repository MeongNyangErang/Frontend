import { useParams, useNavigate } from 'react-router-dom';
import ROUTES from '@admin/constants/routes';
import { SSubPageTitle } from '@admin/components/styles/mixins';
import MessageBox from '@shared/components/common/MessageBox';
import useHostSignupRequestDetail from '@admin/hooks/page/useHostSignupRequestDetail';
import HostSignupApprovalButtons from './HostSignupApprovalButtons';
import {
  SHostRequestDataGroup,
  SHostRequestDataName,
  SHostRequestDataValue,
  SHostRequestImageArea,
} from './styles';

const HOST_REQUEST_FIELDS = [
  { id: 'email', name: '이메일' },
  { id: 'name', name: '이름' },
  { id: 'phoneNumber', name: '연락처' },
] as const;

const HostSignupRequestDetail = () => {
  const { hostId } = useParams();
  const numericHostId = Number(hostId);
  const navigate = useNavigate();

  if (!hostId || Number.isNaN(numericHostId)) {
    navigate(ROUTES.hosts.root(0));
    return;
  }

  const { data, error } = useHostSignupRequestDetail(numericHostId);

  if (error || !data) {
    return (
      <>
        <SSubPageTitle>호스트 승인</SSubPageTitle>
        <MessageBox variant="light">{error}</MessageBox>
      </>
    );
  }

  return (
    <>
      <SSubPageTitle>호스트 승인</SSubPageTitle>
      {HOST_REQUEST_FIELDS.map(({ name, id }) => (
        <SHostRequestDataGroup key={id}>
          <SHostRequestDataName>{name}</SHostRequestDataName>
          <SHostRequestDataValue>{data[id]}</SHostRequestDataValue>
        </SHostRequestDataGroup>
      ))}
      <SHostRequestDataGroup>
        <SHostRequestDataName>첨부 서류</SHostRequestDataName>
        <SHostRequestImageArea>
          <img src={data.businessLicenseImageUrl} alt="첨부서류1" />
          <img src={data.submitDocumentImageUrl} alt="첨부서류2" />
        </SHostRequestImageArea>
      </SHostRequestDataGroup>
      <HostSignupApprovalButtons hostId={numericHostId} />
    </>
  );
};

export default HostSignupRequestDetail;
