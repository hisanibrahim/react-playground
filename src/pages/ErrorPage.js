import { Box, Container, Typography } from "@mui/material";

export default function ErrorPage() {
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
      </Box>
    </Container>
  );
}
