import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const menu = [
    { text: "Dashboard", path: "/" },
    { text: "Patients", path: "/patients" },
    { text: "Appointments", path: "/appointments" },
    { text: "Treatments", path: "/treatments" },
    { text: "Billing", path: "/billing" },
  ];

  return (
    <Drawer variant="permanent" anchor="left">
      <List>
        {menu.map((item) => (
          <ListItem button component={Link} to={item.path} key={item.text}>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
