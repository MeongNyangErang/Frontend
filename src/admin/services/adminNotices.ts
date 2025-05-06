import { fetchCall } from './adminApi';

const postNewNotice = async (formData: FormData) => {
  return await fetchCall('notices', 'post', formData);
};

const editNotice = async (noticeId: number, formData: FormData) => {
  return await fetchCall(`notices/${noticeId}`, 'put', formData);
};

const deleteNotice = async (noticeId: number) => {
  return await fetchCall(`notices/${noticeId}`, 'delete');
};

export { postNewNotice, editNotice, deleteNotice };
