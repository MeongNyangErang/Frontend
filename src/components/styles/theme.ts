import { colors, layouts, radius, shadow } from './vars';

export const theme = {
  colors,
  layouts,
  radius,
  shadow,
} as const;

export type Theme = typeof theme;
