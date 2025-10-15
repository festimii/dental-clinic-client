import { useState } from "react";
import { Box, Toolbar } from "@mui/material";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const drawerWidth = 260;

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleToggleSidebar = () => setMobileOpen((open) => !open);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "grey.50" }}>
      <Navbar onToggleSidebar={handleToggleSidebar} />
      <Sidebar mobileOpen={mobileOpen} onClose={handleToggleSidebar} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 4 },
          mt: 8,
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar sx={{ display: { xs: "block", md: "none" } }} />
        <Outlet />
      </Box>
    </Box>
  );
}
