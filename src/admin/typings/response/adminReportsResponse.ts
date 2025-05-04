import { ReportListItem } from '../adminReports';

interface ReportListResponse {
  code: number;
  data: {
    content: ReportListItem[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
  };
}

export { ReportListResponse };
