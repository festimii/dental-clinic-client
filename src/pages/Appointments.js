import { useMemo, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Grid,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DataTable from "../components/DataTable";
import PageHeader from "../components/PageHeader";
import { mockAppointments } from "../utils/mockData";

const statusChipProps = {
  Scheduled: { color: "info", icon: <AccessTimeIcon /> },
  Completed: { color: "success", icon: <CheckCircleIcon /> },
  Cancelled: { color: "error", icon: <CancelIcon /> },
};

export default function Appointments() {
  const [appointments, setAppointments] = useState(mockAppointments);
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const columns = useMemo(
    () => [
      {
        field: "patient",
        headerName: "Patient",
        renderCell: (row) => (
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar sx={{ bgcolor: "primary.light" }}>
              {row.patient.charAt(0)}
            </Avatar>
            <Box>
              <Typography fontWeight={600}>{row.patient}</Typography>
              <Typography variant="body2" color="text.secondary">
                {row.type}
              </Typography>
            </Box>
          </Stack>
        ),
        minWidth: 220,
      },
      {
        field: "dentist",
        headerName: "Dentist",
        minWidth: 160,
      },
      {
        field: "date",
        headerName: "Date",
        minWidth: 120,
        renderCell: (row) => new Date(row.date).toLocaleDateString(),
      },
      {
        field: "time",
        headerName: "Time",
        minWidth: 100,
      },
      {
        field: "room",
        headerName: "Room",
        minWidth: 120,
      },
      {
        field: "status",
        headerName: "Status",
        minWidth: 150,
        renderCell: (row) => {
          const chipProps = statusChipProps[row.status] || {};
          return (
            <Chip
              label={row.status}
              size="small"
              color={chipProps.color}
              icon={chipProps.icon}
              sx={{ minWidth: 120 }}
            />
          );
        },
      },
      {
        field: "actions",
        headerName: "Actions",
        minWidth: 120,
        renderCell: (row) => (
          <Button
            size="small"
            variant="outlined"
            onClick={(event) => handleOpenStatusMenu(event, row)}
          >
            Update Status
          </Button>
        ),
      },
    ],
    []
  );

  const stats = useMemo(() => {
    const totals = appointments.reduce(
      (acc, appointment) => {
        acc.total += 1;
        acc[appointment.status] += 1;
        return acc;
      },
      { total: 0, Scheduled: 0, Completed: 0, Cancelled: 0 }
    );
    return totals;
  }, [appointments]);

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const matchesStatus =
        statusFilter === "All" || appointment.status === statusFilter;
      const matchesSearch = `${appointment.patient} ${appointment.dentist}`
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [appointments, statusFilter, search]);

  const handleOpenStatusMenu = (event, appointment) => {
    setAnchorEl(event.currentTarget);
    setSelectedAppointment(appointment);
  };

  const handleCloseStatusMenu = () => {
    setAnchorEl(null);
    setSelectedAppointment(null);
  };

  const handleStatusChange = (newStatus) => {
    if (!selectedAppointment) return;
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === selectedAppointment.id
          ? { ...appointment, status: newStatus }
          : appointment
      )
    );
    handleCloseStatusMenu();
  };

  return (
    <Box>
      <PageHeader
        title="Appointments"
        subtitle="Track upcoming visits, room allocations, and appointment status."
        action={
          <Button variant="contained" startIcon={<FilterListIcon />}>
            Create Appointment
          </Button>
        }
      />

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard title="Total this week" value={stats.total} color="primary" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard title="Scheduled" value={stats.Scheduled} color="info" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard title="Completed" value={stats.Completed} color="success" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard title="Cancelled" value={stats.Cancelled} color="error" />
        </Grid>
      </Grid>

      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        sx={{ mb: 3 }}
        justifyContent="space-between"
      >
        <TextField
          label="Search by patient or dentist"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          sx={{ maxWidth: 360 }}
        />
        <Stack direction="row" spacing={1}>
          {["All", "Scheduled", "Completed", "Cancelled"].map((status) => (
            <Chip
              key={status}
              label={status}
              variant={statusFilter === status ? "filled" : "outlined"}
              color={status === "All" ? "default" : statusChipProps[status]?.color}
              onClick={() => setStatusFilter(status)}
            />
          ))}
        </Stack>
      </Stack>

      <DataTable
        columns={columns}
        rows={filteredAppointments}
        emptyMessage="No appointments match the current filters"
      />

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseStatusMenu}>
        {Object.keys(statusChipProps).map((status) => (
          <MenuItem key={status} onClick={() => handleStatusChange(status)}>
            {status}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

function SummaryCard({ title, value, color }) {
  return (
    <Box
      sx={{
        p: 2.5,
        borderRadius: 2,
        bgcolor: `${color}.50`,
        border: (theme) => `1px solid ${theme.palette[color]?.light || theme.palette.divider}`,
      }}
    >
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h5" fontWeight={600}>
        {value}
      </Typography>
    </Box>
  );
}
