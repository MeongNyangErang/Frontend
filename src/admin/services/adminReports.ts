import {
  ReportListResponse,
  ReportDetailResponse,
} from '@admin/typings/response/adminReportsResponse';
import { fetchCall } from './adminApiClient';

const getReportList = async (page: number) => {
  return fetchCall<ReportListResponse>(`reports/review?page=${page}`, 'get');
};

const getReportDetail = async (reportId: number) => {
  return fetchCall<ReportDetailResponse>(`reports/${reportId}`, 'get');
};

const deleteReportedReview = async (reportId: number) => {
  return fetchCall(`reports/${reportId}`, 'delete');
};

export { getReportList, getReportDetail, deleteReportedReview };
