import { fetchCall, clientFetchCall } from './adminApiClient';
import { createNoticeServices } from '@shared/services/notices';

const postNewNotice = async (formData: FormData) => {
  return fetchCall('notices', 'post', formData);
};

const editNotice = async (noticeId: number, formData: FormData) => {
  return fetchCall(`notices/${noticeId}`, 'put', formData);
};

const deleteNotice = async (noticeId: number) => {
  return fetchCall(`notices/${noticeId}`, 'delete');
};

const noticeServices = createNoticeServices(clientFetchCall);

const getNotices = noticeServices.getNotices;

const getNoticeDetail = noticeServices.getNoticeDetail;

export { postNewNotice, editNotice, deleteNotice, getNotices, getNoticeDetail };
