import { useMemo, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import PageHeader from "../components/PageHeader";
import DataTable from "../components/DataTable";
import { mockTreatments } from "../utils/mockData";

const categories = ["All", "Preventive", "Restorative", "Cosmetic"];

export default function Treatments() {
  const [category, setCategory] = useState("All");

  const filteredTreatments = useMemo(() => {
    if (category === "All") return mockTreatments;
    return mockTreatments.filter((treatment) => treatment.category === category);
  }, [category]);

  const averageDuration = useMemo(() => {
    const durations = filteredTreatments.map((t) => t.duration);
    return durations.length
      ? Math.round(durations.reduce((sum, current) => sum + current, 0) / durations.length)
      : 0;
  }, [filteredTreatments]);

  const columns = useMemo(
    () => [
      { field: "name", headerName: "Treatment", minWidth: 200 },
      {
        field: "category",
        headerName: "Category",
        minWidth: 140,
        renderCell: (row) => <Chip label={row.category} size="small" color="primary" />,
      },
      {
        field: "duration",
        headerName: "Duration",
        minWidth: 120,
        renderCell: (row) => `${row.duration} mins`,
      },
      {
        field: "price",
        headerName: "Price",
        minWidth: 120,
        renderCell: (row) => `$${row.price.toLocaleString()}`,
      },
      {
        field: "description",
        headerName: "Description",
        minWidth: 260,
      },
    ],
    []
  );

  const countsByCategory = useMemo(() => {
    return categories.reduce((acc, cat) => {
      acc[cat] =
        cat === "All"
          ? mockTreatments.length
          : mockTreatments.filter((t) => t.category === cat).length;
      return acc;
    }, {});
  }, []);

  return (
    <Box>
      <PageHeader
        title="Treatments"
        subtitle="View the full catalogue of dental procedures and their details."
      />

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <InsightCard
            title="Total procedures"
            value={mockTreatments.length}
            helper="Across all categories"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <InsightCard
            title="Average duration"
            value={`${averageDuration} mins`}
            helper={`Based on ${filteredTreatments.length} treatments`}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <InsightCard
            title="Most popular category"
            value={findLargestCategory(countsByCategory)}
            helper="By number of active procedures"
          />
        </Grid>
      </Grid>

      <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: "wrap" }}>
        {categories.map((cat) => (
          <Chip
            key={cat}
            label={`${cat} (${countsByCategory[cat] ?? 0})`}
            color={cat === category ? "primary" : "default"}
            variant={cat === category ? "filled" : "outlined"}
            onClick={() => setCategory(cat)}
          />
        ))}
      </Stack>

      <Card>
        <CardContent>
          <Stack spacing={1} sx={{ mb: 2 }}>
            <Typography variant="h6">Treatment details</Typography>
            <Divider />
          </Stack>
          <DataTable
            columns={columns}
            rows={filteredTreatments}
            emptyMessage="No treatments in this category"
          />
        </CardContent>
      </Card>
    </Box>
  );
}

function InsightCard({ title, value, helper }) {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" fontWeight={600}>
          {value}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {helper}
        </Typography>
      </CardContent>
    </Card>
  );
}

function findLargestCategory(counts) {
  return Object.entries(counts)
    .filter(([key]) => key !== "All")
    .sort((a, b) => b[1] - a[1])[0]?.[0];
}
