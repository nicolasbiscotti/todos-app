export const givenThatDB = (db) => {
  const config = {};

  const willCreateUser = (userId) => {
    db.willCreateUser(userId);
  };

  const withTodoList = (todoList) => {
    db.willCreateUser(config.userId);
    db.createUser();
    db.setTodoListForUser(config.userId, todoList);
  };

  const alreadyHasUserId = (userId) => {
    config.userId = userId;
    return { withTodoList };
  };

  const given = { alreadyHasUserId, willCreateUser };

  return given;
};
