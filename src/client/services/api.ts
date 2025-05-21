import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { STORAGE_KEYS } from '@constants/storageKey';
import { getLocalStorage, setLocalStorage } from '@shared/utils/storage';
import { triggerLogout } from '@utils/logoutEmitter';
import { reIssueToken } from './auth';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

let isRefreshing = false;

let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (token) {
      promise.resolve(token);
    } else {
      promise.reject(error);
    }
  });

  failedQueue = [];
};

axiosInstance.interceptors.request.use(
  (config) => {
    // 요청 헤더에 인증 토큰 추가
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response.data,
  async (error: AxiosError) => {
    const initialRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      error.response?.status === 401 &&
      getLocalStorage(STORAGE_KEYS.REFRESH_TOKEN) &&
      !initialRequest?._retry
    ) {
      initialRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token) => {
              if (initialRequest.headers) {
                initialRequest.headers.Authorization = `Bearer ${token}`;
              }
              resolve(axiosInstance(initialRequest));
            },
            reject,
          });
        });
      }

      isRefreshing = true;
      const refreshToken = getLocalStorage<string>(STORAGE_KEYS.REFRESH_TOKEN);

      try {
        const { accessToken } = await reIssueToken(refreshToken);
        setLocalStorage(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
        processQueue(null, accessToken);
        if (initialRequest.headers) {
          initialRequest.headers.Authorization = `Bearer ${accessToken}`;
        }
        return axiosInstance(initialRequest);
      } catch (error) {
        processQueue(error, null);
        await triggerLogout();
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

async function fetchCall<T>(
  url: string,
  method: 'get' | 'post' | 'put' | 'delete' | 'patch',
  data?: any,
): Promise<T> {
  const isFormData = data instanceof FormData;

  const headers = isFormData
    ? { 'Content-Type': 'multipart/form-data' }
    : {
        'Content-Type': 'application/json',
      };

  const config = {
    url,
    method,
    headers,
    ...(data && { data }),
  };

  return axiosInstance(config);
}

export { fetchCall };
