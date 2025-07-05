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

interface ReportDetailResponse {
  code: number;
  data: ReportDetail;
}

export { ReportListResponse, ReportDetailResponse };
