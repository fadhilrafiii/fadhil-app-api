import { ACTIVITY_COLORS } from 'constants/colors';

export const generateActivityColors = (): string =>
  ACTIVITY_COLORS[Math.floor(Math.random() * ACTIVITY_COLORS.length)];
