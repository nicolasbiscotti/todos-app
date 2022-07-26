export const givenThatDB = (db) => {
  const config = {};
  const given = {};

  const alreadyHasUserId = (userId) => {
    config.userId = userId;
    db.userIdGeneratorWillGenerate(userId);
    return given;
  };

  const withTodoList = (todoList) => {
    db.createUser();
    db.setTodoListForUser(config.userId, todoList);
  };

  given.alreadyHasUserId = alreadyHasUserId;
  given.withTodoList = withTodoList;

  return given;
};
