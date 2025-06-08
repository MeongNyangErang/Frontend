import { ReportListResponse } from '@admin/typings/response/adminReportsResponse';
import { fetchCall } from './adminApiClient';

const getReportList = async (page: number) => {
  return await fetchCall<ReportListResponse>(
    `reports/review?page=${page}`,
    'get',
  );
};

const getReportDetail = async (reportId: number) => {
  return await fetchCall(`report/${reportId}`, 'get');
};

const deleteReportedReview = async (reportId: number) => {};

export { getReportList, getReportDetail };
