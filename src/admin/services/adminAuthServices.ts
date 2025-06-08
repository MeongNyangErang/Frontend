import { createAuthServices } from '@shared/services/auth';

const CLIENT_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const authServices = createAuthServices(CLIENT_BASE_URL);
