export const LOGO_WIDTH_SIZES = {
  Small: '8em',
  Medium: '12em',
  Large: '16em',
} as const;

export const LOGO_HEIGHT_SIZES = {
  Small: '3em',
  Medium: '6em',
  Large: '12em',
} as const;

export type LogoWidth =
  (typeof LOGO_WIDTH_SIZES)[keyof typeof LOGO_WIDTH_SIZES];

export type LogoHeight =
  (typeof LOGO_HEIGHT_SIZES)[keyof typeof LOGO_HEIGHT_SIZES];
