import { render, screen } from "@testing-library/react";
import App from "../App";

test("app logo appears in dom", () => {

  render (
      <App />
  );

  const logo = screen.getByAltText(/app-logo/i);
  expect(logo).toBeInTheDocument();
});
