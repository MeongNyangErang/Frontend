import { createAuthServices } from '@shared/services/auth';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const authServices = createAuthServices(BASE_URL);
