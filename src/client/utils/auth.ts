import { STORAGE_KEYS } from '@constants/storageKey';
import { removeLocalStorage, setLocalStorage } from '@shared/utils/storage';

const accessTokenKey = STORAGE_KEYS.ACCESS_TOKEN;
const refreshTokenKey = STORAGE_KEYS.REFRESH_TOKEN;

const saveAuthTokens = (accessToken: string, refreshToken: string) => {
  setLocalStorage(accessTokenKey, accessToken);
  setLocalStorage(refreshTokenKey, refreshToken);
};

const removeAuthTokens = () => {
  removeLocalStorage(accessTokenKey);
  removeLocalStorage(refreshTokenKey);
};

const extractUserInfoFromToken = (token: string) => {
  const payload = JSON.parse(atob(token.split('.')[1]));
  const role = payload.role.split('_')[1];
  const email = payload.sub;
  return { ...payload, role, email };
};

export { saveAuthTokens, removeAuthTokens, extractUserInfoFromToken };
