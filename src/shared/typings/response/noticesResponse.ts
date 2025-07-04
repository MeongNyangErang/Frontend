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

type NoticeDetailResponse = NoticeDetail;

export { NoticesResponse, NoticeDetailResponse };
