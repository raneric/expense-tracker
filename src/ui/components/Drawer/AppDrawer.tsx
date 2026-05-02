import { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { RouteList } from "../../../utils/Const";
import { Logo } from "../../core/Logo";

const drawerStyle = {
  width: 240,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: 240,
    boxSizing: "border-box",
  },
};

const activeItemStyle = {
  "&.Mui-selected": {
    backgroundColor: "secondary.main",
    color: "text.main",
    borderRadius: 2,
    "&:hover": {
      backgroundColor: "secondary.main",
    },
  },
};

export default function AppDrawer() {
  const [activeRoute, setActiveRoute] = useState(RouteList[0]?.path || "");

  return (
    <>
      <Drawer variant="permanent" sx={drawerStyle}>
        <Logo />

        <Box sx={{ p: 1 }}>
          <List>
            {RouteList.map((route) => (
              <ListItem disablePadding key={route.path}>
                <ListItemButton
                  selected={activeRoute === route.path}
                  onClick={() => setActiveRoute(route.path)}
                  sx={activeItemStyle}
                >
                  <ListItemText primary={route.displayName} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
