import { Route, Routes } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ErrorPage from "./pages/ErrorPage";
import Register from "./pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <></>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

function App() {
  const defaultTheme = createTheme();
  return (
    <RouterProvider router={router}>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
      </ThemeProvider>
    </RouterProvider>
  );
}

export default App;
