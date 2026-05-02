export const LOGO_SIZES = {
  Small: "8em",
  Medium: "12em",
  Large: "16em",
} as const;

export type LogoSize = (typeof LOGO_SIZES)[keyof typeof LOGO_SIZES];
