import { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DataTable from "../components/DataTable";
import api from "../api/api";

export default function Patients() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    api.get("/patients").then((res) => setPatients(res.data));
  }, []);

  const columns = [
    { field: "firstName", headerName: "First Name" },
    { field: "lastName", headerName: "Last Name" },
    { field: "gender", headerName: "Gender" },
    { field: "birthDate", headerName: "Birth Date" },
    { field: "phone", headerName: "Phone" },
  ];

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5">Patients</Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          Add
        </Button>
      </Box>
      <DataTable columns={columns} rows={patients} />
    </Box>
  );
}
