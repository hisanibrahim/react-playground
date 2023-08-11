import * as React from "react";
import { Typography, Container, Box } from "@mui/material";
import { useAuth } from "../features/auth/context";

const Home = () => {
  const auth = useAuth();
  return (
    <Container component="main" maxWidth="m">
      <Box m={2} />
      <Typography variant="h5">Welcome {auth.user?.firstName}!</Typography>
    </Container>
  );
};

export default Home;
