import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  Avatar,
  Stack,
  Divider,
  Paper,
} from "@mui/material";
import {
  People,
  Event,
  MonetizationOn,
  Healing,
  AddCircleOutline,
} from "@mui/icons-material";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [revenueData, setRevenueData] = useState([]);
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);

  useEffect(() => {
    // Mock data for demonstration
    setStats({
      todayPatients: 18,
      todayAppointments: 14,
      todayRevenue: 1540,
      totalTreatments: 27,
    });

    setRevenueData([
      { day: "Mon", revenue: 820 },
      { day: "Tue", revenue: 910 },
      { day: "Wed", revenue: 1050 },
      { day: "Thu", revenue: 990 },
      { day: "Fri", revenue: 1130 },
      { day: "Sat", revenue: 870 },
      { day: "Sun", revenue: 0 },
    ]);

    setAppointmentsData([
      { day: "Mon", count: 9 },
      { day: "Tue", count: 12 },
      { day: "Wed", count: 10 },
      { day: "Thu", count: 15 },
      { day: "Fri", count: 14 },
      { day: "Sat", count: 6 },
      { day: "Sun", count: 0 },
    ]);

    setUpcomingAppointments([
      { id: 1, name: "John Doe", time: "10:00 AM", doctor: "Dr. Smith" },
      { id: 2, name: "Jane Brown", time: "10:45 AM", doctor: "Dr. Lika" },
      { id: 3, name: "Tom Novak", time: "11:30 AM", doctor: "Dr. Smith" },
      { id: 4, name: "Eva Petro", time: "1:00 PM", doctor: "Dr. Blake" },
      { id: 5, name: "Mark Jones", time: "2:15 PM", doctor: "Dr. Lika" },
    ]);
  }, []);

  if (!stats) return null;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Dashboard Overview
      </Typography>

      {/* Quick Action Buttons */}
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleOutline />}
        >
          New Patient
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<AddCircleOutline />}
        >
          New Appointment
        </Button>
      </Stack>

      {/* KPI Cards */}
      <Grid container spacing={3}>
        <KpiCard
          title="Today's Patients"
          value={stats.todayPatients}
          icon={<People />}
          color="#1976d2"
        />
        <KpiCard
          title="Appointments"
          value={stats.todayAppointments}
          icon={<Event />}
          color="#0288d1"
        />
        <KpiCard
          title="Revenue"
          value={`$${stats.todayRevenue}`}
          icon={<MonetizationOn />}
          color="#2e7d32"
        />
        <KpiCard
          title="Treatments Done"
          value={stats.totalTreatments}
          icon={<Healing />}
          color="#7b1fa2"
        />
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 3, height: "100%" }}>
            <Typography variant="h6" mb={2}>
              Weekly Revenue
            </Typography>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#1976d2" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 3, height: "100%" }}>
            <Typography variant="h6" mb={2}>
              Weekly Appointments
            </Typography>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={appointmentsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#0288d1"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Upcoming Appointments */}
      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" mb={2}>
          Upcoming Appointments
        </Typography>
        <Divider />
        {upcomingAppointments.map((a) => (
          <Box
            key={a.id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              py: 1.2,
              borderBottom: "1px solid #eee",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar sx={{ bgcolor: "#1976d2", mr: 2 }}>
                {a.name.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="subtitle1" fontWeight={500}>
                  {a.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {a.doctor}
                </Typography>
              </Box>
            </Box>
            <Typography variant="body2" color="text.secondary">
              {a.time}
            </Typography>
          </Box>
        ))}
      </Paper>
    </Box>
  );
}

/* KPI CARD SUBCOMPONENT */
function KpiCard({ title, value, icon, color }) {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card
        sx={{
          p: 2,
          borderLeft: `6px solid ${color}`,
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        }}
      >
        <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar sx={{ bgcolor: color, color: "#fff" }}>{icon}</Avatar>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              {title}
            </Typography>
            <Typography variant="h5" fontWeight={600}>
              {value}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
