import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { setupStore } from "../../lib/model/store";

export function renderWithProvider(
  ui,
  {
    preloadedState = {},
    services,
    store = setupStore(preloadedState, services),
    ...renderOptions
  }
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
