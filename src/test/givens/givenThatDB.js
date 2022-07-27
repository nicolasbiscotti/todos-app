export const givenThatDB = (db) => {
  const config = {};

  const withTodoList = (todoList) => {
    db.willCreateUser(config.userId);
    db.createUser();
    db.setTodoListForUser(config.userId, todoList);
  };

  const alreadyHasUserId = (userId) => {
    config.userId = userId;
    return { withTodoList };
  };

  const willCreateUser = (userId) => {
    db.willCreateUser(userId);
  };

  const given = { alreadyHasUserId, willCreateUser };

  return given;
};
