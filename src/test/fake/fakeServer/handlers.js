import { rest } from "msw";

export const handlers = (db) => {
  const handlers = [
    // Handles a GET /userId
    rest.get("/userId", (req, res, ctx) => {
      const userId = db.createUser();
      return res(ctx.status(200), ctx.json(userId));
    }),
    // Handles a DELETE /todo/:userId/reset
    rest.delete("/todo/:userId/reset", (req, res, ctx) => {
      const { userId } = req.params;
      const result = db.setTodoListForUser(userId, []);
      return res(ctx.status(200), ctx.json(result));
    }),
    // Handles a GET /todo/:userId/:completed
    rest.get("/todo/:userId/:completed", (req, res, ctx) => {
      const { userId, completed } = req.params;
      const result = db.getTodosForUserWithCompletion({ userId, completed });
      return res(ctx.status(200), ctx.json(result));
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
