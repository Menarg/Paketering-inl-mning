import { test, expect } from "vitest";
import App from "./App";
import { render, screen } from "@testing-library/react";
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

// runs a clean after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
})

test("True to be true", () => {
  expect(true).toBe(true);
});

test("should render headline", () => {
  render(<App />);
  expect(screen.getByRole("button")).toBeInTheDocument();
});