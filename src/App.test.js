import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
  let titles = ["Todo", "¿Qué cosa tenés que terminar hoy?"];

  it("renders without crashing", async () => {
    render(<App />);
    let logo;
    let headings;
    await waitFor(() => {
      logo = screen.getByRole("img");
      headings = screen.getAllByRole("heading");
    });

    expect(logo).toHaveAttribute("alt", "logo");
    expect(headings).toHaveLength(titles.length);
    for (const index of [...Array(titles.length)].map(
      (undefined, index) => index
    )) {
      expect(headings[index]).toHaveTextContent(titles[index]);
    }
  });
});
