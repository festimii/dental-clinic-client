import {
  AppBar,
  Avatar,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

export default function Navbar({ onToggleSidebar }) {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      color="inherit"
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar sx={{ gap: 2 }}>
        {onToggleSidebar ? (
          <IconButton
            edge="start"
            color="inherit"
            onClick={onToggleSidebar}
            sx={{ display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        ) : null}
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Dental Clinic Management
        </Typography>
        <TextField
          size="small"
          placeholder="Search patients, appointments, invoices..."
          fullWidth
          sx={{ maxWidth: 420, ml: { xs: 0, md: 4 } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
        <Tooltip title="Notifications">
          <IconButton color="inherit">
            <NotificationsNoneIcon />
          </IconButton>
        </Tooltip>
        <Avatar alt="Dr. Emily Carter" src="https://i.pravatar.cc/150?img=47" />
      </Toolbar>
    </AppBar>
  );
}
