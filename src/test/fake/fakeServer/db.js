import { FakeMessages } from "../fakeErrorMessages";
import fakeIdGenerator from "../fakeIdGenerator";

export const fakeDb = (
  userIdGenerator = fakeIdGenerator(),
  todoIdGenerator = fakeIdGenerator()
) => {
  let storage = {};

  const contains = (userId) => storage[userId] !== undefined;

  const createUser = () => {
    try {
      const userId = userIdGenerator.next();
      if (contains(userId)) {
        throw new Error(FakeMessages.USER_ID_ALREADY_EXISTS);
      }
      storage[userId] = [];
      return userId;
    } catch (error) {
      throw error;
    }
  };

  const getTodosForUser = (userId) => {
    if (!contains(userId)) {
      throw new Error(FakeMessages.USER_ID_NOT_FOUND);
    }
    return storage[userId];
  };

  const setTodoListForUser = (userId, todoList) => {
    if (!contains(userId)) {
      throw new Error(FakeMessages.USER_ID_NOT_FOUND);
    }
    storage[userId] = todoList;
    return { ok: true };
  };

  const getTodosForUserWithCompletion = ({ userId, completed }) => {
    const list = getTodosForUser(userId);
    if (completed === "true") {
      return list.filter((todo) => todo.completed);
    } else {
      return list.filter((todo) => !todo.completed);
    }
  };

  const willCreateUser = (userId) => userIdGenerator.add(userId);

  const willCreateTodo = (todoId) => todoIdGenerator.add(todoId);

  const clear = () => {
    storage = {};
  };

  const db = {
    createUser,
    getTodosForUser,
    setTodoListForUser,
    getTodosForUserWithCompletion,
    willCreateUser,
    willCreateTodo,
    clear,
  };

  return db;
};
