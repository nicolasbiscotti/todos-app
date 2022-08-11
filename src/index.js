import App from "./App";
import "./index.css";
import api from "./lib/api";
import { renderWithProvider } from "./utils/renderWithProvider";

const appAPI = api("https://api-3sxs63jhua-uc.a.run.app/v1");

renderWithProvider(<App />, {
  services: { api: appAPI, storage: localStorage },
});
