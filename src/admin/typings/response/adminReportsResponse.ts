import { ReportListItem, ReportDetail } from '../adminReports';

interface ReportListResponse {
  content: ReportListItem[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

type ReportDetailResponse = ReportDetail;

export { ReportListResponse, ReportDetailResponse };
