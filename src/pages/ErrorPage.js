import { Box, Container, Typography } from "@mui/material";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h3">
          Oops!
        </Typography>
        <Box m={2} />
        <Typography component="h4" variant="h5">
          Sorry, an unexpected error has occurred.
        </Typography>
        <Box m={2} />
        <Typography component="h4" variant="h5">
          {error.statusText || error.message}
        </Typography>
      </Box>
    </Container>
  );
}
