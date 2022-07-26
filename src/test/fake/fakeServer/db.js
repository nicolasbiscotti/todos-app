import { FakeMessages } from "../fakeErrorMessages";
import fakeIdGenerator from "../fakeIdGenerator";

export const fakeDb = (
  userIdGenerator = fakeIdGenerator(),
  todoIdGenerator = fakeIdGenerator()
) => {
  const db = {};

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

  const userIdGeneratorWillGenerate = (userId) => userIdGenerator.add(userId);
  const clear = () => {
    storage = {};
  };

  db.createUser = createUser;
  db.getTodosForUser = getTodosForUser;
  db.setTodoListForUser = setTodoListForUser;
  db.userIdGeneratorWillGenerate = userIdGeneratorWillGenerate;
  db.clear = clear;

  return db;
};
