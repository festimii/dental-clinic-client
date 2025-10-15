import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import EventIcon from "@mui/icons-material/Event";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { Link, useLocation } from "react-router-dom";

const drawerWidth = 260;

const menu = [
  { text: "Dashboard", path: "/", icon: <DashboardIcon /> },
  { text: "Patients", path: "/patients", icon: <PeopleIcon /> },
  { text: "Appointments", path: "/appointments", icon: <EventIcon /> },
  { text: "Treatments", path: "/treatments", icon: <MedicalInformationIcon /> },
  { text: "Billing", path: "/billing", icon: <ReceiptLongIcon /> },
];

export default function Sidebar({ mobileOpen, onClose }) {
  const location = useLocation();

  const drawerContent = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={700} color="primary">
          BrightSmile Dental
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Admin Console
        </Typography>
      </Box>
      <Divider />
      <List sx={{ flexGrow: 1 }}>
        {menu.map((item) => {
          const selected = location.pathname === item.path;
          return (
            <ListItemButton
              key={item.text}
              component={Link}
              to={item.path}
              selected={selected}
              sx={{
                borderRadius: 2,
                mx: 2,
                my: 0.5,
                color: selected ? "primary.contrastText" : undefined,
                bgcolor: selected ? "primary.main" : "transparent",
                '&.Mui-selected:hover': {
                  bgcolor: "primary.main",
                },
              }}
              onClick={onClose}
            >
              <ListItemIcon
                sx={{
                  color: selected ? "primary.contrastText" : "text.secondary",
                  minWidth: 40,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          );
        })}
      </List>
      <Box sx={{ p: 3, bgcolor: "grey.100", borderRadius: 2, mx: 2, mb: 3 }}>
        <Typography variant="subtitle2" fontWeight={600} gutterBottom>
          Need help?
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Contact our support team for onboarding and training assistance.
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { width: drawerWidth },
        }}
      >
        {drawerContent}
      </Drawer>
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}
