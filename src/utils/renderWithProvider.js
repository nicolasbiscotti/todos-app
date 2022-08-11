import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { setupStore } from "../lib/model/store";

export function renderWithProvider(
  ui,
  {
    preloadedState = {},
    services,
    store = setupStore(preloadedState, services),
  }
) {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Provider store={store}>{ui}</Provider>);
  return root;
}
