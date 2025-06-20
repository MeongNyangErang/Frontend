import { fetchCall } from './apiClient';
import { createNoticeServices } from '@shared/services/notices';

const noticeServices = createNoticeServices(fetchCall);

const getNoticeList = noticeServices.getNotices;

const getNoticeDetail = noticeServices.getNoticeDetail;
