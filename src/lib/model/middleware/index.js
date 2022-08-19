import { apiMiddleware } from "./api";
import { filtersMiddleware } from "./filters";
import { logger } from "./logger";
import { storageMiddleware } from "./storage";
import { todosMiddleware } from "./todos";
import { userMiddleware } from "./user";

export default [
  ...userMiddleware,
  ...todosMiddleware,
  ...storageMiddleware,
  ...apiMiddleware,
  ...filtersMiddleware,
  logger,
];
