import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("react-router-dom");
jest.mock("./api/api", () => ({
  get: jest.fn(() => Promise.resolve({ data: [] })),
}));

test("renders main layout header", () => {
  render(<App />);
  expect(screen.getByText(/Dental Clinic Management/i)).toBeInTheDocument();
});
