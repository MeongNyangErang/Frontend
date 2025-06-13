import {
  NoticeDetailResponse,
  NoticesResponse,
} from '@shared/typings/response/noticesResponse';
import { FetchCallType } from './api';

const createNoticeServices = (fetchCall: FetchCallType) => ({
  getNotices: async (page: number) =>
    fetchCall<NoticesResponse>(`notices?page=${page}`, 'get'),
  getNoticeDetail: async (noticeId: number) =>
    fetchCall<NoticeDetailResponse>(`notices/${noticeId}`, 'get'),
});

export { createNoticeServices };
