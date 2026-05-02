import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import AppDrawer from "../components/Drawer/AppDrawer";
import CustomAppBar from "../components/NavBar/CustomAppBar";

export default function Main() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <CustomAppBar />
      <Box sx={{ display: "flex", flexGrow: 1, mt: 8 }}>
        <AppDrawer />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            pt: 2,
            pr: 2,
            pb: 1,
            pl: 2,
            overflow: "auto",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
