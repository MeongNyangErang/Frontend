import { Notice, NoticeDetail } from '../notices';

interface NoticesResponse {
  code: number;
  content: Notice[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

interface NoticeDetailResponse {
  code: number;
  data: NoticeDetail;
}

export { NoticesResponse, NoticeDetailResponse };
