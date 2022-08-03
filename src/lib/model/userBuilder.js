const state = {
  user: {
    userId: "",
    setUserLoading: "idle",
    todoList: [],
    todoListLoading: "idle",
  },
};

export const userBuilder = {
  of: (user) => {
    state.user = user;
    return userBuilder;
  },
  userId: (userId) => {
    state.user.userId = userId;
    return userBuilder;
  },
  todoList: (todoList) => {
    state.user.todoList = todoList;
    return userBuilder;
  },
  todoListLoading: (todoListLoading) => {
    state.user.todoListLoading = todoListLoading;
    return userBuilder;
  },
  setUserLoading: (setUserLoading) => {
    state.user.setUserLoading = setUserLoading;
    return userBuilder;
  },
  build: () => ({
    ...state.user,
    todoList: state.user.todoList.map((todo) => ({ ...todo })),
  }),
};
