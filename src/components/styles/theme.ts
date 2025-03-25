import { colors, layouts, radius } from './vars';

export const theme = {
  colors,
  layouts,
  radius,
} as const;

export type Theme = typeof theme;
