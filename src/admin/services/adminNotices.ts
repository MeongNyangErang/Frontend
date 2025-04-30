import { fetchCall } from './adminApi';

const getNoticeList = async () => {
  return await fetchCall('notices', 'get', undefined, true);
};

const getNoticeDetail = async (noticeId: number) => {
  return await fetchCall(`notices/${noticeId}`, 'get', undefined, true);
};

const postNewNotice = async (formData: FormData) => {
  return await fetchCall('notices', 'post', formData);
};

const editNotice = async (noticeId: number) => {
  return await fetchCall(`notices/${noticeId}`, 'put');
};

export { getNoticeList, getNoticeDetail, postNewNotice, editNotice };
