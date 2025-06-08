import { createAxiosInstance, createFetchCall } from '@shared/services/api';
import { authServices } from './authServices';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = createAxiosInstance(authServices.reIssueToken);
export const fetchCall = createFetchCall(axiosInstance, BASE_URL);
