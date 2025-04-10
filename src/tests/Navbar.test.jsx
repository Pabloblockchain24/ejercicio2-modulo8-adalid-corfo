import React from "react";
import { render, screen } from "@testing-library/react";
import Navbar from "../components/Navbar";
import { test, expect } from "@jest/globals";
import "@testing-library/jest-dom";
import { AuthProvider } from "../context/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";


test("muestra el componente Navbar", () => {
  render(
    <Router>
      <AuthProvider>
        <Navbar />
      </AuthProvider>
    </Router>
  );
  expect(
    screen.getByText("Home", { normalizeWhitespace: true })
  ).toBeInTheDocument();
});
