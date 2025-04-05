import { colors, layouts, radius, shadow, transition } from './vars';

export const theme = {
  colors,
  layouts,
  radius,
  shadow,
  transition,
} as const;

export type Theme = typeof theme;
