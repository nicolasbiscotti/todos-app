import { rest } from "msw";

const baseUrl = "";

export const handlers = (db) => {
  const handlers = [
    // Handles a GET /userId
    rest.get(`${baseUrl}/userId`, (req, res, ctx) => {
      const userId = db.createUser();
      return res(ctx.status(200), ctx.text(userId));
    }),
    // Handles a DELETE /todo/:userId/reset
    rest.delete(`${baseUrl}/todo/:userId/reset`, (req, res, ctx) => {
      const { userId } = req.params;
      const result = db.setTodoListForUser(userId, []);
      return res(ctx.status(200), ctx.json(result));
    }),
    // Handles a GET /todo/:userId/:completed
    rest.get(`${baseUrl}/todo/:userId/:completed`, (req, res, ctx) => {
      const { userId, completed } = req.params;
      const result = db.getTodosForUserWithCompletion({ userId, completed });
      return res(ctx.status(200), ctx.json(result));
    }),
    // Handles a GET /todo/:userId
    rest.get(`${baseUrl}/todo/:userId`, (req, res, ctx) => {
      const { userId } = req.params;
      const todoList = db.getTodosForUser(userId);
      return res(ctx.status(200), ctx.json(todoList));
    }),
    // Handles a POST /todo/:userId
    rest.post(`${baseUrl}/todo/:userId`, async (req, res, ctx) => {
      const { userId } = req.params;
      const { title, message } = await req.json();
      const todo = db.addTodoForUser({ userId, title, message });
      return res(ctx.status(200), ctx.json(todo));
    }),
    // Handles a PUT /todo/:userId
    rest.put(`${baseUrl}/todo/:userId`, async (req, res, ctx) => {
      const { userId } = req.params;
      const { completed, todoId } = await req.json();
      const editedTodo = db.editTodoCompletionForUser({
        userId,
        completed,
        todoId,
      });
      return res(ctx.status(200), ctx.json(editedTodo));
    }),
    // Handles a DELETE /todo/:userId
    rest.delete(`${baseUrl}/todo/:userId`, async (req, res, ctx) => {
      const { userId } = req.params;
      const { todoId } = await req.json();
      const deleteStatus = db.deleteTodoForUser({ userId, todoId });
      return res(ctx.status(200), ctx.json(deleteStatus));
    }),
  ];

  return handlers;
};
