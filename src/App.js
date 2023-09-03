import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import Layout from "./components/Layout";
import ErrorPage from "./pages/ErrorPage";
import Register from "./pages/Register";
import Users from "./pages/Users";
import Home from "./pages/Home";
import RequireAuth from "./components/RequireAuth";
import { AuthProvider } from "./features/auth/context";
const Login = lazy(() => import("./pages/Login"));

function App() {
  const defaultTheme = createTheme();
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider theme={defaultTheme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route
                path="/login"
                element={
                  <Suspense>
                    <Login />
                  </Suspense>
                }
              />
              <Route path="/register" element={<Register />} />
              <Route
                path="/users"
                element={
                  <RequireAuth role="ADMIN">
                    <Users />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
