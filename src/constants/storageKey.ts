export const STORAGE_KEYS = {
  MEMBER: 'member',
  ACCESS_TOKEN: 'accessToken',
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
