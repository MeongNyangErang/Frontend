const BREAK_POINTS = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
} as const;

export const media = {
  mobile: `@media (min-width:${BREAK_POINTS.mobile})`,
  tablet: `@media (min-width:${BREAK_POINTS.tablet})`,
  desktop: `@media (min-width:${BREAK_POINTS.desktop})`,
} as const;
