import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import DataTable from "../components/DataTable";
import PageHeader from "../components/PageHeader";
import api from "../api/api";
import { mockPatients } from "../utils/mockData";

const genderFilters = [
  { value: "all", label: "All" },
  { value: "Female", label: "Female", icon: <FemaleIcon fontSize="small" /> },
  { value: "Male", label: "Male", icon: <MaleIcon fontSize="small" /> },
];

export default function Patients() {
  const [patients, setPatients] = useState(mockPatients);
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("all");

  useEffect(() => {
    api
      .get("/patients")
      .then((res) => setPatients(res.data))
      .catch(() => setPatients(mockPatients));
  }, []);

  const columns = useMemo(
    () => [
      { field: "firstName", headerName: "First Name" },
      { field: "lastName", headerName: "Last Name" },
      {
        field: "gender",
        headerName: "Gender",
        renderCell: (row) => <Chip label={row.gender} size="small" color="primary" />,
      },
      {
        field: "birthDate",
        headerName: "Birth Date",
        renderCell: (row) => new Date(row.birthDate).toLocaleDateString(),
      },
      { field: "phone", headerName: "Phone" },
    ],
    []
  );

  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      const matchesSearch = `${patient.firstName} ${patient.lastName}`
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesGender = gender === "all" || patient.gender === gender;
      return matchesSearch && matchesGender;
    });
  }, [patients, search, gender]);

  return (
    <Box>
      <PageHeader
        title="Patients"
        subtitle="Manage active patients, view contact information and demographics."
        action={
          <Button variant="contained" startIcon={<AddIcon />}
            sx={{ whiteSpace: "nowrap" }}
          >
            New Patient
          </Button>
        }
      />
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        sx={{ mb: 3 }}
        justifyContent="space-between"
      >
        <TextField
          label="Search patients"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by name"
          sx={{ maxWidth: 320 }}
        />
        <ToggleButtonGroup
          exclusive
          value={gender}
          onChange={(_, value) => value && setGender(value)}
          size="small"
        >
          {genderFilters.map((filter) => (
            <ToggleButton key={filter.value} value={filter.value}>
              <Stack direction="row" alignItems="center" spacing={1}>
                {filter.icon}
                <span>{filter.label}</span>
              </Stack>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Stack>
      <DataTable columns={columns} rows={filteredPatients} emptyMessage="No patients found" />
    </Box>
  );
}
