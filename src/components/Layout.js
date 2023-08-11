import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Adb";
import AdbIcon from "@mui/icons-material/Adb";

import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/context";

export default function Layout() {
  const auth = useAuth();
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <>
      {/* // <Container sx={{ width: "100%", minHeight: "100vh" }}> */}
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {auth?.user ? (
                  <MenuItem key="Users" onClick={() => navigate("/users")}>
                    <Typography textAlign="center">Users</Typography>
                  </MenuItem>
                ) : (
                  <MenuItem
                    key="Register"
                    onClick={() => navigate("/register")}
                  >
                    <Typography textAlign="center">Register</Typography>
                  </MenuItem>
                )}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {auth?.user ? (
                auth.user.role === "ADMIN" ? (
                  <Button
                    key="Users"
                    onClick={() => navigate("/users")}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    Users
                  </Button>
                ) : null
              ) : (
                <Button
                  key="Register"
                  onClick={() => navigate("/register")}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Register
                </Button>
              )}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              {auth?.user ? (
                <Button
                  key="Logout"
                  onClick={() => auth.signout()}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  key="Login"
                  onClick={() => navigate("/login")}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Login
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </>
    // </Container>
  );
}
