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

const drawerWidth = 260;

export default function Navbar({ onToggleSidebar }) {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      color="inherit"
      sx={{
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { md: `${drawerWidth}px` },
      }}
    >
      <Toolbar
        sx={{
          width: "100%",
          gap: { xs: 1.5, md: 2 },
          flexWrap: { xs: "wrap", sm: "nowrap" },
          alignItems: "center",
        }}
      >
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
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, flexShrink: 0, mr: { xs: 0, sm: 2 } }}
        >
          Dental Clinic Management
        </Typography>
        <TextField
          size="small"
          placeholder="Search patients, appointments, invoices..."
          fullWidth
          sx={{
            flexGrow: 1,
            width: { xs: "100%", sm: "auto" },
            maxWidth: { md: 420 },
            minWidth: { sm: 200 },
            ml: { xs: 0, md: 4 },
            order: { xs: 3, sm: 0 },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
        <Tooltip title="Notifications">
          <IconButton color="inherit" sx={{ order: { xs: 2, sm: 0 } }}>
            <NotificationsNoneIcon />
          </IconButton>
        </Tooltip>
        <Avatar
          alt="Dr. Emily Carter"
          src="https://i.pravatar.cc/150?img=47"
          sx={{ order: { xs: 1, sm: 0 } }}
        />
      </Toolbar>
    </AppBar>
  );
}
