import { fetchTodoList } from "./storeBuilder";

const aTodoService = (todoRepository, store) => {
  const service = {};

  const list = (userId) => {
    store.dispatch(fetchTodoList({ userId, todoRepository }));
  };

  service.list = list;

  return service;
};

export default aTodoService;
