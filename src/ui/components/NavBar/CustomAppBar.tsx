import { AppBar, Button, Toolbar } from "@mui/material";

const drawerWidth = 240;

export default function CustomAppBar() {
  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <Button color="inherit" sx={{ marginLeft: "auto" }}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
}
