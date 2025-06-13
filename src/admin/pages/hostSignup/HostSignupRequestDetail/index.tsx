import React from 'react';
import useNumericParam from '@admin/hooks/router/useNumericParam';
import ROUTES from '@admin/constants/routes';
import { SSubPageTitle } from '@admin/components/styles/mixins';
import MessageBox from '@shared/components/common/MessageBox';
import useHostSignupRequestDetail from '@admin/hooks/page/useHostSignupRequestDetail';
import HostSignupApprovalButtons from './HostSignupApprovalButtons';
import InfoField from '@components/common/InfoField';
import { SHostRequestImageArea } from './styles';

const HOST_REQUEST_FIELDS = [
  { id: 'email', name: '이메일' },
  { id: 'name', name: '이름' },
  { id: 'phoneNumber', name: '연락처' },
] as const;

const HostSignupRequestDetail = () => {
  const numericHostId = useNumericParam('hostId', ROUTES.hosts.root(0));

  if (!numericHostId) return null;

  const { data, error, isLoading } = useHostSignupRequestDetail(numericHostId);

  if (isLoading) return null;

  if (error || !data) {
    return (
      <>
        <SSubPageTitle>호스트 승인</SSubPageTitle>
        <MessageBox variant="light">
          {error || '데이터가 존재하지 않습니다'}
        </MessageBox>
      </>
    );
  }

  return (
    <>
      <SSubPageTitle>호스트 승인</SSubPageTitle>
      {HOST_REQUEST_FIELDS.map(({ name, id }) => (
        <React.Fragment key={id}>
          <InfoField name={name}>{data[id]}</InfoField>
        </React.Fragment>
      ))}
      <InfoField name="첨부서류">
        <SHostRequestImageArea>
          <img src={data.businessLicenseImageUrl} alt="첨부서류1" />
          <img src={data.submitDocumentImageUrl} alt="첨부서류2" />
        </SHostRequestImageArea>
      </InfoField>
      <HostSignupApprovalButtons hostId={numericHostId} />
    </>
  );
};

export default HostSignupRequestDetail;
