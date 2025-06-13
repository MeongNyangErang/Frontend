import { createAxiosInstance, createFetchCall } from '@shared/services/api';
import { authServices } from './adminAuthServices';

const baseUrl = import.meta.env.VITE_API_ADMIN_BASE_URL;

const clientBaseUrl = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = createAxiosInstance(authServices.reIssueToken);

export const fetchCall = createFetchCall(axiosInstance, baseUrl);

export const clientFetchCall = createFetchCall(axiosInstance, clientBaseUrl);
