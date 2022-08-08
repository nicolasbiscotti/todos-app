import { apiMiddleware } from "./api";
import { storageMiddleware } from "./storage";
import { todosMiddleware } from "./todos";
import { userMiddleware } from "./user";

export default [
  ...userMiddleware,
  ...todosMiddleware,
  ...storageMiddleware,
  ...apiMiddleware,
];
