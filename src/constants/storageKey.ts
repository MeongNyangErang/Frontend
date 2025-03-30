export const STORAGE_KEYS = {
  MEMBER: 'member',
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
