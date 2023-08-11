import * as React from "react";
import { Typography, Container, Box } from "@mui/material";
import { useAuth } from "../features/auth/context";

const Home = () => {
  const auth = useAuth();
  return (
    <Container component="main" maxWidth="m">
      <Box m={2} />
      <Typography variant="h5">Welcome!!</Typography>
      {auth.user ? (
        <Typography variant="h6">
          You are logged in as {auth.user.firstName} {auth.user.lastName}!
        </Typography>
      ) : (
        <Typography variant="h6">You are not logged in!</Typography>
      )}
    </Container>
  );
};

export default Home;
