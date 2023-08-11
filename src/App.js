import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import Layout from "./components/Layout";
import ErrorPage from "./pages/ErrorPage";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import RequireAuth from "./components/RequireAuth";
import { AuthProvider } from "./features/auth/context";

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
              <Route path="/register" element={<Register />} />
              <Route
                path="/dashboard"
                element={
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                }
              />
            </Route>
          </Routes>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
