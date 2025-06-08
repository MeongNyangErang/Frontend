import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { STORAGE_KEYS } from '@constants/storageKey';
import { getLocalStorage, setLocalStorage } from '@shared/utils/storage';
import { triggerLogout } from '@shared/utils/logoutEmitter';
import { ReIssueToken } from '@shared/typings/response/authResponse';

const authInstance = axios.create();

type ReIssueTokenFn = (refreshToken: string | null) => Promise<ReIssueToken>;

const createAxiosInstance = (reIssueTokenFn: ReIssueTokenFn) => {
  const axiosInstance = axios.create();

  let isRefreshing = false;

  let failedQueue: {
    resolve: (value?: unknown) => void;
    reject: (reason?: unknown) => void;
  }[] = [];

  const processQueue = (error: unknown, token: string | null = null) => {
    failedQueue.forEach(({ resolve, reject }) => {
      if (token) {
        resolve(token);
      } else {
        reject(error);
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
        const refreshToken = getLocalStorage<string>(
          STORAGE_KEYS.REFRESH_TOKEN,
        );

        try {
          const { accessToken } = await reIssueTokenFn(refreshToken);
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

  return axiosInstance;
};

const createFetchCall = (
  axiosInstance: ReturnType<typeof axios.create>,
  baseURL: string,
) =>
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
    console.log('create fetchCall', baseURL);
    const config = {
      url,
      method,
      baseURL,
      headers,
      ...(data && { data }),
    };

    return axiosInstance(config);
  };

export { authInstance, createAxiosInstance, createFetchCall };
