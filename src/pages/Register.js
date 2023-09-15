import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useAuth } from "../features/auth/context";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const initialState = false;
  const reducer = (state, action) => {
    switch (action.type) {
      case "ON":
        return true;
      case "OFF":
        return false;
      default:
        return state;
    }
  };

  const [state, dispatch] = React.useReducer(reducer, initialState, () => {
    return true;
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      username: data.get("username"),
      password: data.get("password"),
    };
    const { success } = auth.register(payload);
    if (success) navigate("/login");
  };

  React.useEffect(() => {
    auth.resetError();
  }, [auth]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create an account
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            loading={auth.loading}
          >
            Register
          </Button>
          <Typography>{auth.error}</Typography>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="login" variant="body2">
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
          <Button variant="contained" onClick={() => dispatch({ type: "ON" })}>
            ON
          </Button>
          <Button variant="contained" onClick={() => dispatch({ type: "OFF" })}>
            OFF
          </Button>
          {JSON.stringify(state)}
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
