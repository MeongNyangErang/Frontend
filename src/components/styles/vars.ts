export const colors = {
  main: 'var(--main-color)',
  sub: 'var(--sub-color)',
  light: 'var(--light-color)',
  wrapBg: 'var(--wrap-bg-color)',
  success: 'var(--success-color)',
  info: 'var(--info-color)',
  infoText: 'var(--info-text-color)',
  gray100: 'var(--gray-100)',
  gray200: 'var(--gray-200)',
  gray300: 'var(--gray-300)',
  gray400: 'var(--gray-400)',
  gray500: 'var(--gray-500)',
  gray600: 'var(--gray-600)',
  gray700: 'var(--gray-700)',
  overlay: 'var(--overlay-color)',
} as const;

export const radius = {
  sm: '4px',
  md: '8px',
  full: '9999px',
} as const;

export const layouts = {
  // padding
  paddingX: '16px',

  // sizes
  maxWidth: '480px',
  minWidth: '300px',
  headerHeight: '56px',
  footerHeight: '200px',
  navHeight: '60px',
} as const;

export const shadow = {
  top: '0 -2px 10px rgba(0, 0, 0, 0.03)',
};
