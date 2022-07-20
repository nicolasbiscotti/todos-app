import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
  let titles = ["Todo", "¿Qué cosa tenés que terminar hoy?"];

  it("renders without crashing", () => {
    render(<App />);

    const logo = screen.getByRole("img");
    const headings = screen.getAllByRole("heading");

    expect(logo).toHaveAttribute("alt", "logo");
    expect(headings).toHaveLength(titles.length);
    for (const index of [...Array(titles.length)].map(
      (undefined, index) => index
    )) {
      expect(headings[index]).toHaveTextContent(titles[index]);
    }
  });
});
