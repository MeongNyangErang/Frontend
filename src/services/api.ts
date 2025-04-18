import axios, { AxiosError } from 'axios';
import { STORAGE_KEYS } from '@constants/storageKey';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 추가
axiosInstance.interceptors.request.use(
  (config) => {
    // 요청 헤더에 인증 토큰 추가
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // 요청 에러 처리
    return Promise.reject(error);
  },
);

// 응답 인터셉터 추가
axiosInstance.interceptors.response.use(
  (response) => {
    // 응답 데이터를 처리하고 반환
    return response.data;
  },
  (error) => {
    // 응답 에러 처리
    const axiosError = error as AxiosError;
    // 여기서 에러 처리 로직 구현
    return Promise.reject(axiosError);
  },
);

async function fetchCall<T>(
  url: string,
  method: 'get' | 'post' | 'put' | 'delete' | 'patch',
  data?: any,
): Promise<T> {
  const isFormData = data instanceof FormData;

  const config = {
    url,
    method,
    ...(data && { data }),
    headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : undefined,
  };

  return axiosInstance(config);
}

export { fetchCall };
