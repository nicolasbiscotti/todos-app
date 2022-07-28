import aTodoRepository from "../api/todoRepository";
import storeBuilder, { fetchTodoList, fetchUserId } from "./storeBuilder";

const configureTodoService = () => {
  const config = {};

  const aStore = (store) => {
    const { baseURL } = config;
    const todoRepository = aTodoRepository(baseURL);
    return aTodoService(todoRepository, store);
  };

  const withTodoRepoPointTo = (baseURL) => {
    config.baseURL = baseURL;
    return { aStore };
  };

  return { withTodoRepoPointTo };
};

const aTodoService = (todoRepository, store) => {
  const listeners = [];
  const subscribe = (payload, cb) => listeners.push({ payload, cb });

  const publish = () =>
    listeners.forEach(({ payload, cb }) => {
      cb(store.getState().todoList[payload]);
    });

  store.subscribe(publish);

  const getCurrentList = () => store.getState().todoList.list;
  const getCurrentListStatus = () => store.getState().todoList.status;

  const list = async () => {
    const { userId } = store.getState().user;
    const list = await store
      .dispatch(fetchTodoList({ userId, todoRepository }))
      .unwrap();
    return list;
  };

  const logFullState = () => console.log(store.getState());

  const service = {
    subscribe,
    getCurrentList,
    getCurrentListStatus,
    list,
    logFullState,
  };

  return service;
};

export default configureTodoService;
