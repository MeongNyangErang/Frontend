import { STORAGE_KEYS } from '@constants/storageKey';
import { PayloadFromToken } from '@shared/typings/auth';
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

const extractUserInfoFromToken = (token: string): PayloadFromToken => {
  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload;
};

export { saveAuthTokens, removeAuthTokens, extractUserInfoFromToken };
