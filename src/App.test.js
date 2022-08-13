import { screen, waitFor } from "@testing-library/react";
import App from "./App";
import api from "./lib/api";
import cacheBuilder from "./test/fake/cacheBuilder";
import { renderWithProvider } from "./test/utils/renderWithProvider";

describe("App Component", () => {
  let titles = ["To-dos list", "There is still nothing to be done."];

  const cache = cacheBuilder().build();
  const appAPI = api("/");

  it("renders without crashing", async () => {
    renderWithProvider(<App />, { services: { api: appAPI, storage: cache } });
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
