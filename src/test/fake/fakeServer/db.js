import { FakeMessages } from "../fakeErrorMessages";
import fakeIdGenerator from "../fakeIdGenerator";

export const fakeDb = (
  userIdGenerator = fakeIdGenerator(),
  todoIdGenerator = fakeIdGenerator()
) => {
  let storage = {};

  const createUser = () => {
    try {
      const userId = userIdGenerator.next();
      if (storage[userId]) {
        throw new Error(FakeMessages.USER_ID_ALREADY_EXISTS);
      }
      storage[userId] = [];
      return userId;
    } catch (error) {
      throw error;
    }
  };

  const getTodosForUser = (userId) => {
    if (!storage[userId]) {
      throw new Error(FakeMessages.USER_ID_NOT_FOUND);
    }
    return storage[userId];
  };

  const setTodoListForUser = (userId, todoList) => {
    storage[userId] = todoList;
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
    willCreateUser,
    willCreateTodo,
    clear,
  };

  return db;
};
