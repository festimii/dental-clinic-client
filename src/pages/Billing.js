import { useCallback, useMemo, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import PaidIcon from "@mui/icons-material/Paid";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import DataTable from "../components/DataTable";
import PageHeader from "../components/PageHeader";
import { mockInvoices } from "../utils/mockData";

const statusMeta = {
  Paid: { color: "success", icon: <PaidIcon /> },
  Outstanding: { color: "info", icon: <HourglassEmptyIcon /> },
  Overdue: { color: "error", icon: <WarningAmberIcon /> },
};

export default function Billing() {
  const [invoices, setInvoices] = useState(mockInvoices);
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");

  const handleMarkAsPaid = useCallback((invoiceId) => {
    setInvoices((prev) =>
      prev.map((invoice) =>
        invoice.id === invoiceId ? { ...invoice, status: "Paid" } : invoice
      )
    );
  }, []);

  const totals = useMemo(() => {
    return invoices.reduce(
      (acc, invoice) => {
        acc.total += invoice.amount;
        acc.count += 1;
        acc.byStatus[invoice.status] = (acc.byStatus[invoice.status] || 0) + invoice.amount;
        return acc;
      },
      { total: 0, count: 0, byStatus: {} }
    );
  }, [invoices]);

  const columns = useMemo(
    () => [
      { field: "id", headerName: "Invoice", minWidth: 120 },
      { field: "patient", headerName: "Patient", minWidth: 160 },
      { field: "treatment", headerName: "Treatment", minWidth: 180 },
      {
        field: "issuedOn",
        headerName: "Issued",
        minWidth: 120,
        renderCell: (row) => new Date(row.issuedOn).toLocaleDateString(),
      },
      {
        field: "dueOn",
        headerName: "Due",
        minWidth: 120,
        renderCell: (row) => new Date(row.dueOn).toLocaleDateString(),
      },
      {
        field: "amount",
        headerName: "Amount",
        minWidth: 120,
        renderCell: (row) => `$${row.amount.toFixed(2)}`,
      },
      {
        field: "status",
        headerName: "Status",
        minWidth: 140,
        renderCell: (row) => {
          const meta = statusMeta[row.status] || {};
          return <Chip label={row.status} color={meta.color} icon={meta.icon} size="small" />;
        },
      },
      {
        field: "actions",
        headerName: "Actions",
        minWidth: 160,
        renderCell: (row) => (
          <Stack direction="row" spacing={1}>
            <Button size="small" variant="outlined" startIcon={<DownloadIcon />}>
              PDF
            </Button>
            {row.status !== "Paid" ? (
              <Button
                size="small"
                variant="contained"
                onClick={() => handleMarkAsPaid(row.id)}
              >
                Mark as paid
              </Button>
            ) : null}
          </Stack>
        ),
      },
    ],
    [handleMarkAsPaid]
  );

  const filteredInvoices = useMemo(() => {
    return invoices.filter((invoice) => {
      const matchesStatus = statusFilter === "All" || invoice.status === statusFilter;
      const matchesSearch = `${invoice.patient} ${invoice.id}`
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [invoices, statusFilter, search]);

  return (
    <Box>
      <PageHeader
        title="Billing"
        subtitle="Monitor outstanding balances and download invoices for patients."
      />

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <BillingSummaryCard
            title="Total billed"
            amount={totals.total}
            description={`${totals.count} invoices issued`}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <BillingSummaryCard
            title="Outstanding"
            amount={totals.byStatus.Outstanding || 0}
            description="Awaiting patient payment"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <BillingSummaryCard
            title="Overdue"
            amount={totals.byStatus.Overdue || 0}
            description="Requires follow-up"
          />
        </Grid>
      </Grid>

      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        sx={{ mb: 3 }}
        justifyContent="space-between"
      >
        <TextField
          label="Search invoices"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by patient name or invoice ID"
          sx={{ maxWidth: 360 }}
        />
        <Stack direction="row" spacing={1}>
          {["All", "Paid", "Outstanding", "Overdue"].map((status) => (
            <Chip
              key={status}
              label={status}
              onClick={() => setStatusFilter(status)}
              color={status === "All" ? "default" : statusMeta[status]?.color}
              variant={statusFilter === status ? "filled" : "outlined"}
            />
          ))}
        </Stack>
      </Stack>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Invoices
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <DataTable
            columns={columns}
            rows={filteredInvoices}
            emptyMessage="No invoices match the current filters"
          />
        </CardContent>
      </Card>
    </Box>
  );
}

function BillingSummaryCard({ title, amount, description }) {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="h4" fontWeight={600} sx={{ my: 1 }}>
          ${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
