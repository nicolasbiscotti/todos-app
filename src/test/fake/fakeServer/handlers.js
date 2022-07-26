import { rest } from "msw";

export const handlers = (db) => {
  const handlers = [
    // Handles a GET /userId
    rest.get("/userId", (req, res, ctx) => {
      const userId = db.createUser();
      return res(ctx.status(200), ctx.json(userId));
    }),
    // Handles a GET /todo/:userId
    rest.get("/todo/:userId", (req, res, ctx) => {
      const { userId } = req.params;
      const todoList = db.getTodosForUser(userId);
      return res(ctx.status(200), ctx.json(todoList));
    }),
  ];

  return handlers;
};
