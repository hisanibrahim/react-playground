import * as React from "react";
import { Typography, Container, Box } from "@mui/material";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { useAuth } from "../features/auth/context";

const columns = [
  { field: "firstName", headerName: "First Name", width: 150 },
  { field: "lastName", headerName: "Last Name", width: 150 },
  { field: "email", headerName: "Email", width: 250 },
];

const Dashboard = () => {
  const auth = useAuth();
  return (
    <Container component="main" maxWidth="m">
      <Box m={2} />
      <Typography variant="h5">Users</Typography>
      <Box m={2} />
      <DataGrid
        getRowId={(row) => row.email}
        rows={auth.users || []}
        columns={columns}
      />
    </Container>
  );
};

export default Dashboard;

// export default function App() {
//   return (
//     <div style={{ height: 300, width: '100%' }}>

//     </div>
//   );
// }
