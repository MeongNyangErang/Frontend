export const colors = {
  main: 'var(--main-color)',
  wrapBg: 'var(--wrap-bg-color)',
  gray100: 'var(--gray-100)',
  gray300: 'var(--gray-300)',
  gray500: 'var(--gray-500)',
  gray700: 'var(--gray-700)',
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
