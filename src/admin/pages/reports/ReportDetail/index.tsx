import React from 'react';
import { SSubPageTitle } from '@admin/components/styles/mixins';
import ROUTES from '@admin/constants/routes';
import useReportDetail from '@admin/hooks/page/useReportDetail';
import useNumericParam from '@shared/hooks/router/useNumericParam';
import MessageBox from '@shared/components/common/MessageBox';
import InfoField from '@shared/components/common/InfoField';
import ReportDetailButtons from './ReportDetailButtons';
import { SImageWrap } from './styles';

const REPORT_FIELDS = [
  { id: 'reviewId', name: '리뷰ID' },
  { id: 'reportDate', name: '신고일자' },
  { id: 'reporterNickname', name: '신고자' },
  { id: 'reviewerNickname', name: '리뷰 작성자' },
  { id: 'reason', name: '신고사유' },
] as const;

const ReportDetail = () => {
  const numericReportId = useNumericParam('reportId', ROUTES.reports.root(0));

  if (!numericReportId) return null;

  const { data, isLoading, error } = useReportDetail(numericReportId);

  if (isLoading || (!data && !error)) return null;

  if (error) {
    return (
      <>
        <SSubPageTitle>신고 상세</SSubPageTitle>
        <MessageBox>데이터를 불러오는데 실패했습니다.</MessageBox>
      </>
    );
  }

  return (
    <>
      <SSubPageTitle>신고 상세</SSubPageTitle>
      {data && (
        <>
          {REPORT_FIELDS.map(({ id, name }) => (
            <React.Fragment key={id}>
              <InfoField name={name}>{data[id]}</InfoField>
            </React.Fragment>
          ))}
          {data.evidenceImageUrl && (
            <InfoField name="증거 이미지">
              <SImageWrap>
                <img src={data.evidenceImageUrl} alt="증거 이미지" />
              </SImageWrap>
            </InfoField>
          )}
          <ReportDetailButtons reviewId={data.reviewId} />
        </>
      )}
    </>
  );
};

export default ReportDetail;
