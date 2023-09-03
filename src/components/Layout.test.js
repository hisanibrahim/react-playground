import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Layout from "./Layout";
import { useAuth } from "../features/auth/context";

jest.mock("../features/auth/context");

describe("describe", () => {
  it("Render Layout component", () => {
    useAuth.mockReturnValue({ user: "123" });
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );

    const logo = screen.getAllByRole("link", { name: "LOGO" });
    expect(logo).toBeTruthy();
  });
});
