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

  const addTodoForUser = ({ userId, title, message }) => {
    if (!contains(userId)) {
      throw new Error(FakeMessages.USER_ID_NOT_FOUND);
    }
    const todo = {
      id: todoIdGenerator.next(),
      title,
      message,
      completed: false,
    };
    storage[userId].push(todo);
    return { title, message, completed: false, todoId: todo.id };
  };

  const editTodoCompletionForUser = ({ userId, completed, todoId }) => {
    if (!contains(userId)) {
      throw new Error(FakeMessages.USER_ID_NOT_FOUND);
    }

    let editedTodo = null;
    const newList = storage[userId].map((todo) => {
      if (todo.id === todoId) {
        editedTodo = { message: todo.message, title: todo.title, completed };
        return { ...todo, completed };
      }
      return todo;
    });

    if (!editedTodo) {
      throw new Error(FakeMessages.TODO_ID_NOT_FOUND);
    }

    storage[userId] = newList;

    return { ...editedTodo };
  };

  const deleteTodoForUser = ({ userId, todoId }) => {
    if (!contains(userId)) {
      throw new Error(FakeMessages.USER_ID_NOT_FOUND);
    }

    const newList = storage[userId].filter((todo) => todo.id !== todoId);
    
    if (newList.length + 1 === storage[userId].length) {
      storage[userId] = newList;
      return { ok: true };
    }

    return { ok: false };
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
    addTodoForUser,
    editTodoCompletionForUser,
    deleteTodoForUser,
    willCreateUser,
    willCreateTodo,
    clear,
  };

  return db;
};
