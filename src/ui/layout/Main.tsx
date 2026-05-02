import { Box, Toolbar } from "@mui/material";
import AppDrawer from "../components/Drawer/AppDrawer";
import CustomAppBar from "../components/NavBar/CustomAppBar";

export default function Main() {
  return (
    <Box sx={{ display: "flex" }}>
      <CustomAppBar />
      <AppDrawer />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar /> {/* Offset for AppBar */}
        {/* Main content goes here */}
        <p>Main Content</p>
      </Box>
    </Box>
  );
}
