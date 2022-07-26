import { setupServer } from "msw/node";
import { handlers } from "./handlers";

export const fakeServer = (db) => {
  const handlersList = handlers(db);
  return setupServer(...handlersList);
};
