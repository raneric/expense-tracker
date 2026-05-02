import { Box } from "@mui/material";
import { LOGO_SIZES, type LogoSize } from "../../type/UIType";

export function Logo(props: { logoSize?: LogoSize }) {
  const logoSize: LogoSize = props.logoSize || LOGO_SIZES.Small;
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 1,
      }}
    >
      <Box
        component="img"
        src="/src/assets/logo.png"
        alt="Logo"
        sx={{
          width: "100%",
          maxWidth: logoSize,
        }}
      />
    </Box>
  );
}
